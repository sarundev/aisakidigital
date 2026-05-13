'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPricing, type ApiPricingPlan } from '@/lib/api';

const TELEGRAM_URL = 'https://t.me/aisakidigital';
const FACEBOOK_URL = 'https://www.facebook.com/AisakiDigital';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function ContactPopup({ plan, onClose }: { plan: ApiPricingPlan; onClose: () => void }) {
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

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: '#39FF14' }}>Contact buy</p>
        <h3 className="mb-2 text-xl font-bold" style={{ color: '#ffffff' }}>{plan.name}</h3>
        <p className="mb-7 text-sm" style={{ color: '#7a9a7a' }}>
          Contact us on your preferred platform and we&apos;ll get back to you right away.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(36,161,222,0.12)', border: '1px solid rgba(36,161,222,0.3)', color: '#ffffff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.22)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(36,161,222,0.12)'; e.currentTarget.style.borderColor = 'rgba(36,161,222,0.3)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#24A1DE" />
              <path d="M17.5 6.5l-2.1 10.2c-.15.7-.56.87-1.13.54l-3.13-2.3-1.51 1.45c-.17.17-.31.31-.63.31l.22-3.17 5.74-5.19c.25-.22-.05-.34-.39-.12L6.1 13.5 3.1 12.57c-.67-.21-.68-.67.14-.99l13.25-5.11c.56-.2 1.05.14.87.99l-.96-.96z" fill="white"/>
            </svg>
            <div>
              <div className="text-sm font-bold">Telegram</div>
              <div className="text-xs" style={{ color: '#7ab8d4' }}>Message us on Telegram</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-50">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl px-5 py-4 font-semibold transition-all duration-200"
            style={{ background: 'rgba(24,119,242,0.12)', border: '1px solid rgba(24,119,242,0.3)', color: '#ffffff' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.22)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,0.12)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,0.3)'; }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#1877F2" />
              <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white"/>
            </svg>
            <div>
              <div className="text-sm font-bold">Facebook</div>
              <div className="text-xs" style={{ color: '#7aa4d4' }}>Message us on Facebook</div>
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

function SkeletonCard({ tall }: { tall?: boolean }) {
  return (
    <div
      className="rounded-2xl p-7 animate-pulse"
      style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', marginTop: tall ? '-8px' : '0' }}
    >
      <div className="mb-3 h-4 w-1/2 rounded" style={{ background: 'rgba(0,0,0,0.08)' }} />
      <div className="mb-6 h-10 w-1/3 rounded" style={{ background: 'rgba(0,0,0,0.08)' }} />
      <div className="mb-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-4 shrink-0 rounded-full" style={{ background: 'rgba(57,255,20,0.3)' }} />
            <div className="h-3 rounded" style={{ background: 'rgba(0,0,0,0.06)', width: `${60 + i * 8}%` }} />
          </div>
        ))}
      </div>
      <div className="h-12 w-full rounded-xl" style={{ background: 'rgba(0,0,0,0.07)' }} />
    </div>
  );
}

