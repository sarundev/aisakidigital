'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
interface Project {
  id: number;
  project_name: string;
  project_project: string | null;
  project_warranty: string | null;
  project_price: string | null;
  is_featured: boolean;
  sort_order: number;
}

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

/* ─── Contact Modal ──────────────────────────────────────────────────────── */

function ContactModal({ product, onClose }: { product: Project; onClose: () => void }) {
  const [customerTelegram, setCustomerTelegram] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 10);
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end sm:flex-row sm:items-center sm:justify-center p-0 sm:p-4"
      style={{
        background: show ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 sm:p-8"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(57,255,20,0.18)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(57,255,20,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center mb-5 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: '#e0e0e0' }} />
        </div>

        {/* Top green accent line — desktop only */}
        <div
          className="hidden sm:block absolute top-0 left-8 right-8 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }}
        />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200"
          style={{ color: '#aaa', background: '#f5f5f5' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ebebeb'; e.currentTarget.style.color = '#333'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#aaa'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a7a05" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>Get Quote</p>
            <h3 className="text-lg font-extrabold leading-tight" style={{ color: '#111111' }}>{product.project_name}</h3>
          </div>
        </div>

        {product.project_price && (
          <div
            className="mb-5 flex items-baseline gap-1 rounded-xl px-4 py-3"
            style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.12)' }}
          >
            <span className="text-3xl font-black" style={{ color: '#1a7a05' }}>{product.project_price}</span>
            {product.project_warranty && (
              <span className="text-sm" style={{ color: '#888' }}>· {product.project_warranty} warranty</span>
            )}
          </div>
        )}

        {/* Telegram username input */}
        {/* <div className="mb-5">
          <label className="mb-1.5 block text-xs font-semibold" style={{ color: '#555' }}>
            Telegram របស់អ្នក <span style={{ color: '#bbb', fontWeight: 400 }}>(optional)</span>
          </label>
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{ border: '1.5px solid rgba(57,255,20,0.25)', background: 'rgba(57,255,20,0.03)' }}
          >
            <span className="text-sm font-bold shrink-0" style={{ color: '#39FF14' }}>@</span>
            <input
              type="text"
              placeholder="your_username"
              value={customerTelegram}
              onChange={(e) => setCustomerTelegram(e.target.value.replace('@', ''))}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#111', caretColor: '#39FF14' }}
            />
          </div>
        </div> */}

        <p className="mb-4 text-sm leading-relaxed" style={{ color: '#777' }}>
          Choose your preferred platform and we&apos;ll get back to you right away.
        </p>

        <div className="flex flex-col gap-2.5">
          {/* Telegram — auto-sends order notification then opens chat */}
          <button
            className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-200 text-left"
            style={{ background: 'rgba(36,161,222,0.07)', border: '1px solid rgba(36,161,222,0.2)', color: '#111111' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(36,161,222,0.13)';
              e.currentTarget.style.borderColor = 'rgba(36,161,222,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(36,161,222,0.07)';
              e.currentTarget.style.borderColor = 'rgba(36,161,222,0.2)';
            }}
            onClick={() => {
              fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productName: product.project_name, productPrice: product.project_price, customerTelegram }),
              }).catch(() => {});
              window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#24A1DE" />
              <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" />
            </svg>
            <div className="flex-1">
              <div className="text-sm font-bold">Telegram</div>
              <div className="text-xs" style={{ color: '#888' }}>Message us instantly</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.35 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Facebook — regular link */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-200"
            style={{ background: 'rgba(24,119,242,0.07)', border: '1px solid rgba(24,119,242,0.2)', color: '#111111' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(24,119,242,0.13)';
              e.currentTarget.style.borderColor = 'rgba(24,119,242,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(24,119,242,0.07)';
              e.currentTarget.style.borderColor = 'rgba(24,119,242,0.2)';
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#1877F2" />
              <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
            </svg>
            <div className="flex-1">
              <div className="text-sm font-bold">Facebook</div>
              <div className="text-xs" style={{ color: '#888' }}>Message us on Facebook</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.35 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div
      className="animate-pulse flex items-center gap-4 rounded-2xl px-5 py-4"
      style={{ background: '#ffffff', border: '1px solid #eaecef' }}
    >
      <div className="shrink-0 h-12 w-12 rounded-xl" style={{ background: '#efefef' }} />
      <div className="flex-1 min-w-0">
        <div className="mb-2 h-4 w-40 rounded-md" style={{ background: '#efefef' }} />
        <div className="flex gap-2">
          <div className="h-3.5 w-16 rounded-md" style={{ background: '#f5f5f5' }} />
          <div className="h-3.5 w-24 rounded-md" style={{ background: '#f5f5f5' }} />
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
        <div className="h-3 w-8 rounded-md" style={{ background: '#f5f5f5' }} />
        <div className="h-7 w-20 rounded-md" style={{ background: '#efefef' }} />
      </div>
      <div className="shrink-0 w-px h-8 hidden sm:block" style={{ background: '#eaecef' }} />
      <div className="shrink-0 h-9 w-28 rounded-xl" style={{ background: '#efefef' }} />
    </div>
  );
}

/* ─── Category Icon ─────────────────────────────────────────────────────── */

function CategoryIcon({ category }: { category: string }) {
  const cat = (category ?? '').trim().toLowerCase();

  if (cat === 'facebook') return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
    </svg>
  );

  if (cat === 'tiktok') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#010101" />
      <path d="M16.5 7.2c-.7-.8-1.1-1.9-1.1-3h-2.1v9.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8.8-1.8 1.8-1.8c.2 0 .4 0 .6.1V9.9c-.2 0-.4-.1-.6-.1-2.2 0-3.9 1.8-3.9 3.9s1.7 3.9 3.9 3.9 3.9-1.8 3.9-3.9V10c.8.6 1.7.9 2.7.9V8.8c-.6 0-1.1-.2-1.6-.6v-1z" fill="white" />
    </svg>
  );

  if (cat === 'instagram') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="16.2" cy="7.8" r="0.8" fill="white" />
    </svg>
  );

  if (cat === 'telegram') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#24A1DE" />
      <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" />
    </svg>
  );

  if (cat === 'youtube') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M19.6 8.2a2 2 0 0 0-1.4-1.4C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.2.3A2 2 0 0 0 4.4 8.2 20 20 0 0 0 4.1 12a20 20 0 0 0 .3 3.8 2 2 0 0 0 1.4 1.4c1.3.3 6.2.3 6.2.3s4.9 0 6.2-.3a2 2 0 0 0 1.4-1.4 20 20 0 0 0 .3-3.8 20 20 0 0 0-.3-3.8z" fill="white" />
      <polygon points="10,15 15,12 10,9" fill="#FF0000" />
    </svg>
  );

  if (cat === 'twitter' || cat === 'x') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path d="M17.5 4h2.5l-5.6 6.3L21 20h-5.1l-3.7-4.8L7.8 20H5.3l5.9-6.7L4 4h5.2l3.4 4.4L17.5 4zm-.9 14.4h1.4L7.5 5.4H6L16.6 18.4z" fill="white" />
    </svg>
  );

  if (cat === 'whatsapp') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4C7 8 6.4 8.6 6.4 9.9c0 1.3.9 2.6 1 2.8.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.4.5.6.2 1.1.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z" fill="white" />
    </svg>
  );

  if (cat === 'linkedin') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path d="M7.2 9.8H5V19h2.2V9.8zM6.1 8.9a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zM19 13.5c0-2-.4-3.7-2.9-3.7-1.2 0-2 .7-2.3 1.3h-.1V9.8H11.6V19h2.2v-4.6c0-1 .2-1.9 1.4-1.9 1.2 0 1.2 1.1 1.2 2V19H19v-5.5z" fill="white" />
    </svg>
  );

  /* default — generic project icon */
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────────── */

