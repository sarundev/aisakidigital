import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface Ad {
  id: number;
  title: string;
  image: string;
  is_active: boolean;
  sort_order: number;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/ads.json');

export function readAds(): Ad[] {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as Ad[];
}

export function writeAds(ads: Ad[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(ads, null, 2), 'utf-8');
}

export function nextAdId(ads: Ad[]): number {
  return ads.length === 0 ? 1 : Math.max(...ads.map((a) => a.id)) + 1;
}
