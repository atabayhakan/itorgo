import type { Product, Category } from "@/lib/types";
import { CATEGORIES, imageFor } from "@/lib/data/mock-data";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

export function catOf(p: { categoryId: string }): Category {
  return CATEGORIES.find((c) => c.id === p.categoryId) ?? CATEGORIES[0];
}

export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Image-first. Real photo when available; premium neutral fallback (never emoji).
 * Fallback renders underneath; a failed img hides itself (no client state needed).
 */
export function ProductImage({ product, className = "", big = false, priority = false }: {
  product: Pick<Product, "imageSeed" | "categoryId" | "title" | "imageUrl">;
  className?: string;
  big?: boolean;
  priority?: boolean;
}) {
  const src = (product as Product).imageUrl ?? imageFor(product.categoryId, product.imageSeed);

  return (
    <div className={`relative overflow-hidden bg-[linear-gradient(135deg,#f6f6f9,#ececf1)] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center text-ink-faint/35" aria-label={product.title} role="img">
        <CategoryIcon id={product.categoryId} size={big ? 64 : 40} strokeWidth={1.4} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={product.title}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function Avatar({ name, seed, size = 40 }: { name: string; seed?: string; size?: number }) {
  const tones = [["#f0efff", "#e3e1ff"], ["#f6f6f9", "#ececf1"], ["#f1f5f9", "#e2e8f0"]];
  const g = tones[hashSeed(seed ?? name) % tones.length];
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{ width: size, height: size, fontSize: size * 0.42, background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`, color: "#372e82" }}
      aria-label={name}
    >
      {initial}
    </div>
  );
}
