import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Asaki Bot, the friendly AI assistant for AISAKIDIGITAL — a Cambodian digital marketing agency specializing in Social Media growth services.

Your role:
- Help customers understand our Social Media services (Facebook, TikTok, Instagram, YouTube, Telegram, Twitter/X, WhatsApp, LinkedIn)
- Answer questions about pricing, warranty, delivery time, and how to subscribe
- Guide customers to contact us via Telegram (https://t.me/T1_fakerrr) or Facebook (https://www.facebook.com/AisakiDigital) for orders
- Be warm, professional, and helpful

Key facts about AISAKIDIGITAL:
- We sell monthly Social Media growth packages (followers, likes, views, engagement)
- Prices are shown on each service card on our website
- Warranty: if numbers drop within the warranty period, we refill for free
- Delivery: most services start within 1–24 hours after order confirmation
- Support: 24/7 via Telegram and Facebook
- Featured services are our most popular and fastest

Guidelines:
- Reply in the same language the customer uses (Khmer or English)
- Keep replies concise and friendly — 1–3 sentences max unless they ask for detail
- Always end with a call to action to subscribe or contact us if relevant
- Never make up prices — tell them to check the service cards on the page
- Do not discuss competitors or anything unrelated to our services`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('[chat]', err);
    return NextResponse.json({ reply: 'Sorry, I\'m having trouble right now. Please reach us on Telegram or Facebook directly! 🙏' });
  }
}
