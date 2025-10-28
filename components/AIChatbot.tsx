
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ChatBubbleIcon, SendIcon, CloseIcon, SparklesIcon } from './icons';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Sukjai, your friendly travel assistant. How can I help you explore Thailand today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    const response = await getChatbotResponse(messages, userInput);
    const newModelMessage: ChatMessage = { role: 'model', text: response };
    setMessages(prev => [...prev, newModelMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <div className={`fixed bottom-24 right-4 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 invisible' : 'opacity-100 scale-100 visible'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Open Chat"
        >
          <ChatBubbleIcon className="h-8 w-8" />
        </button>
      </div>

      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-96 h-[70vh] max-h-[600px] z-50 bg-white rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform translate-y-[110%]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-secondary rounded-t-2xl text-white">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-6 w-6 text-accent"/>
            <h3 className="text-lg font-bold">Sukjai Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-light">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">AI</div>}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-dark rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">AI</div>
                    <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-white text-dark rounded-bl-none shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about your trip..."
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-primary focus:border-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="bg-primary text-white rounded-full p-3 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
              aria-label="Send message"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
