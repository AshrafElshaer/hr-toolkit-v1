import "@toolkit/ui/globals.css";

import Navbar from "@/components/navbar";
import { Provider as AnalyticsProvider } from "@toolkit/analytics/client";
import { cn } from "@toolkit/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import localFont from "next/font/local";

const DepartureMono = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
});

export const metadata = {
  metadataBase: new URL("https://v1.run"),
  title: "Create v1",
  description:
    "A free, open-source starter kit for your next project, built with insights from Midday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased dark",
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
