import { NextRequest, NextResponse } from 'next/server';
import { readServices, writeServices } from '@/lib/services';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const service = readServices().find((s) => s.id === Number(id));
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const services = readServices();
  const idx = services.findIndex((s) => s.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  services[idx] = { ...services[idx], ...body, id: services[idx].id };
  writeServices(services);
  return NextResponse.json(services[idx]);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const services = readServices();
  const idx = services.findIndex((s) => s.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [deleted] = services.splice(idx, 1);
  writeServices(services);
  return NextResponse.json({ ok: true, deleted });
}
