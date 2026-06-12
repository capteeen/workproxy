import { after } from 'next/server';
import { prisma } from '@/lib/prisma';

const FROM = 'Work Proxy <onboarding@workproxy.fun>';
const MAX_ATTEMPTS = 5;

async function deliver(id: string, to: string, subject: string, html: string) {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: FROM, to, subject, html });
    await prisma.queuedEmail.update({
      where: { id },
      data: { status: 'SENT', sentAt: new Date(), attempts: { increment: 1 } },
    });
  } catch (e) {
    console.error(`Email delivery failed (queued ${id}):`, e);
    await prisma.queuedEmail
      .update({
        where: { id },
        data: {
          status: 'FAILED',
          attempts: { increment: 1 },
          lastError: String(e instanceof Error ? e.message : e).slice(0, 1000),
        },
      })
      .catch(() => {});
  }
}

// Queues an email and sends it after the HTTP response has been flushed, so
// Resend latency never blocks the request. If the send fails, the cron drain
// (/api/cron/process-emails) retries it.
export async function sendEmail(to: string, subject: string, html: string) {
  const queued = await prisma.queuedEmail.create({
    data: { to, subject, html },
    select: { id: true },
  });
  after(() => deliver(queued.id, to, subject, html));
}

// Retries queued emails that never made it out. Called by the cron route.
export async function processEmailQueue(batchSize = 20) {
  const pending = await prisma.queuedEmail.findMany({
    where: {
      status: { in: ['PENDING', 'FAILED'] },
      attempts: { lt: MAX_ATTEMPTS },
      // Skip emails created in the last minute — their in-request send may
      // still be in flight.
      createdAt: { lt: new Date(Date.now() - 60_000) },
    },
    orderBy: { createdAt: 'asc' },
    take: batchSize,
  });

  for (const email of pending) {
    await deliver(email.id, email.to, email.subject, email.html);
  }

  return pending.length;
}
