import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvin | AI Agentic Systems Engineer",
  description:
    "I design and build AI-native products and agentic systems: governed agent runtimes, durable workflows, and the product around them. Two full case studies, decision by decision.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body>
        <noscript>
          {/* Without JS the reveal observer never runs — show everything. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;}`}</style>
        </noscript>
        {children}
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
