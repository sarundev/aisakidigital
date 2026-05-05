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

export const fetchServices    = () => get<ApiService[]>('/services');
export const fetchPricing     = () => get<ApiPricingPlan[]>('/pricing');
export const fetchPortfolio   = () => get<ApiPortfolioItem[]>('/portfolio');
export const fetchPartners    = () => get<ApiPartner[]>('/partners');

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
