import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local');
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 });
  }

  const { productName, productPrice, customerTelegram } = await req.json();

  const customerLine = customerTelegram
    ? `👤 Telegram: <b>@${customerTelegram}</b>`
    : `👤 Telegram: <i>មិនបានផ្ដល់</i>`;

  const text =
    `🛒 <b>មានអតិថិជនចង់ទិញ!</b>\n\n` +
    `📦 ផលិតផល: <b>${productName}</b>\n` +
    `💰 តម្លៃ: <b>${productPrice}</b>\n` +
    customerLine;

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
