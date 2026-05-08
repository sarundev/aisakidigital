'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LAUNCH_DATE = new Date('2026-06-07T00:00:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div
        className="relative flex items-center justify-center rounded-xl sm:rounded-2xl"
        style={{
          width: 'clamp(60px, 18vw, 112px)',
          height: 'clamp(68px, 20vw, 124px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="absolute top-0 left-3 right-3 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
        />
        <div
          className="absolute left-0 right-0"
          style={{ top: '50%', height: '1px', background: 'rgba(0,0,0,0.35)' }}
        />
        <span
          className="font-black tabular-nums"
          style={{ fontSize: 'clamp(1.6rem, 7vw, 3.5rem)', color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          {display}
        </span>
      </div>
      <span
        className="text-[9px] sm:text-xs font-bold uppercase"
        style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function LessionPage() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 sm:py-32"
        style={{ background: '#080c10' }}
      >
        {/* Background glow blobs */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '80vw', height: '60vh',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.08) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '-5%', left: '10%',
            width: '40vw', height: '40vh',
            background: 'radial-gradient(ellipse, rgba(57,255,20,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl text-center">

          {/* Badge */}
          <div
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:px-5 sm:py-2"
            style={{
              background: 'rgba(57,255,20,0.08)',
              border: '1px solid rgba(57,255,20,0.2)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: '#39FF14', animationDuration: '1.8s' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#39FF14' }} />
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: '#39FF14' }}>
              Coming Soon
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-black leading-snug mb-4 sm:mb-5 px-2"
            style={{
              fontSize: 'clamp(1.8rem, 8vw, 4rem)',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-khmer), sans-serif',
            }}
          >
            មេរៀន{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #39FF14 0%, #2ee60f 50%, #1db80c 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Digital Marketing
            </span>
            <br />
            កំពុងរៀបចំ
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mb-10 sm:mb-14 max-w-sm sm:max-w-md text-sm sm:text-base leading-relaxed px-2"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-khmer), sans-serif' }}
          >
            យើងកំពុងរៀបចំមាតិកាដ៏ល្អបំផុតសម្រាប់អ្នក។ សូមមើលការចុះឈ្មោះជាមុន ដើម្បីទទួលបានការជូនដំណឹងទី១។
          </p>

          {/* Countdown */}
          <div className="mb-10 sm:mb-14 flex items-start justify-center gap-2 sm:gap-4">
            <Digit value={days} label="Days" />
            <div
              className="font-black"
              style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1, fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', marginTop: '18px' }}
            >:</div>
            <Digit value={hours} label="Hours" />
            <div
              className="font-black"
              style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1, fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', marginTop: '18px' }}
            >:</div>
            <Digit value={minutes} label="Mins" />
            <div
              className="font-black"
              style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1, fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', marginTop: '18px' }}
            >:</div>
            <Digit value={seconds} label="Secs" />
          </div>

          {/* Notify form */}
          {!submitted ? (
            <div className="mx-auto flex w-full max-w-sm sm:max-w-md flex-col gap-3 px-2 sm:px-0">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl px-4 sm:px-5 py-3.5 text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  caretColor: '#39FF14',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(57,255,20,0.4)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              />
              <button
                onClick={() => { if (email.trim()) setSubmitted(true); }}
                className="w-full rounded-2xl px-6 py-3.5 text-sm font-bold transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #39FF14, #2ee60f)',
                  color: '#000000',
                  boxShadow: '0 4px 20px rgba(57,255,20,0.35)',
                }}
              >
                Notify Me
              </button>
            </div>
          ) : (
            <div
              className="mx-2 sm:mx-auto flex max-w-sm sm:max-w-md items-center gap-3 rounded-2xl px-5 py-4"
              style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2.5" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-semibold text-left" style={{ color: '#39FF14', fontFamily: 'var(--font-khmer), sans-serif' }}>
                អរគុណ! យើងនឹងជូនដំណឹងអ្នកនៅពេលដាច់ 🎉
              </span>
            </div>
          )}

          {/* Progress bar */}
          <div className="mt-12 sm:mt-16 mx-auto w-full max-w-50 sm:max-w-xs px-2 sm:px-0">
            <div className="mb-2 flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <span>Progress</span>
              <span>65%</span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '65%',
                  background: 'linear-gradient(90deg, #39FF14, #2ee60f)',
                  boxShadow: '0 0 12px rgba(57,255,20,0.6)',
                }}
              />
            </div>
            <p className="mt-2 text-center text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Content preparation underway
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
