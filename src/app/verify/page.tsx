import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <h1 style={{ color: "var(--accent-rose)", fontSize: 24, marginBottom: 12 }}>Invalid Link</h1>
          <p style={{ color: "var(--text-muted)" }}>This verification link is invalid or missing a token.</p>
        </div>
      </div>
    );
  }

  // Look up the token in the database
  const vt = await (prisma as any).emailVerification.findUnique({
    where: { token },
  });

  if (!vt || vt.expires < new Date()) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <h1 style={{ color: "var(--accent-rose)", fontSize: 24, marginBottom: 12 }}>Expired Link</h1>
          <p style={{ color: "var(--text-muted)" }}>This verification link has expired. Please log in to request a new one.</p>
        </div>
      </div>
    );
  }

  // Update the user
  await prisma.user.update({
    where: { email: vt.identifier },
    data: { emailVerified: new Date() },
  });

  // Burn the token so it can't be reused
  try {
    await (prisma as any).emailVerification.delete({
      where: { token },
    });
  } catch (e) {
    // If it's already gone (double-click), ignore and continue
    console.log("Token already deleted or race condition.");
  }

  // Verification successful! Send them to login (or dashboard if we wanted to auto-login, but login is safer)
  redirect('/auth/login?verified=true');
}
