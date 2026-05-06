'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProducts, STORAGE, type ApiProduct } from '@/lib/api';

const TELEGRAM_URL = 'https://t.me/@T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

const FALLBACK_PRODUCTS: ApiProduct[] = [
  {
    id: 1, name: 'Business Website Starter', category: 'Website',
    description: 'Clean, responsive business landing page with contact form, SEO-optimized structure, and CMS integration.',
    image: null, price: '$299', tags: ['Next.js', 'Tailwind', 'CMS'], demo_url: null,
    is_featured: true, is_active: true, sort_order: 1,
  },
  {
    id: 2, name: 'E-Commerce Platform', category: 'E-Commerce',
    description: 'Full-featured online store with cart, payment gateway, order management, and admin dashboard.',
    image: null, price: '$799', tags: ['React', 'Node.js', 'Stripe'], demo_url: null,
    is_featured: false, is_active: true, sort_order: 2,
  },
  {
    id: 3, name: 'Mobile App UI Kit', category: 'Mobile',
    description: 'React Native starter kit with 40+ pre-built screens, dark/light mode, and authentication flows.',
    image: null, price: '$149', tags: ['React Native', 'Expo', 'TypeScript'], demo_url: null,
    is_featured: false, is_active: true, sort_order: 3,
  },
  {
    id: 4, name: 'SaaS Dashboard Template', category: 'Dashboard',
    description: 'Admin dashboard with analytics charts, user management, billing, and role-based access control.',
    image: null, price: '$499', tags: ['Next.js', 'Chart.js', 'PostgreSQL'], demo_url: null,
    is_featured: true, is_active: true, sort_order: 4,
  },
  {
    id: 5, name: 'Restaurant Booking System', category: 'Website',
    description: 'Table reservation platform with real-time availability, SMS notifications, and QR-code menus.',
    image: null, price: '$399', tags: ['Next.js', 'Twilio', 'Prisma'], demo_url: null,
    is_featured: false, is_active: true, sort_order: 5,
  },
  {
    id: 6, name: 'Portfolio Pro Template', category: 'Template',
    description: 'Creative agency-quality portfolio with animated sections, case studies, and contact automation.',
    image: null, price: '$99', tags: ['Next.js', 'Framer Motion', 'GSAP'], demo_url: null,
    is_featured: false, is_active: true, sort_order: 6,
  },
];

const CATEGORY_ICONS: Record<string, React.ReactElement> = {
  Website: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  'E-Commerce': (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Mobile: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Dashboard: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Template: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
};

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ background: '#ffffff', border: '1px solid #e8ede8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="h-48 w-full" style={{ background: '#f0f4f0' }} />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full" style={{ background: '#e0eae0' }} />
          <div className="h-5 w-14 rounded-full" style={{ background: '#eeeeee' }} />
        </div>
        <div className="h-6 w-3/4 rounded" style={{ background: '#eeeeee' }} />
        <div className="h-4 w-full rounded" style={{ background: '#f5f5f5' }} />
        <div className="h-4 w-5/6 rounded" style={{ background: '#f5f5f5' }} />
        <div className="flex gap-2 mt-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-5 w-16 rounded-full" style={{ background: '#eeeeee' }} />
          ))}
        </div>
        <div className="flex gap-3 mt-2">
          <div className="h-10 flex-1 rounded-xl" style={{ background: '#e0eae0' }} />
          <div className="h-10 flex-1 rounded-xl" style={{ background: '#eeeeee' }} />
        </div>
      </div>
    </div>
  );
}

