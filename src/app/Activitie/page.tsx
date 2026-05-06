'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import AOS from 'aos';
import { fetchActivities, STORAGE, type ApiActivity } from '@/lib/api';

// ─── Animations ────────────────────────────────────────────────────────────────

const KEYFRAMES = `
@keyframes lineGrow {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes diamondPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(45,106,45,0.55), 0 0 0 0 rgba(45,106,45,0.25); }
  60%      { box-shadow: 0 0 0 8px rgba(45,106,45,0.12), 0 0 0 16px rgba(45,106,45,0.04); }
}
@keyframes yearDrop {
  0%   { opacity:0; transform: translateY(-20px) scale(0.85); }
  70%  { transform: translateY(4px) scale(1.03); }
  100% { opacity:1; transform: translateY(0) scale(1); }
}
@keyframes tagSlide {
  from { opacity:0; transform: translateX(-10px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes logoFloat {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-5px); }
}
`;

const CATEGORY_COLORS: Record<string, string> = {
  Workshop:   '#2d6a2d',
  Conference: '#1e40af',
  Community:  '#b45309',
  Training:   '#6d28d9',
  Exhibition: '#be185d',
  Event:      '#0f766e',
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-7 animate-pulse"
      style={{ background: '#ebebeb', border: '1px solid #d5e4d5', maxWidth: '380px', width: '100%' }}
    >
      <div className="h-12 w-24 rounded mb-3" style={{ background: '#d0ddd0' }} />
      <div className="h-5 w-3/4 rounded mb-2" style={{ background: '#d8ead8' }} />
      <div className="h-4 w-1/3 rounded-full mb-4" style={{ background: '#d8ead8' }} />
      <div className="h-px w-full mb-4" style={{ background: '#c8d8c8' }} />
      <div className="space-y-2">
        <div className="h-3 w-full rounded" style={{ background: '#e0e8e0' }} />
        <div className="h-3 w-4/5 rounded" style={{ background: '#e0e8e0' }} />
        <div className="h-3 w-2/3 rounded" style={{ background: '#e0e8e0' }} />
      </div>
    </div>
  );
}

