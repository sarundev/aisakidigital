'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProducts, type ApiProduct } from '@/lib/api';
import Subtitle from '@/components/Subtitle';

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

const FALLBACK_PRODUCTS: ApiProduct[] = [
  {
    id: 1, name: 'Hotmail', category: 'Fresh',
    duration: '1-3 Hours', description: 'Fresh Hotmail accounts ready for immediate use.',
    image: null, price: '$0.0050', price_unit: 'per mail', stock_quantity: 15537,
    tags: [], demo_url: null, is_featured: true, is_active: true, sort_order: 1,
  },
  {
    id: 2, name: 'Outlook', category: 'Fresh',
    duration: '1-3 Hours', description: 'Verified Outlook accounts with standard delivery.',
    image: null, price: '$0.0050', price_unit: 'per mail', stock_quantity: 22110,
    tags: [], demo_url: null, is_featured: false, is_active: true, sort_order: 2,
  },
  {
    id: 3, name: 'Hotmail Trusted', category: 'Trusted',
    duration: '6-12 Months', description: 'Aged Hotmail accounts with trusted history.',
    image: null, price: '$0.0150', price_unit: 'per mail', stock_quantity: 9999,
    tags: [], demo_url: null, is_featured: false, is_active: true, sort_order: 3,
  },
  {
    id: 4, name: 'Outlook Trusted', category: 'Trusted',
    duration: '6-12 Months', description: 'Premium aged Outlook accounts with verified history.',
    image: null, price: '$0.0150', price_unit: 'per mail', stock_quantity: 9999,
    tags: [], demo_url: null, is_featured: false, is_active: true, sort_order: 4,
  },
  {
    id: 5, name: 'Gmail', category: 'Fresh',
    duration: '1-3 Hours', description: 'Fresh Gmail accounts for bulk campaigns.',
    image: null, price: '$0.0080', price_unit: 'per mail', stock_quantity: 8450,
    tags: [], demo_url: null, is_featured: false, is_active: true, sort_order: 5,
  },
  {
    id: 6, name: 'Gmail Trusted', category: 'Trusted',
    duration: '6-12 Months', description: 'Aged Gmail accounts with established history.',
    image: null, price: '$0.0200', price_unit: 'per mail', stock_quantity: 3200,
    tags: [], demo_url: null, is_featured: true, is_active: true, sort_order: 6,
  },
];

/* ─── Contact Modal ──────────────────────────────────────────────────────── */

