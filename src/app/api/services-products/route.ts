import { NextRequest, NextResponse } from 'next/server';
import { readProducts, writeProducts, nextId } from '@/lib/products';

export type { ServiceProduct } from '@/lib/products';

export async function GET(req: NextRequest) {
  const products = readProducts();
  const category = req.nextUrl.searchParams.get('category');
  const list = category
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products;
  return NextResponse.json(list.sort((a, b) => a.sort_order - b.sort_order));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = readProducts();
  const newProduct = {
    name: '',
    name_kh: '',
    category: 'Fresh',
    category_color: 'green' as const,
    duration: '1-3 Hours',
    price: '$0.00',
    price_unit: 'per unit',
    stock_quantity: 0,
    is_featured: false,
    is_active: true,
    sort_order: products.length + 1,
    ...body,
    id: nextId(products),
  };
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct, { status: 201 });
}