function ActivityCard({ item, index }: { item: ApiActivity; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = CATEGORY_COLORS[item.category] ?? '#2d6a2d';
  const year = new Date(item.date).getFullYear().toString();
  const dateLabel = new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div
      className="rounded-2xl p-7 transition-all duration-300 cursor-default"
      style={{
        background: '#ebebeb',
        border: hovered ? `1.5px solid ${accent}` : '1px solid #d5e4d5',
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)`
          : '0 2px 16px rgba(45,106,45,0.07)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        maxWidth: '380px',
        width: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year */}
      <div
        className="font-black leading-none mb-1"
        style={{
          fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
          color: accent,
          animation: 'yearDrop 0.6s cubic-bezier(0.22,1,0.36,1) both',
          animationDelay: `${index * 120 + 200}ms`,
        }}
      >
        {year}
      </div>

      {/* Date */}
      <p className="text-xs mb-3" style={{ color: '#888888' }}>{dateLabel}</p>

      {/* Title */}
      <h3 className="font-bold leading-snug mb-1 text-xl" style={{ color: accent }}>
        {item.title}
      </h3>

      {/* Category badge */}
      <span
        className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
        style={{
          background: '#d8ead8',
          color: '#1a4a1a',
          animation: 'tagSlide 0.5s ease both',
          animationDelay: `${index * 120 + 350}ms`,
        }}
      >
        {item.category}
      </span>

      {/* Location */}
      {item.location && (
        <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: '#666666' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {item.location}
        </div>
      )}

      {/* Divider */}
      <div
        className="mb-4 h-px"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#444444' }}>
        {item.description}
      </p>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-xs"
              style={{ background: '#d8ead8', color: '#1a4a1a' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Featured badge */}
      {item.is_featured && (
        <div className="mb-3 flex items-center gap-1 text-xs font-bold" style={{ color: accent }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill={accent}>
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          Featured
        </div>
      )}

      {/* Arrow */}
      {/* <div
        className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
        style={{ color: hovered ? accent : '#aaaaaa' }}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s' }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        View Details
      </div> */}
    </div>
  );
}

function DiamondConnector({ index }: { index: number }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-10"
      data-aos="zoom-in"
      data-aos-delay={String(index * 120)}
      suppressHydrationWarning={true}
    >
      <div
        className="w-5 h-5 rotate-45"
        style={{
          background: '#2d6a2d',
          animation: `diamondPulse 2.8s ease-in-out ${index * 0.3}s infinite`,
        }}
      />
    </div>
  );
}

function ActivityImageBox({ image, alt, index }: { image: string; alt: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="hidden md:flex shrink-0 items-center justify-center rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        width: '180px',
        height: '120px',
        background: '#ffffff',
        border: hovered ? '1.5px solid #2d6a2d' : '1px solid #dde8dd',
        boxShadow: hovered ? '0 8px 24px rgba(45,106,45,0.18)' : '0 2px 12px rgba(0,0,0,0.06)',
        animation: `logoFloat 4s ease-in-out ${index * 0.5}s infinite`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-up"
      data-aos-delay={String(index * 120 + 100)}
      suppressHydrationWarning={true}
    >
      <Image
        src={`${STORAGE}/storage/${image}`}
        alt={alt}
        width={180}
        height={120}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Fallback data shown when API is unreachable ───────────────────────────────

const FALLBACK: ApiActivity[] = [
  { id: 1, title: 'Asaki Digital Launch', category: 'Event', description: 'Full-stack web development, UI/UX design, and digital marketing solutions for Cambodia and Southeast Asia.', date: '2025-01-01', location: 'Phnom Penh', image: null, tags: ['Launch', 'Web', 'Agency'], is_featured: true, is_active: true, sort_order: 1 },
  { id: 2, title: 'E-Commerce Platform', category: 'Workshop', description: 'Custom storefronts, payment integration, inventory management systems and real-time order tracking.', date: '2024-06-15', location: null, image: null, tags: ['E-Commerce', 'Payments'], is_featured: false, is_active: true, sort_order: 2 },
  { id: 3, title: 'Brand Identity Projects', category: 'Training', description: '20+ brand identity packages delivered for SMEs across Southeast Asia.', date: '2024-03-10', location: 'Online', image: null, tags: ['Branding', 'Design'], is_featured: false, is_active: true, sort_order: 3 },
  { id: 4, title: 'Mobile App Development', category: 'Community', description: 'iOS & Android apps, React Native, cross-platform solutions and custom mobile UI kits.', date: '2023-09-20', location: null, image: null, tags: ['Mobile', 'React Native'], is_featured: false, is_active: true, sort_order: 4 },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ActivitiePage() {
  const [lineReady, setLineReady] = useState(false);
  const [activities, setActivities] = useState<ApiActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, duration: 750, easing: 'ease-out-cubic' });
    const t = setTimeout(() => setLineReady(true), 300);

    fetchActivities()
      .then(setActivities)
      .catch(() => setActivities(FALLBACK))
      .finally(() => setLoading(false));

    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: `${activities.length || '—'}`, label: 'Activities' },
    { value: `${activities.filter(a => a.is_featured).length || '—'}`, label: 'Featured' },
    { value: `${new Set(activities.map(a => a.category)).size || '—'}`, label: 'Categories' },
    { value: `${new Set(activities.map(a => new Date(a.date).getFullYear())).size || '—'}`, label: 'Years' },
  ];

  return (
    <>
      <style>{KEYFRAMES}</style>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-6" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f6f0 100%)' }}>
          <div className="mx-auto max-w-6xl text-center">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              data-aos="fade-up" suppressHydrationWarning={true}
              style={{ color: '#2d6a2d' }}
            >
              Our Journey
            </p>
            <h1
              className="font-black leading-tight mb-4"
              data-aos="fade-up" data-aos-delay="80" suppressHydrationWarning={true}
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', color: '#1a1a1a' }}
            >
              Activities &amp; <span style={{ color: '#2d6a2d' }}>Milestones</span>
            </h1>
            <p
              className="text-base leading-relaxed mx-auto max-w-md"
              data-aos="fade-up" data-aos-delay="160" suppressHydrationWarning={true}
              style={{ color: '#555555' }}
            >
              A chronicle of our growth — every event, every milestone that shaped who we are today.
            </p>
            <div
              className="mx-auto mt-6 h-px w-20"
              data-aos="fade-up" data-aos-delay="240" suppressHydrationWarning={true}
              style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }}
            />
          </div>
        </section>

       

        {/* ── Timeline ── */}
        <section className="px-4 md:px-8 pb-24 pt-8" style={{ backgroundColor: '#ffffff' }}>
          <div className="mx-auto max-w-6xl">
            <div className="relative">

              {/* Animated center vertical line */}
              {!loading && (
                <div
                  className="hidden md:block absolute top-0 bottom-0 pointer-events-none"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2px',
                    background: 'linear-gradient(to bottom, #2d6a2d 0%, #c8d8c8 40%, #c8d8c8 95%, transparent 100%)',
                    transformOrigin: 'top',
                    animation: lineReady ? 'lineGrow 1.6s cubic-bezier(0.22,1,0.36,1) both' : 'none',
                    opacity: lineReady ? 1 : 0,
                  }}
                />
              )}

              {/* Loading skeletons */}
              {loading && (
                <div className="space-y-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="relative flex items-center min-h-48 py-8">
                      <div className="w-[calc(50%-16px)] flex justify-end pr-8">
                        {i % 2 === 0 && <SkeletonCard />}
                      </div>
                      <div className="relative shrink-0" style={{ width: '32px' }}>
                        <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 bg-gray-200" />
                      </div>
                      <div className="w-[calc(50%-16px)] flex justify-start pl-8">
                        {i % 2 !== 0 && <SkeletonCard />}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop timeline rows */}
              {!loading && (
                <div className="space-y-0">
                  {activities.map((item, index) => {
                    const side = index % 2 === 0 ? 'right' : 'left';
                    return (
                      <div key={item.id} className="relative flex items-center min-h-48 py-8">

                        {/* Left half */}
                        <div className="w-[calc(50%-16px)] flex items-center justify-end pr-8 gap-6">
                          {side === 'left' ? (
                            <div
                              className="flex items-center gap-6 w-full justify-end"
                              data-aos="fade-right"
                              data-aos-delay={String(index * 80)}
                              suppressHydrationWarning={true}
                            >
                              <ActivityCard item={item} index={index} />
                            </div>
                          ) : item.image ? (
                            <div className="flex justify-end w-full">
                              <ActivityImageBox image={item.image} alt={item.title} index={index} />
                            </div>
                          ) : null}
                        </div>

                        {/* Center diamond */}
                        <div className="relative shrink-0" style={{ width: '32px' }}>
                          <DiamondConnector index={index} />
                        </div>

                        {/* Right half */}
                        <div className="w-[calc(50%-16px)] flex items-center justify-start pl-8 gap-6">
                          {side === 'right' ? (
                            <div
                              className="flex items-center gap-6 w-full"
                              data-aos="fade-left"
                              data-aos-delay={String(index * 80)}
                              suppressHydrationWarning={true}
                            >
                              <ActivityCard item={item} index={index} />
                              {item.image && <ActivityImageBox image={item.image} alt={item.title} index={index} />}
                            </div>
                          ) : null}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* End cap dot */}
              {!loading && activities.length > 0 && (
                <div className="hidden md:flex justify-center mt-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    data-aos="zoom-in" data-aos-delay="400" suppressHydrationWarning={true}
                    style={{ background: '#c8d8c8', boxShadow: '0 0 0 4px #f0f6f0' }}
                  />
                </div>
              )}

              {/* Empty state */}
              {!loading && activities.length === 0 && (
                <div className="py-24 text-center">
                  <p style={{ color: '#888888' }}>No activities yet. Add some from the admin panel.</p>
                </div>
              )}

              {/* Mobile layout */}
              {!loading && (
                <div className="md:hidden -mt-4">
                  {activities.map((item, index) => {
                    const accent = CATEGORY_COLORS[item.category] ?? '#2d6a2d';
                    const year = new Date(item.date).getFullYear();
                    return (
                      <div
                        key={`mobile-${item.id}`}
                        className="flex gap-5 py-4"
                        data-aos="fade-up"
                        data-aos-delay={String(index * 80)}
                        suppressHydrationWarning={true}
                      >
                        {/* Left accent line */}
                        <div className="flex flex-col items-center shrink-0 pt-3">
                          <div
                            className="w-3.5 h-3.5 rotate-45 shrink-0"
                            style={{
                              background: accent,
                              boxShadow: `0 0 0 3px #eef4ee, 0 0 0 4px ${accent}`,
                              animation: `diamondPulse 2.8s ease-in-out ${index * 0.3}s infinite`,
                            }}
                          />
                          {index < activities.length - 1 && (
                            <div className="w-px flex-1 mt-2" style={{ background: '#c8d8c8' }} />
                          )}
                        </div>

                        {/* Card */}
                        <div className="flex-1 pb-4">
                          <div
                            className="rounded-2xl p-6"
                            style={{ background: '#ebebeb', border: '1px solid #d5e4d5', boxShadow: '0 2px 12px rgba(45,106,45,0.07)' }}
                          >
                            <div className="font-black leading-none mb-1 text-5xl" style={{ color: accent }}>
                              {year}
                            </div>
                            <p className="text-xs mb-2" style={{ color: '#888888' }}>
                              {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            <h3 className="text-xl font-bold mb-1" style={{ color: accent }}>{item.title}</h3>
                            <span
                              className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                              style={{ background: '#d8ead8', color: '#1a4a1a' }}
                            >
                              {item.category}
                            </span>
                            {item.location && (
                              <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: '#666666' }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {item.location}
                              </div>
                            )}
                            <div className="mb-3 h-px" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                            <p className="text-sm leading-relaxed mb-3" style={{ color: '#444444' }}>{item.description}</p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags.slice(0, 4).map((tag) => (
                                  <span key={tag} className="rounded-full px-2 py-0.5 text-xs" style={{ background: '#d8ead8', color: '#1a4a1a' }}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.image && (
                              <div className="mt-4 rounded-xl overflow-hidden" style={{ height: '120px' }}>
                                <Image
                                  src={`${STORAGE}/storage/${item.image}`}
                                  alt={item.title}
                                  width={380}
                                  height={120}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        {/* <section
          className="py-20 px-6"
          style={{ background: 'linear-gradient(135deg, #1a3d1a 0%, #2d6a2d 100%)' }}
          data-aos="fade-up" suppressHydrationWarning={true}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Ready to Be Our Next Milestone?
            </h2>
            <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Join the growing list of businesses we&apos;ve helped build and grow digitally.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#ffffff', color: '#2d6a2d' }}
            >
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section> */}

      </main>
      <Footer />
    </>
  );
}
