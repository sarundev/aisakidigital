'use client';

import { useEffect, useRef, useState } from 'react';

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

type BotMessage = { id: number; from: 'bot' | 'user'; text: string };

let _msgId = 0;
const nextId = () => ++_msgId;

const QUICK_REPLIES = [
  { icon: '📦', label: 'Services', desc: 'What we offer' },
  { icon: '💰', label: 'Pricing', desc: 'Best rates' },
  { icon: '🛡️', label: 'Warranty', desc: 'Our guarantee' },
  { icon: '⚡', label: 'Delivery', desc: 'Fast shipping' },
  { icon: '📞', label: 'Support', desc: 'Talk to us' },
];

const BRAND = {
  primary: '#39FF14',
  dark: '#0a0f0a',
  green: '#22c55e',
  greenDark: '#16a34a',
  greenLight: '#4ade80',
};

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    { id: nextId(), from: 'bot', text: "Hi there! 👋 I'm AISAKI Digital assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
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
      const reply = data.reply ?? 'Thank you for your message! Our team will get back to you shortly. For urgent matters, please contact us on Telegram or Facebook.';
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { id: nextId(), from: 'bot', text: 'Connection issue. Please reach us directly on Telegram or Facebook!' }]);
    } finally {
      setTyping(false);
    }
  }

  function handleQuick(item: typeof QUICK_REPLIES[0]) {
    setMessages((prev) => [...prev, { id: nextId(), from: 'user', text: item.label }]);
    sendToAI(item.label);
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
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }
        @keyframes sb-msg-left {
          from { transform: translateX(-12px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes sb-msg-right {
          from { transform: translateX(12px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes sb-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0;   }
        }
        @keyframes sb-bounce-dot {
          0%, 60%, 100% { transform: translateY(0);    }
          30%           { transform: translateY(-5px); }
        }
        @keyframes sb-fade-up {
          from { transform: translateY(6px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes sb-notif-pop {
          0%   { transform: scale(0);   }
          70%  { transform: scale(1.2);}
          100% { transform: scale(1);   }
        }
        @keyframes sb-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes sb-online-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes sb-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
      `}</style>

      {/* ── Background overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Chat panel ── */}
      <div
        className="fixed bottom-26 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[370px] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: '#0d0f0d',
          border: '1px solid rgba(57,255,20,0.15)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(57,255,20,0.08)',
          transformOrigin: 'bottom right',
          maxHeight: open ? 580 : 0,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'max-height 0.4s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease, transform 0.4s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-5 py-4 shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(57,255,20,0.12) 0%, rgba(57,255,20,0.06) 100%)',
            borderBottom: '1px solid rgba(57,255,20,0.1)',
          }}
        >
          {/* Avatar */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full shrink-0" style={{ background: 'rgba(57,255,20,0.15)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
              <circle cx="8.5"  cy="12" r="1" fill={BRAND.primary} stroke="none" />
              <circle cx="12"   cy="12" r="1" fill={BRAND.primary} stroke="none" />
              <circle cx="15.5" cy="12" r="1" fill={BRAND.primary} stroke="none" />
            </svg>
            <span
              className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center h-3.5 w-3.5 rounded-full"
              style={{ background: BRAND.primary, animation: 'sb-online-pulse 2s ease infinite' }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill={BRAND.dark}>
                <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
              </svg>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: '#fff' }}>Aisaki Support</p>
            <p className="text-[11px] mt-0.5" style={{ color: BRAND.primary }}>● Online now</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 hover:scale-110 active:scale-90"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ maxHeight: 340, background: 'rgba(0,0,0,0.3)' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: `${msg.from === 'user' ? 'sb-msg-right' : 'sb-msg-left'} 0.3s ease forwards`,
              }}
            >
              {msg.from === 'bot' && (
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mr-2 mt-1"
                  style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(57,255,20,0.08))', border: '1px solid rgba(57,255,20,0.25)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                  </svg>
                </div>
              )}
              <div
                className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  msg.from === 'bot'
                    ? { background: 'rgba(57,255,20,0.08)', color: '#e8e8e8', border: '1px solid rgba(57,255,20,0.12)', borderBottomLeftRadius: 6 }
                    : {
                        background: 'linear-gradient(135deg, #39FF14, #22c55e)',
                        color: '#0a0f0a',
                        borderBottomRightRadius: 6,
                        boxShadow: '0 4px 16px rgba(57,255,20,0.3)',
                        fontWeight: 500,
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
              style={{ animation: 'sb-msg-left 0.3s ease forwards' }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full mr-2 mt-1"
                style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.2), rgba(57,255,20,0.08))', border: '1px solid rgba(57,255,20,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl px-4 py-3" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.12)', borderBottomLeftRadius: 6 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-2 w-2 rounded-full"
                    style={{ background: BRAND.primary, animation: 'sb-bounce-dot 1.2s ease infinite', animationDelay: `${i * 150}ms`, opacity: 0.6 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuickReplies && !typing && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {QUICK_REPLIES.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => handleQuick(item)}
                  className="text-left rounded-xl px-4 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                  style={{
                    background: 'rgba(57,255,20,0.05)',
                    border: '1px solid rgba(57,255,20,0.15)',
                    animation: 'sb-fade-up 0.35s ease forwards',
                    animationDelay: `${i * 60}ms`,
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(57,255,20,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(57,255,20,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.15)';
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: '#fff' }}>{item.label}</span>
                  </div>
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Contact shortcuts */}
          {!showQuickReplies && !typing && (
            <div
              className="flex gap-2 pt-2"
              style={{ animation: 'sb-fade-up 0.3s ease forwards' }}
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: 'rgba(36,161,222,0.12)',
                  color: '#24A1DE',
                  border: '1px solid rgba(36,161,222,0.25)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.12)'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#24A1DE">
                  <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" />
                </svg>
                Telegram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: 'rgba(24,119,242,0.1)',
                  color: '#1877F2',
                  border: '1px solid rgba(24,119,242,0.2)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.1)'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input ── */}
        <div className="shrink-0 px-4 py-3" style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(57,255,20,0.1)' }}>
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && input.trim() && !typing) handleSend(); }}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#fff', caretColor: BRAND.primary }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="flex items-center justify-center rounded-xl transition-all duration-150 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
              style={{
                background: input.trim() && !typing ? BRAND.primary : 'rgba(255,255,255,0.08)',
                color: input.trim() && !typing ? BRAND.dark : 'rgba(255,255,255,0.3)',
                padding: '8px 14px',
                boxShadow: input.trim() && !typing ? '0 2px 12px rgba(57,255,20,0.4)' : 'none',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              className="absolute inset-0 rounded-full"
              style={{ background: BRAND.primary, animation: 'sb-pulse-ring 2s ease-out infinite' }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: BRAND.primary, animation: 'sb-pulse-ring 2s ease-out infinite', animationDelay: '0.6s' }}
            />
          </>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: open
              ? '#1a1a1a'
              : `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.green} 100%)`,
            boxShadow: open
              ? '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              : `0 8px 30px rgba(57,255,20,0.45), 0 2px 10px rgba(0,0,0,0.1)`,
            border: open ? '1px solid rgba(57,255,20,0.15)' : 'none',
            transform: visible ? 'scale(1)' : 'scale(0)',
            transition: 'transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), background 0.25s ease, box-shadow 0.25s ease',
          }}
          aria-label="Chat support"
        >
          {/* Notification badge */}
          {!open && visible && (
            <span
              className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-bold"
              style={{ 
                background: BRAND.primary, 
                color: BRAND.dark, 
                width: 18, 
                height: 18,
                animation: 'sb-notif-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards' 
              }}
            >
              !
            </span>
          )}

          {/* Icon — rotates and morphs on toggle */}
          <span
            style={{
              transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              display: 'flex',
            }}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND.dark} strokeWidth="2.2">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-5.35-1.56L2 22l1.56-4.65A9.96 9.96 0 0 1 2 12 10 10 0 0 1 12 2z" />
                <circle cx="8.5"  cy="12" r="1" fill={BRAND.dark} stroke="none" />
                <circle cx="12"   cy="12" r="1" fill={BRAND.dark} stroke="none" />
                <circle cx="15.5" cy="12" r="1" fill={BRAND.dark} stroke="none" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </>
  );
}