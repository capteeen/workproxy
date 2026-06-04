import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Referral Programme",
  description: "Earn weekly passive income by referring workers to Work Proxy. Learn about our tiered commission structure.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
