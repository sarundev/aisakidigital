'use client';

import { useEffect, useRef } from 'react';
import TypewriterText from '@/components/TypewriterText';

const STATS = [
  { value: '50+',  label: 'Projects\nDelivered'  },
  { value: '30+',  label: 'Happy\nClients'       },
  { value: '3+',   label: 'Years of\nExpertise'  },
  { value: '100%', label: 'Client\nSatisfaction' },
];

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
      className="relative flex  flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.32]" />

      {/* Ambient green glow — top-right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-12%', right: '-8%',
          width: 'clamp(380px, 55vw, 780px)',
          height: 'clamp(380px, 55vw, 780px)',
          background: 'radial-gradient(circle, rgba(57,255,20,0.09) 0%, rgba(57,255,20,0.03) 50%, transparent 68%)',
          filter: 'blur(48px)',
        }}
      />

      {/* Ambient green glow — bottom-left */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: '-8%', left: '-6%',
          width: 'clamp(280px, 40vw, 580px)',
          height: 'clamp(280px, 40vw, 580px)',
          background: 'radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Bottom fade to white */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{ height: 180, background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="reveal relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-24 text-center"
      >
        {/* Eyebrow */}
        <div
          className="mb-10 inline-flex items-center gap-3"
          style={{ animation: 'fade-in 0.7s ease 0.15s both' }}
        >
          <span style={{ display: 'block', width: 36, height: 1, background: '#39FF14', flexShrink: 0 }} />
          <span className="text-xs font-bold uppercase" style={{ color: '#39FF14', letterSpacing: '0.48em' }}>
            Premium Digital Services
          </span>
          <span style={{ display: 'block', width: 36, height: 1, background: '#39FF14', flexShrink: 0 }} />
        </div>

        {/* Animated headline */}
        <TypewriterText />

        {/* Description */}
      
      
        <p
          className="relative mx-auto max-w-xl "
    
        >
       <b> AisakiDigital </b> is a trusted digital marketing agency in Cambodia specializing in Facebook Ads, TikTok growth, and online business promotion.
        </p>
      

        {/* CTA buttons */}
        {/* <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'fade-in 0.8s ease 1.05s both' }}
        >
          <a href="#contact" className="btn-green rounded-full text-sm font-bold tracking-wide" style={{ padding: '14px 36px' }}>
            Start a Project →
          </a>
          <a href="#work" className="btn-outline rounded-full text-sm font-semibold" style={{ padding: '14px 36px' }}>
            View Our Work
          </a>
        </div> */}

        {/* Stats bar */}
       
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5"
        style={{ animation: 'fade-in 1s ease 2s both' }}
      >
        
        
      </div>
    </section>
  );
}
