'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProducts, type ApiProduct } from '@/lib/api';
import Subtitle from '@/components/Subtitle';
import SupportBot from '@/components/SupportBot';

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
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 8,
          border: '1px solid rgba(24,119,242,0.5)',
          flexShrink: 0,
        }}
      >
        <img src="/image/facebook.png" alt="Facebook" width={20} height={20} style={{ display: 'block', borderRadius: 4 }} />
      </span>
    );
  }
  if (cat === 'tiktok') {
    return (
      <span
      style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0)',
          flexShrink: 0,
         
        
        }}
      >
      
      <img src="/image/tiktok.png" alt="Instagram"  width={26} height={26} style={{ borderRadius: 5, display: 'block' }} 
       />
       </span>
    );
  }
  if (cat === 'instagram') {
    return (
      <img src="/image/instagram.png" alt="Instagram" width={25} height={25} style={{ borderRadius: 5, display: 'block' }} />
    );
  }
  if (cat === 'telegram') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

/* ─── Stock Level ───────────────────────────────────────────────────────── */

function stockLevel(qty: number) {
  if (qty === 0)  return { color: '#ef4444', bg: 'rgba(239,68,68,0.07)',  dot: '#ef4444', ping: false };
  if (qty < 1000) return { color: '#92400e', bg: 'rgba(245,158,11,0.09)', dot: '#f59e0b', ping: false };
  if (qty < 5000) return { color: '#b45309', bg: 'rgba(251,191,36,0.08)', dot: '#fbbf24', ping: false };
  return           { color: '#1a7a05',  bg: 'rgba(57,255,20,0.08)',  dot: '#39FF14', ping: true  };
}

/* ─── Product Row ────────────────────────────────────────────────────────── */

function ProductRow({ product }: { product: ApiProduct }) {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);
  const warranty = product.duration;
  const priceUnit = product.price_unit ?? product.tags[0] ?? 'per unit';
  const qty = product.stock_quantity;
  const level = stockLevel(qty);

  return (
    <>
      <div
        className="relative transition-all duration-200"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          background: hovered ? 'rgba(57,255,20,0.02)' : 'transparent',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r transition-all duration-300"
          style={{ background: 'linear-gradient(180deg, #39FF14, #2ee60f)', opacity: hovered ? 1 : 0 }}
        />
        {/* ── Mobile ── */}
        <div className="sm:hidden items-center gap-3 px-4 py-3.5 grid-cols-4 grid">
          {/* Icon */}
          {/* Info */}
          <div className="flex-1 ">
            <div className="flex items-center gap-1.5 mb-0.5">
              <CategoryIcon category={product.category} />
              <p className="text-[11px] font-bold truncate" style={{ color: '#111' }}>{product.name}</p>
               
             
              {/* {product.is_featured && (
                <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(57,255,20,0.1)', color: '#1a7a05' }}>★</span>
              )} */}
            </div>
          </div>
           <div className="flex items-center justify-center gap-1 mt-1">
              <span className="h-1.5 w-1.5 rounded-full shrink-0"  />
              <span className="text-[13px] flex items-center justify-center font-semibold" style={{ color: level.color }}>
                {qty}
              </span>
            </div>
          <div className="relative pl-4 flex items-center justify-center ">
            <span className="text-[15px] font-black leading-none" style={{ color: '#1a7a05' }}>
              {product.price}
            </span>
          </div>

          {/* Price + Order */}
          <div className="shrink-0 flex flex-col items-end gap-1.5">
          
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 100%)', color: '#000', boxShadow: '0 3px 10px rgba(57,255,20,0.35)' }}
            >
              Order
            </button>
          </div>
        </div>

        {/* ── Desktop ── */}
        <div
          className="hidden sm:grid items-center gap-5 px-7 py-4 grid-cols-5"
          
        >
          {/* Col 1: Product */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200"
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, rgba(57,255,20,0.16) 0%, rgba(57,255,20,0.07) 100%)'
                  : 'rgba(57,255,20,0.07)',
                border: hovered ? '1.5px solid rgba(57,255,20,0.45)' : '1px solid rgba(57,255,20,0.18)',
                color: '#1a7a05',
              }}
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
              <p className="truncate text-sm font-bold" style={{ color: '#111111' }}>{product.name}</p>
              <p className="mt-0.5 text-xs" style={{ color: '#999999' }}>{product.category}</p>
            </div>
          </div>

          {/* Col 2: Delivery */}
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-medium" style={{ color: '#555555' }}>
              {product.duration ?? product.category}
            </span>
          </div>

          {/* Col 3: In Stock */}
          <div className="flex flex-col gap-1">
            <span
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: level.bg, color: level.color }}
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                {level.ping && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: level.dot }} />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: level.dot }} />
              </span>
              {qty > 0 ? qty.toLocaleString() : 'Sold Out'}
            </span>
            {qty > 0 && (
              <p className="pl-1 text-[10px]" style={{ color: '#bbb' }}>units available</p>
            )}
          </div>

          {/* Col 4: Price + Order */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xl font-black leading-none" style={{ color: '#1a7a05', letterSpacing: '-0.02em' }}>
                {product.price}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: '#aaa' }}>{priceUnit}</p>
            </div>
            
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-150"
              style={{
                background: hovered
                  ? 'linear-gradient(135deg, #39FF14 0%, #2ee60f 100%)'
                  : 'rgba(57,255,20,0.1)',
                color: hovered ? '#000' : '#1a7a05',
                boxShadow: hovered ? '0 4px 16px rgba(57,255,20,0.4)' : 'none',
              }}
            >
              Order
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
          className="fixed block h-34 left-0 right-0 top-16.5 z-30 px-4 sm:px-6 py-2 sm:py-4"
          style={{ background: 'rgba(244,247,244,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(57,255,20,0.15)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
        >
          <div className="mx-auto max-w-5xl  flex items-center md:h-28 pt-4 h-18 justify-center  gap-2">
            
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
          <div className="relative mx-auto pt-4 md:pt-1  max-w-5xl flex items-center justify-center"
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
        <section className="px-3 sm:px-6 pb-28 md:pt-48 pt-42 sm:pt-32">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl  " style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}>
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #39FF14 0%, #2ee60f 40%, #7fff3a 70%, #39FF14 100%)' }} />

              {/* Mobile header */}
              <div className="flex sm:hidden items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                <span className="text-[13px] font-extrabold tracking-widest text-black" style={{  letterSpacing: '0.13em' }}>PRODUCT</span>
                <span className="text-[13px] font-extrabold tracking-widest text-black" style={{  letterSpacing: '0.13em' }}> STOCK</span>
                <span className="text-[13px] font-extrabold tracking-widest text-black" style={{  letterSpacing: '0.13em' }}> PRICE</span>
   
                <span className="text-[13px] font-extrabold tracking-widest text-black" style={{ letterSpacing: '0.13em' }}>ACTION</span>
              </div>

              {/* Desktop header — 4 cols matching the row grid */}
              <div
                className="hidden sm:grid items-center gap-5 px-7 py-3 grid-cols-5"
                style={{
                
                  background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)',
                  borderBottom: '1px solid rgba(57,255,20,0.1)',
                }}
              >
                {['PRODUCT TYPE', 'WARRANTY', 'IN STOCK', 'PRICE','ACTION'].map((label) => (
                  <div key={label}>
                    <span className="text-[11px] font-extrabold tracking-widest" style={{ color: '#aaa', letterSpacing: '0.14em' }}>{label}</span>
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