function ContactModal({ product, onClose }: { product: ApiProduct; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8"
        style={{
          background: '#ffffff',
          border: '1px solid #dde8dd',
          boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          style={{ color: '#999', background: '#f5f5f5' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#eeeeee'; e.currentTarget.style.color = '#333'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#999'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: '#2d6a2d' }}>Order Product</p>
        <h3 className="mb-1 text-xl font-bold" style={{ color: '#1a1a1a' }}>{product.name}</h3>
        {product.price && (
          <p className="mb-5 text-2xl font-extrabold" style={{ color: '#2d6a2d' }}>{product.price}</p>
        )}
        <p className="mb-7 text-sm" style={{ color: '#777777' }}>
          Reach out on your preferred platform and we&apos;ll get back to you right away.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(36,161,222,0.08)', border: '1px solid rgba(36,161,222,0.25)', color: '#1a1a1a' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.15)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.08)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.25)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#24A1DE" />
              <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99l-.96-.96z" fill="white" />
            </svg>
            <div>
              <div className="text-sm font-bold">Telegram</div>
              <div className="text-xs" style={{ color: '#888' }}>Message us on Telegram</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-40">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(24,119,242,0.08)', border: '1px solid rgba(24,119,242,0.25)', color: '#1a1a1a' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.15)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.08)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.25)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#1877F2" />
              <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
            </svg>
            <div>
              <div className="text-sm font-bold">Facebook</div>
              <div className="text-xs" style={{ color: '#888' }}>Message us on Facebook</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-40">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: ApiProduct; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);
  const imgSrc = product.image ? `${STORAGE}/storage/${product.image}` : null;

  return (
    <>
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: '#ffffff',
          border: hovered
            ? '1.5px solid #2d6a2d'
            : product.is_featured
              ? '1.5px solid #b8d8b8'
              : '1px solid #e8ede8',
          boxShadow: hovered
            ? '0 12px 40px rgba(45,106,45,0.14), 0 2px 8px rgba(0,0,0,0.06)'
            : product.is_featured
              ? '0 4px 20px rgba(45,106,45,0.1), 0 1px 4px rgba(0,0,0,0.04)'
              : '0 2px 12px rgba(0,0,0,0.05)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
        data-aos="fade-up"
        data-aos-delay={String((index % 3) * 100)}
        suppressHydrationWarning={true}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {product.is_featured && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: '#2d6a2d', color: '#ffffff', letterSpacing: '0.04em' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Featured
            </span>
          </div>
        )}

        {/* Thumbnail */}
        <div
          className="relative h-48 w-full overflow-hidden"
          style={{ background: '#f5f7f5' }}
        >
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #eef4ee 0%, #f5f7f5 100%)' }}
            >
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c8d8c8" strokeWidth="1">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
          )}
          {/* Bottom fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(255,255,255,0.8) 100%)' }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-6 flex-1">
          {/* Category + Price */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: '#eef4ee', color: '#2d6a2d', border: '1px solid #c8d8c8' }}
            >
              {CATEGORY_ICONS[product.category] ?? null}
              {product.category}
            </span>
            {product.price && (
              <span className="text-base font-extrabold" style={{ color: '#2d6a2d' }}>
                {product.price}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold leading-snug" style={{ color: '#1a1a1a' }}>
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: '#666666', flexGrow: 1 }}>
            {product.description}
          </p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ background: '#f0f0f0', color: '#666666', border: '1px solid #e5e5e5' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-2.5 mt-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
              style={{
                background: '#2d6a2d',
                color: '#ffffff',
                letterSpacing: '0.03em',
                boxShadow: hovered ? '0 4px 18px rgba(45,106,45,0.35)' : '0 2px 8px rgba(45,106,45,0.2)',
              }}
              onClick={() => setModal(true)}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#245924'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#2d6a2d'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Order Now
            </button>

            {product.demo_url && (
              <a
                href={product.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
                style={{ background: '#f5f7f5', color: '#2d6a2d', border: '1px solid #c8d8c8' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#eef4ee'; e.currentTarget.style.borderColor = '#2d6a2d'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f5f7f5'; e.currentTarget.style.borderColor = '#c8d8c8'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {modal && <ContactModal product={product} onClose={() => setModal(false)} />}
    </>
  );
}

export default function ProductPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    import('aos').then(({ default: AOS }) => AOS.init({ once: true, duration: 700 }));
    fetchProducts()
      .then(setProducts)
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const displayProducts = loading ? [] : filtered;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

        {/* ── Hero ── */}
        <section
          className="pt-32 pb-20 px-6"
          style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f6f0 100%)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
              suppressHydrationWarning={true}
            >
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#2d6a2d' }}>
                Digital Products
              </p>
              <h1
                className="font-black leading-tight mb-5"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}
              >
                Ready-Made{' '}
                <span style={{ color: '#2d6a2d' }}>Solutions</span>
                <br />Built for You
              </h1>
              <p className="text-lg leading-relaxed max-w-xl" style={{ color: '#555555' }}>
                High-quality digital products — from landing pages to full platforms — delivered fast and tailored to your business.
              </p>

              {/* CTA row */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {/* <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#2d6a2d', boxShadow: '0 4px 18px rgba(45,106,45,0.3)' }}
                >
                  Browse Products
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a> */}
                {/* <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200"
                  style={{ background: '#ffffff', color: '#2d6a2d', border: '1.5px solid #c8d8c8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2d6a2d'; e.currentTarget.style.background = '#eef4ee'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#c8d8c8'; e.currentTarget.style.background = '#ffffff'; }}
                >
                  Custom Build
                </a> */}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        {/* <section className="py-14 px-6" style={{ backgroundColor: '#2d6a2d' }}>
          <div className="mx-auto max-w-6xl grid grid-cols-3 gap-8">
            {[
              { value: '10+', label: 'Products Available' },
              { value: '50+', label: 'Clients Served' },
              { value: '100%', label: 'Custom Built' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#ffffff' }}>{s.value}</div>
                <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── Filter Tabs ── */}
        <section id="products" className="py-12 px-6" style={{ backgroundColor: '#f5f7f5' }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-8" data-aos="fade-up" suppressHydrationWarning={true}>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2d6a2d' }}>
                Browse by Category
              </p>
              <h2 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>All Products</h2>
              <div className="mx-auto mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }} />
            </div>

            {!loading && categories.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center" data-aos="fade-up" data-aos-delay="100" suppressHydrationWarning={true}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                    style={
                      activeCategory === cat
                        ? { background: '#2d6a2d', color: '#ffffff', boxShadow: '0 4px 14px rgba(45,106,45,0.3)' }
                        : { background: '#ffffff', color: '#555555', border: '1px solid #dde8dd' }
                    }
                    onMouseEnter={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = '#2d6a2d'; e.currentTarget.style.color = '#2d6a2d'; } }}
                    onMouseLeave={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = '#dde8dd'; e.currentTarget.style.color = '#555555'; } }}
                  >
                    {cat !== 'All' && CATEGORY_ICONS[cat]}
                    {cat}
                    {cat !== 'All' && (
                      <span
                        className="rounded-full px-1.5 text-xs"
                        style={{
                          background: activeCategory === cat ? 'rgba(255,255,255,0.2)' : '#eef4ee',
                          color: activeCategory === cat ? '#ffffff' : '#2d6a2d',
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                        }}
                      >
                        {products.filter((p) => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Product Grid ── */}
        <section className="px-6 pb-28 pt-10" style={{ backgroundColor: '#f5f7f5' }}>
          <div className="mx-auto max-w-6xl">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="py-24 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8d8c8" strokeWidth="1" className="mx-auto mb-4">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-base" style={{ color: '#888888' }}>No products found in this category.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        {/* <section
          className="py-24 px-6"
          style={{ background: 'linear-gradient(135deg, #1a3d1a 0%, #2d6a2d 100%)' }}
        >
          <div className="mx-auto max-w-2xl text-center" data-aos="fade-up" suppressHydrationWarning={true}>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Need Something Unique?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Don&apos;t see exactly what you need? We build fully custom digital products — tailored to your brand and goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#ffffff', color: '#2d6a2d' }}
              >
                Start Custom Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/Abouts"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              >
                Learn About Us
              </a>
            </div>
          </div>
        </section> */}

      </main>
      <Footer />
    </>
  );
}
