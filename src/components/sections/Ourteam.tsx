'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface MediaItem {
  id: number;
  title: string;
  image_url: string;
  image_path: string;
}

function repeatToFill<T>(items: T[], minCount = 8): T[] {
  if (items.length === 0) return [];
  const times = Math.ceil(minCount / items.length);
  return Array.from({ length: times }).flatMap(() => items);
}

export default function Ourteam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [members, setMembers] = useState<MediaItem[]>([]);
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/media')
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

  const track = repeatToFill(members);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: '#F8F9FA' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '10%', right: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 50%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto py-4 px-6">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-green-600">
            Our Team
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
            Media Crew
          </h2>
          <p className="mx-auto max-w-md leading-relaxed text-gray-600">
            Creative media team providing photography, videography, editing, and social media content for brands, businesses, and events.
          </p>
        </div>

        {/* Scrolling Marquee */}
        <div className="relative overflow-hidden reveal reveal-delay-2">
          {/* Desktop */}
          <div className="relative hidden md:block">
            <div
              className="flex gap-6"
              style={{ animation: 'marquee-reverse 40s linear infinite', width: 'max-content' }}
            >
              {track.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500"
                  style={{ width: '1260px', height: '820px'}}
                  onClick={() => setLightbox(member)}
                >
                  <Image
                    src={member.image_url}
                    alt={member.title}
                    fill
                    sizes="380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 flex items-center justify-center rounded-full"
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
            {track.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="group relative shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
                style={{ width: '220px', height: '290px' }}
                onClick={() => setLightbox(member)}
              >
                <Image
                  src={member.image_url}
                  alt={member.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  quality={85}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
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
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image_url}
              alt={lightbox.title}
              fill
              sizes="96vw"
              className="rounded-2xl object-contain shadow-2xl"
              quality={95}
            />
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-medium text-white"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
            >
              {lightbox.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
