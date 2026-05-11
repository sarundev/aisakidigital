'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'PRODUCT', href: '/Product' },
  { label: 'SERVICE', href: '/Service' },
  { label: 'LESSION', href: '/Lession' },
  { label: 'WEB&APP', href: '/Webs' },
  { label: 'ABOUT', href: '/Abouts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const logoRef      = useRef<HTMLAnchorElement>(null);
  const logoGlowRef  = useRef<HTMLDivElement>(null);
  const topBarRef    = useRef<SVGPathElement>(null);
  const middleBarRef = useRef<SVGPathElement>(null);
  const bottomBarRef = useRef<SVGPathElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuLogoRef  = useRef<HTMLDivElement>(null);
  const linkRefs     = useRef<HTMLLIElement[]>([]);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  /* ─── logo animations ─── */
  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -22 },
      { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: 0.15 }
    );
    gsap.to(logoGlowRef.current, {
      opacity: 0.75,
      scale: 1.18,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const handleLogoEnter = () => {
    const tl = gsap.timeline();
    tl.to(logoRef.current, { x: -3, duration: 0.04, ease: 'none' })
      .to(logoRef.current, { x: 4,  duration: 0.04, ease: 'none' })
      .to(logoRef.current, { x: -2, duration: 0.04, ease: 'none' })
      .to(logoRef.current, { x: 0,  duration: 0.04, ease: 'none' })
      .to(logoRef.current, {
          scale: 1.055,
          filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.8)) drop-shadow(0 0 4px rgba(57,255,20,0.5))',
          duration: 0.25,
          ease: 'power2.out',
        }, '-=0.04');
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      filter: 'drop-shadow(0 0 0px rgba(57,255,20,0))',
      x: 0,
      duration: 0.35,
      ease: 'power2.inOut',
    });
  };

  /* ─── hamburger morphs ─── */
  const morphToX = () => {
    gsap.to(middleBarRef.current, { duration: 0.15, opacity: 0, scaleX: 0, transformOrigin: 'center', ease: 'power2.in' });
    gsap.to(topBarRef.current,    { duration: 0.35, rotation: 45,  y:  7, ease: 'power3.out', delay: 0.06 });
    gsap.to(bottomBarRef.current, { duration: 0.35, rotation: -45, y: -7, ease: 'power3.out', delay: 0.06 });
  };
  const morphToBurger = () => {
    gsap.to(topBarRef.current,    { duration: 0.3, rotation: 0, y: 0, ease: 'power3.out' });
    gsap.to(bottomBarRef.current, { duration: 0.3, rotation: 0, y: 0, ease: 'power3.out' });
    gsap.to(middleBarRef.current, { duration: 0.2, opacity: 1, scaleX: 1, ease: 'power2.out', delay: 0.1 });
  };

  /* ─── open / close ─── */
  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
    morphToX();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    morphToBurger();
    const tl = gsap.timeline({ onComplete: () => setMenuMounted(false) });
    tl.to(linkRefs.current, {
        opacity: 0, y: 28, filter: 'blur(6px)',
        duration: 0.22, stagger: { each: 0.04, from: 'end' }, ease: 'power2.in',
      })
      .to([ctaRef.current, dividerRef.current], { opacity: 0, duration: 0.18 }, '-=0.18')
      .to(menuLogoRef.current, { opacity: 0, duration: 0.15 }, '-=0.1')
      .to(menuPanelRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power3.in' }, '-=0.15')
      .to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.4');
  };

  /* ─── scroll listener ─── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ─── menu open animation ─── */
  useEffect(() => {
    if (!menuMounted || !menuOpen) return;

    gsap.set(overlayRef.current,  { opacity: 0 });
    gsap.set(menuPanelRef.current, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(menuLogoRef.current,  { opacity: 0, y: -12 });
    gsap.set(dividerRef.current,   { opacity: 0, scaleX: 0, transformOrigin: 'left' });
    gsap.set(linkRefs.current,     { opacity: 0, y: 44, filter: 'blur(10px)' });
    gsap.set(ctaRef.current,       { opacity: 0, y: 20 });

    const tl = gsap.timeline();
    tl.to(overlayRef.current,   { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .to(menuPanelRef.current,  { clipPath: 'inset(0 0 0% 0)', duration: 0.58, ease: 'power3.out' }, '-=0.15')
      .to(menuLogoRef.current,   { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.25')
      .to(dividerRef.current,    { opacity: 1, scaleX: 1, duration: 0.4, ease: 'power2.out' }, '-=0.15')
      .to(linkRefs.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.5, stagger: 0.075, ease: 'power3.out',
        }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }, '-=0.25');
  }, [menuMounted, menuOpen]);

  /* ─── body scroll lock ─── */
  useEffect(() => {
    document.body.style.overflow = menuMounted ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuMounted]);

  /* ─── active link from URL ─── */
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <>
      {/* ════════════════════════ NAVBAR BAR ════════════════════════ */}
      <nav
        className="fixed left-0 right-0 top-0 z-40"
        style={{
          transition: 'box-shadow 0.45s ease',
          background: 'linear-gradient(90deg, rgba(9,10,10,1) 0%, rgba(17,102,53,1) 100%)',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Bottom accent line (scroll) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.45s ease',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.35) 25%, rgba(57,255,20,0.7) 50%, rgba(57,255,20,0.35) 75%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-3.5">

          {/* Logo */}
          <a
            ref={logoRef}
            href="/"
            className="relative z-10 shrink-0 inline-flex"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            style={{ willChange: 'transform, filter' }}
          >
            {/* Ambient glow behind logo */}
            <div
              ref={logoGlowRef}
              className="pointer-events-none absolute -inset-4 -z-10 opacity-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.22) 0%, transparent 68%)',
                filter: 'blur(12px)',
              }}
            />
            <Image
              src="/image/asakidigital.png"
              alt="AiSaki Digital"
              height={34}
              width={148}
              className="object-contain"
            />
          </a>

          {/* ── Desktop: centered links (absolute) ── */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
            <div className="pointer-events-auto flex items-center">
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative px-5 py-2"
                    onClick={() => setActiveLink(link.href)}
                  >
                    <span
                      style={{
                        color: isActive ? '#39FF14' : 'rgba(205,205,205,0.82)',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        letterSpacing: '0.07em',
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        transition: 'color 0.22s ease',
                      }}
                      className="group-hover:text-[#39FF14]"
                    >
                      {link.label}
                    </span>
                    {/* Active / hover dot indicator */}
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? '2rem' : '',
                        background: '#39FF14',
                        boxShadow: '0 0 8px rgba(57,255,20,0.8)',
                      }}
                    />
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-8"
                      style={{ background: 'rgba(57,255,20,0.5)' }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Desktop: CTA ── */}
         

          {/* ── Mobile: hamburger ── */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label="Toggle menu"
            style={{
              border: `1px solid ${menuOpen ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.09)'}`,
              background: menuOpen ? 'rgba(57,255,20,0.07)' : 'rgba(255,255,255,0.04)',
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={menuOpen ? '#39FF14' : '#aaaaaa'} strokeWidth="2.2" strokeLinecap="round">
              <path ref={topBarRef}    d="M4 6h16" />
              <path ref={middleBarRef} d="M4 12h16" />
              <path ref={bottomBarRef} d="M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ════════════════════════ MOBILE FULLSCREEN MENU ════════════════════════ */}
      {menuMounted && (
        <>
          {/* Dim veil */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,3,0,0.6)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
          />

          {/* Full panel */}
          <div
            ref={menuPanelRef}
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            style={{
              background: 'linear-gradient(145deg, #060a07 0%, #091509 60%, #060a07 100%)',
              clipPath: 'inset(0 0 100% 0)',
              overflow: 'hidden',
            }}
          >
            {/* ── Decorative grid ── */}
            <div
              className="pointer-events-none  absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(57,255,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,1) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
                opacity: 0.025,
              }}
            />

            {/* ── Glow orbs ── */}
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(57,255,20,0.18) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            <div
              className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* ── Panel header ── */}
            <div ref={menuLogoRef} className="flex items-center justify-between  pt-6 pb-4">
              <Image src="/image/asakidigital.png" alt="AiSaki Digital" height={30} width={130} className="object-contain" />
              <button
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  border: '1px solid rgba(57,255,20,0.25)',
                  background: 'rgba(57,255,20,0.07)',
                  color: '#39FF14',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(57,255,20,0.14)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(57,255,20,0.07)'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Divider ── */}
            <div
              ref={dividerRef}
              className="mx-7 mb-8 h-px"
              style={{ background: 'linear-gradient(90deg, rgba(57,255,20,0.45) 0%, transparent 100%)' }}
            />

            {/* ── Nav links ── */}
            <ul className="flex flex-1 flex-col  px-7 ">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  ref={(el) => { linkRefs.current[i] = el!; }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-5 py-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onClick={() => { setActiveLink(link.href); closeMenu(); }}
                  >
                    {/* Label */}
                    <span
                      style={{
                        color: activeLink === link.href ? '#39FF14' : 'rgba(235,235,235,0.8)',
                        fontSize: '1.55rem',
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        lineHeight: 1.15,
                        transition: 'color 0.22s ease, letter-spacing 0.3s ease',
                      }}
                      className="group-hover:text-[#39FF14] group-hover:tracking-wide"
                    >
                      {link.label}
                    </span>

                    {/* Hover arrow */}
                    <span
                      className="ml-auto translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ color: '#39FF14' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* ── Footer CTA ── */}
            <div ref={ctaRef} className="px-7 pb-10 pt-6">
              <div
                className="mb-6 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.2), transparent)' }}
              />

              <div className="mt-7 flex items-center justify-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: '#39FF14', boxShadow: '0 0 10px rgba(57,255,20,0.9)' }}
                />
                <span
                  style={{ color: 'rgba(255,255,255,25.18)', fontSize: '0.58rem', letterSpacing: '0.18em', fontFamily: 'monospace' }}
                >
                  AisakiDigital  © 2025
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
