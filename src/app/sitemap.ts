import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE = "https://workproxy.fun";

// Cache the sitemap as a static response, regenerating hourly. This avoids
// cold-start/DB-timeout failures when search engines fetch it.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "/services", "/agents", "/rdp", "/listings", "/jobs", "/academy", "/blog",
  ].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });
    postRoutes = posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If the DB is unreachable at build/runtime, still return the static routes.
  }

  return [...staticRoutes, ...postRoutes];
}
