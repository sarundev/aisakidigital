import { NextRequest, NextResponse } from 'next/server';
import { readTeamMembers, writeTeamMembers, nextMemberId } from '@/lib/ads-team';

export type { AdsTeamMember } from '@/lib/ads-team';

export async function GET() {
  const members = readTeamMembers();
  return NextResponse.json(members.filter((m) => m.is_active).sort((a, b) => a.sort_order - b.sort_order));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const members = readTeamMembers();
  const newMember = {
    name: '',
    role: '',
    bio: '',
    image: '',
    is_active: true,
    sort_order: members.length + 1,
    ...body,
    id: nextMemberId(members),
  };
  members.push(newMember);
  writeTeamMembers(members);
  return NextResponse.json(newMember, { status: 201 });
}
