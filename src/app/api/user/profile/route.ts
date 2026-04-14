import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { phone, name, bio, resumeUrl, twitterUrl, skills } = body;

    const userUpdateData: any = {};
    if (name !== undefined) userUpdateData.name = name;
    if (bio !== undefined) userUpdateData.bio = bio;
    if (resumeUrl !== undefined) userUpdateData.resumeUrl = resumeUrl;
    if (twitterUrl !== undefined) userUpdateData.twitterUrl = twitterUrl;

    if (Object.keys(userUpdateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: userUpdateData
      });
    }

    if (phone !== undefined || skills !== undefined) {
      // Find the first corresponding worker application and update their phone number and skills
      const apps = await prisma.workerApplication.findMany({ where: { userId } });
      if (apps.length > 0) {
        const appUpdateData: any = {};
        if (phone !== undefined) appUpdateData.phone = phone;
        if (skills !== undefined) appUpdateData.expertise = skills.join(', ');

        await prisma.workerApplication.update({
          where: { id: apps[0].id },
          data: appUpdateData
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
