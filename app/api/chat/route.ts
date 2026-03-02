import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Simple in-memory cache for common responses
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Token optimization settings
const MAX_TOKENS = 150; // Limit response length for cost control
const TEMPERATURE = 0.3; // Lower temperature for more consistent, focused responses

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);
  
  if (!userRequests || now > userRequests.resetTime) {
    // Reset or initialize counter
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  userRequests.count++;
  return false;
}

function getCacheKey(messages: any[]): string {
  // Create cache key from last user message (most recent question)
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMessage) return '';
  
  // Normalize the message for better cache hits
  return lastUserMessage.content.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

function getCachedResponse(key: string): string | null {
  if (!key) return null;
  
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  // Check if cache is still valid
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    responseCache.delete(key);
    return null;
  }
  
  return cached.response;
}

function setCachedResponse(key: string, response: string): void {
  if (!key || response.length < 10) return; // Don't cache very short responses
  
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
  
  // Clean up old cache entries (simple LRU)
  if (responseCache.size > 100) {
    const oldestKey = responseCache.keys().next().value;
    responseCache.delete(oldestKey);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Limit conversation history to reduce token usage
    const recentMessages = messages.slice(-6); // Keep only last 6 messages (3 exchanges)

    // Check cache for common questions
    const cacheKey = getCacheKey(recentMessages);
    const cachedResponse = getCachedResponse(cacheKey);
    
    if (cachedResponse) {
      // Return cached response as a stream-like format
      return new Response(
        `data: {"content":"${cachedResponse.replace(/"/g, '\\"')}"}\n\ndata: [DONE]\n\n`,
        {
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: recentMessages,
      maxTokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      system: `You are OneUpAI's AI assistant. Be concise and helpful.

OneUpAI creates AI-powered websites in under 5 minutes with:
- Ready-to-use copy, booking, and payments
- Starter ($47/mo), Professional ($97/mo), Enterprise plans
- 24/7 AI chat, Stripe payments, Google Calendar sync
- Templates for service businesses

Your role:
- Answer questions about OneUpAI's services, pricing, features
- Guide users to https://dashboard.oneupai.com/onboard
- Keep responses under 2-3 sentences
- Redirect off-topic questions back to OneUpAI benefits
- Be professional, friendly, and conversion-focused

Focus on: saving time, getting customers, professional results.`,
      onFinish: async (result) => {
        // Cache the response for future use
        if (result.text && cacheKey) {
          setCachedResponse(cacheKey, result.text);
        }
      },
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat API Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment or contact our support team.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}