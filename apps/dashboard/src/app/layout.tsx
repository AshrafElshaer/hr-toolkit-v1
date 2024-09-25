import "@toolkit/ui/globals.css";

import { cn } from "@toolkit/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Providers from "@/components/providers";

const baseUrl = "https://dashboard.hrtoolkit.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "HR Toolkit",
    template: "%s | HR Toolkit",
  },
  description:
    "HR Toolkit is a collection of tools to help you manage HR processes.",
  openGraph: {
    title: "HR Toolkit | Manage your HR processes smarter",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "HR Toolkit | Manage your HR processes smarter",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: { rel: "icon", url: "/icon.ico" },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-muted" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
