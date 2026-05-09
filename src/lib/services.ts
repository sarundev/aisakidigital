import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface WebService {
  id: number;
  title: string;
  title_kh: string;
  description: string;
  tags: string[];
  from_price: string;
  icon_type: 'website' | 'mobile' | 'fullstack' | 'uiux' | 'ecommerce' | 'seo';
  popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/services.json');

export function readServices(): WebService[] {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as WebService[];
}

export function writeServices(services: WebService[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(services, null, 2), 'utf-8');
}

export function nextServiceId(services: WebService[]): number {
  return services.length === 0 ? 1 : Math.max(...services.map((s) => s.id)) + 1;
}
