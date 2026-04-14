import { prisma } from "@/lib/prisma";
import ListingsClient, { Listing } from "@/components/ListingsClient";

export default async function ListingsPage() {
  // Fetch only APPROVED listings
  const dbListings = await prisma.accountListing.findMany({
    where: { status: "APPROVED" },
    include: { owner: true },
    orderBy: { createdAt: 'desc' }
  });

  const listings: Listing[] = dbListings.map(l => ({
    id: l.id,
    platform: l.platform,
    avgEarning: l.avgEarning,
    ownerSplit: l.ownerSplit,
    status: l.status,
    ownerName: l.owner.name || "Anonymous",
    createdAt: l.createdAt.toISOString()
  }));

  return <ListingsClient initialListings={listings} />;
}
