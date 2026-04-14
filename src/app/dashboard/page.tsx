import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardClient, { DashboardData } from "@/components/DashboardClient";
import { prisma } from "@/lib/prisma";

export default async function DashboardServerPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Fetch the real user from Supabase using Prisma
  const userId = (session.user as any).id;
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      applications: true,
      listings: true,
    }
  });

  if (!dbUser) redirect("/auth/login");

  const workerApp = dbUser.applications[0];

  // Dynamically map real Prisma records into the Dashboard UI format
  const userData: DashboardData = {
    name: dbUser.name || "Unknown User",
    email: dbUser.email || "",
    bio: dbUser.bio || "",
    resumeUrl: dbUser.resumeUrl || "",
    twitterUrl: dbUser.twitterUrl || "",
    phone: workerApp?.phone || "Not Set",
    country: workerApp?.country || "Global",
    skills: workerApp?.expertise ? workerApp.expertise.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
    tier: "Standard",
    tierClass: "tier-standard",
    rating: 0.0,
    earnings: { total: 0, thisMonth: 0, pending: 0 },
    transactions: [],
    
    // Convert DB Account Listings
    accounts: dbUser.listings.map((l: any) => ({
      platform: l.platform,
      status: l.status,
      owner: "You", 
      earned: 0,
      pct: l.ownerSplit,
      color: "#00d4aa"
    })),
    
    // Convert DB Worker Applications
    applications: dbUser.applications.map((app: any) => ({
      platform: "Work Proxy Platform Access",
      status: app.status,
      applied: app.appliedAt.toLocaleDateString(),
    })),
    
    reports: [],
  };

  return <DashboardClient userData={userData} />;
}
