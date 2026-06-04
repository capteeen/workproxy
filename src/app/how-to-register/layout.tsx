import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Register",
  description: "Everything you need to have ready before registering with Work Proxy.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
