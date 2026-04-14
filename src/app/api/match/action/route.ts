import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { matchId, status } = await req.json();

    // Verify the user owns the listing associated with this match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { listing: true }
    });

    if (!match || match.listing.ownerId !== (session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized action" }, { status: 403 });
    }

    await prisma.match.update({
      where: { id: matchId },
      data: { 
        status,
        startedAt: status === 'ONGOING' ? new Date() : null
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Match action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
