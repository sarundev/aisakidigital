'use client';

import { useEffect, useRef, useState } from 'react';

interface Ad {
  id: number;
  title: string;
  image_path: string;
  image_url: string;
  sort_order: number;
}

function repeatToFill<T>(items: T[], minCount = 8): T[] {
  if (items.length === 0) return [];
  const times = Math.ceil(minCount / items.length);
  return Array.from({ length: times }).flatMap(() => items);
}

export default function Adsteam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ image_url: string; title: string } | null>(null);
  const [members, setMembers] = useState<Ad[]>([]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? 'https://aisakiadmin.com/api/v1';
    fetch(`${base}/ads`)
      .then((r) => r.json())
      .then(setMembers)
      .catch(() => {});
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

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <section
      ref={sectionRef}
      id="ads-team"
      className="relative overflow-hidden md:py-28 py-1"
    //   style={{ backgroundColor: '#F8F9FA' }}
    >


      <div className="relative mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-green-600">
            Ads Team
          </p>
          <h2
            className="logo-text-static leading-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
              fontFamily: 'var(--font-khmer), sans-serif',
            }}
          >
            Advertising Experts
          </h2>
          <p className="mx-auto max-w-md leading-relaxed text-gray-600">
            Our dedicated ads team specializes in driving results through strategic campaigns, creative content, and data-driven insights.
          </p>
        </div>

        {/* Team Scrolling Marquee */}
        <div className="relative overflow-hidden reveal reveal-delay-2">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
            // style={{
            //   background: 'linear-gradient(to right, rgba(248,249,250,1), rgba(248,249,250,0))',
            // }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
            // style={{
            //   background: 'linear-gradient(to left, rgba(248,249,250,1), rgba(248,249,250,0))',
            // }}
          />
          {/* Desktop */}
          <div className="relative hidden md:block">
            <div
              className="flex gap-6"
              style={{ animation: 'marquee-reverse 40s linear infinite', width: 'max-content' }}
            >
              {repeatToFill(members).map((member, index) => (
                <div
                  key={`${member.title}-${index}`}
                  className="group relative shrink-0 w-full cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
                  style={{ width:'1260px', height: '820px' }}
                  onClick={() => setLightbox({ image_url: member.image_url, title: member.title })}
                >
                  <img
                    src={member.image_url}
                    alt={member.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
                  />
                  {/* Zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full"
                      style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1.5px solid rgba(255,255,255,0.4)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div
            className="flex gap-4 md:hidden"
            style={{ animation: 'marquee-reverse 40s linear infinite', width: 'max-content' }}
          >
            {repeatToFill(members).map((member, index) => (
              <div
                key={`${member.title}-${index}`}
                className="group relative shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
                style={{ width: '320px', height: '290px' }}
                onClick={() => setLightbox({ image_url: member.image_url, title: member.title })}
              >
                <img
                  src={member.image_url}
                  alt={member.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
                >
                  <p className="text-white font-semibold text-xs truncate">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
            onClick={() => setLightbox(null)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.image_url}
            alt={lightbox.title}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
          />
        </div>
      )}
    </section>
  );
}