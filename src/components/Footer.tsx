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

const TAGLINE_WORDS = [
  'Premium', 'digital', 'services', 'for', 'brands', 'that', 'demand',
  'excellence.', 'We', 'build', 'experiences', 'that', 'convert.',
];

function AnimatedTagline({ visible }: { visible: boolean }) {
  return (
    <p className="mb-6 max-w-xs leading-relaxed" style={{ fontSize: '0.875rem' }}>
      {TAGLINE_WORDS.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${0.04 + i * 0.055}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.04 + i * 0.055}s`,
            color: i === TAGLINE_WORDS.length - 1 || word === 'excellence.' ? '#222222' : '#666666',
            fontWeight: word === 'Premium' || word === 'excellence.' || word === 'convert.' ? 600 : 400,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

function AnimatedLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      className="group flex items-center gap-1.5 text-sm"
      style={{
        color: hovered ? '#111111' : '#606060',
        transition: 'color 0.22s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          display: 'inline-block',
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
          opacity: hovered ? 1 : 0,
          transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease',
          color: '#39FF14',
          fontSize: '0.7rem',
        }}
      >
        ›
      </span>
      <span
        style={{
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'transform 0.22s cubic-bezier(0.22,1,0.36,1)',
          display: 'inline-block',
        }}
      >
        {label}
      </span>
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%)', borderTop: '1px solid rgba(0,0,0,0.07)' }}
    >
      {/* Top brand accent line */}
      <div
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.5) 30%, rgba(57,255,20,0.8) 50%, rgba(57,255,20,0.5) 70%, transparent 100%)',
          transformOrigin: 'left',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">

          {/* Brand column */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            {/* Logo */}
            <div
              className="logo-text-static mb-1 select-none font-extrabold tracking-widest"
              style={{ fontSize: '1.1rem' }}
            >
              AiSAKi DiGiTAL
            </div>

            {/* Accent line under logo */}
            <div
              style={{
                height: '1.5px',
                width: '2.5rem',
                marginBottom: '1.25rem',
                background: 'linear-gradient(90deg, #39FF14, rgba(57,255,20,0.2))',
                transformOrigin: 'left',
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s',
              }}
            />

            <AnimatedTagline visible={visible} />

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    color: '#555555',
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: 'rgba(0,0,0,0.03)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
                    transition: `opacity 0.4s ease ${0.65 + i * 0.08}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${0.65 + i * 0.08}s, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = '#39FF14';
                    el.style.borderColor = 'rgba(57,255,20,0.45)';
                    el.style.background = 'rgba(57,255,20,0.06)';
                    el.style.boxShadow = '0 0 14px rgba(57,255,20,0.18)';
                    el.style.transform = 'translateY(-2px) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = '#555555';
                    el.style.borderColor = 'rgba(0,0,0,0.1)';
                    el.style.background = 'rgba(0,0,0,0.03)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Support Us Button */}
           
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items], colIdx) => (
            <div
              key={heading}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${0.28 + colIdx * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${0.28 + colIdx * 0.12}s`,
              }}
            >
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ color: '#333333' }}
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item, itemIdx) => (
                  <li
                    key={item}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-8px)',
                      transition: `opacity 0.5s ease ${0.38 + colIdx * 0.12 + itemIdx * 0.06}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.38 + colIdx * 0.12 + itemIdx * 0.06}s`,
                    }}
                  >
                    <AnimatedLink label={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.08)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.7s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s',
          }}
        >
          <p style={{ color: '#888888', fontSize: '0.75rem', letterSpacing: '0.07em' }}>
            © 2026 AiSaki Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: '#888888', letterSpacing: '0.06em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#39FF14')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Supporter Popup */}
      {showSupporterPopup && <SupporterPopup onClose={() => setShowSupporterPopup(false)} />}
    </footer>
  );
}
