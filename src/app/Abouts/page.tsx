'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const BRAND = {
  primary: '#39FF14',
  dark: '#0a0f0a',
  cardBg: '#111411',
  border: 'rgba(57,255,20,0.12)',
};

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '4+', label: 'Years Experience' },
  { value: '168+', label: 'Happy Clients' },
  { value: '6+', label: 'Team Members' },
];

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Excellence',
    desc: 'Highest standards in design, code quality, and client communication.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12a4 4 0 0 1 8 0M12 2v4M12 18v4M2 12h4M18 12h4" transform="rotate(45 12 12)" />
      </svg>
    ),
    title: 'Innovation',
    desc: 'Modern, scalable solutions that keep you ahead of digital trends.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partnership',
    desc: 'Your success is our success — we treat clients as long-term partners.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Reliability',
    desc: 'Deadlines are promises. We deliver on time, every time.',
  },
];

const team = [
  { name: 'T1 Faker', role: 'Founder & Lead Developer', initial: '', color: 'rgba(57,255,20,0.15)' },
  { name: 'Godd', role: 'Senior Developer', initial: '/image/godd.png', color: 'rgba(57,255,20,0.1)' },
  { name: 'Sokha', role: 'UI/UX Designer', initial: '', color: 'rgba(57,255,20,0.1)' },
  { name: 'Rithy', role: 'Marketing Lead', initial: '', color: 'rgba(57,255,20,0.1)' },
  { name: 'Dara', role: 'Project Manager', initial: '', color: 'rgba(57,255,20,0.1)' },
  { name: 'Vira', role: 'Backend Developer', initial: '', color: 'rgba(57,255,20,0.1)' },
];
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <div
      className="text-center py-8 px-4 relative"
      style={{
        animation: `fade-up 0.6s ease forwards ${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <div className="text-5xl font-black mb-2" style={{ color: BRAND.primary }}>
        {stat.value}
      </div>
      <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {stat.label}
      </div>
    </div>
  );
}

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'rgba(17,20,17,0.6)',
        border: `1px solid ${hovered ? 'rgba(57,255,20,0.35)' : 'rgba(57,255,20,0.1)'}`,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(57,255,20,0.08)' : 'none',
        animation: `fade-up 0.6s ease forwards ${index * 0.1}s`,
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(57,255,20,0.2)' : 'rgba(57,255,20,0.08)',
          color: BRAND.primary,
          border: '1px solid rgba(57,255,20,0.15)',
        }}
      >
        {value.icon}
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ color: '#fff' }}>{value.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{value.desc}</p>
    </div>
  );
}

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'rgba(17,20,17,0.6)',
        border: `1px solid ${hovered ? 'rgba(57,255,20,0.35)' : 'rgba(57,255,20,0.1)'}`,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
        animation: `fade-up 0.5s ease forwards ${index * 0.08}s`,
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden relative" style={{ 
        background: member.color || 'rgba(57,255,20,0.1)', 
        border: '2px solid rgba(57,255,20,0.2)' 
      }}>
        {member.initial && member.initial.startsWith('/') ? (
          <Image
            src={member.initial}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ color: BRAND.primary }}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-1" style={{ color: '#fff' }}>{member.name}</h3>
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: BRAND.primary }}>{member.role}</p>
    </div>
  );
}

export default function AboutsPage() {
  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.2); }
          50%      { box-shadow: 0 0 40px rgba(57,255,20,0.4); }
        }
      `}</style>

      <Navbar />
      <main className="min-h-screen" style={{ background: BRAND.dark }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(57,255,20,0.08) 0%, transparent 60%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17,20,17,0.8) 100%)' }} />
          
          <div className="relative mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
                style={{ background: 'rgba(57,255,20,0.1)', color: BRAND.primary, border: '1px solid rgba(57,255,20,0.2)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: BRAND.primary }} />
                About Us
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ color: '#fff' }}>
                Building Digital<br />
                <span style={{ color: BRAND.primary }}>Solutions</span> That<br />
                Matter
              </h1>
              
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '540px' }}>
                Asaki Digital is a Cambodia-based digital agency delivering world-class web development, 
                branding, and marketing services to businesses across Southeast Asia.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="/Activitie"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  style={{ background: BRAND.primary, color: BRAND.dark, boxShadow: '0 8px 24px rgba(57,255,20,0.35)' }}
                >
                  Our Activities
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/Contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Logo card */}
            
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-10 px-6" style={{ background: 'linear-gradient(90deg, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.02) 50%, rgba(57,255,20,0.08) 100%)', borderTop: '1px solid rgba(57,255,20,0.1)', borderBottom: '1px solid rgba(57,255,20,0.1)' }}>
          <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-10"
              style={{ 
                background: 'rgba(17,20,17,0.6)', 
                border: '1px solid rgba(57,255,20,0.12)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(57,255,20,0.12)', color: BRAND.primary }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#fff' }}>Our Mission</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                To empower businesses in Cambodia and Southeast Asia with innovative digital solutions — 
                from elegant websites to powerful apps — that drive real growth and lasting impact.
              </p>
            </div>

            <div
              className="rounded-2xl p-10"
              style={{ 
                background: 'rgba(17,20,17,0.6)', 
                border: '1px solid rgba(57,255,20,0.12)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(57,255,20,0.12)', color: BRAND.primary }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#fff' }}>Our Vision</h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                To become the most trusted digital partner in the region — known for quality, reliability, 
                and a deep commitment to helping our clients succeed in the digital era.
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-24 px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ background: 'rgba(57,255,20,0.1)', color: BRAND.primary, border: '1px solid rgba(57,255,20,0.2)' }}
              >
                What Drives Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#fff' }}>Our Core Values</h2>
              <div className="mx-auto mt-6 h-1 w-24" style={{ background: BRAND.primary, borderRadius: '4px' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <ValueCard key={i} value={v} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ background: 'rgba(57,255,20,0.1)', color: BRAND.primary, border: '1px solid rgba(57,255,20,0.2)' }}
              >
                The Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#fff' }}>Meet Our Team</h2>
              <div className="mx-auto mt-6 h-1 w-24" style={{ background: BRAND.primary, borderRadius: '4px' }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <TeamCard key={i} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(0,0,0,0.4) 100%)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(57,255,20,0.1) 0%, transparent 70%)' }} />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#fff' }}>
              Ready to Work Together?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Let&apos;s turn your idea into a digital product that stands out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/Contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: BRAND.primary, color: BRAND.dark, boxShadow: '0 8px 24px rgba(57,255,20,0.4)' }}
              >
                Get In Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/Product"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                View Products
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}