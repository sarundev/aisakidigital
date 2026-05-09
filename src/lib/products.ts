import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface ServiceProduct {
  id: number;
  name: string;
  name_kh: string;
  category: string;
  category_color: 'green' | 'purple' | 'blue' | 'orange';
  duration: string;
  price: string;
  price_unit: string;
  stock_quantity: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/products.json');

export function readProducts(): ServiceProduct[] {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as ServiceProduct[];
}

export function writeProducts(products: ServiceProduct[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export function nextId(products: ServiceProduct[]): number {
  return products.length === 0 ? 1 : Math.max(...products.map((p) => p.id)) + 1;
}
