'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years of Experience' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5', label: 'Expert Team Members' },
];

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards in design, code quality, and client communication.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Innovation',
    desc: 'We stay ahead of digital trends to bring modern, scalable solutions to every project.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partnership',
    desc: 'We treat every client as a long-term partner, not just a project — your success is our success.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Reliability',
    desc: 'Deadlines are promises. We deliver on time and maintain clear communication throughout.',
  },
];

const team = [
  {
    name: 'Bong Run',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer with expertise in React, Next.js, and modern web technologies.',
    initial: 'BR',
  },
  {
    name: 'Design Team',
    role: 'UI/UX Designers',
    bio: 'Creative designers focused on user-centered experiences and pixel-perfect interfaces.',
    initial: 'DT',
  },
  {
    name: 'Dev Team',
    role: 'Software Engineers',
    bio: 'Skilled engineers building robust, scalable digital products for our clients.',
    initial: 'DV',
  },
];

export default function AboutsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-6" style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f6f0 100%)' }}>
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-14">
            <div className="flex-1" data-aos="fade-right" suppressHydrationWarning={true}>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#2d6a2d' }}
              >
                Who We Are
              </p>
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ color: '#1a1a1a' }}>
                Building Digital<br />
                <span style={{ color: '#2d6a2d' }}>Solutions</span> That<br />
                Matter
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#555555', maxWidth: '520px' }}>
                Asaki Digital is a Cambodia-based digital agency delivering world-class web development,
                branding, and marketing services to businesses across Southeast Asia.
              </p>
              <a
                href="/Activitie"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#2d6a2d' }}
              >
                View Our Activities
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Logo card */}
            <div className="shrink-0" data-aos="fade-left" suppressHydrationWarning={true}>
              <div
                className="w-72 h-72 rounded-3xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #f5f7f5 0%, #e8f0e8 100%)',
                  border: '1px solid #dde8dd',
                  boxShadow: '0 20px 60px rgba(45,106,45,0.12)',
                }}
              >
                <Image
                  src="/image/asakidigital.png"
                  alt="Asaki Digital"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 px-6" style={{ backgroundColor: '#2d6a2d' }}>
          <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#ffffff' }}>{s.value}</div>
                <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#ffffff' }}>
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10">
            <div
              className="rounded-2xl p-10"
              style={{ backgroundColor: '#f5f7f5', border: '1px solid #dde8dd' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#2d6a2d', color: '#ffffff' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>Our Mission</h2>
              <p className="text-base leading-relaxed" style={{ color: '#555555' }}>
                To empower businesses in Cambodia and Southeast Asia with innovative digital solutions —
                from elegant websites to powerful apps — that drive real growth and lasting impact.
              </p>
            </div>

            <div
              className="rounded-2xl p-10"
              style={{ backgroundColor: '#f5f7f5', border: '1px solid #dde8dd' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: '#2d6a2d', color: '#ffffff' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>Our Vision</h2>
              <p className="text-base leading-relaxed" style={{ color: '#555555' }}>
                To become the most trusted digital partner in the region — known for quality, reliability,
                and a deep commitment to helping our clients succeed in the digital era.
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#f5f7f5' }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2d6a2d' }}>
                What Drives Us
              </p>
              <h2 className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>Our Core Values</h2>
              <div className="mx-auto mt-4 h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #dde8dd', boxShadow: '0 2px 12px rgba(45,106,45,0.06)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#eef4ee', color: '#2d6a2d' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#1a1a1a' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-24 px-6" style={{ backgroundColor: '#ffffff' }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2d6a2d' }}>
                The People Behind It
              </p>
              <h2 className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>Meet Our Team</h2>
              <div className="mx-auto mt-4 h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: '#f5f7f5', border: '1px solid #dde8dd', boxShadow: '0 2px 12px rgba(45,106,45,0.06)' }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-5"
                    style={{ backgroundColor: '#2d6a2d', color: '#ffffff' }}
                  >
                    {member.initial}
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#1a1a1a' }}>{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#2d6a2d' }}>{member.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-24 px-6"
          style={{ background: 'linear-gradient(135deg, #1a3d1a 0%, #2d6a2d 100%)' }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Ready to Work Together?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Let&apos;s turn your idea into a digital product that stands out.
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
        </section>

      </main>
      <Footer />
    </>
  );
}
