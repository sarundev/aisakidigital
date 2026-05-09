import { NextRequest, NextResponse } from 'next/server';
import { readProducts, writeProducts } from '@/lib/products';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const product = readProducts().find((p) => p.id === Number(id));
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  products[idx] = { ...products[idx], ...body, id: products[idx].id };
  writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [deleted] = products.splice(idx, 1);
  writeProducts(products);
  return NextResponse.json({ ok: true, deleted });
}