function ProductCard({ product }: { product: Project }) {
  const [modal, setModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200"
        style={{
          background: '#ffffff',
          border: `1px solid ${hovered ? 'rgba(57,255,20,0.4)' : '#eaecef'}`,
          boxShadow: hovered
            ? '0 8px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(57,255,20,0.1)'
            : '0 1px 4px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Platform icon */}
        <div
          className="shrink-0 relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200"
          style={{
            background: hovered ? 'rgba(57,255,20,0.07)' : '#f4f5f7',
            border: `1px solid ${hovered ? 'rgba(57,255,20,0.25)' : '#e8eaed'}`,
          }}
        >
          <CategoryIcon category={product.project_project ?? ''} />
          {product.is_featured && (
            <span
              className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: '#39FF14', boxShadow: '0 2px 8px rgba(57,255,20,0.6)' }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#000">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-[20px] text-nowrap  font-bold tracking-tight" style={{ color: '#0d0d0d' }}>
              {product.project_name}
            </h3>
            {product.project_project?.trim() && (
              <span
                className="rounded-md px-2 bg-green-500 text-white py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                
              >
                {product.project_project.trim()}
              </span>
            )}
            {product.is_featured && (
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: 'rgba(57,255,20,0.08)', color: '#1a7a05' }}
              >
                ★ Featured
              </span>
            )}
          </div>
          {product.project_warranty && (
            <div className="flex items-center gap-1 text-green-800" >
            
              <span className="text-md">warranty <br /> {product.project_warranty} </span>
            </div>
          )}
        </div>

        {/* Price — hidden on very small screens */}
        <div className="shrink-0 text-right hidden sm:block">
          <p className="text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#c4c8d0' }}>Price</p>
          <p className="text-2xl font-black leading-none" style={{ color: '#1a7a05', letterSpacing: '-0.03em' }}>
            {product.project_price ?? '—'}
          </p>
        </div>

        {/* Price inline on mobile */}
       

        {/* Divider */}
        <div className="hidden sm:block w-px h-9 shrink-0" style={{ background: '#eaecef' }} />
        <div className="relative">

        
        <p className="sm:hidden ml-2 p-2 shrink-0 text-[25px] font-black leading-none" style={{ color: '#1a7a05', letterSpacing: '-0.03em' }}>
          {product.project_price ?? '—'}
        </p>
        {/* CTA */}
        <button
          onClick={() => setModal(true)}
          className="shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, #39FF14 0%, #2ee60f 100%)'
              : 'rgba(57,255,20,0.1)',
            color: hovered ? '#000' : '#1a7a05',
            boxShadow: hovered ? '0 4px 18px rgba(57,255,20,0.45)' : 'none',
            transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
          }}
        >
          <span className="hidden sm:inline">SUBCRIBE</span>
          <span className="sm:hidden text-lg">SUBCRIBE</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        </div>
      </div>

      {modal && <ContactModal product={product} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ProductPage() {
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8001/api/v1';
    const url  = `${base}/projects`;

    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const displayList = loading ? [] : products;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#f7f8fa' }}>

        {/* ── Fixed header bar ── */}
        <div
          className="fixed left-0 right-0 pt-4 h-36 top-16.5 z-30"
          style={{
            background: 'rgba(247,248,250,0.92)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #eaecef',
            boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
          }}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-5 sm:py-7 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#39FF14', animationDuration: '2.5s' }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#39FF14' }} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#9aa0ac' }}>
                Asaki Digital — Services
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-khmer), sans-serif', color: '#0d0d0d' }}
            >
              តារា​តម្លៃ Social Media{' '}
              <span style={{ background: 'linear-gradient(135deg, #1a7a05 0%, #39FF14 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ល្អៗ Build ថ្មីៗ
              </span>
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#9aa0ac', fontFamily: 'var(--font-khmer), sans-serif' }}>
              មានសេវាកម្មល្អៗប្រចាំខែ សម្រាប់បងៗអាជីវកម្មគ្រប់ប្រភេទ
            </p>
          </div>
        </div>

        {/* ── Cards Section ── */}
        <section className="px-4 sm:px-6 pb-28 pt-58 sm:pt-56 md:pt-64">
          <div className="mx-auto max-w-4xl">
            {loading ? (
              <div className="flex flex-col gap-3 ">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : displayList.length === 0 ? (
              <div
                className="py-24 text-center rounded-2xl"
                style={{ background: '#ffffff', border: '1px solid #eaecef' }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.12)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: '#c4c8d0' }}>No services found.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {displayList.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
