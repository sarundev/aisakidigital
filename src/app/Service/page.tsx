'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SupportBot from '@/components/SupportBot';

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
      className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4"
      style={{
      
        backdropFilter: 'blur(12px)',
        transition: 'background 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: '#0d1117',
          border: '1px solid rgba(57,255,20,0.2)',
          boxShadow: '0 -8px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(57,255,20,0.08) inset',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon top line */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #39FF14 40%, #39FF14 60%, transparent)' }} />

        <div className="p-6 sm:p-7">
          {/* Drag handle — mobile */}
          <div className="flex justify-center mb-5 sm:hidden">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#39FF14' }}>
              Get a Quote
            </p>
            <h3 className="text-xl font-black text-white leading-tight">{product.project_name}</h3>
          </div>

          {/* Price */}
          {product.project_price && (
            <div
              className="mb-5 flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: 'rgba(57,255,20,0.06)',
                border: '1px solid rgba(57,255,20,0.15)',
              }}
            >
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Monthly price</p>
                <p className="text-3xl font-black" style={{ color: '#39FF14', letterSpacing: '-0.03em' }}>
                  {product.project_price}
                </p>
              </div>
              {product.project_warranty && (
                <div className="ml-auto text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Warranty</p>
                  <p className="text-sm font-semibold text-gray-300">{product.project_warranty}</p>
                </div>
              )}
            </div>
          )}

          <p className="mb-5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Choose your preferred platform — we&apos;ll get back to you right away.
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-150"
              style={{ background: 'rgba(36,161,222,0.1)', border: '1px solid rgba(36,161,222,0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.18)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.1)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.2)'; }}
              onClick={() => {
                fetch('/api/telegram', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ productName: product.project_name, productPrice: product.project_price }),
                }).catch(() => {});
                window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#24A1DE" />
                <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Telegram</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Message us instantly</div>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-150"
              style={{ background: 'rgba(24,119,242,0.1)', border: '1px solid rgba(24,119,242,0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.18)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.1)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.2)'; }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#1877F2" />
                <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
              </svg>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Facebook</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Message us on Facebook</div>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Category Icon ─────────────────────────────────────────────────────── */

function CategoryIcon({ category }: { category: string }) {
  const cat = (category ?? '').trim().toLowerCase();

  if (cat === 'facebook') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
        <radialGradient id="ig2" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" /><stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" /><stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig2)" />
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
      <rect width="24" height="24" rx="6" fill="#000" />
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
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  );
}

/* ─── Skeleton ───────────────────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div
      className="animate-pulse flex items-center gap-4 rounded-2xl px-5 py-4 bg-white"
      style={{ border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="shrink-0 h-12 w-12 rounded-xl bg-gray-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded-lg bg-gray-100" />
        <div className="h-3 w-24 rounded-lg bg-gray-100" />
      </div>
      <div className="shrink-0 h-8 w-20 rounded-xl bg-gray-100" />
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────────── */

