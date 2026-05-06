const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1';
export const STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL ?? 'http://localhost:8000';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiService {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  accent_color: string;
  sort_order: number;
  is_active: boolean;
}

export interface ApiPricingPlan {
  id: number;
  name: string;
  price: string;
  period: string | null;
  features: string[];
  is_popular: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface ApiPortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string | null;
  image: string | null;
  url: string | null;
  tags: string[] | null;
  sort_order: number;
  is_active: boolean;
}

export interface ApiPartner {
  id: number;
  name: string;
  slug: string;
  abbr: string;
  logo: string | null;
  website_url: string | null;
  row: number;
  sort_order: number;
  is_active: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export interface ApiProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string | null;
  price: string | null;
  tags: string[];
  demo_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface ApiProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  url: string | null;
  tags: string[];
  year: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  client: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface ApiActivity {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string | null;
  image: string | null;
  tags: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export const fetchServices    = () => get<ApiService[]>('/services');
export const fetchPricing     = () => get<ApiPricingPlan[]>('/pricing');
export const fetchPortfolio   = () => get<ApiPortfolioItem[]>('/portfolio');
export const fetchPartners    = () => get<ApiPartner[]>('/partners');
export const fetchProducts    = () => get<ApiProduct[]>('/products');
export const fetchProjects    = () => get<ApiProject[]>('/projects');
export const fetchActivities  = () => get<ApiActivity[]>('/activities');

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message ?? 'Submission failed');
  }
}
