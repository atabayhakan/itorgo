import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import { CartProvider } from "@/lib/cart/CartContext";
import { FavoritesProvider } from "@/lib/favorites/FavoritesContext";
import { FollowsProvider } from "@/lib/follows/FollowsContext";
import { themeInitScript } from "@/components/theme/ThemeToggle";

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
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <FavoritesProvider>
          <CartProvider>
            <FollowsProvider>
              <StorefrontShell>{children}</StorefrontShell>
              <PWAInstaller />
            </FollowsProvider>
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
