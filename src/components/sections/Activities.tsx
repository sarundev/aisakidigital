'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchActivities, type ApiActivity, STORAGE } from '@/lib/api';

const CATEGORY_COLORS: Record<string, string> = {
  Workshop:   '#39FF14',
  Conference: '#3882F6',
  Community:  '#F59E0B',
  Training:   '#A855F7',
  Exhibition: '#EC4899',
  Event:      '#14B8A6',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="h-44 w-full" style={{ background: 'rgba(0,0,0,0.07)' }} />
      <div className="p-6 space-y-3">
        <div className="h-3 w-1/4 rounded" style={{ background: 'rgba(0,0,0,0.07)' }} />
        <div className="h-4 w-3/4 rounded" style={{ background: 'rgba(0,0,0,0.07)' }} />
        <div className="h-3 w-full rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
        <div className="h-3 w-5/6 rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
      </div>
    </div>
  );
}

export default function Activities() {
  const [activities, setActivities] = useState<ApiActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => {
        setLoading(false);
        setTimeout(() => AOS.refresh(), 50);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(activities.map((a) => a.category)))];
  const visible = filter === 'All' ? activities : activities.filter((a) => a.category === filter);

  return (
    <section id="activities" className="relative py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 45% at 85% 20%, rgba(57,255,20,0.045) 0%, transparent 68%)' }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 40% at 10% 75%, rgba(56,130,246,0.045) 0%, transparent 68%)' }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12" data-aos="fade-up" suppressHydrationWarning={true}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em]" style={{ color: '#39FF14' }}>
            What We&apos;ve Done
          </p>
          <h2
            className="logo-text-static max-w-md leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.01em' }}
          >
            Our Activities
          </h2>
          <span className="accent-line mt-4" />
        </div>

        {/* Category filter */}
        {!loading && categories.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2" data-aos="fade-up" suppressHydrationWarning={true}>
            {categories.map((cat) => {
              const active = filter === cat;
              const color = cat === 'All' ? '#39FF14' : (CATEGORY_COLORS[cat] ?? '#39FF14');
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    border: `1px solid ${active ? color : 'rgba(255,255,255,0.12)'}`,
                    background: active ? `${color}18` : 'transparent',
                    color: active ? color : 'rgba(255,255,255,0.45)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : visible.map((act, i) => {
                const color = CATEGORY_COLORS[act.category] ?? '#39FF14';
                return (
                  <div
                    key={act.id}
                    className="group relative flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
                    data-aos="fade-up"
                    data-aos-delay={String((i % 3) * 80)}
                    suppressHydrationWarning={true}
                  >
                    {/* Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-gray-900">
                      {act.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${STORAGE}/storage/${act.image}`}
                          alt={act.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center" style={{ background: `${color}0d` }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                        </div>
                      )}
                      {act.is_featured && (
                        <span
                          className="absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{ background: color, color: '#000' }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* Category + date */}
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{ background: `${color}18`, color }}
                        >
                          {act.category}
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {formatDate(act.date)}
                        </span>
                      </div>

                      <h3 className="mb-2 font-semibold leading-snug" style={{ color: '#E8E8E8', fontSize: '1rem' }}>
                        {act.title}
                      </h3>
                      <p className="mb-4 flex-1 line-clamp-3" style={{ color: '#505050', fontSize: '0.85rem', lineHeight: 1.7 }}>
                        {act.description}
                      </p>

                      {/* Location */}
                      {act.location && (
                        <div className="mb-3 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{act.location}</span>
                        </div>
                      )}

                      {/* Tags */}
                      {act.tags && act.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {act.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded px-2 py-0.5 text-xs"
                              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom accent line on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                      style={{ background: color, opacity: 0, transform: 'scaleX(0)' }}
                    />
                  </div>
                );
              })}
        </div>

        {!loading && visible.length === 0 && (
          <p className="text-center py-20" style={{ color: 'rgba(255,255,255,0.2)' }}>
            No activities found.
          </p>
        )}
      </div>
    </section>
  );
}
