'use client';

import { useEffect, useRef, useState } from 'react';
import SupporterPopup from './SupporterPopup';

const LINKS = {
  Services: ['Web Design', 'Brand Identity', 'Digital Marketing', 'Mobile Apps', 'SEO & Growth'],
  Company:  ['About Us', 'Our Work', 'Careers', 'Blog', 'Contact'],
};

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const LEGAL_ITEMS = [
  {
    title: 'Privacy Policy',
    desc: 'Learn how we protect and handle your data',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Terms of Service',
    desc: 'Read our terms and conditions',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 6h14" />
        <path d="M5 6l-2 5h4L5 6z" />
        <path d="M19 6l-2 5h4l-2-5z" />
        <path d="M3 11a2 2 0 004 0" />
        <path d="M17 11a2 2 0 004 0" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    title: 'FAQ',
    desc: 'Find answers to common questions',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
];

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <ellipse key={`a${i}`} cx="600" cy="300" rx={60 + i * 60} ry={40 + i * 42}
          fill="none" stroke="rgba(57,255,20,0.08)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <ellipse key={`b${i}`} cx="100" cy="520" rx={30 + i * 55} ry={20 + i * 38}
          fill="none" stroke="rgba(57,255,20,0.05)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse key={`c${i}`} cx="1100" cy="80" rx={40 + i * 50} ry={28 + i * 36}
          fill="none" stroke="rgba(57,255,20,0.05)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={`d${i}`} cx="1050" cy="500" rx={25 + i * 45} ry={18 + i * 32}
          fill="none" stroke="rgba(57,255,20,0.04)" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={`e${i}`} cx="150" cy="100" rx={20 + i * 40} ry={15 + i * 30}
          fill="none" stroke="rgba(57,255,20,0.04)" strokeWidth="1" />
      ))}
    </svg>
  );
}

function AnimatedLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      className="flex items-center gap-1.5 text-sm"
      style={{ color: hovered ? '#111111' : 'rgba(80,80,80,0.7)', transition: 'color 0.22s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        display: 'inline-block',
        transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
        opacity: hovered ? 1 : 0,
        transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease',
        color: '#39FF14',
        fontSize: '0.7rem',
      }}>›</span>
      <span style={{
        transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
        transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
        display: 'inline-block',
      }}>{label}</span>
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showSupporterPopup, setShowSupporterPopup] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #eef1f6 55%, #f0f4f8 100%)' }}
    >
      {/* Topographic background */}
      <div className="pointer-events-none absolute inset-0">
        <TopoBackground />
      </div>

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%)', filter: 'blur(48px)' }} />
      <div className="pointer-events-none absolute bottom-16 right-1/4 h-56 w-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)', filter: 'blur(36px)' }} />

      {/* Top accent line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.5) 30%, rgba(57,255,20,0.9) 50%, rgba(57,255,20,0.5) 70%, transparent 100%)',
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s',
      }} />

      <div className="relative mx-auto max-w-7xl px-6 py-2">

        {/* ── Main content grid ── */}
       

        {/* ── Legal Information section ── */}
        <div className="mt-2">
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.35), transparent)',
            marginBottom: '3rem',
          }} />

          <h3
            className="mb-8 text-center text-xl font-semibold"
            style={{
              color: '#111111',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.45s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.45s',
            }}
          >
            Legal Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            {LEGAL_ITEMS.map((item, i) => (
              <a
                key={item.title}
                href="#"
                className="group flex flex-col items-center gap-4 rounded-2xl px-6 py-8 text-center"
                style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${0.52 + i * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.52 + i * 0.1}s, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(57,255,20,0.45)';
                  el.style.background = 'rgba(255,255,255,0.9)';
                  el.style.boxShadow = '0 8px 32px rgba(57,255,20,0.12), 0 0 0 1px rgba(57,255,20,0.15), inset 0 1px 0 rgba(255,255,255,0.95)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(0,0,0,0.08)';
                  el.style.background = 'rgba(255,255,255,0.72)';
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)';
                }}
              >
                {/* Icon container */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    border: '1px solid rgba(57,255,20,0.3)',
                    background: 'rgba(57,255,20,0.07)',
                  }}
                >
                  {item.icon}
                </div>

                <div className="font-semibold" style={{ color: '#111111', fontSize: '0.95rem' }}>
                  {item.title}
                </div>
                <div style={{ color: 'rgba(80,80,80,0.7)', fontSize: '0.8rem', lineHeight: 1.55 }}>
                  {item.desc}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.75s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.75s',
          }}
        >
          <p style={{ color: 'rgba(80,80,80,34.55)', fontSize: '0.75rem', letterSpacing: '0.07em' }}>
            © 2026 AisakiDigital . All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.8)' }} />
            <span style={{ color: 'rgba(80,80,80,24.45)', fontSize: '0.62rem', letterSpacing: '0.18em', fontFamily: 'monospace' }}>
             AisakiDigital 
            </span>
          </div>
        </div>
      </div>

      {showSupporterPopup && <SupporterPopup onClose={() => setShowSupporterPopup(false)} />}
    </footer>
  );
}
