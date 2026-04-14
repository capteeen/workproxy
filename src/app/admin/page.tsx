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
  const [workerApps, listings, users, userCount, activeListings] = await Promise.all([
    prisma.workerApplication.findMany({ where: { status: "PENDING" }, orderBy: { appliedAt: 'desc' } }),
    prisma.accountListing.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: 'desc' } }),
    prisma.user.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
    prisma.user.count(),
    prisma.accountListing.count({ where: { status: "APPROVED" } }),
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
    pendingListings: listings,
    users: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    })),
  };

  return <AdminClient adminData={adminData} />;
}
