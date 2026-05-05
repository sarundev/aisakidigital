'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchServices, type ApiService } from '@/lib/api';

const ICON_PATHS: Record<string, React.ReactNode> = {
  web:       <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  brand:     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  marketing: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
  mobile:    <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>,
  seo:       <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" /></>,
  social:    <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></>,
};

const DEFAULT_ICON = <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>;

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-8 animate-pulse" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="mb-6 h-12 w-12 rounded-xl" style={{ background: 'rgba(0,0,0,0.07)' }} />
      <div className="mb-3 h-4 w-3/4 rounded" style={{ background: 'rgba(0,0,0,0.07)' }} />
      <div className="space-y-2">
        <div className="h-3 w-full rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
        <div className="h-3 w-5/6 rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
        <div className="h-3 w-4/6 rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
      </div>
    </div>
  );
}

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 50);
      });
  }, []);

  return (
    <section id="services" className="relative py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 8% 30%, rgba(57,255,20,0.055) 0%, transparent 68%)' }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 40% at 92% 68%, rgba(56,130,246,0.055) 0%, transparent 68%)' }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20" data-aos="fade-up" suppressHydrationWarning={true}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em]" style={{ color: '#39FF14' }}>
            What We Do
          </p>
          <h2
            className="logo-text-static max-w-md leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.01em' }}
          >
            Comprehensive Digital Solutions
          </h2>
          <span className="accent-line mt-4" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : services.map((svc, i) => {
                const isHovered = hoveredIdx === i;
                const rgb = hexToRgb(svc.accent_color || '#39FF14');
                const iconPaths = ICON_PATHS[svc.icon ?? ''] ?? DEFAULT_ICON;
                return (
                  <div
                    key={svc.id}
                    className="relative bg-gray-800 rounded-2xl p-8 overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={String((i % 3) * 100)}
                    suppressHydrationWarning={true}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 rounded-t-2xl"
                      style={{
                        height: '3px',
                        background: isHovered ? svc.accent_color : 'transparent',
                        boxShadow: isHovered ? `0 0 12px ${svc.accent_color}` : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <span
                      className="absolute top-6 right-7 font-mono font-bold"
                      style={{ color: 'rgba(255,255,255,0.06)', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: `rgba(${rgb}, ${isHovered ? 0.1 : 0.05})`,
                        border: `1px solid rgba(${rgb}, ${isHovered ? 0.25 : 0.12})`,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg
                        width="26" height="26" viewBox="0 0 24 24" fill="none"
                        stroke={isHovered ? svc.accent_color : 'rgba(255,255,255,0.3)'}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transition: 'stroke 0.3s ease' }}
                      >
                        {iconPaths}
                      </svg>
                    </div>

                    <h3
                      className="mb-3 font-semibold leading-snug"
                      style={{ color: isHovered ? '#E8E8E8' : '#D8D8D8', fontSize: '1.05rem', transition: 'color 0.3s ease' }}
                    >
                      {svc.title}
                    </h3>
                    <p style={{ color: '#505050', fontSize: '0.875rem', lineHeight: 1.75 }}>
                      {svc.description}
                    </p>
                    <div
                      className="mt-6 flex items-center gap-2 text-xs font-medium"
                      style={{ color: isHovered ? svc.accent_color : 'rgba(255,255,255,0.2)', transition: 'color 0.3s ease' }}
                    >
                      <span style={{ letterSpacing: '0.06em' }}>Learn more</span>
                      <span>→</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
