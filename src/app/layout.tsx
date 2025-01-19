import { DM_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from "@/config/site";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils/cn";
import { Header } from "@/components/header";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", dmSans.variable)}
      >
        <SpeedInsights />
        <Analytics />
        <NextTopLoader
          color="#3b82f6"
          showSpinner={false}
          easing="cubic-bezier(0.4, 0, 0.2, 1)"
        />
        <ToastProvider duration={2000} swipeDirection="right">
          <Header />
          <main className="flex flex-col items-center justify-start mt-36 pb-6">
            {children}
          </main>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