export default function Pricing() {
  const [plans, setPlans] = useState<ApiPricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupPlan, setPopupPlan] = useState<ApiPricingPlan | null>(null);

  useEffect(() => {
    fetchPricing()
      .then(setPlans)
      .catch(() => setPlans([]))
      .finally(() => {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 50);
      });
  }, []);

  return (
    <section id="pricing" className="relative overflow-hidden py-32">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%)' }} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 55% at 50% 80%, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.02) 45%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 5% 5%, rgba(30,100,200,0.05) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center" data-aos="fade-up" suppressHydrationWarning={true}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em]" style={{ color: '#39FF14' }}>
           Purpular Service
          </p>
          <h2
            className="logo-text-static leading-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-khmer), sans-serif',
            }}
          >
            ជ្រើសរើសកញ្ចប់សេវាកម្មពេញនិយម
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed" style={{ color: '#555555', fontSize: '0.9rem' }}>
            Flexible plans designed to scale with your business. No hidden fees.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex gap-5 w-max">
            {loading
              ? [false, true, false].map((tall, i) => <SkeletonCard key={i} tall={tall} />)
              : plans.map((plan, i) => (
                  <div
                    key={plan.id}
                    className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 flex-shrink-0"
                    data-aos="fade-up"
                    data-aos-delay={String(i * 100)}
                    suppressHydrationWarning={true}
                    style={
                      plan.is_popular
                        ? {
                            background: 'rgba(6,20,8,0.97)',
                            border: '1.5px solid rgba(57,255,20,0.5)',
                            boxShadow: '0 0 50px rgba(57,255,20,0.14), 0 0 100px rgba(57,255,20,0.05), inset 0 1px 0 rgba(57,255,20,0.12)',
                            marginTop: '-8px',
                            width: '320px',
                          }
                        : {
                            background: 'rgba(5,10,12,0.92)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            width: '320px',
                          }
                    }
                  >
                    {plan.is_popular && (
                      <div className="absolute -top-5 left-0 right-0 flex flex-col items-center gap-1">
                        <span
                          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold"
                          style={{ background: '#39FF14', color: '#000', letterSpacing: '0.04em' }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#000">
                            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                          </svg>
                          Most Popular
                        </span>
                      </div>
                    )}

                    <p className="mb-3 font-bold" style={{ color: '#ffffff', fontSize: '1.05rem', letterSpacing: '0.02em', fontFamily:'revert' }}>
                      {plan.name}
                    </p>

                    <div className="mb-6 flex items-end gap-1.5 pb-6" style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                      <span className="font-extrabold leading-none" style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 2.8rem)' }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="mb-1 text-sm font-medium" style={{ color: plan.is_popular ? '#39FF14' : '#506050' }}>
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <ul className="mb-8 flex flex-col gap-3.5">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckIcon />
                          <span style={{ color: '#c8e8c8', fontSize: '0.875rem' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="mt-auto flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 font-semibold transition-all duration-200"
                      style={
                        plan.is_popular
                          ? { background: '#39FF14', color: '#000', fontSize: '0.9rem', letterSpacing: '0.04em', boxShadow: '0 0 20px rgba(57,255,20,0.35)' }
                          : { background: 'rgba(255,255,255,0.05)', color: '#c8e8c8', border: '1px solid rgba(57,255,20,0.15)', fontSize: '0.9rem', letterSpacing: '0.04em' }
                      }
                      onClick={() => setPopupPlan(plan)}
                      onMouseEnter={(e) => {
                        if (!plan.is_popular) {
                          e.currentTarget.style.background = 'rgba(57,255,20,0.08)';
                          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!plan.is_popular) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          e.currentTarget.style.borderColor = 'rgba(57,255,20,0.15)';
                        }
                      }}
                    >
                      <SendIcon />
                      Get Started
                    </button>
                  </div>
                ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid gap-5 md:grid-cols-3 items-start">
          {loading
            ? [false, true, false].map((tall, i) => <SkeletonCard key={i} tall={tall} />)
            : plans.map((plan, i) => (
                <div
                  key={plan.id}
                  className="relative flex flex-col rounded-2xl p-7 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={String(i * 100)}
                  suppressHydrationWarning={true}
                  style={
                    plan.is_popular
                      ? {
                          background: 'rgba(6,20,8,0.97)',
                          border: '1.5px solid rgba(57,255,20,0.5)',
                          boxShadow: '0 0 50px rgba(57,255,20,0.14), 0 0 100px rgba(57,255,20,0.05), inset 0 1px 0 rgba(57,255,20,0.12)',
                          marginTop: '-8px',
                        }
                      : {
                          background: 'rgba(5,10,12,0.92)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }
                  }
                >
                  {plan.is_popular && (
                    <div className="absolute -top-5 left-0 right-0 flex flex-col items-center gap-1">
                      <span
                        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold"
                        style={{ background: '#39FF14', color: '#000', letterSpacing: '0.04em' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#000">
                          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                        </svg>
                        Most Popular
                      </span>
                    </div>
                  )}

                  <p className="mb-3 md:text-[30px] " style={{ color: '#ffffff', letterSpacing: '0.02em',fontFamily:'inherit' }}>
                    {plan.name}
                  </p>
                  <div className="mb-6 flex items-end gap-1.5 pb-6" style={{ borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
                    <span className="font-extrabold leading-none" style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 2.8rem)' }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="mb-1 text-sm font-medium" style={{ color: plan.is_popular ? '#39FF14' : '#506050' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="mb-8 flex flex-col gap-3.5">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckIcon />
                        <span style={{ color: '#c8e8c8', fontSize: '0.875rem' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-auto flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 font-semibold transition-all duration-200"
                    style={
                      plan.is_popular
                        ? { background: '#39FF14', color: '#000', fontSize: '0.9rem', letterSpacing: '0.04em', boxShadow: '0 0 20px rgba(57,255,20,0.35)' }
                        : { background: 'rgba(255,255,255,0.05)', color: '#c8e8c8', border: '1px solid rgba(57,255,20,0.15)', fontSize: '0.9rem', letterSpacing: '0.04em' }
                    }
                    onClick={() => setPopupPlan(plan)}
                    onMouseEnter={(e) => {
                      if (!plan.is_popular) {
                        e.currentTarget.style.background = 'rgba(57,255,20,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.is_popular) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(57,255,20,0.15)';
                      }
                    }}
                  >
                    <SendIcon />
                    Get Started
                  </button>
                </div>
              ))}
        </div>
      </div>

      {popupPlan && <ContactPopup plan={popupPlan} onClose={() => setPopupPlan(null)} />}
    </section>
  );
}
