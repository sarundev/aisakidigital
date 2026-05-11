'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;

    const tick = () => {
      current += current < 80 ? Math.random() * 4 + 2 : Math.random() * 1.2 + 0.3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setTimeout(() => {
          setFadingOut(true);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 500);
        }, 300);
        return;
      }
      setProgress(Math.min(current, 100));
      const delay = current < 80 ? 60 : 120;
      setTimeout(tick, delay);
    };

    const id = setTimeout(tick, 80);
    return () => clearTimeout(id);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${fadingOut ? 'loading-fade-out' : ''}`}
      style={{ backgroundColor: '#04060E' }}
    >
      {/* Green spotlight — top-right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 88% 5%, rgba(57,255,20,0.22) 0%, rgba(57,255,20,0.07) 45%, transparent 68%)',
        }}
      />
      {/* Cool-blue ambient fill — bottom-left for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 8% 95%, rgba(56,130,246,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-6 px-8 text-center">
        {/* Logo wordmark */}
       <h1
  className="logo-text select-none text-nowrap "
  style={{
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 900,
    letterSpacing: '0.06em',
    lineHeight: 1,
    textTransform: 'uppercase',

    background:
      'linear-gradient(135deg, #E8FFE8 0%, #5CFF72 35%, #00E83A 65%, #009E2F 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',

    textShadow:
      '0 0 18px rgba(0, 255, 85, 0.35), 0 0 42px rgba(0, 255, 85, 0.18)',
    filter: 'drop-shadow(0 8px 24px rgba(0, 255, 85, 0.16))',
  }}
>
  AISAKi DiGiTAL
</h1>
<img src="/image/cover.png" width={300} height={300} alt="" />

        {/* Tagline */}
        <p
          className="tagline-text"
          style={{
            color: '#707070',
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          Digital Service Agency
        </p>

        {/* Progress bar */}
        <div className="mt-6 w-full" style={{ maxWidth: '340px' }}>
          <div
            className="progress-shimmer relative h-[3px] w-full overflow-hidden rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #1aff00 0%, #39FF14 60%, #8fff00 100%)',
                boxShadow: '0 0 10px #39FF14, 0 0 22px rgba(57,255,20,0.45)',
              }}
            />
          </div>

          {/* Percentage */}
          <div
            className="mt-3 text-right tabular-nums"
            style={{
              color: 'rgba(57,255,20,0.7)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              fontFamily: 'var(--font-geist-mono, monospace)',
            }}
          >
            {Math.round(progress).toString().padStart(3, '0')}%
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-8"
        style={{
          color: 'rgba(255,255,255,0.18)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        © 2026 AiSaki Digital
      </div>
    </div>
  );
}
