'use client';

import { useEffect } from 'react';

export default function SupporterPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8"
        style={{
          background: 'rgba(6,20,8,0.98)',
          border: '1.5px solid rgba(57,255,20,0.35)',
          boxShadow: '0 0 60px rgba(57,255,20,0.12), 0 24px 60px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          style={{ color: '#666', background: 'rgba(255,255,255,0.05)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: '#39FF14' }}>Support Us</p>
        <h3 className="mb-2 text-xl font-bold" style={{ color: '#ffffff' }}>Become a Supporter</h3>
        <p className="mb-7 text-sm" style={{ color: '#7a9a7a' }}>
          Your support helps us create amazing digital experiences. Choose how you'd like to contribute.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://www.buymeacoffee.com/aisakidigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(255,123,98,0.12)', border: '1px solid rgba(255,123,98,0.3)', color: '#ffffff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,123,98,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,123,98,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,123,98,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,123,98,0.3)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#FF7B62" />
              <path d="M7 10h10v4H7z" fill="white"/>
              <path d="M9 8v2h6V8" fill="white"/>
            </svg>
            <div>
              <div className="text-sm font-bold">Buy Me a Coffee</div>
              <div className="text-xs" style={{ color: '#ffb8a8' }}>One-time support</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-50">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="https://patreon.com/aisakidigital"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(255,66,77,0.12)', border: '1px solid rgba(255,66,77,0.3)', color: '#ffffff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,66,77,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,66,77,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,66,77,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,66,77,0.3)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#FF424D" />
              <path d="M8 8h8v8H8z" fill="white"/>
            </svg>
            <div>
              <div className="text-sm font-bold">Patreon</div>
              <div className="text-xs" style={{ color: '#ff9da2' }}>Monthly support</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-50">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}