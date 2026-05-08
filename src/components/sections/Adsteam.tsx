'use client';

import { useEffect, useRef, useState } from 'react';

const ADS_TEAM_MEMBERS = [
  {
    name: 'Alex Rivera',
    role: 'Ads Strategist',
    bio: 'Expert in PPC campaigns and conversion optimization.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*dwLGnkgwmMSU7XN7Yojo1g.png',
  },
  {
    name: 'Emma Chen',
    role: 'Social Media Manager',
    bio: 'Creative content strategist for social platforms.',
    image: 'https://www.khmertimeskh.com/wp-content/uploads/2024/02/77358.jpg',
  },
  {
    name: 'David Kim',
    role: 'Performance Analyst',
    bio: 'Data-driven specialist in ad performance metrics.',
    image: 'https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/659710989_10163010663344538_4828030643583982676_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3_u2dbo0BncQ7kNvwEKn23w&_nc_oc=AdpY4jt_IQ4dHymTHnAFW5ufrR442NSk0u37zqKwaYMhwz99dmexUAyiDsLgopxJjWw&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=zK3fUJN7OxM5MRvlHugfQA&_nc_ss=7b289&oh=00_Af4pKjqPUwt7hk4J8bqtOtNA6tK-v6roPZKdthLV8Y7E7w&oe=6A00E09E',
  },
  {
    name: 'Lisa Wong',
    role: 'Creative Director',
    bio: 'Innovative designer crafting compelling ad visuals.',
    image: 'https://cambodiainvestmentreview.com/wp-content/uploads/2026/01/photo_2026-01-21_17-15-36.jpg',
  },
];

export default function Adsteam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ image: string; name: string } | null>(null);

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
      className="relative overflow-hidden py-28"
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
          <div className="relative hidden md:block">
            <div
              className="flex gap-5"
              style={{
                animation: 'marquee-reverse 40s linear infinite',
                width: 'max-content',
              }}
            >
              {[...ADS_TEAM_MEMBERS, ...ADS_TEAM_MEMBERS].map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
                  style={{ width: '1260px', height: '820px' }}
                  onClick={() => setLightbox({ image: member.image, name: member.name })}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full"
                      style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1.5px solid rgba(255,255,255,0.4)' }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className=" flex gap-6 md:hidden"
            style={{
              animation: 'marquee-reverse 40s linear infinite',
              width: 'max-content',
            }}
          >
            {[...ADS_TEAM_MEMBERS, ...ADS_TEAM_MEMBERS].map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 shrink-0 cursor-pointer"
                style={{ width: '280px' }}
                onClick={() => setLightbox({ image: member.image, name: member.name })}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
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
            src={lightbox.image}
            alt={lightbox.name}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.currentTarget.src = '/image/ads-team/placeholder.jpg'; }}
          />
        </div>
      )}
    </section>
  );
}