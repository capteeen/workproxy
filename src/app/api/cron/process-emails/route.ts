import { NextResponse } from 'next/server';
import { processEmailQueue } from '@/lib/email';

// Drains the email queue (retries failed/stuck sends). Triggered by the
// Vercel cron in vercel.json; protected with CRON_SECRET.
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const processed = await processEmailQueue();
    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error('Email queue drain error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
