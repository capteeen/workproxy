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
      await prisma.workerApplication.update({
        where: { id },
        data: { status }
      });
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