function ProductCard({ product, index }: { product: Project; index: number }) {
  const [modal, setModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative flex items-center gap-4 rounded-2xl px-4 sm:px-5 py-4 transition-all duration-200"
        style={{
          background: hovered ? '#fff' : '#fff',
          border: `1px solid ${hovered ? '#bbf7d0' : '#e5e7eb'}`,
          boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.07), 0 0 0 1px #d1fae5' : '0 1px 3px rgba(0,0,0,0.04)',
          animationDelay: `${index * 40}ms`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Featured glow strip */}
        {product.is_featured && (
          <div
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
            style={{ background: 'linear-gradient(180deg, transparent, #39FF14, transparent)' }}
          />
        )}

        {/* Icon */}
        <div
          className="shrink-0 relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
          style={{
            background: hovered ? '#f0fdf4' : '#f8fafc',
            border: `1px solid ${hovered ? '#bbf7d0' : '#e2e8f0'}`,
          }}
        >
          <CategoryIcon category={product.project_project ?? ''} />
          {product.is_featured && (
            <span
              className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full"
              style={{ background: '#39FF14', boxShadow: '0 0 10px rgba(57,255,20,0.7)' }}
            >
              <svg width="7" height="7" viewBox="0 0 24 24" fill="#000">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
              {product.project_name}
            </h3>
            {product.project_project?.trim() && (
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                style={{ background: '#dcfce7', color: '#16a34a' }}
              >
                {product.project_project.trim()}
              </span>
            )}
            {product.is_featured && (
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}
              >
                ★ Featured
              </span>
            )}
          </div>
          {product.project_warranty && (
            <p className="text-xs text-nowrap flex items-center gap-1 text-gray-400">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {product.project_warranty} warranty
            </p>
          )}
        </div>

        {/* Price — desktop */}
        <div className="hidden sm:flex flex-col items-end shrink-0 mr-1">
          <p className="text-[9px] uppercase tracking-widest mb-0.5 text-gray-300">Price</p>
          <p
            className="text-xl font-black"
            style={{ color: '#16a34a', letterSpacing: '-0.02em' }}
          >
            {product.project_price ?? '—'}
          </p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 shrink-0 bg-gray-100" />

        {/* Price — mobile */}
        <p className="sm:hidden text-lg font-black shrink-0" style={{ color: '#16a34a', letterSpacing: '-0.02em' }}>
          {product.project_price ?? '—'}
        </p>

        {/* CTA */}
        <button
          onClick={() => setModal(true)}
          className="shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200"
          style={{
            background: hovered ? '#16a34a' : '#f0fdf4',
            color: hovered ? '#fff' : '#16a34a',
            boxShadow: hovered ? '0 4px 14px rgba(22,163,74,0.3)' : 'none',
            transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
          }}
        >
          <span className="hidden sm:inline">Subscribe</span>
          <span className="sm:hidden">Subscribe</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {modal && <ContactModal product={product} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ServicePage() {
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8001/api/v1';
    fetch(`${base}/projects`)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen"
        style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ffffff 40%, #f8fafc 100%)' }}
      >
        {/* Ambient glow top-center */}
        <div
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-150 h-100 opacity-60"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.12) 0%, transparent 70%)' }}
        />

        {/* ── Hero ── */}
       <div
          className="fixed block h-42 left-0 right-0 top-16.5 z-30 px-4 sm:px-6 py-2 sm:py-4"
          style={{ background: 'rgba(244,247,244,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(57,255,20,0.15)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="mx-auto max-w-5xl  flex items-center md:h-28 pt-8 h-18 justify-center  gap-2">
            
            <span
              className="font-black text-center text-[23px] sm:text-[22px] md:text-[32px]  mt-4 md:text-4xl"
              style={{
                 fontFamily: 'var(--font-khmer), sans-serif',
                color: '#111',
              
  
              }}
            >
              តារា​តម្លៃ Social Media{' '} 
              <span style={{ background: 'linear-gradient(135deg, #1a7a05, #39FF14)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ល្អៗ Build ថ្មីៗ
              </span>
            </span>
           
          </div>
          <div className="relative mx-auto pt-8 md:pt-1  max-w-5xl flex items-center justify-center"
          style={{
            fontFamily:"ui-monospace"
          }}
          >
            <p className="text-black" style={{ fontSize:'14px'}}>មានលក់កញ្ចប់សម្រាប់បងៗ ប្រកបអាជីវកម្មតម្លៃ នឹងគុណភាពល្អ</p>
          </div>
        </div>

        {/* ── Cards ── */}
        <section className="px-4 sm:px-6 pt-[280px] pb-28">
          <div className="mx-auto max-w-3xl">
            {loading ? (
              <div className="flex flex-col gap-2.5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div
                className="py-24 text-center rounded-2xl"
                style={{ background: '#fff', border: '1px solid #f1f5f9' }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">No services found.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
        {/* ── Bot Support ── */}
        <SupportBot />
      </main>

      <Footer />
    </>
  );
}
