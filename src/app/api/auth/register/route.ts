import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';
import { rateLimit, rateLimitResponse, clientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const limited = rateLimit(`register:${clientIp(req)}`, 5, 10 * 60 * 1000);
    if (!limited.ok) return rateLimitResponse(limited.retryAfterSeconds);

    const body = await req.json();
    const { role, email, password, firstName, lastName, phone, country } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required attributes' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Validate role-specific constraints BEFORE creating the user, so a
    // failed registration doesn't leave an orphaned User row behind.
    if (role === 'worker' && body.nin) {
      const existingApp = await prisma.workerApplication.findFirst({
        where: { nin: body.nin, NOT: { status: 'REJECTED' } }
      });
      if (existingApp) {
        return NextResponse.json({ error: 'This NIN is already associated with an active application or account.' }, { status: 400 });
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create the global user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: `${firstName} ${lastName}`.trim(),
        role, // "owner" or "worker"
      },
    });

    if (role === 'owner') {
      const { platform, accountAge, accountEarnings, requireTrial, trialDays, ownerSplit, availability } = body;
      await prisma.accountListing.create({
        data: {
          ownerId: user.id,
          platform: platform || 'Other',
          accountAge: accountAge || '',
          avgEarning: parseFloat(accountEarnings?.replace(/[^0-9.]/g, '') || '0'),
          requireTrial: requireTrial ?? true,
          trialDays: parseInt(trialDays || '14'),
          ownerSplit: parseInt(ownerSplit || '35'),
          availability: availability || 'immediate',
          status: 'PENDING',
        },
      });
    } else if (role === 'worker') {
      const { expertise, yearsExperience, internetType, backupPower, idType, dailyHours, pcType, performedTasks, nin } = body;
      await prisma.workerApplication.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          email,
          phone,
          country,
          expertise: Array.isArray(expertise) ? expertise.join(', ') : (expertise || ''),
          experience: yearsExperience || '',
          internet: internetType || '',
          power: backupPower ? 'Has Backup' : 'No Backup',
          idType: idType || 'Unknown',
          nin: nin || '',
          dailyHours: dailyHours || '',
          pcType: pcType || '',
          performedTasks: performedTasks || '',
          status: 'PENDING',
        },
      });
    }

    // Generate verification token; the email is queued and sent after the
    // response is flushed so Resend latency never blocks registration.
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.emailVerification.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      }
    });

    const host = req.headers.get('host') || 'workproxy.fun';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const verifyUrl = `${protocol}://${host}/verify?token=${token}`;

    await sendEmail(
      email,
      'Verify your Work Proxy account',
      `
        <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b; background-color: #f8fafc;">
          <div style="background: white; border-radius: 20px; padding: 40px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 24px; text-align: center;">Welcome to Work Proxy!</h1>
            <p style="font-size: 16px; line-height: 24px; color: #475569; margin-bottom: 32px; text-align: center;">
              Thanks for joining our elite network. To finalize your application and access the dashboard, please verify your email address.
            </p>
            <div style="text-align: center; margin-bottom: 32px;">
              <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: #000000; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                Verify Email Address
              </a>
            </div>
            <p style="font-size: 14px; line-height: 20px; color: #94a3b8; text-align: center; margin-top: 32px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
            <p style="font-size: 12px; color: #cbd5e1; text-align: center;">
              © 2026 Work Proxy. Bridging global platform access for skilled professionals.
            </p>
          </div>
        </div>
      `
    );

    return NextResponse.json({ success: true, message: 'Account created successfully. Please verify your email.' }, { status: 201 });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error while registering' }, { status: 500 });
  }
}
