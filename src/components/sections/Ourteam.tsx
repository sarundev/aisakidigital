'use client';

import { useEffect, useRef } from 'react';

const TEAM_MEMBERS = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years in digital innovation.',
    image: 'https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/media_large_image/public/thumbnail_Social%20Work_20200520_1.jpg.webp?itok=e4H4KzLv',
  },
  {
    name: 'Jane Smith',
    role: 'Creative Director',
    bio: 'Award-winning designer passionate about user experience.',
    image: 'https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/659710989_10163010663344538_4828030643583982676_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=3_u2dbo0BncQ7kNvwEKn23w&_nc_oc=AdpY4jt_IQ4dHymTHnAFW5ufrR442NSk0u37zqKwaYMhwz99dmexUAyiDsLgopxJjWw&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=zK3fUJN7OxM5MRvlHugfQA&_nc_ss=7b289&oh=00_Af4pKjqPUwt7hk4J8bqtOtNA6tK-v6roPZKdthLV8Y7E7w&oe=6A00E09E',
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack expert specializing in modern web technologies.',
    image: 'https://cambodiainvestmentreview.com/wp-content/uploads/2026/01/photo_2026-01-21_17-15-36.jpg',
  },
  {
    name: 'Sarah Lee',
    role: 'Marketing Specialist',
    bio: 'Strategist focused on brand growth and digital marketing.',
    image: 'https://meascam.com/wp-content/uploads/2023/03/Conventional-Media_.jpg',
  },
];

export default function Ourteam() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="team"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: '#F8F9FA' }}
    >

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '10%', right: '10%',
          width: '300px',
          height: '300px',
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
            Meet the Experts
          </h2>
          <p className="mx-auto max-w-md leading-relaxed text-gray-600">
            Our diverse team of professionals brings together expertise in design, development, and strategy to deliver exceptional results.
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
            className="flex gap-6"
            style={{
              animation: 'marquee-reverse 40s linear infinite',
              width: 'max-content',
            }}
          >
            {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex-shrink-0"
                 style={{ width: '1260px', height: '820px' }}
              >
                <div className=" overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/image/team/placeholder.jpg';
                    }}
                  />
                </div>
               
              </div>
            ))}
          </div>
          </div>
          <div
            className="flex gap-6 md:hidden"
            style={{
              animation: 'marquee-reverse 40s linear infinite',
              width: 'max-content',
            }}
          >
            {[...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex-shrink-0"
                style={{ width: '280px' }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/image/team/placeholder.jpg';
                    }}
                  />
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}