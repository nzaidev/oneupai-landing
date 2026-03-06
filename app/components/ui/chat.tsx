"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

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
    onFinish: () => setShowSuggestions(false),
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!mounted) return null;

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    }, 100);
    setShowSuggestions(false);
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 bottom-20 md:right-8 md:bottom-24 lg:right-[59px] lg:bottom-[120px] z-50 w-[90vw] md:w-[450px] lg:w-[500px] h-[600px] md:h-[650px] bg-white rounded-[20px] flex flex-col overflow-hidden"
            style={{
              transformOrigin: "bottom right",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={cn("flex", message.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[18px] px-4 py-3 text-sm leading-relaxed ff-Graphik",
                      message.role === 'user'
                        ? 'border border-[#1a80e7] bg-[#1a80e7] text-white rounded-br-[4px]'
                        : 'bg-[#2AA8D71A] border border-[#0000001A] bg-[#f1f5f9] text-[#1E293B] rounded-bl-[4px]'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Suggested Questions */}
              <AnimatePresence>
                {showSuggestions && !hasUserMessages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="space-y-2 pt-1"
                  >
                    <p className="ff-jakarta font-semibold text-[#1a80e7] text-xs uppercase tracking-wide px-1">
                      Suggested questions
                    </p>
                    {suggestedQuestions.map((question, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.055, duration: 0.22, ease: "easeOut" }}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="block w-full text-left ff-Graphik font-normal text-xs bg-white hover:bg-[#2AA8D71A] text-[#1E293B] rounded-[20px] px-4 py-3 transition-colors border border-[#0000001A] hover:border-[#1a80e7]/30 hover:shadow-sm"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated typing dots */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                   {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#2AA8D71A] text-[#1E293B] rounded-[20px] px-4 py-3 ff-Graphik font-normal text-sm flex items-center gap-2 border border-[#0000001A]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1a80e7]" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-red-50 text-red-600 rounded-[18px] rounded-bl-[4px] px-4 py-3 text-sm ff-Graphik border border-red-100">
                      Sorry, I'm having trouble connecting. Please try again.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle Button ── */}
      <motion.button
        onClick={toggleChat}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-4 bottom-4 md:right-8 md:bottom-8 lg:right-[59px] lg:bottom-[59px] z-50 w-14 h-14 bg-[#1570d0] rounded-full flex items-center justify-center transition-colors duration-200"
        style={{ boxShadow: "0 4px 20px rgba(26,128,231,0.4), 0 1px 6px rgba(0,0,0,0.1)" }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex"
            >
              <X className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="icon"
              initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex"
            >
              <img src="/favicon.png" alt="Chat" className="w-6 h-6 object-contain" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse notification dot */}
        <AnimatePresence>
          {!isOpen && !hasUserMessages && (
            <motion.span
              key="dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 flex items-center justify-center"
            >
              <span className="absolute inset-0 rounded-full bg-[#00C48C] animate-ping opacity-50" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#00C48C] border-2 border-white block" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}