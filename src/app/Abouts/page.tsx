'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { fetchTeamMembers, STORAGE, type ApiTeamMember } from '@/lib/api';

const GREEN = '#39FF14';
const DARK  = '#0a0f0a';

const stats = [
  { raw: 100, suffix: '+', label: 'Projects Delivered' },
  { raw: 4,   suffix: '+', label: 'Years Experience'   },
  { raw: 168, suffix: '+', label: 'Happy Clients'      },
  { raw: 6,   suffix: '+', label: 'Team Members'       },
];

const values = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    title: 'Excellence', desc: 'Highest standards in design, code quality, and client communication.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0M12 2v4M12 18v4M2 12h4M18 12h4" transform="rotate(45 12 12)"/></svg>,
    title: 'Innovation', desc: 'Modern, scalable solutions that keep you ahead of digital trends.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Partnership', desc: 'Your success is our success — we treat clients as long-term partners.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Reliability', desc: 'Deadlines are promises. We deliver on time, every time.',
  },
];

/* split text into word spans for word-by-word animation */
function SplitWords({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word-span inline-block" style={{ opacity: 0, marginRight: '0.28em' }}>
          {word}
        </span>
      ))}
    </span>
  );
}

function TeamCard({ member }: { member: ApiTeamMember }) {
  const [hovered, setHovered] = useState(false);
  const photoSrc = member.photo ? `${STORAGE}/storage/${member.photo}` : null;
  return (
    <div
      className="team-card text-center p-8 rounded-3xl transition-all duration-500 cursor-default"
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? GREEN : '#e5e7eb'}`,
        boxShadow: hovered
          ? `0 32px 64px rgba(57,255,20,0.15), 0 0 0 4px rgba(57,255,20,0.06)`
          : '0 4px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden"
        style={{
          background: member.color || 'rgba(57,255,20,0.1)',
          border: `3px solid ${hovered ? GREEN : '#e5e7eb'}`,
          boxShadow: hovered ? `0 0 24px rgba(57,255,20,0.4)` : 'none',
          transition: 'all 0.4s ease',
        }}>
        {photoSrc ? (
          <Image src={photoSrc} alt={member.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-black" style={{ color: GREEN }}>
            {member.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
        )}
      </div>
      <h3 className="text-base font-bold mb-1 text-gray-900">{member.name}</h3>
      <p className="text-xs font-bold uppercase tracking-widest text-green-700">{member.role}</p>
    </div>
  );
}

export default function AboutsPage() {
  const [team, setTeam] = useState<ApiTeamMember[]>([]);

  const heroRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const mvRef    = useRef<HTMLElement>(null);
  const valRef   = useRef<HTMLElement>(null);
  const teamRef  = useRef<HTMLElement>(null);
  const ctaRef   = useRef<HTMLElement>(null);
  const orbsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTeamMembers().then(setTeam).catch(() => {});
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    import('animejs').then(({ animate, onScroll, createTimeline, utils }) => {

      /* ── Floating background orbs (infinite loop) ─── */
      if (orbsRef.current) {
        orbsRef.current.querySelectorAll<HTMLElement>('.bg-orb').forEach((orb, i) => {
          const a = animate(orb, {
            translateY: [0, -32 - i * 12, 0],
            translateX: [0, 14 - i * 9, 0],
            scale:      [1, 1.1 + i * 0.05, 1],
            opacity:    [0.2, 0.5, 0.2],
            duration:   4500 + i * 1000,
            ease:       'inOut(2)',
            loop:       true,
            delay:      i * 700,
          });
          cleanups.push(() => a.revert());
        });
      }

      /* ── Hero: 3D flip timeline ──────────────────── */
      if (heroRef.current) {
        const badge  = heroRef.current.querySelector('.hero-badge')!;
        const words  = heroRef.current.querySelectorAll('.hero-title .word-span');
        const line   = heroRef.current.querySelector('.hero-line')!;
        const sub    = heroRef.current.querySelectorAll('.hero-sub');
        const btns   = heroRef.current.querySelectorAll('.hero-btn');
        const cards  = heroRef.current.querySelectorAll('.hero-stat-card');

        const tl = createTimeline({ defaults: { ease: 'outExpo' } })
          /* badge flips down from top edge */
          .add(badge, {
            opacity:  [0, 1],
            rotateX:  ['-90deg', '0deg'],
            scale:    [0.7, 1],
            duration: 700,
          })
          /* each word flips up from below like a ticker board */
          .add(words, {
            opacity:  [0, 1],
            rotateX:  ['80deg', '0deg'],
            translateY: [20, 0],
            duration: 650,
            ease:     'outBack(1.2)',
            delay:    utils.stagger(65),
          }, '-=300')
          /* underline draws left-to-right */
          .add(line, {
            scaleX:   [0, 1],
            opacity:  [0, 1],
            duration: 500,
            ease:     'outExpo',
          }, '-=200')
          /* subtitle fades up */
          .add(sub, {
            opacity:  [0, 1],
            rotateX:  ['40deg', '0deg'],
            translateY: [16, 0],
            duration: 600,
          }, '-=200')
          /* buttons flip up */
          .add(btns, {
            opacity:  [0, 1],
            rotateX:  ['60deg', '0deg'],
            translateY: [12, 0],
            scale:    [0.9, 1],
            duration: 600,
            ease:     'outBack(1.5)',
            delay:    utils.stagger(90),
          }, '-=300')
          /* side cards flip in from the right edge */
          .add(cards, {
            opacity:  [0, 1],
            rotateY:  ['70deg', '0deg'],
            translateX: [30, 0],
            scale:    [0.85, 1],
            duration: 700,
            ease:     'outBack(1.3)',
            delay:    utils.stagger(110),
          }, '-=500');

        cleanups.push(() => tl.revert());
      }

      /* ── Stats: flip up from bottom face ────────── */
      if (statsRef.current) {
        const obs = onScroll({
          target: statsRef.current,
          onEnter() {
            /* number counters */
            statsRef.current!.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
              const end = parseInt(el.dataset.val ?? '0', 10);
              const suffix = el.dataset.suffix ?? '';
              const obj = { v: 0 };
              animate(obj, {
                v: end, duration: 2000, ease: 'outExpo',
                onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
              });
            });
            /* cards flip up, each rotates on X axis */
            animate(statsRef.current!.querySelectorAll('.stat-item'), {
              opacity:    [0, 1],
              rotateX:    ['-90deg', '0deg'],
              translateY: [40, 0],
              scale:      [0.8, 1],
              duration:   750,
              ease:       'outBack(1.4)',
              delay:      utils.stagger(120),
            });
            const line = statsRef.current!.querySelector<HTMLElement>('.stats-line');
            if (line) animate(line, { scaleX: [0, 1], duration: 1200, ease: 'outExpo', delay: 300 });
          },
        });
        cleanups.push(() => obs.revert());
      }

      /* ── Mission / Vision: Y-axis door flip ─────── */
      if (mvRef.current) {
        const cards = mvRef.current.querySelectorAll<HTMLElement>('.mv-card');
        const obs = onScroll({
          target: mvRef.current,
          onEnter() {
            /* left card: hinge on right edge, opens toward viewer */
            animate(cards[0], {
              opacity:  [0, 1],
              rotateY:  ['-80deg', '0deg'],
              translateX: [-20, 0],
              scale:    [0.88, 1],
              duration: 900,
              ease:     'outExpo',
            });
            /* right card: hinge on left edge */
            animate(cards[1], {
              opacity:  [0, 1],
              rotateY:  ['80deg', '0deg'],
              translateX: [20, 0],
              scale:    [0.88, 1],
              duration: 900,
              ease:     'outExpo',
              delay:    180,
            });
          },
        });
        cleanups.push(() => obs.revert());
      }

      /* ── Values: staggered X-axis flip ──────────── */
      if (valRef.current) {
        const obs = onScroll({
          target: valRef.current,
          onEnter() {
            animate(valRef.current!.querySelectorAll('.val-head'), {
              opacity:    [0, 1],
              rotateX:    ['-60deg', '0deg'],
              translateY: [30, 0],
              duration:   700,
              ease:       'outExpo',
            });
            animate(valRef.current!.querySelectorAll('.value-card'), {
              opacity:    [0, 1],
              rotateX:    ['-75deg', '0deg'],
              translateY: [50, 0],
              scale:      [0.82, 1],
              duration:   800,
              ease:       'outBack(1.5)',
              delay:      utils.stagger(100, { start: 250 }),
            });
          },
        });
        cleanups.push(() => obs.revert());
      }

      /* ── Team: alternating Y-axis flip ──────────── */
      if (teamRef.current) {
        const obs = onScroll({
          target: teamRef.current,
          onEnter() {
            animate(teamRef.current!.querySelectorAll('.team-head'), {
              opacity:    [0, 1],
              rotateX:    ['-60deg', '0deg'],
              translateY: [30, 0],
              duration:   700,
              ease:       'outExpo',
            });
            /* odd cards flip from left, even from right */
            teamRef.current!.querySelectorAll<HTMLElement>('.team-card').forEach((card, i) => {
              animate(card, {
                opacity:  [0, 1],
                rotateY:  [i % 2 === 0 ? '-70deg' : '70deg', '0deg'],
                scale:    [0.78, 1],
                duration: 800,
                ease:     'outBack(1.3)',
                delay:    250 + i * 90,
              });
            });
          },
        });
        cleanups.push(() => obs.revert());
      }

      /* ── CTA: words flip like a scoreboard ───────── */
      if (ctaRef.current) {
        const obs = onScroll({
          target: ctaRef.current,
          onEnter() {
            const tl = createTimeline({ defaults: { ease: 'outExpo' } })
              .add(ctaRef.current!.querySelectorAll('.cta-title .word-span'), {
                opacity:    [0, 1],
                rotateX:    ['-90deg', '0deg'],
                translateY: [30, 0],
                scale:      [0.8, 1],
                duration:   700,
                ease:       'outBack(1.3)',
                delay:      utils.stagger(80),
              })
              .add(ctaRef.current!.querySelector('.cta-sub')!, {
                opacity:    [0, 1],
                rotateX:    ['-50deg', '0deg'],
                translateY: [20, 0],
                duration:   600,
              }, '-=300')
              .add(ctaRef.current!.querySelectorAll('.cta-btn'), {
                opacity:    [0, 1],
                rotateY:    ['-60deg', '0deg'],
                scale:      [0.85, 1],
                duration:   600,
                ease:       'outBack(1.5)',
                delay:      utils.stagger(100),
              }, '-=200');
            cleanups.push(() => tl.revert());
          },
        });
        cleanups.push(() => obs.revert());
      }
    });

    return () => cleanups.forEach((fn) => fn());
  }, [team]);

  return (
    <>
      <style>{`
        .flip-parent { perspective: 1400px; transform-style: preserve-3d; }
        .word-span, .team-card, .value-card, .mv-card, .stat-item, .hero-badge, .hero-btn, .hero-stat-card, .cta-btn {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .hero-line  { transform-origin: left center; }
        .stats-line { transform-origin: left center; }
      `}</style>

      <Navbar />
      <main className="min-h-screen bg-white overflow-x-hidden">

        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative pt-32 pb-28 px-6 bg-white overflow-hidden">

          {/* floating orbs */}
          <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="bg-orb absolute rounded-full"
              style={{ width: 420, height: 420, top: '-80px', right: '5%', background: 'radial-gradient(circle, rgba(57,255,20,0.1) 0%, transparent 70%)', opacity: 0.25 }} />
            <div className="bg-orb absolute rounded-full"
              style={{ width: 260, height: 260, top: '40%', right: '22%', background: 'radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)', opacity: 0.25 }} />
            <div className="bg-orb absolute rounded-full"
              style={{ width: 180, height: 180, bottom: '10%', left: '8%', background: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)', opacity: 0.25 }} />
          </div>

          <div ref={heroRef} className="relative mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">

              {/* badge */}
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-7"
                style={{ background: 'rgba(57,255,20,0.1)', color: '#15803d', border: '1px solid rgba(57,255,20,0.35)', opacity: 0 }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
                About Us
              </div>

              {/* headline — word-by-word */}
              <h1 className="hero-title text-5xl md:text-6xl font-black leading-tight mb-2 text-gray-900" style={{ display: 'block' }}>
                <SplitWords text="Building Digital" />
                <br />
                <SplitWords text="Solutions" style={{ color: '#15803d' }} />
                {' '}
                <SplitWords text="That Matter" />
              </h1>

              {/* animated underline */}
              <div className="hero-line h-1 w-40 rounded-full mb-7" style={{ background: GREEN, opacity: 0 }} />

              <p className="hero-sub text-lg leading-relaxed text-gray-500 mb-8" style={{ maxWidth: 500, opacity: 0 }}>
                Asaki Digital is a Cambodia-based digital agency delivering world-class web development,
                branding, and marketing services across Southeast Asia.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="/Activitie"
                  className="hero-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200"
                  style={{ background: DARK, color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', opacity: 0 }}>
                  Our Activities
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="/Contact"
                  className="hero-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-gray-700 hover:scale-105 transition-transform duration-200"
                  style={{ background: '#f3f4f6', border: '1.5px solid #e5e7eb', opacity: 0 }}>
                  Contact Us
                </a>
              </div>
            </div>

            {/* right stat cards */}
            <div className="hidden lg:flex flex-col gap-4 w-64">
              {[
                { label: 'Projects Delivered', value: '100+', border: `2px solid rgba(57,255,20,0.3)` },
                { label: 'Happy Clients',       value: '168+', border: `2px solid rgba(57,255,20,0.2)` },
                { label: 'Years Experience',    value: '4+',   border: `2px solid rgba(57,255,20,0.15)` },
              ].map((item) => (
                <div key={item.label} className="hero-stat-card p-5 rounded-2xl border bg-white"
                  style={{ border: item.border, boxShadow: '0 4px 20px rgba(57,255,20,0.08)', opacity: 0 }}>
                  <div className="text-3xl font-black text-gray-900 mb-1">{item.value}</div>
                  <div className="text-xs text-gray-400 font-semibold tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────── */}
        <section ref={statsRef} className="py-16 px-6 border-y border-gray-100 relative overflow-hidden" style={{ background: '#fafafa' }}>
          <div className="stats-line absolute bottom-0 left-0 h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`, transformOrigin: 'left', transform: 'scaleX(0)' }} />
          <div className="flip-parent mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="stat-item text-center" style={{ opacity: 0 }}>
                <div className="text-5xl font-black mb-2 tabular-nums" style={{ color: '#15803d' }}>
                  <span className="stat-num" data-val={s.raw} data-suffix={s.suffix}>0{s.suffix}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────── */}
        <section ref={mvRef} className="py-28 px-6 bg-white">
          <div className="flip-parent mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
                title: 'Our Mission',
                text:  'To empower businesses in Cambodia and Southeast Asia with innovative digital solutions — from elegant websites to powerful apps — that drive real growth and lasting impact.',
                accent: 'rgba(57,255,20,0.06)',
              },
              {
                icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
                title: 'Our Vision',
                text:  'To become the most trusted digital partner in the region — known for quality, reliability, and a deep commitment to helping our clients succeed in the digital era.',
                accent: 'rgba(57,255,20,0.04)',
              },
            ].map((card) => (
              <div key={card.title} className="mv-card rounded-3xl p-10 border border-gray-100 relative overflow-hidden"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)', background: card.accent, opacity: 0 }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(57,255,20,0.12)', color: '#15803d', boxShadow: '0 4px 16px rgba(57,255,20,0.15)' }}>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-black mb-4 text-gray-900">{card.title}</h2>
                <p className="text-base leading-relaxed text-gray-500">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Values ──────────────────────────── */}
        <section ref={valRef} className="py-28 px-6 relative overflow-hidden" style={{ background: '#fafafa' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(57,255,20,0.05) 0%, transparent 60%)' }} />
          <div className="mx-auto max-w-6xl">
            <div className="val-head text-center mb-16" style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                style={{ background: 'rgba(57,255,20,0.1)', color: '#15803d', border: '1px solid rgba(57,255,20,0.25)' }}>
                What Drives Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Our Core Values</h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: GREEN }} />
            </div>

            <div className="flip-parent grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="value-card p-8 rounded-3xl bg-white border border-gray-100 group hover:-translate-y-2 transition-all duration-300"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)', opacity: 0 }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: 'rgba(57,255,20,0.1)', color: '#15803d', boxShadow: '0 4px 14px rgba(57,255,20,0.12)' }}>
                    {v.icon}
                  </div>
                  <h3 className="text-base font-black mb-2 text-gray-900">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ─────────────────────────────────── */}
        <section ref={teamRef} className="py-28 px-6 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="team-head text-center mb-16" style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                style={{ background: 'rgba(57,255,20,0.1)', color: '#15803d', border: '1px solid rgba(57,255,20,0.25)' }}>
                The Team
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">Meet Our Team</h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: GREEN }} />
            </div>

            <div className="flip-parent grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section ref={ctaRef} className="py-32 px-6 relative overflow-hidden" style={{ background: '#fafafa' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(57,255,20,0.08) 0%, transparent 65%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 60%)', border: '1px solid rgba(57,255,20,0.06)' }} />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="cta-title text-4xl md:text-5xl font-black mb-5 text-gray-900 leading-tight">
              <SplitWords text="Ready to Work Together?" />
            </h2>
            <p className="cta-sub text-lg text-gray-500 mb-10" style={{ opacity: 0 }}>
              Let&apos;s turn your idea into a digital product that stands out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/Contact" className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-transform duration-200"
                style={{ background: DARK, color: '#fff', boxShadow: '0 10px 32px rgba(0,0,0,0.2)', opacity: 0 }}>
                Get In Touch
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/Product" className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-gray-700 hover:scale-105 transition-transform duration-200"
                style={{ background: '#fff', border: '1.5px solid #e5e7eb', opacity: 0 }}>
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
