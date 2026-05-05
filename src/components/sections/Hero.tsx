'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const CYCLING_WORDS = ['Experiences', 'Brands', 'Products', 'Solutions'];
const STATIC_WORDS = ['We', 'Build', 'Digital'];

const STATS = [
  { value: '50+',  label: 'Projects\nDelivered' },
  { value: '30+',  label: 'Happy\nClients' },
  { value: '3+',   label: 'Years of\nExpertise' },
  { value: '100%', label: 'Client\nSatisfaction' },
];

function AnimatedHeadline() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const advance = useCallback(() => {
    setPhase('out');
    setTimeout(() => {
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
      setPhase('in');
    }, 430);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(advance, 2800);
    return () => clearInterval(id);
  }, [mounted, advance]);

  return (
    <h1
      className="mx-auto max-w-5xl leading-none select-none"
      style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', fontWeight: 800, letterSpacing: '-0.025em' }}
    >
      <span className="block">
        {STATIC_WORDS.map((word, i) => (
          <span key={word} style={{ display: 'inline-block', marginRight: '0.22em' }}>
            <span
              className="word-reveal"
              style={{
                animationDelay: `${0.12 + i * 0.16}s`,
                background: 'linear-gradient(160deg, #0a0a0a 0%, #2a2a2a 50%, #4a4a4a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>

      <span
        className="block mt-2 overflow-hidden"
        style={{ height: '1.15em', position: 'relative' }}
      >
        <span
          key={`${wordIndex}-${phase}`}
          className={phase === 'in' ? 'cycle-word-in' : 'cycle-word-out'}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            display: 'block',
            background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 50%, #39FF14 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 28px rgba(57,255,20,0.4))',
          }}
        >
          {CYCLING_WORDS[wordIndex]}
        </span>
      </span>
    </h1>
  );
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add('visible'));
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden grain"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f7f9fc 55%, #eef1f6 100%)' }}
    >
      {/* Floating gradient orbs */}
      <div className="orb orb-green" />
      <div className="orb orb-blue" />
      <div className="orb orb-violet" />

      {/* Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* Radial vignette center spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.9) 0%, transparent 70%)' }}
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to bottom, transparent, #eef1f6)' }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="reveal relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-20 text-center"
      >
        {/* Eyebrow badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.22)' }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#39FF14', boxShadow: '0 0 6px #39FF14' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: '#1a7a05' }}>
            Premium Digital Services
          </span>
        </div>

        <AnimatedHeadline />

        <p
          className="mx-auto mt-8 max-w-lg leading-relaxed"
          style={{ color: '#606060', fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)', letterSpacing: '0.01em' }}
        >
          AiSaki Digital crafts high-performance websites, brand identities,
          and digital strategies that elevate your brand and drive real results.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="btn-green rounded-full px-9 py-3.5 text-sm">
            Start a Project →
          </a>
          <a href="#work" className="btn-outline rounded-full px-9 py-3.5 text-sm">
            View Our Work
          </a>
        </div>

        {/* Stats bar — glass card */}
        <div
          className="glass mx-auto mt-16 grid max-w-2xl grid-cols-4 rounded-2xl"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className="flex flex-col items-center justify-center py-5 px-3"
              style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}
            >
              <span
                className="font-extrabold leading-none"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #111 0%, #39FF14 120%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-1.5 text-center leading-tight"
                style={{ color: '#777777', fontSize: '0.67rem', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'pre-line' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <div
          className="scroll-indicator flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', color: '#39FF14' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
