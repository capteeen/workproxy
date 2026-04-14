import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Proxy — Bridging Global Platform Access",
  description:
    "Work Proxy connects UK/US account holders with skilled Nigerian remote workers, enabling earnings from geo-restricted platforms like Outlier AI, Scale AI, Appen, and more.",
  keywords: "account management, remote work, geo-restricted platforms, Nigeria, Outlier AI, Scale AI",
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
