'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPortfolio, STORAGE, type ApiPortfolioItem } from '@/lib/api';

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#f0f0f0', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="h-56 w-full" style={{ background: 'rgba(0,0,0,0.06)' }} />
      <div className="p-7 space-y-3">
        <div className="h-3 w-1/4 rounded" style={{ background: 'rgba(57,255,20,0.3)' }} />
        <div className="h-5 w-2/3 rounded" style={{ background: 'rgba(0,0,0,0.08)' }} />
        <div className="h-3 w-full rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
        <div className="h-3 w-4/5 rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
      </div>
    </div>
  );
}

function PlaceholderGraphic() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.12">
      <circle cx="40" cy="40" r="35" stroke="#39FF14" strokeWidth="1" />
      <circle cx="40" cy="40" r="20" stroke="#39FF14" strokeWidth="1" />
      <circle cx="40" cy="40" r="5" fill="#39FF14" />
      <line x1="40" y1="5" x2="40" y2="75" stroke="#39FF14" strokeWidth="0.5" />
      <line x1="5" y1="40" x2="75" y2="40" stroke="#39FF14" strokeWidth="0.5" />
    </svg>
  );
}

export default function Portfolio() {
  const [items, setItems] = useState<ApiPortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 50);
      });
  }, []);

  return (
    <section id="work" className="relative py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 45% 45% at 98% 60%, rgba(57,255,20,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          data-aos="fade-up"
          suppressHydrationWarning={true}
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em]" style={{ color: '#39FF14' }}>
              Our Work
            </p>
            <h2
              className="logo-text-static leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.01em' }}
            >
              Featured Projects
            </h2>
            <span className="accent-line mt-4" />
          </div>
          <a href="#contact" className="btn-outline self-start rounded-full px-6 py-2.5 text-sm md:self-auto">
            View All Work&nbsp;&nbsp;→
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item, i) => (
                <div
                  key={item.id}
                  className="portfolio-card rounded-2xl"
                  style={{ backgroundColor: '#080808' }}
                  data-aos="fade-up"
                  data-aos-delay={String((i % 2) * 150)}
                  suppressHydrationWarning={true}
                >
                  <div
                    className="relative flex h-56 items-center justify-center overflow-hidden rounded-t-2xl"
                    style={{
                      background: item.image
                        ? undefined
                        : 'linear-gradient(135deg, #0a0a0a 0%, #111 40%, rgba(57,255,20,0.11) 100%)',
                    }}
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`${STORAGE}/storage/${item.image}`} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <PlaceholderGraphic />
                    )}

                    <span
                      className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: 'rgba(57,255,20,0.12)', border: '1px solid rgba(57,255,20,0.3)', color: '#39FF14', letterSpacing: '0.08em' }}
                    >
                      {item.category}
                    </span>

                    {item.tags && item.tags.length > 0 && (
                      <span
                        className="absolute left-4 bottom-4 rounded-full px-3 py-1 text-xs font-bold"
                        style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.25)', color: '#39FF14', letterSpacing: '0.06em' }}
                      >
                        {item.tags.slice(0, 2).join(' · ')}
                      </span>
                    )}

                    <a
                      href={item.url ?? '#contact'}
                      target={item.url ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="card-overlay absolute inset-0 flex items-center justify-center rounded-t-2xl"
                      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                    >
                      <span
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold"
                        style={{ background: '#39FF14', color: '#000', letterSpacing: '0.08em' }}
                      >
                        View Project&nbsp;&nbsp;→
                      </span>
                    </a>
                  </div>

                  <div className="p-7">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: '#39FF14' }}>
                      {item.category}
                    </p>
                    <h3 className="mb-2 font-bold leading-snug" style={{ color: '#D8D8D8', fontSize: '1.15rem' }}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p style={{ color: '#505050', fontSize: '0.875rem', lineHeight: 1.75 }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
