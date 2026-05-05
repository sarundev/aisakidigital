'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-40">
      {/* Glass background — fades in on scroll */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={scrolled ? {
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        } : { background: 'transparent' }}
      />

      {/* Top green accent line */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          background:
            'linear-gradient(90deg, transparent 5%, rgba(57,255,20,0.45) 40%, rgba(57,255,20,0.65) 50%, rgba(57,255,20,0.45) 60%, transparent 95%)',
        }}
      />

      {/* Nav content */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
      
<Image src="/image/asakidigital.png" alt="AiSaki Digital" height={36} width={160} className="object-contain" id="home" />

    \
    
        

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-base">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-black rounded-full px-6 py-3 text-sm">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{ color: '#505050', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#39FF14')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#505050')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 8h18M3 16h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="relative z-10 flex flex-col gap-1 px-6 pb-6 md:hidden"
          style={{
            background: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link py-3.5"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-green mt-3 rounded-full px-5 py-3.5 text-center text-xs"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
