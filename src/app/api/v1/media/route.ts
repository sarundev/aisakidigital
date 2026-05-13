import { mkdirSync, writeFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { nextMediaId, readMedia, writeMedia } from '@/lib/media';

export type { MediaItem } from '@/lib/media';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const UPLOAD_DIR = path.join(process.cwd(), 'public/image/media');
const PUBLIC_PATH = '/image/media';

export async function GET() {
  const items = readMedia();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('image');
  const title = formData.get('title');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: jpeg, png, webp, gif, avif' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.byteLength > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Max 10 MB' }, { status: 400 });
  }

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  mkdirSync(UPLOAD_DIR, { recursive: true });
  writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  const items = readMedia();
  const newItem = {
    id: nextMediaId(items),
    title: typeof title === 'string' ? title : file.name,
    image_path: `media/${filename}`,
    image_url: `${PUBLIC_PATH}/${filename}`,
    created_at: new Date().toISOString(),
  };

  items.push(newItem);
  writeMedia(items);

  return NextResponse.json(newItem, { status: 201 });
}
