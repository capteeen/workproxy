import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userEmail, platform, avgEarning, ownerSplit } = await req.json();

    // Find the user who owns the account
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      return NextResponse.json({ error: "User with that email not found in database. Ask them to register first." }, { status: 404 });
    }

    // Create the listing directly as APPROVED
    await prisma.accountListing.create({
      data: {
        ownerId: user.id,
        platform,
        avgEarning: parseFloat(avgEarning),
        ownerSplit: parseInt(ownerSplit),
        accountAge: "Verified", // Manual listings are pre-verified
        taskTypes: ["General"], // Default to general tasks
        status: "APPROVED"
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Manual listing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
