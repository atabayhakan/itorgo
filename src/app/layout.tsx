import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/navigation/BottomNav";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { FloatingSell } from "@/components/sell/FloatingSell";
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
              <DesktopNav />
        <div className="mx-auto min-h-dvh max-w-xl bg-surface-dim lg:max-w-6xl lg:bg-surface-dim">
          <div className="lg:flex lg:gap-6 lg:px-6 lg:py-4">
            <div className="min-w-0 flex-1">{children}</div>
            {/* Desktop sidebar — real filters (component not filler) */}
            <aside className="hidden w-[300px] shrink-0 lg:block">
              <div className="sticky top-[88px] space-y-3">
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                  <p className="text-sm font-bold">Быстрые фильтры</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["Электроника","Авто","Новинки","Аукцион","Бишкек","до 50 000 сом"].map((f) => (
                      <a key={f} href={`/search?q=${encodeURIComponent(f)}`} className="rounded-full bg-surface-dim px-3 py-1.5 text-xs font-semibold hover:bg-brand-50">
                        {f}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-ink p-4 text-white shadow-lifted">
                  <p className="text-sm font-black">Продавайте на ITOrgo</p>
                  <p className="mt-1 text-xs opacity-80">0% комиссия на первый месяц · AI поможет с ценой</p>
                  <a href="/sell" className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-black text-ink">
                    + Создать объявление
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
            </FollowsProvider>
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
