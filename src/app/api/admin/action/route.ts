import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { type, id, status } = await req.json();

    if (type === 'worker') {
      const app = await prisma.workerApplication.update({
        where: { id },
        data: { status }
      });

      if (status === 'APPROVED') {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'Work Proxy <onboarding@workproxy.fun>',
            to: app.email,
            subject: 'Congratulations! Your Work Proxy Application is Approved 🚀',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
                <h1 style="color: #0f172a;">Welcome to the Elite Network!</h1>
                <p>Hi ${app.firstName},</p>
                <p>Great news! Our team has reviewed your application and expertise, and we are thrilled to welcome you to Work Proxy.</p>
                <p><strong>Your account is now fully active.</strong> You can now log in to your dashboard and start applying for listed accounts in the marketplace.</p>
                <div style="margin: 30px 0;">
                  <a href="https://workproxy.fun/auth/login" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Login to Dashboard</a>
                </div>
                <p>We look forward to seeing your success on the platform!</p>
                <p>Best regards,<br/>The Work Proxy Team</p>
              </div>
            `
          });
        } catch (e) {
          console.error("Failed to send approval email:", e);
        }
      }
    } else if (type === 'listing') {
      await prisma.accountListing.update({
        where: { id },
        data: { status }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
