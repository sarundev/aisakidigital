import { NextRequest, NextResponse } from 'next/server';
import { readAds, writeAds, nextAdId } from '@/lib/ads';

export type { Ad } from '@/lib/ads';

export async function GET() {
  const ads = readAds();
  const result = ads
    .filter((a) => a.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(({ title, image }) => ({ title, image }));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ads = readAds();
  const newAd = {
    title: '',
    image: '',
    is_active: true,
    sort_order: ads.length + 1,
    ...body,
    id: nextAdId(ads),
  };
  ads.push(newAd);
  writeAds(ads);
  return NextResponse.json({ title: newAd.title, image: newAd.image }, { status: 201 });
}
