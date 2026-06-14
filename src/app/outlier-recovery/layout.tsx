import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outlier Account Recovery — Work Proxy",
  description:
    "Banned, failed assessment, or deactivated Outlier account? Work Proxy recovers it and gets you back to work, with projects guaranteed.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
