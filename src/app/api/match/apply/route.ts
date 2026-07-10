import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Please log in to apply for accounts" }, { status: 401 });
    }

    const { listingId } = await req.json();
    const userId = (session.user as any).id;

    const limited = rateLimit(`match-apply:${userId}`, 10, 60 * 1000);
    if (!limited.ok) return rateLimitResponse(limited.retryAfterSeconds);

    // Check if listing exists and is approved
    const listing = await prisma.accountListing.findUnique({
      where: { id: listingId }
    });

    if (!listing || listing.status !== "APPROVED") {
      return NextResponse.json({ error: "Listing not found or not available" }, { status: 404 });
    }

    // The unique constraint on (listingId, workerId) guarantees one
    // application per worker per listing, even under concurrent requests.
    try {
      await prisma.match.create({
        data: {
          listingId,
          workerId: userId,
          status: "PENDING"
        }
      });
    } catch (e: any) {
      if (e?.code === "P2002") {
        return NextResponse.json({ error: "You have already applied for this account" }, { status: 400 });
      }
      throw e;
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Match application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
