import type { Product, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/data/mock-data";

// Disiplinli palet: 2 nötr + 1 brand tint. Gökkuşağı yok — premium = tutarlılık.
const GRADIENTS: [string, string][] = [
  ["#f6f6f9", "#ececf1"], // warm gray
  ["#f1f5f9", "#e2e8f0"], // cool gray
  ["#f0efff", "#e3e1ff"], // brand tint (subtle)
];

export function catOf(p: { categoryId: string }): Category {
  return CATEGORIES.find((c) => c.id === p.categoryId) ?? CATEGORIES[0];
}

export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ProductImage({ product, className = "", big = false, priority = false }: {
  product: Pick<Product, "imageSeed" | "categoryId" | "title" | "imageUrl">;
  className?: string;
  big?: boolean;
  priority?: boolean;
}) {
  const g = GRADIENTS[hashSeed(product.imageSeed) % GRADIENTS.length];
  const cat = catOf(product);
  // When imageUrl is set → next/image with WebP/AVIF, lazy (spec #55)
  if ((product as Product).imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={(product as Product).imageUrl!}
          alt={product.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}
      role="img"
      aria-label={product.title}
    >
      <span aria-hidden style={{ fontSize: big ? "5rem" : "3.25rem", filter: "drop-shadow(0 10px 18px rgb(23 23 31 / 0.18))" }}>
        {cat.emoji}
      </span>
    </div>
  );
}

export function Avatar({ name, seed, size = 40 }: { name: string; seed?: string; size?: number }) {
  // Avatar uses same disciplined 3-tone system, but small so color variance is okay.
  const g = GRADIENTS[hashSeed(seed ?? name) % GRADIENTS.length];
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
