import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface MediaItem {
  id: number;
  title: string;
  image_url: string;
  image_path: string;
  created_at: string;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/media.json');

export function readMedia(): MediaItem[] {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as MediaItem[];
}

export function writeMedia(items: MediaItem[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export function nextMediaId(items: MediaItem[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;
}
