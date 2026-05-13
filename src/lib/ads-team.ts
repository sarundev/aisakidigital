import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export interface AdsTeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  is_active: boolean;
  sort_order: number;
}

const DATA_FILE = path.join(process.cwd(), 'src/data/ads-team.json');

export function readTeamMembers(): AdsTeamMember[] {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as AdsTeamMember[];
}

export function writeTeamMembers(members: AdsTeamMember[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(members, null, 2), 'utf-8');
}

export function nextMemberId(members: AdsTeamMember[]): number {
  return members.length === 0 ? 1 : Math.max(...members.map((m) => m.id)) + 1;
}
