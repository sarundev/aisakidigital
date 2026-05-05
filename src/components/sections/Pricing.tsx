'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPricing, type ApiPricingPlan } from '@/lib/api';

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
            Pricing Services
          </p>
          <h2
            className="logo-text-static leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.01em' }}
          >
            Choose Your Service
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed" style={{ color: '#555555', fontSize: '0.9rem' }}>
            Flexible plans designed to scale with your business. No hidden fees.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 items-start">
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

                  <p className="mb-3 font-bold" style={{ color: '#ffffff', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
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
    </section>
  );
}
