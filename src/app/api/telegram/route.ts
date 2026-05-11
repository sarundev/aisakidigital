import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local');
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 });
  }

  const body = await req.json() as {
    type?: 'order' | 'subscribe';
    productName?: string;
    productPrice?: string;
    customerTelegram?: string;
    customerPhone?: string;
  };

  const { type = 'order', productName, productPrice, customerTelegram, customerPhone } = body;

  let contactLine = '';
  if (customerTelegram) {
    contactLine = `👤 Telegram: <b>@${customerTelegram.replace('@', '')}</b>`;
  } else if (customerPhone) {
    contactLine = `📱 Phone: <b>${customerPhone}</b>`;
  } else {
    contactLine = `👤 Telegram: <i>មិនបានផ្ដល់</i>`;
  }

  let text = '';
  if (type === 'subscribe') {
    text =
      `📩 <b>អតិថិជនចង់ Subscribe!</b>\n\n` +
      contactLine + `\n` +
      `📅 ថ្ងៃទី: <b>${new Date().toLocaleDateString('km-KH', { year: 'numeric', month: 'long', day: 'numeric' })}</b>`;
  } else {
    text =
      `🛒 <b>មានអតិថិជនចង់ទិញ!</b>\n\n` +
      `📦 ផលិតផល: <b>${productName ?? 'N/A'}</b>\n` +
      `💰 តម្លៃ: <b>${productPrice ?? 'N/A'}</b>\n` +
      contactLine;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error('[Telegram] sendMessage failed:', err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
