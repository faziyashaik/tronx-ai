import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import VFXBackground from "@/components/vfx/VFXBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "TRONX AI — AI-Powered Consultancy | Smart Technology & Digital Growth",
  description:
    "TRONX AI delivers cutting-edge AI automation, Google Virtual 360° Tours, 4K FPV drone cinematography, and Next.js web applications to scale modern enterprises.",
  keywords: [
    "AI Consultancy",
    "AI Automation",
    "Google Virtual 360 Tour",
    "FPV Drone Shoots",
    "NFC Solutions",
    "Next.js Development",
    "TRONX AI",
  ],
  openGraph: {
    title: "TRONX AI — AI-Powered Consultancy",
    description:
      "Transforming Businesses with AI, Smart Technology & Digital Growth.",
    url: "https://tronx.ai",
    siteName: "TRONX AI Smart Consultancy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRONX AI — AI-Powered Consultancy",
    description:
      "Transforming Businesses with AI, Smart Technology & Digital Growth.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-vfx-light bg-vfx-grid-light text-slate-900 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative">
        <VFXBackground />
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
