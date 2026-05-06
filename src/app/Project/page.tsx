'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProjects, STORAGE, type ApiProject } from '@/lib/api';

// ─── Card header palette (colorful top band) ──────────────────────────────────

const PALETTES = [
  { header: 'linear-gradient(135deg, #0f4c35 0%, #1a7a52 60%, #0d3d2b 100%)', accent: '#16a34a', accentLight: '#dcfce7', accentBorder: '#bbf7d0' },
  { header: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 60%, #1e1b4b 100%)', accent: '#4f46e5', accentLight: '#eef2ff', accentBorder: '#c7d2fe' },
  { header: 'linear-gradient(135deg, #4a1d96 0%, #7c3aed 60%, #4a1d96 100%)', accent: '#7c3aed', accentLight: '#f5f3ff', accentBorder: '#ddd6fe' },
  { header: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 60%, #78350f 100%)', accent: '#ea580c', accentLight: '#fff7ed', accentBorder: '#fed7aa' },
  { header: 'linear-gradient(135deg, #134e4a 0%, #0f766e 60%, #134e4a 100%)', accent: '#0d9488', accentLight: '#f0fdfa', accentBorder: '#99f6e4' },
  { header: 'linear-gradient(135deg, #881337 0%, #be185d 60%, #881337 100%)', accent: '#e11d48', accentLight: '#fff1f2', accentBorder: '#fecdd3' },
  { header: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0c4a6e 100%)', accent: '#0284c7', accentLight: '#f0f9ff', accentBorder: '#bae6fd' },
  { header: 'linear-gradient(135deg, #365314 0%, #4d7c0f 60%, #365314 100%)', accent: '#65a30d', accentLight: '#f7fee7', accentBorder: '#d9f99d' },
];

const STATUS_CONFIG = {
  Completed:     { color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', dot: '#16a34a', label: 'Completed' },
  'In Progress': { color: '#d97706', bg: '#fef3c7', border: '#fde68a', dot: '#f59e0b', label: 'In Progress' },
  Upcoming:      { color: '#64748b', bg: '#f1f5f9', border: '#cbd5e1', dot: '#94a3b8', label: 'Upcoming' },
};

// ─── Fallback data ─────────────────────────────────────────────────────────────

const FALLBACK: ApiProject[] = [
  {
    id: 1, title: 'Asaki Digital Platform', category: 'Web Development',
    description: 'Full company website with CMS, pricing management, portfolio showcase, and contact automation.',
    image: null, url: null, tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    year: '2025', status: 'Completed', client: 'Asaki Digital', is_featured: true, is_active: true, sort_order: 1,
  },
  {
    id: 2, title: 'E-Commerce Storefront', category: 'E-Commerce',
    description: 'Multi-vendor marketplace with Stripe payments, inventory tracking, and real-time order updates.',
    image: null, url: null, tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    year: '2024', status: 'Completed', client: 'RetailCo KH', is_featured: true, is_active: true, sort_order: 2,
  },
  {
    id: 3, title: 'Restaurant Booking App', category: 'Mobile',
    description: 'iOS & Android reservation app with QR menus, SMS reminders, and live table availability.',
    image: null, url: null, tags: ['React Native', 'Expo', 'Twilio', 'Firebase'],
    year: '2024', status: 'Completed', client: 'Phnom Penh Bistro', is_featured: false, is_active: true, sort_order: 3,
  },
  {
    id: 4, title: 'SaaS Analytics Dashboard', category: 'Dashboard',
    description: 'Admin panel with real-time charts, user management, billing, and role-based access control.',
    image: null, url: null, tags: ['Next.js', 'Chart.js', 'Prisma', 'Redis'],
    year: '2024', status: 'In Progress', client: 'DataFlow Inc.', is_featured: false, is_active: true, sort_order: 4,
  },
  {
    id: 5, title: 'Brand Identity System', category: 'Design & Branding',
    description: 'Complete visual identity including logo, typography, color system, and digital brand guidelines.',
    image: null, url: null, tags: ['Figma', 'Illustrator', 'Brand Strategy'],
    year: '2024', status: 'Completed', client: 'StartupKH', is_featured: false, is_active: true, sort_order: 5,
  },
  {
    id: 6, title: 'Property Listing Portal', category: 'Web Development',
    description: 'Real estate platform with map search, virtual tours, agent profiles, and mortgage calculator.',
    image: null, url: null, tags: ['Next.js', 'Google Maps', 'Supabase'],
    year: '2023', status: 'Completed', client: 'KH Properties', is_featured: false, is_active: true, sort_order: 6,
  },
  {
    id: 7, title: 'Healthcare Patient Portal', category: 'Web Development',
    description: 'Secure patient management system with appointment scheduling, records, and telemedicine integration.',
    image: null, url: null, tags: ['React', 'Node.js', 'PostgreSQL', 'HL7'],
    year: '2025', status: 'In Progress', client: 'MediCare Clinic', is_featured: false, is_active: true, sort_order: 7,
  },
  {
    id: 8, title: 'SEO & Growth Campaign', category: 'Marketing',
    description: 'Full SEO audit, content strategy, and 6-month growth campaign achieving 3× organic traffic.',
    image: null, url: null, tags: ['SEO', 'Content', 'Analytics', 'Ads'],
    year: '2023', status: 'Completed', client: 'ShopLocal', is_featured: false, is_active: true, sort_order: 8,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#fff', border: '1px solid #e8ede8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      <div className="h-44 w-full" style={{ background: '#f0f4f0' }} />
      <div className="p-6 space-y-3">
        <div className="flex justify-between gap-2">
          <div className="h-5 w-24 rounded-full" style={{ background: '#e0eae0' }} />
          <div className="h-5 w-20 rounded-full" style={{ background: '#f0f0f0' }} />
        </div>
        <div className="h-6 w-3/4 rounded" style={{ background: '#eeeeee' }} />
        <div className="h-3 w-24 rounded" style={{ background: '#f5f5f5' }} />
        <div className="h-4 w-full rounded" style={{ background: '#f5f5f5' }} />
        <div className="h-4 w-4/5 rounded" style={{ background: '#f5f5f5' }} />
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map(i => <div key={i} className="h-5 w-16 rounded-full" style={{ background: '#eeeeee' }} />)}
        </div>
      </div>
    </div>
  );
}

function PlaceholderGraphic({ accent }: { accent: string }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" opacity="0.28">
      <rect x="8" y="8" width="80" height="80" rx="12" stroke={accent} strokeWidth="1" />
      <rect x="22" y="22" width="52" height="52" rx="6" stroke={accent} strokeWidth="0.8" strokeDasharray="4 3" />
      <circle cx="48" cy="48" r="14" stroke={accent} strokeWidth="1" />
      <circle cx="48" cy="48" r="4" fill={accent} />
      <line x1="48" y1="8" x2="48" y2="88" stroke={accent} strokeWidth="0.5" strokeDasharray="3 5" />
      <line x1="8" y1="48" x2="88" y2="48" stroke={accent} strokeWidth="0.5" strokeDasharray="3 5" />
      <circle cx="8" cy="48" r="3" fill={accent} />
      <circle cx="88" cy="48" r="3" fill={accent} />
      <circle cx="48" cy="8" r="3" fill={accent} />
      <circle cx="48" cy="88" r="3" fill={accent} />
    </svg>
  );
}

function ProjectCard({ project, index, featured = false }: { project: ApiProject; index: number; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const p = PALETTES[index % PALETTES.length];
  const status = STATUS_CONFIG[project.status];
  const imgSrc = project.image ? `${STORAGE}/storage/${project.image}` : null;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#ffffff',
        border: hovered ? `1.5px solid ${p.accent}` : '1px solid #e8ede8',
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${p.accentBorder}`
          : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
      }}
      data-aos="fade-up"
      data-aos-delay={String((index % 3) * 100)}
      suppressHydrationWarning={true}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colorful header band */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: p.header, height: featured ? '200px' : '164px' }}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <PlaceholderGraphic accent="rgba(255,255,255,0.9)" />
        )}

        {/* Year badge */}
        <span
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: 'rgba(0,0,0,0.3)', color: '#ffffff', backdropFilter: 'blur(8px)' }}
        >
          {project.year}
        </span>

        {/* Featured badge */}
        {project.is_featured && (
          <span
            className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: '#ffffff', color: '#2d6a2d', letterSpacing: '0.04em' }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="#2d6a2d">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Featured
          </span>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.45)', opacity: hovered ? 1 : 0, pointerEvents: hovered ? 'auto' : 'none' }}
        >
          <a
            href={project.url ?? '#contact'}
            target={project.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold"
            style={{ background: '#ffffff', color: '#1a1a1a', letterSpacing: '0.06em' }}
          >
            View Project
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))' }}
        />
      </div>

      {/* White card body */}
      <div className="flex flex-col flex-1 p-6 gap-3">

        {/* Category + Status row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: p.accentLight, color: p.accent, border: `1px solid ${p.accentBorder}` }}
          >
            {project.category}
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: status.dot }} />
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug" style={{ color: '#1a1a1a' }}>
          {project.title}
        </h3>

        {/* Client */}
        {project.client && (
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#2d6a2d' }}>
            {project.client}
          </p>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#666666' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ background: '#f0f0f0', color: '#555555', border: '1px solid #e5e5e5' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View link */}
        <a
          href={project.url ?? '#contact'}
          target={project.url ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          style={{ color: p.accent }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          View Project
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    import('aos').then(({ default: AOS }) => AOS.init({ once: true, duration: 700 }));
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);
  const featured = projects.filter((p) => p.is_featured);
  const displayAll = loading ? [] : filtered;

  const stats = [
    { value: `${projects.filter(p => p.status === 'Completed').length || '50'}+`, label: 'Completed' },
    { value: `${projects.filter(p => p.status === 'In Progress').length || '5'}`, label: 'In Progress' },
    { value: `${new Set(projects.map(p => p.category)).size || '8'}+`, label: 'Categories' },
    { value: '3+', label: 'Years Active' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          className="pt-32 pb-20 px-6"
          style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f6f0 100%)' }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-14 items-center">

              {/* Left: text */}
              <div data-aos="fade-right" suppressHydrationWarning={true}>
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#2d6a2d' }}>
                  Our Portfolio
                </p>
                <h1
                  className="font-black leading-tight mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: '#1a1a1a', letterSpacing: '-0.02em' }}
                >
                  Projects We&apos;re<br />
                  <span style={{ color: '#2d6a2d' }}>Proud Of</span>
                </h1>
                <p className="text-lg leading-relaxed max-w-md mb-8" style={{ color: '#555555' }}>
                  From startup MVPs to enterprise platforms — every project is built with precision, passion, and a clear goal in mind.
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#2d6a2d', boxShadow: '0 4px 18px rgba(45,106,45,0.3)' }}
                  >
                    Browse Projects
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a> */}
                  {/* <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200"
                    style={{ background: '#ffffff', color: '#2d6a2d', border: '1.5px solid #c8d8c8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#2d6a2d'; e.currentTarget.style.background = '#eef4ee'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#c8d8c8'; e.currentTarget.style.background = '#ffffff'; }}
                  >
                    Start a Project
                  </a> */}
                </div>
              </div>

              {/* Right: colorful mini-card grid */}
              <div
                className="hidden md:grid grid-cols-2 gap-4"
                data-aos="fade-left"
                data-aos-delay="100"
                suppressHydrationWarning={true}
              >
                {PALETTES.slice(0, 4).map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{
                      background: p.header,
                      height: i % 2 === 0 ? '130px' : '100px',
                      border: `1px solid ${p.accentBorder}`,
                      marginTop: i % 2 !== 0 ? '20px' : '0',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }}
                  >
                    <PlaceholderGraphic accent="rgba(255,255,255,0.9)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ─────────────────────────────────────────────── */}
        {/* <section className="py-14 px-6" style={{ backgroundColor: '#2d6a2d' }}>
          <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black mb-1" style={{ color: '#ffffff' }}>{s.value}</div>
                <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── Featured Projects ──────────────────────────────────────── */}
        {!loading && featured.length > 0 && (
          <section className="py-16 px-6" style={{ backgroundColor: '#ffffff' }}>
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12" data-aos="fade-up" suppressHydrationWarning={true}>
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2d6a2d' }}>
                  Highlighted
                </p>
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a1a' }}>Featured Work</h2>
                <div className="mx-auto mt-3 h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All Projects ───────────────────────────────────────────── */}
        <section id="projects" className="py-16 px-6" style={{ backgroundColor: '#f5f7f5' }}>
          <div className="mx-auto max-w-6xl">

            {/* Header + filters */}
            <div className="text-center mb-10" data-aos="fade-up" suppressHydrationWarning={true}>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2d6a2d' }}>
                All Work
              </p>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1a1a1a' }}>Browse Projects</h2>
              <div className="mx-auto mb-8 h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #2d6a2d, transparent)' }} />

              {!loading && categories.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                      style={
                        activeCategory === cat
                          ? { background: '#2d6a2d', color: '#ffffff', boxShadow: '0 4px 14px rgba(45,106,45,0.3)' }
                          : { background: '#ffffff', color: '#555555', border: '1px solid #dde8dd' }
                      }
                      onMouseEnter={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = '#2d6a2d'; e.currentTarget.style.color = '#2d6a2d'; } }}
                      onMouseLeave={(e) => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = '#dde8dd'; e.currentTarget.style.color = '#555555'; } }}
                    >
                      {cat}
                      {cat !== 'All' && (
                        <span
                          className="ml-1.5 text-xs rounded-full px-1.5 py-0.5"
                          style={{
                            background: activeCategory === cat ? 'rgba(255,255,255,0.2)' : '#eef4ee',
                            color: activeCategory === cat ? '#fff' : '#2d6a2d',
                          }}
                        >
                          {projects.filter(p => p.category === cat).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : displayAll.length === 0 ? (
              <div className="py-24 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c8d8c8" strokeWidth="1" className="mx-auto mb-4">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p style={{ color: '#888888' }}>No projects in this category.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayAll.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6"
          style={{ background: 'linear-gradient(135deg, #1a3d1a 0%, #2d6a2d 100%)' }}
        >
          <div className="mx-auto max-w-2xl text-center" data-aos="fade-up" suppressHydrationWarning={true}>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Have a Project in Mind?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Tell us your idea and we&apos;ll turn it into a polished digital product — on time, on budget, and beyond expectations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#ffffff', color: '#2d6a2d' }}
              >
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/Abouts"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              >
                About Us
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
