'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { WebService } from '@/lib/services';

const TELEGRAM_URL = 'https://t.me/T1_fakerrr';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

/* ─── Static data ────────────────────────────────────────────────────────── */

const PROCESS = [
  { step: '01', title: 'Discovery', titleKh: 'ស្វែងយល់', desc: 'We discuss your goals, target audience, and project scope.' },
  { step: '02', title: 'Design',    titleKh: 'រចនា',      desc: 'Wireframes and high-fidelity mockups for your approval.' },
  { step: '03', title: 'Build',     titleKh: 'សាងសង់',    desc: 'Clean, production-ready code shipped in sprints.' },
  { step: '04', title: 'Launch',    titleKh: 'បើកដំណើរ',  desc: 'Deploy, test, and hand over with full documentation.' },
];

const STATS = [
  { value: '50+',  labelKh: 'គម្រោងបានបញ្ចប់' },
  { value: '30+',  labelKh: 'អតិថិជនពេញចិត្ត' },
  { value: '3yr',  labelKh: 'បទពិសោធន៍' },
  { value: '100%', labelKh: 'ត្រូវពេលវេលា' },
];

/* ─── Icon map ───────────────────────────────────────────────────────────── */

function ServiceIcon({ type }: { type: string }) {
  switch (type) {
    case 'mobile':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'fullstack':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'uiux':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case 'ecommerce':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'seo':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );
    default: // 'website'
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
  }
}

/* ─── Contact Modal ──────────────────────────────────────────────────────── */

