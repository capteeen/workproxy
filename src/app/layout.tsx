import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://workproxy.fun"),
  title: {
    default: "Work Proxy — Where You Find Work, Earn, and Grow Online",
    template: "%s | Work Proxy",
  },
  description:
    "Work Proxy connects UK/US account holders with skilled Nigerian remote workers, enabling earnings from geo-restricted platforms like Outlier AI, Scale AI, Appen, and more.",
  keywords: "account management, remote work, geo-restricted platforms, Nigeria, Outlier AI, Scale AI",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Work Proxy",
    url: "https://workproxy.fun",
    title: "Work Proxy — Where You Find Work, Earn, and Grow Online",
    description:
      "Find work, earn, and grow online. Work Proxy helps people access and succeed on global freelance and AI-training platforms.",
  },
  twitter: { card: "summary_large_image", title: "Work Proxy", description: "Where you find work, earn, and grow online." },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
