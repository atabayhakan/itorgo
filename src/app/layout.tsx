import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingSell } from "@/components/sell/FloatingSell";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ITOrgo — маркетплейс и аукционы Кыргызстана",
  description:
    "ITOrgo — Кыргызстандын жаңы муундагы соода платформасы. Marketplace · Live Auctions · Магазины · AI · Trust. Бишкек, Ош и вся страна — покупайте, торгуйтесь, продавайте.",
  metadataBase: new URL("https://www.itorgo.kg"),
  openGraph: {
    title: "ITOrgo — маркетплейс и аукционы",
    description: "Покупайте, торгуйтесь и продавайте — live-аукционы, магазины и безопасные сделки.",
    locale: "ru_RU",
    type: "website",
    url: "https://www.itorgo.kg",
  },
  twitter: { card: "summary_large_image" },
  manifest: "/manifest.json",
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#5b46e8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="antialiased">
        <div className="mx-auto min-h-dvh max-w-xl bg-surface-dim">
          {children}
          <div className="h-[72px]" aria-hidden />
        </div>
        <FloatingSell />
        <BottomNav />
      </body>
    </html>
  );
}