function ContactModal({ service, onClose }: { service: WebService; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-7 sm:p-8"
        style={{ background: '#ffffff', border: '1px solid rgba(57,255,20,0.15)', boxShadow: '0 32px 80px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #39FF14, transparent)' }} />
        <div className="mx-auto mb-5 h-1 w-10 rounded-full sm:hidden" style={{ background: '#ddd' }} />

        <button onClick={onClose} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: '#f5f5f5', color: '#aaa' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)', color: '#1a7a05' }}>
            <ServiceIcon type={service.icon_type} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>Get a Quote</p>
            <h3 className="text-base font-extrabold" style={{ color: '#111' }}>{service.title}</h3>
          </div>
        </div>

        <div className="mb-5 flex items-baseline gap-1 rounded-xl px-4 py-3" style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.12)' }}>
          <span className="text-xs font-medium" style={{ color: '#888' }}>Starting from</span>
          <span className="ml-1 text-3xl font-black" style={{ color: '#1a7a05' }}>{service.from_price}</span>
        </div>

        <p className="mb-5 text-sm leading-relaxed" style={{ color: '#777' }}>Contact us to discuss your project and get a custom quote.</p>

        <div className="flex flex-col gap-2.5">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-200"
            style={{ background: 'rgba(36,161,222,0.07)', border: '1px solid rgba(36,161,222,0.2)', color: '#111' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#24A1DE" /><path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" /></svg>
            <div className="flex-1"><div className="text-sm font-bold">Telegram</div><div className="text-xs" style={{ color: '#888' }}>Message us instantly</div></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.3 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>

          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all duration-200"
            style={{ background: 'rgba(24,119,242,0.07)', border: '1px solid rgba(24,119,242,0.2)', color: '#111' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#1877F2" /><path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" /></svg>
            <div className="flex-1"><div className="text-sm font-bold">Facebook</div><div className="text-xs" style={{ color: '#888' }}>Message us on Facebook</div></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.3 }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="animate-pulse relative flex flex-col rounded-3xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="mb-5 h-14 w-14 rounded-2xl" style={{ background: '#f0f0f0' }} />
      <div className="mb-2 h-5 w-40 rounded-lg" style={{ background: '#ebebeb' }} />
      <div className="mb-5 h-4 w-24 rounded-lg" style={{ background: '#f5f5f5' }} />
      <div className="mb-1 h-3 w-full rounded" style={{ background: '#f5f5f5' }} />
      <div className="mb-5 h-3 w-3/4 rounded" style={{ background: '#f5f5f5' }} />
      <div className="flex gap-1.5 mb-5">
        {[60, 80, 56].map((w) => <div key={w} className="h-6 rounded-lg" style={{ width: w, background: '#f3f3f3' }} />)}
      </div>
      <div className="flex items-center justify-between">
        <div className="h-8 w-20 rounded-lg" style={{ background: '#ebebeb' }} />
        <div className="h-10 w-28 rounded-2xl" style={{ background: '#ebebeb' }} />
      </div>
    </div>
  );
}

/* ─── Service Card ───────────────────────────────────────────────────────── */

function ServiceCard({ service }: { service: WebService }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        className="group relative flex flex-col rounded-3xl p-6 transition-all duration-300"
        style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(57,255,20,0.12), 0 4px 16px rgba(0,0,0,0.06)';
          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div className="absolute top-0 left-8 right-8 h-px rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.4), transparent)' }} />

        {service.popular && (
          <div className="absolute -top-3 right-5 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000', boxShadow: '0 4px 14px rgba(57,255,20,0.45)' }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="#000"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
            Popular
          </div>
        )}

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.1) 0%, rgba(57,255,20,0.05) 100%)', border: '1px solid rgba(57,255,20,0.2)', color: '#1a7a05' }}
        >
          <ServiceIcon type={service.icon_type} />
        </div>

        <h3 className="mb-0.5 text-lg font-extrabold" style={{ color: '#111111' }}>{service.title}</h3>
        <p className="mb-3 text-xs font-semibold" style={{ color: '#39FF14', fontFamily: 'var(--font-khmer), sans-serif' }}>{service.title_kh}</p>
        <p className="mb-5 flex-1 text-sm leading-relaxed" style={{ color: '#666666' }}>{service.description}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {(service.tags ?? []).map((tag) => (
            <span key={tag} className="rounded-lg px-2.5 py-1 text-[11px] font-semibold"
              style={{ background: 'rgba(57,255,20,0.07)', color: '#1a7a05', border: '1px solid rgba(57,255,20,0.15)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: '#bbb' }}>From</span>
            <p className="text-2xl font-black" style={{ color: '#1a7a05', letterSpacing: '-0.02em' }}>{service.from_price}</p>
          </div>
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 100%)', color: '#000', boxShadow: '0 4px 16px rgba(57,255,20,0.35)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(57,255,20,0.55)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(57,255,20,0.35)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Get Quote
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {modal && <ContactModal service={service} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function WebsPage() {
  const [services, setServices] = useState<WebService[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8001/api/v1';
    const url  = `${base}/services`;

    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data: WebService[]) => setServices(data.filter((s) => s.is_active ?? true)))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-4 sm:px-6  sm:pb-24 pt-28 sm:pt-36">
          <div className="pointer-events-none absolute" style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(57,255,20,0.09) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          <div className="pointer-events-none absolute" style={{ bottom: '-5%', left: '5%', width: '35vw', height: '35vh', background: 'radial-gradient(ellipse, rgba(57,255,20,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="pointer-events-none absolute" style={{ bottom: '-5%', right: '5%', width: '35vw', height: '35vh', background: 'radial-gradient(ellipse, rgba(57,255,20,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#39FF14', animationDuration: '1.8s' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#39FF14' }} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>Web & App Services</span>
            </div>

            <h1 className="mb-5 font-black leading-tight px-2 text-green-800"
              style={{ fontSize: 'clamp(1.9rem, 8vw, 4rem)', letterSpacing: '-0.02em', fontFamily: 'var(--font-khmer), sans-serif' }}
            >
              សេវាកម្ម{' '}
              <span style={{ background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 50%, #7fff3a 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Build App & Web
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-md text-sm sm:text-base leading-relaxed px-2 text-black" style={{ fontFamily: 'var(--font-khmer), sans-serif' }}>
              យើងបង្កើត Website, Mobile App, និង System ដ៏ស្អាតនិងល្អបំផុតសម្រាប់អាជីវកម្មរបស់អ្នក។
            </p>

            
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="relative">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 sm:mb-14 text-center">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>What We Offer</p>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#111', letterSpacing: '-0.02em', fontFamily: 'var(--font-khmer), sans-serif' }}>
                សេវាកម្មទាំងអស់
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : services.map((s) => <ServiceCard key={s.id} service={s} />)
              }
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ background: '#ffffff' }}>
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 sm:mb-14 text-center">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>How It Works</p>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: '#111', letterSpacing: '-0.02em', fontFamily: 'var(--font-khmer), sans-serif' }}>
                របៀបធ្វើការ
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="relative flex flex-col">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-full w-full h-px z-0" style={{ background: 'linear-gradient(90deg, rgba(57,255,20,0.4), transparent)' }} />
                  )}
                  <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.12), rgba(57,255,20,0.05))', border: '1px solid rgba(57,255,20,0.25)' }}
                  >
                    <span className="text-xl font-black" style={{ color: '#39FF14' }}>{p.step}</span>
                  </div>
                  <h3 className="mb-1 font-extrabold" style={{ color: '#111' }}>{p.title}</h3>
                  <p className="mb-1 text-xs font-semibold" style={{ color: '#39FF14', fontFamily: 'var(--font-khmer), sans-serif' }}>{p.titleKh}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#777' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="px-4 sm:px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl px-6 sm:px-12 py-10 sm:py-14 text-center"
              style={{ background: 'linear-gradient(135deg, #06100a 0%, #0d1f0d 100%)', border: '1px solid rgba(57,255,20,0.2)' }}
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.12) 0%, transparent 65%)' }} />
              <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#39FF14', animationDuration: '2s' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#39FF14' }} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>Ready to Start?</span>
                </div>

                <h2 className="mb-4 font-black leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 6vw, 2.8rem)', color: '#ffffff', letterSpacing: '-0.02em', fontFamily: 'var(--font-khmer), sans-serif' }}
                >
                  ចាប់ផ្ដើម{' '}
                  <span style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Project
                  </span>{' '}
                  របស់អ្នក
                </h2>

                <p className="mx-auto mb-8 max-w-sm text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-khmer), sans-serif' }}>
                  ទាក់ទងមកយើងដោយឥតគិតថ្លៃ ដើម្បីពិភាក្សាអំពីគម្រោងរបស់អ្នក។
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #39FF14, #2ee60f)', color: '#000', boxShadow: '0 4px 20px rgba(57,255,20,0.4)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#1a8012" /><path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99z" fill="white" /></svg>
                    Telegram យើង
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#1877F2" /><path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" /></svg>
                    Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
