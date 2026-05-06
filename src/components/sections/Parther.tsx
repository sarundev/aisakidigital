'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchPartners, STORAGE, type ApiPartner } from '@/lib/api';

function PartnerCard({ name, slug, abbr, logo, website_url }: ApiPartner) {
  const [hasError, setHasError] = useState(false);

  const logoSrc = logo
    ? `${STORAGE}/storage/${logo}`
    : `/image/partners/${slug}.png`;

  const card = (
    <div
      className="logo-cards bg-whiteut group flex shrink-0 cursor-default items-center gap-4 px-5 py-4 transition-all duration-300"
      
    >
      <div
        className="flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-[100vh]"

      >
        {hasError ? (
          <span
            className="font-extrabold tracking-widest"
           
          >
            {abbr}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt={name}
            className="h-full w-full object-contain p-2 rounded-[100vh]"
            
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* <span
        className="whitespace-nowrap text-sm font-semibold transition-colors duration-300"
        style={{ color: '#252525', letterSpacing: '0.03em' }}
      >
        {name}
      </span> */}
    </div>
  );

  return website_url ? (
    <a href={website_url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
      {card}
    </a>
  ) : card;
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 40,
}: {
  items: ApiPartner[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
       
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
       
      />
      <div
        className="flex gap-3"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((p, i) => (
          <PartnerCard key={`${p.id}-${i}`} {...p} />
        ))}
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex gap-3 overflow-hidden px-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex shrink-0 animate-pulse items-center gap-4 rounded-2xl px-5 py-4"
          style={{ minWidth: '12rem', background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div className="h-11 w-16 rounded-xl" style={{ background: 'rgba(0,0,0,0.06)' }} />
          <div className="h-3 w-20 rounded" style={{ background: 'rgba(0,0,0,0.06)' }} />
        </div>
      ))}
    </div>
  );
}

export default function Parther() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [rowOne, setRowOne] = useState<ApiPartner[]>([]);
  const [rowTwo, setRowTwo] = useState<ApiPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners()
      .then((partners) => {
        setRowOne(partners.filter((p) => p.row === 1));
        setRowTwo(partners.filter((p) => p.row === 2));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-28 bg-white" 
   
    >
      <div
        className="pointer-events-none absolute inset-0 bg-white"
        

      />
      <div className="absolute left-0 right-0 top-0 brand-divider" />
      <div className="absolute bottom-0 left-0 right-0 brand-divider" />

      <div className="relative mx-auto mb-16 max-w-7xl px-6">
        <div className="flex flex-col items-center text-center reveal">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] bg-wh" >
            Partners &amp; Clients
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
            ដៃគួរសហការ
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.25em]" style={{ color: '#2A2A2A' }}>
            Trusted by Industry Leaders
          </p>
          <p className="mt-4 max-w-md leading-relaxed" style={{ color: '#363636', fontSize: '0.875rem' }}>
            We partner with ambitious brands across every industry — from startups
            to established enterprises — to deliver results that matter.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 reveal reveal-delay-2">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <>
            {rowOne.length > 0 && <MarqueeRow items={rowOne} speed={44} />}
            {rowTwo.length > 0 && <MarqueeRow items={rowTwo} reverse speed={38} />}
          </>
        )}
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-6 reveal reveal-delay-3">
        <div
          className="grid grid-cols-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          {[
            { value: '50+', label: 'Brands Served' },
            { value: '12',  label: 'Industry Sectors' },
            { value: '98%', label: 'Retention Rate' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8"
              style={{ borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
            >
              <span
                className="font-extrabold leading-none"
              
              >
                {s.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest" style={{ color: '#303030' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
