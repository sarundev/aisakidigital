'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPortfolio, STORAGE, type ApiPortfolioItem } from '@/lib/api';

const CARD_PALETTES = [
  {
    bg: 'linear-gradient(135deg, #0f4c35 0%, #1a6b4a 60%, #0d3d2b 100%)',
    thumb: 'linear-gradient(135deg, #0d3d2b 0%, #1a6b4a 50%, #25a06e 100%)',
    accent: '#4ade80',
    accentDim: 'rgba(74,222,128,0.15)',
    accentBorder: 'rgba(74,222,128,0.3)',
    text: '#bbf7d0',
    textDim: '#6ee7b7',
    overlayBg: 'rgba(9,44,28,0.65)',
    btnBg: '#4ade80',
    btnText: '#052e16',
  },
  {
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)',
    thumb: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #6366f1 100%)',
    accent: '#a5b4fc',
    accentDim: 'rgba(165,180,252,0.15)',
    accentBorder: 'rgba(165,180,252,0.3)',
    text: '#e0e7ff',
    textDim: '#a5b4fc',
    overlayBg: 'rgba(17,15,60,0.65)',
    btnBg: '#818cf8',
    btnText: '#1e1b4b',
  },
  {
    bg: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 60%, #4c1d95 100%)',
    thumb: 'linear-gradient(135deg, #3b0764 0%, #7c3aed 50%, #a855f7 100%)',
    accent: '#d8b4fe',
    accentDim: 'rgba(216,180,254,0.15)',
    accentBorder: 'rgba(216,180,254,0.3)',
    text: '#f3e8ff',
    textDim: '#d8b4fe',
    overlayBg: 'rgba(46,16,101,0.65)',
    btnBg: '#c084fc',
    btnText: '#3b0764',
  },
  {
    bg: 'linear-gradient(135deg, #7c2d12 0%, #b45309 60%, #78350f 100%)',
    thumb: 'linear-gradient(135deg, #431407 0%, #c2410c 50%, #f97316 100%)',
    accent: '#fdba74',
    accentDim: 'rgba(253,186,116,0.15)',
    accentBorder: 'rgba(253,186,116,0.3)',
    text: '#ffedd5',
    textDim: '#fdba74',
    overlayBg: 'rgba(60,20,8,0.65)',
    btnBg: '#fb923c',
    btnText: '#431407',
  },
  {
    bg: 'linear-gradient(135deg, #134e4a 0%, #0f766e 60%, #134e4a 100%)',
    thumb: 'linear-gradient(135deg, #042f2e 0%, #0d9488 50%, #2dd4bf 100%)',
    accent: '#5eead4',
    accentDim: 'rgba(94,234,212,0.15)',
    accentBorder: 'rgba(94,234,212,0.3)',
    text: '#ccfbf1',
    textDim: '#5eead4',
    overlayBg: 'rgba(4,28,27,0.65)',
    btnBg: '#2dd4bf',
    btnText: '#042f2e',
  },
  {
    bg: 'linear-gradient(135deg, #881337 0%, #be185d 60%, #881337 100%)',
    thumb: 'linear-gradient(135deg, #4c0519 0%, #e11d48 50%, #fb7185 100%)',
    accent: '#fda4af',
    accentDim: 'rgba(253,164,175,0.15)',
    accentBorder: 'rgba(253,164,175,0.3)',
    text: '#fff1f2',
    textDim: '#fda4af',
    overlayBg: 'rgba(60,5,20,0.65)',
    btnBg: '#f43f5e',
    btnText: '#4c0519',
  },
];

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-56 w-full" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="p-7 space-y-3">
        <div className="h-3 w-1/4 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="h-5 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="h-3 w-full rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="h-3 w-4/5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  );
}

function PlaceholderGraphic({ accent }: { accent: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" opacity="0.2">
      <circle cx="45" cy="45" r="40" stroke={accent} strokeWidth="1" />
      <circle cx="45" cy="45" r="24" stroke={accent} strokeWidth="1" />
      <circle cx="45" cy="45" r="8" stroke={accent} strokeWidth="1" />
      <circle cx="45" cy="45" r="3" fill={accent} />
      <line x1="45" y1="5" x2="45" y2="85" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="5" y1="45" x2="85" y2="45" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
      <line x1="16" y1="16" x2="74" y2="74" stroke={accent} strokeWidth="0.4" />
      <line x1="74" y1="16" x2="16" y2="74" stroke={accent} strokeWidth="0.4" />
    </svg>
  );
}

function PortfolioCard({ item, index }: { item: ApiPortfolioItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const palette = CARD_PALETTES[index % CARD_PALETTES.length];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-350"
      style={{
        background: palette.bg,
        border: hovered ? `1.5px solid ${palette.accent}` : '1.5px solid rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${palette.accentBorder}`
          : '0 4px 24px rgba(0,0,0,0.35)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      data-aos="fade-up"
      data-aos-delay={String((index % 2) * 150)}
      suppressHydrationWarning={true}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative flex h-56 items-center justify-center overflow-hidden"
        style={{ background: item.image ? undefined : palette.thumb }}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${STORAGE}/storage/${item.image}`}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <PlaceholderGraphic accent={palette.accent} />
        )}

        {/* Category badge */}
        <span
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: palette.accentDim,
            border: `1px solid ${palette.accentBorder}`,
            color: palette.accent,
            letterSpacing: '0.08em',
            backdropFilter: 'blur(8px)',
          }}
        >
          {item.category}
        </span>

        {/* Tags badge */}
        {item.tags && item.tags.length > 0 && (
          <span
            className="absolute left-4 bottom-4 rounded-full px-3 py-1 text-xs font-bold"
            style={{
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: palette.text,
              letterSpacing: '0.06em',
              backdropFilter: 'blur(8px)',
            }}
          >
            {item.tags.slice(0, 2).join(' · ')}
          </span>
        )}

        {/* Hover overlay */}
        <a
          href={item.url ?? '#contact'}
          target={item.url ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ backgroundColor: palette.overlayBg, opacity: hovered ? 1 : 0 }}
        >
          <span
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold"
            style={{ background: palette.btnBg, color: palette.btnText, letterSpacing: '0.08em' }}
          >
            View Project&nbsp;&nbsp;→
          </span>
        </a>

        {/* Bottom gradient fade into card body */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
          style={{ background: `linear-gradient(to bottom, transparent, ${palette.bg.includes('0f4c35') ? 'rgba(15,76,53,0.9)' : 'rgba(0,0,0,0.3)'})` }}
        />
      </div>

      {/* Content */}
      <div className="p-7">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-[0.35em]"
          style={{ color: palette.accent }}
        >
          {item.category}
        </p>
        <h3
          className="mb-3 font-bold leading-snug"
          style={{ color: palette.text, fontSize: '1.15rem' }}
        >
          {item.title}
        </h3>
        {item.description && (
          <p style={{ color: palette.textDim, fontSize: '0.875rem', lineHeight: 1.75 }}>
            {item.description}
          </p>
        )}

        {/* Tag pills at bottom */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: palette.accentDim,
                  border: `1px solid ${palette.accentBorder}`,
                  color: palette.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
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

        <div className="grid gap-6 md:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
