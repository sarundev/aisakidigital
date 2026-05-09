import { NextRequest, NextResponse } from 'next/server';
import { readServices, writeServices, nextServiceId } from '@/lib/services';

export type { WebService } from '@/lib/services';

export async function GET() {
  const services = readServices();
  return NextResponse.json(services.sort((a, b) => a.sort_order - b.sort_order));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const services = readServices();
  const newService = {
    title: '',
    title_kh: '',
    description: '',
    tags: [],
    from_price: '$0',
    icon_type: 'website' as const,
    popular: false,
    is_active: true,
    sort_order: services.length + 1,
    ...body,
    id: nextServiceId(services),
  };
  services.push(newService);
  writeServices(services);
  return NextResponse.json(newService, { status: 201 });
}
