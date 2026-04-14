import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Please log in to apply for accounts" }, { status: 401 });
    }

    const { listingId } = await req.json();
    const userId = (session.user as any).id;

    // Check if listing exists and is approved
    const listing = await prisma.accountListing.findUnique({
      where: { id: listingId }
    });

    if (!listing || listing.status !== "APPROVED") {
      return NextResponse.json({ error: "Listing not found or not available" }, { status: 404 });
    }

    // Check if already applied
    const existing = await prisma.match.findFirst({
      where: {
        listingId,
        workerId: userId
      }
    });

    if (existing) {
      return NextResponse.json({ error: "You have already applied for this account" }, { status: 400 });
    }

    // Create Match
    await prisma.match.create({
      data: {
        listingId,
        workerId: userId,
        status: "PENDING"
      }
    });

    return NextResponse.json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Match application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
