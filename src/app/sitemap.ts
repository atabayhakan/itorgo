import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/data/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.itorgo.kg";
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/auctions`, lastModified: now, changeFrequency: "always", priority: 0.9 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "hourly", priority: 0.8 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/stores`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
  ];
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.slice(0, 50).map((p) => ({
    url: `${base}/product/${p.id}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...productRoutes];
}
