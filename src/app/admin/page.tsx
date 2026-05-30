import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminClient, { AdminData } from "@/components/AdminClient";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Security check: Only allow admins
  if (!session?.user || (session.user as any).role !== "admin") {
    redirect("/dashboard");
  }

  // Fetch real platform data
  const [workerApps, listings, users, userCount, activeListings, blogPosts] = await Promise.all([
    prisma.workerApplication.findMany({ where: { status: "PENDING" }, orderBy: { appliedAt: 'desc' } }),
    prisma.accountListing.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: 'desc' }, include: { owner: { select: { id: true, name: true, email: true, createdAt: true } } } }),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    prisma.user.count(),
    prisma.accountListing.count({ where: { status: "APPROVED" } }),
    prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  const adminData: AdminData = {
    stats: {
      activeListings: activeListings,
      registeredUsers: userCount,
      activeMatches: 0,
      revenue: "$0",
      payoutRate: "100%",
    },
    pendingWorkerApps: workerApps,
    pendingListings: listings.map((l: any) => ({
      ...l,
      // Ensure owner is populated — fall back to users array lookup if include missed it
      owner: l.owner ?? users.find((u: any) => u.id === l.ownerId) ?? null,
    })),
    users: users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    })),
    blogPosts: blogPosts,
  };

  return <AdminClient adminData={adminData} />;
}
