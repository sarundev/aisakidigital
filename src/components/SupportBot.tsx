'use client';

import { useEffect, useRef, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

type BotMessage = { id: number; from: 'bot' | 'user'; text: string };

let _msgId = 0;
const nextId = () => ++_msgId;

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
    { id: nextId(), from: 'bot', text: "Hi! 👋 I'm AISAKIDIGITAL Bot. How can I help you today?" },
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
      setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text: 'Network error. Please try Telegram or Facebook directly! 🙏' }]);
    } finally {
      setTyping(false);
    }
  }

  function handleQuick(label: string) {
    setMessages((prev) => [...prev, { id: nextId(), from: 'user', text: label }]);
    sendToAI(label);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || typing) return;
    setInput('');
    setMessages((prev) => [...prev, { id: nextId(), from: 'user', text: trimmed }]);
    sendToAI(trimmed);
  }

  const showQuickReplies = messages.length <= 2;

  return (
    <>
      <style>{`
        @keyframes sb-slide-up {
          from { transform: translateY(20px) scale(0.96); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        @keyframes sb-msg-left {
          from { transform: translateX(-14px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes sb-msg-right {
          from { transform: translateX(14px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes sb-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0;   }
        }
        @keyframes sb-bounce-dot {
          0%, 60%, 100% { transform: translateY(0);    }
          30%           { transform: translateY(-6px); }
        }
        @keyframes sb-fade-up {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes sb-notif-pop {
          0%   { transform: scale(0);   }
          65%  { transform: scale(1.35);}
          100% { transform: scale(1);   }
        }
        @keyframes sb-header-flow {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes sb-online-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes sb-send-pop {
          0%   { transform: scale(1);   }
          40%  { transform: scale(0.88);}
          100% { transform: scale(1);   }
        }
      `}</style>

      {/* ── Chat panel ── */}
      <div
        className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-80 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 24px 64px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06)',
          transformOrigin: 'bottom right',
          maxHeight: open ? 500 : 0,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition:
            'max-height 0.38s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease, transform 0.38s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #15803d, #16a34a, #22c55e, #4ade80, #16a34a)',
            backgroundSize: '300% 300%',
            animation: 'sb-header-flow 5s ease infinite',
          }}
        >
          {/* Avatar */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shadow-inner shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
              <circle cx="8.5"  cy="12" r="1" fill="white" stroke="none" />
              <circle cx="12"   cy="12" r="1" fill="white" stroke="none" />
              <circle cx="15.5" cy="12" r="1" fill="white" stroke="none" />
            </svg>
            <span
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-green-700 bg-green-300"
              style={{ animation: 'sb-online-blink 2.4s ease infinite' }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight">Asaki Bot</p>
            <p className="text-[10px] text-white/75 mt-0.5">Always online · Replies instantly</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/80 transition-all duration-150 hover:bg-white/30 hover:scale-110 active:scale-90"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 300 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: `${msg.from === 'user' ? 'sb-msg-right' : 'sb-msg-left'} 0.28s ease forwards`,
              }}
            >
              {msg.from === 'bot' && (
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full mr-2 mt-0.5 shadow-sm"
                  style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                  </svg>
                </div>
              )}
              <div
                className="max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm"
                style={
                  msg.from === 'bot'
                    ? { background: '#f3f4f6', color: '#111827', borderBottomLeftRadius: 4 }
                    : {
                        background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                        color: '#fff',
                        borderBottomRightRadius: 4,
                        boxShadow: '0 2px 10px rgba(22,163,74,0.35)',
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div
              className="flex items-center gap-2"
              style={{ animation: 'sb-msg-left 0.28s ease forwards' }}
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-sm"
                style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                </svg>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-2xl bg-gray-100 px-4 py-3"
                style={{ borderBottomLeftRadius: 4 }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-2 w-2 rounded-full bg-gray-400"
                    style={{
                      animation: 'sb-bounce-dot 1.1s ease infinite',
                      animationDelay: `${i * 180}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuickReplies && !typing && (
            <div className="flex flex-col gap-1.5 pt-1">
              {QUICK_REPLIES.map((label, i) => (
                <button
                  key={label}
                  onClick={() => handleQuick(label)}
                  className="text-left text-xs font-medium rounded-xl px-3 py-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                  style={{
                    background: '#f0fdf4',
                    color: '#16a34a',
                    border: '1px solid #bbf7d0',
                    animation: 'sb-fade-up 0.3s ease forwards',
                    animationDelay: `${i * 55}ms`,
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#dcfce7';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(22,163,74,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f0fdf4';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Contact shortcuts */}
          {!showQuickReplies && !typing && (
            <div
              className="flex gap-2 pt-1"
              style={{ animation: 'sb-fade-up 0.3s ease forwards' }}
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  background: 'rgba(36,161,222,0.1)',
                  color: '#24A1DE',
                  border: '1px solid rgba(36,161,222,0.2)',
                }}
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
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  background: 'rgba(24,119,242,0.08)',
                  color: '#1877F2',
                  border: '1px solid rgba(24,119,242,0.2)',
                }}
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

        {/* ── Input ── */}
        <div className="shrink-0 px-3 py-3 border-t border-gray-100">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-green-200"
            style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
          >
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
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150 hover:scale-110 active:scale-90 disabled:opacity-50 disabled:pointer-events-none"
              style={{
                background:
                  input.trim() && !typing
                    ? 'linear-gradient(135deg,#16a34a,#22c55e)'
                    : '#e5e7eb',
                color: input.trim() && !typing ? '#fff' : '#9ca3af',
                boxShadow:
                  input.trim() && !typing
                    ? '0 2px 10px rgba(22,163,74,0.4)'
                    : 'none',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── FAB ── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40" style={{ width: 56, height: 56 }}>
        {/* Pulse rings */}
        {!open && visible && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-green-400"
              style={{ animation: 'sb-pulse-ring 2.2s ease-out infinite' }}
            />
            <span
              className="absolute inset-0 rounded-full bg-green-400"
              style={{ animation: 'sb-pulse-ring 2.2s ease-out infinite', animationDelay: '0.7s' }}
            />
          </>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: open
              ? '#fff'
              : 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            boxShadow: open
              ? '0 4px 20px rgba(0,0,0,0.1)'
              : '0 8px 30px rgba(22,163,74,0.5), 0 2px 8px rgba(0,0,0,0.08)',
            border: open ? '1.5px solid #e5e7eb' : 'none',
            transform: visible ? 'scale(1)' : 'scale(0)',
            transition:
              'transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275), background 0.25s ease, box-shadow 0.25s ease',
          }}
          aria-label="Chat support"
        >
          {/* Notification badge */}
          {!open && visible && (
            <span
              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-bold"
              style={{ animation: 'sb-notif-pop 0.45s cubic-bezier(0.175,0.885,0.32,1.275) forwards' }}
            >
              1
            </span>
          )}

          {/* Icon — rotates on toggle */}
          <span
            style={{
              transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
              transform: open ? 'rotate(90deg) scale(1)' : 'rotate(0deg) scale(1)',
              display: 'flex',
            }}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                <circle cx="8.5"  cy="12" r="1" fill="white" stroke="none" />
                <circle cx="12"   cy="12" r="1" fill="white" stroke="none" />
                <circle cx="15.5" cy="12" r="1" fill="white" stroke="none" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </>
  );
}
