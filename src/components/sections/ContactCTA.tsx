'use client';

import { useEffect, useRef, useState } from 'react';
import { submitContact } from '@/lib/api';

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
    label: 'X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

function inputStyle(focused: boolean) {
  return {
    backgroundColor: 'rgba(0,0,0,0.03)',
    border: `1px solid ${focused ? 'rgba(57,180,0,0.55)' : 'rgba(0,0,0,0.12)'}`,
    color: '#222222',
  };
}

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const isSending = status === 'sending';

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-32 bg-white" >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(57,255,20,0.08) 0%, rgba(57,255,20,0.02) 45%, transparent 70%)' }}
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="absolute left-0 right-0 top-0 brand-divider" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center reveal">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em]" style={{ color: '#39FF14' }}>
            Let&apos;s Work Together
          </p>
          <h2
            className="logo-text-static mx-auto leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Ready to Elevate
            <br />
            Your Brand?
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed" style={{ color: '#505050', fontSize: '0.95rem' }}>
            Tell us about your project. We&apos;ll respond within 24 hours with a custom
            strategy tailored to your goals and budget.
          </p>
        </div>

        <div className="reveal reveal-delay-2 flex flex-col gap-8 md:flex-row md:gap-10 md:items-start">

          {/* Form */}
          <form className="flex-1 min-w-0" onSubmit={onSubmit}>
            {status === 'success' ? (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-2xl py-16 text-center"
                style={{ background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.15)' }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="font-semibold" style={{ color: '#39FF14', fontSize: '1rem' }}>Message sent!</p>
                <p style={{ color: '#606060', fontSize: '0.875rem' }}>We&apos;ll get back to you within 24 hours.</p>
                <button
                  type="button"
                  className="mt-2 text-xs underline"
                  style={{ color: '#404040' }}
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={onChange}
                    required
                    disabled={isSending}
                    className="flex-1 rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-200 disabled:opacity-50"
                    style={inputStyle(focused === 'name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={onChange}
                    required
                    disabled={isSending}
                    className="flex-1 rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-200 disabled:opacity-50"
                    style={inputStyle(focused === 'email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject / Service Needed"
                  value={form.subject}
                  onChange={onChange}
                  disabled={isSending}
                  className="rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-200 disabled:opacity-50"
                  style={inputStyle(focused === 'subject')}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                />
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={onChange}
                  required
                  disabled={isSending}
                  className="rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-200 resize-none disabled:opacity-50"
                  style={inputStyle(focused === 'message')}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />

                {status === 'error' && (
                  <p className="text-xs" style={{ color: '#ff4444' }}>{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-green w-full rounded-xl py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Info panel */}
          <div
            className="shrink-0 md:w-64 lg:w-72 rounded-2xl p-7"
            style={{
              background: 'rgba(57,255,20,0.03)',
              border: '1px solid rgba(57,255,20,0.1)',
              borderLeft: '3px solid rgba(57,255,20,0.25)',
            }}
          >
            <p className="mb-6 font-semibold" style={{ color: '#A0A0A0', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
              Or reach us directly
            </p>

            <div className="flex flex-col gap-5">
              <a href="mailto:hello@asakidigital.com" className="flex items-start gap-3 group">
                <span className="mt-0.5 shrink-0" style={{ color: '#39FF14' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span
                  className="text-sm leading-snug"
                  style={{ color: '#606060', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#39FF14')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#606060')}
                >
                  hello@asakidigital.com
                </span>
              </a>

              <a href="tel:+1234567890" className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: '#39FF14' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                </span>
                <span
                  className="text-sm leading-snug"
                  style={{ color: '#606060', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#39FF14')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#606060')}
                >
                  +1 (234) 567-890
                </span>
              </a>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0" style={{ color: '#39FF14' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span className="text-sm leading-snug" style={{ color: '#606060' }}>
                  Mon–Fri · 9am – 6pm ICT
                </span>
              </div>
            </div>

            <div className="my-6 brand-divider" />

            <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: '#404040' }}>Follow us</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                  style={{ color: '#555555', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(0,0,0,0.03)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#39FF14';
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#555555';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