function ContactModal({ product, onClose }: { product: ApiProduct; onClose: () => void }) {
  const [customerTelegram, setCustomerTelegram] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl p-8"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(57,255,20,0.18)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(57,255,20,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top green accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
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
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>Order Product</p>
            <h3 className="text-lg font-extrabold leading-tight" style={{ color: '#111111' }}>{product.name}</h3>
          </div>
        </div>

        {product.price && (
          <div
            className="mb-5 flex items-baseline gap-1 rounded-xl px-4 py-3"
            style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.12)' }}
          >
            <span className="text-3xl font-black" style={{ color: '#1a7a05' }}>{product.price}</span>
            {(product.price_unit ?? product.tags[0]) && (
              <span className="text-sm" style={{ color: '#888' }}>{product.price_unit ?? product.tags[0]}</span>
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
                body: JSON.stringify({ productName: product.name, productPrice: product.price, customerTelegram }),
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

/* ─── Skeleton Row ───────────────────────────────────────────────────────── */

function SkeletonRow() {
  return (
    <>
      {/* Desktop skeleton */}
      <div
        className="hidden sm:flex items-center gap-6 px-7 py-5 animate-pulse"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="flex flex-1 items-center gap-4">
          <div className="h-11 w-11 shrink-0 rounded-xl" style={{ background: '#ebebeb' }} />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded-md" style={{ background: '#ebebeb' }} />
            <div className="h-3 w-20 rounded-md" style={{ background: '#f3f3f3' }} />
          </div>
        </div>
        <div className="w-32 h-4 rounded-md" style={{ background: '#ebebeb' }} />
        <div className="w-28 h-5 rounded-md" style={{ background: '#ebebeb' }} />
        <div className="w-36 flex flex-col gap-2">
          <div className="h-6 w-32 rounded-full" style={{ background: '#ebebeb' }} />
          <div className="h-3 w-24 rounded-md" style={{ background: '#f3f3f3' }} />
        </div>
        <div className="h-9 w-28 rounded-xl" style={{ background: '#ebebeb' }} />
      </div>
      {/* Mobile skeleton */}
      <div
        className="flex sm:hidden flex-col gap-3 px-4 py-4 animate-pulse"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-xl" style={{ background: '#ebebeb' }} />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-28 rounded-md" style={{ background: '#ebebeb' }} />
              <div className="h-3 w-16 rounded-md" style={{ background: '#f3f3f3' }} />
            </div>
          </div>
          <div className="h-8 w-24 rounded-xl" style={{ background: '#ebebeb' }} />
        </div>
        <div className="flex gap-3">
          <div className="h-3 w-20 rounded-md" style={{ background: '#f3f3f3' }} />
          <div className="h-3 w-16 rounded-md" style={{ background: '#ebebeb' }} />
          <div className="h-5 w-24 rounded-full" style={{ background: '#ebebeb' }} />
        </div>
      </div>
    </>
  );
}

/* ─── Category Icon ─────────────────────────────────────────────────────── */

function CategoryIcon({ category }: { category: string }) {
  const cat = category.toLowerCase();
  if (cat === 'facebook') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
      </svg>
    );
  }
  if (cat === 'tiktok') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#010101" />
        <path d="M16.5 7.2c-.7-.8-1.1-1.9-1.1-3h-2.1v9.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8.8-1.8 1.8-1.8c.2 0 .4 0 .6.1V9.9c-.2 0-.4-.1-.6-.1-2.2 0-3.9 1.8-3.9 3.9s1.7 3.9 3.9 3.9 3.9-1.8 3.9-3.9V10c.8.6 1.7.9 2.7.9V8.8c-.6 0-1.1-.2-1.6-.6v-1z" fill="white" />
      </svg>
    );
  }
  if (cat === 'instagram') {
    return (
      <img src="/image/instagram.png" alt="Instagram" width={20} height={20} style={{ borderRadius: 5, display: 'block' }} />
    );
  }
  if (cat === 'telegram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#24A1DE" />
        <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ─── Product Row ────────────────────────────────────────────────────────── */

function ProductRow({ product }: { product: ApiProduct }) {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);

  const priceUnit = product.price_unit ?? product.tags[0] ?? 'per unit';
  const inStock = product.stock_quantity;
  const qty = product.stock_quantity;
  const isSocial = ['facebook', 'tiktok', 'instagram', 'telegram'].includes(product.category.toLowerCase());

  return (
    <>
      <div
        className="relative transition-all duration-200"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: hovered ? 'rgba(57,255,20,0.025)' : 'transparent',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r transition-all duration-300"
          style={{
            background: 'linear-gradient(180deg, #39FF14, #2ee60f)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          }}
        />

        {/* ── Mobile Card ── */}
        <div className="flex sm:hidden flex-col gap-1 py-1 px-1">
          {/* Row 1: Icon + Name + Stock badge */}
          <div className="flex items-center gap-3">
            <div
              className="relative flex  shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.13) 0%, rgba(57,255,20,0.05) 100%)',
                border: '1px solid rgba(57,255,20,0.25)',
                color: '#1a7a05',
              }}
              onClick={isSocial ? () => setModal(true) : undefined}
            >
              <CategoryIcon category={product.category} />
              
            </div>
            <div className="flex-1 min-w-0">
              <p className=" font-extrabold truncate" style={{ color: '#111111' , fontSize:'10px' }}>{product.name}</p>
              <p className="text-xs mt-0.5" style={{ color: '#999999' }}>{product.category}</p>
            </div>

                  
            <div className="block">
            <span
              className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={
                inStock
                  ? { background: 'rgba(57,255,20,0.09)', color: '#1a7a05', border: '1px solid rgba(57,255,20,0.22)' }
                  : { background: 'rgba(239,68,68,0.07)', color: '#b91c1c', border: '1px solid rgba(239,68,68,0.18)' }
              }
            >
              {inStock ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#39FF14' }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#39FF14' }} />
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#ef4444' }} />
                
              )}
            
              {inStock ? 'In Stock' : 'Out'}
            </span>
            <p className="ml-2 text-green-900 " style={{fontSize:'8px'}}>{qty}</p>
            </div>
            <div className="block">
             <div className="grid ml-2 items-baseline">
                <span className=" font-black" style={{ color: '#1a7a05', letterSpacing: '-0.02em',fontSize:'10px' }}>{product.price}</span>
              </div>
             <button
              onClick={() => setModal(true)}
              className="shrink-0 flex items-center gap-1.5 rounded-2xl px-2 py-1 font-bold"
              style={{
                background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 100%)',
                color: '#000000',
                fontSize:'10px',
                boxShadow: '0 4px 16px rgba(57,255,20,0.4)',
              }}
            >
              Order
            </button>
            </div>
          </div>

          {/* Row 2: Price + Duration + Order button */}
          {/* <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black" style={{ color: '#1a7a05', letterSpacing: '-0.02em' }}>{product.price}</span>
                <span className="text-xs" style={{ color: '#aaaaaa' }}>{priceUnit}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-xs font-medium" style={{ color: '#888888' }}>{product.duration ?? product.category}</span>
              </div>
            </div>
           
          </div> */}
        </div>

        {/* ── Desktop Row ── */}
        <div
          className="hidden sm:grid items-center gap-6 px-7 py-5 grid-cols-3 "
        >
          {/* ── Mail Type ── */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, rgba(57,255,20,0.18) 0%, rgba(57,255,20,0.08) 100%)'
                  : 'rgba(57,255,20,0.07)',
                border: hovered ? '1.5px solid rgba(57,255,20,0.5)' : '1px solid rgba(57,255,20,0.18)',
                boxShadow: hovered ? '0 4px 16px rgba(57,255,20,0.2)' : 'none',
                color: '#1a7a05',
                cursor: isSocial ? 'pointer' : 'default',
              }}
              onClick={isSocial ? () => setModal(true) : undefined}
              title={isSocial ? `Order ${product.name}` : undefined}
            >
              <CategoryIcon category={product.category} />
              {product.is_featured && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full"
                  style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', boxShadow: '0 2px 8px rgba(57,255,20,0.5)' }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#000">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold" style={{ color: '#111111' }}>
                {product.name}
              </p>
              <p className="mt-0.5 text-xs" style={{ color: '#999999' }}>
                {product.category}
              </p>
            </div>
          </div>

          {/* ── Duration ── */}
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-medium" style={{ color: '#555555' }}>
              {product.duration ?? product.category}
            </span>
          </div>

          {/* ── Price ── */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-xl font-black"
              style={{ color: '#1a7a05', letterSpacing: '-0.02em' }}
            >
              {product.price}
            </span>
            <span className="text-xs font-medium" style={{ color: '#aaaaaa' }}>
              {priceUnit}
            </span>
          </div>

          {/* ── Stock Status ── */}
          {/* <div className="flex flex-col gap-1.5">
            <span
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={
                inStock
                  ? {
                      background: 'rgba(57,255,20,0.09)',
                      color: '#1a7a05',
                      border: '1px solid rgba(57,255,20,0.22)',
                    }
                  : {
                      background: 'rgba(239,68,68,0.07)',
                      color: '#b91c1c',
                      border: '1px solid rgba(239,68,68,0.18)',
                    }
              }
            >
              {inStock ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: '#39FF14' }}
                  />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#39FF14' }} />
                </span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#ef4444' }} />
              )}
              {inStock
                ? stockCount ? `In Stock (${stockCount.toLocaleString()})` : 'In Stock'
                : 'Out of Stock'}
            </span>
            {inStock && stockCount && (
              <p className="pl-1 text-xs" style={{ color: '#aaaaaa' }}>
                Available:{' '}
                <span className="font-semibold" style={{ color: '#1a7a05' }}>
                  {stockCount.toLocaleString()} units
                </span>
              </p>
            )}
          </div> */}
          {/* ── Order Button ── */}
        </div>
      </div>

      {modal && <ContactModal product={product} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ProductPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const displayList = loading ? [] : products;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#f4f7f4' }}>

        {/* ── Hero ── */}
        

        {/* ── Fixed title bar ── */}
        <div
          className="fixed block h-42 left-0 right-0 top-16.5 z-30 px-4 sm:px-6 py-2 sm:py-4"
          style={{ background: 'rgba(244,247,244,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(57,255,20,0.15)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="mx-auto max-w-5xl  flex items-center md:h-28 pt-8 h-18 justify-center  gap-2">
            
            <span
              className="font-black text-center   mt-4 md:text-4xl"
              style={{
                 fontFamily: 'var(--font-khmer), sans-serif',
                color: '#111',
                fontSize:'24px',
                fontWeight:'98px'
  
              }}
            >
              តារា​តម្លៃ Social Media{' '} 
              <span style={{ background: 'linear-gradient(135deg, #1a7a05, #39FF14)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ល្អៗ Build ថ្មីៗ
              </span>
            </span>
           
          </div>
          <div className="relative mx-auto pt-6 max-w-5xl flex items-center justify-center"
          style={{
            fontFamily:"ui-monospace"
          }}
          >
            <p className="text-black" style={{ fontSize:'14px'}}>មានលក់កញ្ចប់សម្រាប់បងៗ ប្រកបអាជីវកម្មតម្លៃ នឹងគុណភាពល្អ</p>
          </div>
        </div>

        {/* Spacer for fixed title bar */}
        <div className="h-12 sm:h-14" />

        {/* ── Table Section ── */}
        <section className="px-3 sm:px-6 pb-28 md:pt-48 pt-52 sm:pt-32">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl  " style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}>
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #39FF14 0%, #2ee60f 40%, #7fff3a 70%, #39FF14 100%)' }} />

              <div className="flex sm:hidden items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                <span className="text-[10px] font-extrabold tracking-widest" style={{ color: '#aaa', letterSpacing: '0.14em' }}>PRODUCTS</span>
                <span className="text-[10px] font-extrabold tracking-widest" style={{ color: '#aaa', letterSpacing: '0.14em' }}>ACTION</span>
              </div>

              <div className="hidden sm:grid grid-cols-3 items-center gap-6 px-7 py-4" style={{ background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                {['PRODUCT TYPE', 'WARRANTY', 'PRICE'].map((label) => (
                  <div key={label}>
                    <span className="text-[14ectpx] font-extrabold tracking-widest text-black" style={{  letterSpacing: '0.14em' }}>{label}</span>
                  </div>
                ))}
              </div>

              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
              ) : displayList.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#aaaaaa' }}>No products found.</p>
                </div>
              ) : (
                displayList.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}

              <div className="px-6 py-4 flex flex-wrap items-center justify-center gap-5" style={{ borderTop: '1px solid rgba(0,0,0,0.04)', background: 'rgba(57,255,20,0.02)' }}>
                {['Prices per unit', 'Real-time stock', 'Bulk discounts available'].map((text) => (
                  <span key={text} className="flex items-center gap-1.5 text-xs" style={{ color: '#bbb' }}>
                    <span style={{ color: '#39FF14', fontSize: 10 }}>●</span>{text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
