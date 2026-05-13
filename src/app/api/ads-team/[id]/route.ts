import { NextRequest, NextResponse } from 'next/server';
import { readTeamMembers, writeTeamMembers } from '@/lib/ads-team';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const members = readTeamMembers();
  const member = members.find((m) => m.id === Number(id));
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const members = readTeamMembers();
  const index = members.findIndex((m) => m.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  members[index] = { ...members[index], ...body, id: members[index].id };
  writeTeamMembers(members);
  return NextResponse.json(members[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const members = readTeamMembers();
  const index = members.findIndex((m) => m.id === Number(id));
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [removed] = members.splice(index, 1);
  writeTeamMembers(members);
  return NextResponse.json(removed);
}
