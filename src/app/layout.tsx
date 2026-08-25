import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/navigation/BottomNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { FloatingSell } from "@/components/sell/FloatingSell";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import { CartProvider } from "@/lib/cart/CartContext";
import { FavoritesProvider } from "@/lib/favorites/FavoritesContext";

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
        <FavoritesProvider>
          <CartProvider>
            <DesktopNav />
        <div className="mx-auto min-h-dvh max-w-xl bg-surface-dim lg:max-w-6xl lg:bg-surface-dim">
          <div className="lg:flex lg:gap-6 lg:px-6 lg:py-4">
            <div className="min-w-0 flex-1">{children}</div>
            {/* Desktop sidebar — filters / seller dashboard teaser (spec #36) */}
            <aside className="hidden w-[300px] shrink-0 lg:block">
              <div className="sticky top-[88px] space-y-3">
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                  <p className="text-sm font-bold">Фильтры</p>
                  <p className="mt-1 text-xs text-ink-faint">Категория · цена · город · состояние · рейтинг — sidebar на десктопе</p>
                </div>
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                  <p className="text-sm font-bold">Продавцу</p>
                  <p className="mt-1 text-xs text-ink-faint">Панель продавца · заказы · аукционы — dashboard</p>
                  <a href="/sell" className="btn-primary mt-3 w-full !min-h-10">
                    + Продать
                  </a>
                </div>
              </div>
            </aside>
          </div>
          <div className="h-[72px] lg:hidden" aria-hidden />
        </div>
        <div className="lg:hidden">
          <FloatingSell />
          <BottomNav />
        </div>
            <PWAInstaller />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
