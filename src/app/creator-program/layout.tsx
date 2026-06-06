import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Program — Work Proxy",
  description: "Join the Work Proxy Creator Programme. Post 4 videos a month, wear our merch, and grow with us.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
