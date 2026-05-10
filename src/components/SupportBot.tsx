'use client';

import { useEffect, useRef, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

type BotMessage = { from: 'bot' | 'user'; text: string };

const QUICK_REPLIES = [
  '📦 Services available',
  '💰 How is pricing?',
  '🛡️ What is warranty?',
  '⚡ How fast is delivery?',
  '📞 Talk to a human',
];

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    { from: 'bot', text: "Hi! 👋 I'm AISAKIDIGITAL Bot. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  async function sendToAI(userText: string) {
    historyRef.current = [...historyRef.current, { role: 'user', content: userText }];
    setTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current }),
      });
      const data = await res.json() as { reply: string };
      const reply = data.reply ?? 'Sorry, something went wrong. Please try again.';
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Network error. Please try Telegram or Facebook directly! 🙏' }]);
    } finally {
      setTyping(false);
    }
  }

  function handleQuick(label: string) {
    setMessages((prev) => [...prev, { from: 'user', text: label }]);
    sendToAI(label);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    setInput('');
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    sendToAI(trimmed);
  }

  const showQuickReplies = messages.length <= 2;

  return (
    <>
      {/* Chat panel */}
      <div
        className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-80 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)',
          maxHeight: open ? 480 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.25s ease',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
              <circle cx="8.5" cy="12" r="1" fill="white" stroke="none" />
              <circle cx="12" cy="12" r="1" fill="white" stroke="none" />
              <circle cx="15.5" cy="12" r="1" fill="white" stroke="none" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 rounded-full border-2 border-green-600 bg-green-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white leading-tight">Asaki Bot</p>
            <p className="text-[10px] text-white/70">Always online · Replies instantly</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-white/25 transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 280 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'bot' && (
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full mr-2 mt-0.5"
                  style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                  </svg>
                </div>
              )}
              <div
                className="max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                style={
                  msg.from === 'bot'
                    ? { background: '#f3f4f6', color: '#111827', borderBottomLeftRadius: 4 }
                    : { background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: '#fff', borderBottomRightRadius: 4 }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                </svg>
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3" style={{ borderBottomLeftRadius: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuickReplies && !typing && (
            <div className="flex flex-col gap-1.5 pt-1">
              {QUICK_REPLIES.map((label) => (
                <button
                  key={label}
                  onClick={() => handleQuick(label)}
                  className="text-left text-xs font-medium rounded-xl px-3 py-2 transition-colors duration-150"
                  style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#dcfce7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Contact shortcuts */}
          {!showQuickReplies && !typing && (
            <div className="flex gap-2 pt-1">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                style={{ background: 'rgba(36,161,222,0.1)', color: '#24A1DE', border: '1px solid rgba(36,161,222,0.2)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#24A1DE">
                  <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" />
                </svg>
                Telegram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold"
                style={{ background: 'rgba(24,119,242,0.08)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.2)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="shrink-0 px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <input
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150"
              style={{
                background: input.trim() && !typing ? 'linear-gradient(135deg,#16a34a,#22c55e)' : '#e5e7eb',
                color: input.trim() && !typing ? '#fff' : '#9ca3af',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300"
        style={{
          background: open ? '#fff' : 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.1)'
            : '0 8px 28px rgba(22,163,74,0.45), 0 2px 8px rgba(0,0,0,0.1)',
          transform: visible ? 'scale(1)' : 'scale(0)',
          border: open ? '1px solid #e5e7eb' : 'none',
        }}
        aria-label="Chat support"
      >
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold">
            1
          </span>
        )}
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
            <circle cx="8.5" cy="12" r="1" fill="white" stroke="none" />
            <circle cx="12" cy="12" r="1" fill="white" stroke="none" />
            <circle cx="15.5" cy="12" r="1" fill="white" stroke="none" />
          </svg>
        )}
      </button>
    </>
  );
}
