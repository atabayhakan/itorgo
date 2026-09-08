import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PWAInstaller } from "@/components/pwa/PWAInstaller";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getLocale, getT } from "@/lib/i18n/server";
import { CartProvider } from "@/lib/cart/CartContext";
import { FavoritesProvider } from "@/lib/favorites/FavoritesContext";
import { FollowsProvider } from "@/lib/follows/FollowsContext";
import { themeInitScript } from "@/components/theme/ThemeToggle";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-inter",
});

const OG_LOCALE: Record<string, string> = { ru: "ru_RU", ky: "ky_KG", tr: "tr_TR" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getT(locale);
  const title = `ITOrgo — ${t("common.tagline")}`;
  const description = t("common.meta_description");
  return {
    title,
    description,
    metadataBase: new URL("https://www.itorgo.kg"),
    openGraph: { title, description, locale: OG_LOCALE[locale] ?? "ru_RU", type: "website", url: "https://www.itorgo.kg" },
    twitter: { card: "summary_large_image" },
    manifest: "/manifest.json",
  };
}

export const viewport: Viewport = {
  themeColor: "#5b46e8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <LocaleProvider locale={locale} messages={dictionaries[locale]} fallback={dictionaries.ru}>
          <FavoritesProvider>
            <CartProvider>
              <FollowsProvider>
                <StorefrontShell>{children}</StorefrontShell>
                <PWAInstaller />
              </FollowsProvider>
            </CartProvider>
          </FavoritesProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
