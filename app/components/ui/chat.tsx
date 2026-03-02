"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from './button';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const suggestedQuestions = [
  "How does OneUpAI work?",
  "What's included in the pricing plans?",
  "How long does it take to build a website?",
  "Do you offer booking and payment features?",
  "Can I customize my website design?"
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm here to help you learn about OneUpAI. Ask me anything about our AI website builder, pricing, or how we can help grow your business! 🚀"
      }
    ],
    onFinish: () => {
      setShowSuggestions(false);
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!mounted) return null;

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSuggestedQuestion = (question: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    
    // Set the input value and submit
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      handleSubmit(syntheticEvent);
    }, 100);
    setShowSuggestions(false);
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <>
      {/* Chat Toggle Button - Matching landing page button style */}
      <button
        onClick={toggleChat}
        className="fixed right-4 bottom-4 md:right-8 md:bottom-8 lg:right-[59px] lg:bottom-[59px] z-50 hover:scale-110 transition-all duration-200 bg-[#1a80e7] text-[#F8FAFC] rounded-full p-3 md:p-4 shadow-lg hover:bg-[#1570d0] hover:shadow-xl border border-[#1a80e7] hover:border-[#1570d0]"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7" />
        ) : (
          <img 
            src="/favicon.png" 
            alt="Chat with OneUpAI" 
            className="w-6 h-6 md:w-7 md:h-7 object-contain"
          />
        )}
        
        {/* Notification dot for new users */}
        {!isOpen && !hasUserMessages && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1a80e7] rounded-full animate-pulse border-2 border-white"></div>
        )}
      </button>

      {/* Chat Window - Matching card design system */}
      {isOpen && (
        <div className="fixed right-4 bottom-20 md:right-8 md:bottom-24 lg:right-[59px] lg:bottom-[120px] z-40 w-[90vw] md:w-[450px] lg:w-[500px] h-[600px] md:h-[650px] bg-white rounded-[20px] shadow-[2px_4px_20px_0px_rgba(0,0,0,0.10)] border-0 flex flex-col overflow-hidden animate-fade-up">
          {/* Header - Matching section header style */}
          <div className="bg-[#2AA8D71A] px-6 py-4 rounded-t-[20px] border-b border-[#0000001A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
                  <img 
                    src="/favicon.png" 
                    alt="OneUpAI" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="ff-jakarta font-bold text-[#0e0e0f] text-sm">
                    OneUpAI Assistant
                  </h3>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-[#1E293B] hover:text-[#1a80e7] transition-colors p-1 hover:bg-white/50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages - Matching content spacing */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-[20px] px-4 py-3 ff-Graphik font-normal text-sm leading-relaxed",
                    message.role === 'user'
                      ? 'bg-[#1a80e7] text-[#F8FAFC] border border-[#1a80e7]'
                      : 'bg-[#2AA8D71A] text-[#1E293B] border border-[#0000001A]'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Suggested Questions - Matching badge style */}
            {showSuggestions && !hasUserMessages && (
              <div className="space-y-3">
                <p className="ff-jakarta font-semibold text-[#1a80e7] text-xs uppercase tracking-wide">
                  Suggested questions:
                </p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left ff-Graphik font-normal text-xs bg-white hover:bg-[#2AA8D71A] text-[#1E293B] rounded-[20px] px-4 py-3 transition-colors border border-[#0000001A] hover:border-[#1a80e7]/30 hover:shadow-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#2AA8D71A] text-[#1E293B] rounded-[20px] px-4 py-3 ff-Graphik font-normal text-sm flex items-center gap-2 border border-[#0000001A]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1a80e7]" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 text-red-700 rounded-[20px] px-4 py-3 ff-Graphik font-normal text-sm border border-red-200">
                  Sorry, I'm having trouble connecting. Please try again in a moment.
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Matching form input style */}
          <div className="p-6 border-t border-[#0000001A] bg-[#2AA8D71A]/30">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about OneUpAI..."
                className="flex-1 px-4 py-3 border border-[#0000001A] rounded-full ff-Graphik font-normal text-sm focus:outline-none focus:ring-2 focus:ring-[#1a80e7] focus:border-[#1a80e7] bg-white text-[#1E293B] placeholder:text-[#1E293B]/60"
                disabled={isLoading}
                maxLength={500}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !input.trim()}
                variant="primary"
                className="rounded-full min-w-[48px] h-[48px] px-4 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="ff-Graphik font-normal text-[#1E293B]/60 text-xs mt-3 text-center">
              Powered by OneUpAI • Responses may vary
            </p>
          </div>
        </div>
      )}
    </>
  );
}