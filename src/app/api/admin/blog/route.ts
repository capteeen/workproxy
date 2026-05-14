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

    const { title, slug, content, imageUrl, published } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        imageUrl,
        published: published ?? false,
        authorId: (session.user as any).id
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
