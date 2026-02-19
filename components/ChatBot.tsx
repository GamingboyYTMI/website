
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hey! I'm the Hoora Assistant. Need help choosing a wash for your ride in Ranchi? ✨" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await getGeminiResponse([...messages, userMsg]);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[380px] sm:w-[420px] h-[550px] rounded-[2.5rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-orange-900/50">
                <span className="text-white font-black text-xl">H</span>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest">Hoora Ranchi</p>
                <p className="text-[10px] text-orange-500 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                  AI Consultant
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-semibold leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-200' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-100 shrink-0 bg-white">
            <div className="flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Hoora anything..."
                className="flex-grow p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-orange-600 focus:bg-white transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-orange-600 text-white p-4 rounded-2xl hover:bg-slate-900 transition-all disabled:opacity-50 shadow-xl shadow-orange-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[9px] text-center font-black text-slate-300 uppercase tracking-widest mt-4">Verified Ranchi AI</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-18 h-18 sm:w-20 sm:h-20 bg-orange-600 rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300 active:scale-95 group relative border-4 border-white"
        >
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white">
            1
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
