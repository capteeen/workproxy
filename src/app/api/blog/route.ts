import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') !== 'false';

    const whereClause = publishedOnly ? { published: true } : {};

    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Public blog content changes rarely — let the CDN serve it for a minute.
    return NextResponse.json(
      { posts },
      publishedOnly
        ? { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
        : undefined
    );
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
