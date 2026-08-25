import type { Product, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/data/mock-data";

const GRADIENTS: [string, string][] = [
  ["#e0e7ff", "#c7d2fe"], ["#fce7f3", "#fbcfe8"], ["#d1fae5", "#a7f3d0"],
  ["#fef3c7", "#fde68a"], ["#ede9fe", "#ddd6fe"], ["#ffe4e6", "#fecdd3"],
  ["#cffafe", "#a5f3fc"], ["#f3e8ff", "#e9d5ff"], ["#dcfce7", "#bbf7d0"],
];

export function catOf(p: { categoryId: string }): Category {
  return CATEGORIES.find((c) => c.id === p.categoryId) ?? CATEGORIES[0];
}

export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function ProductImage({ product, className = "", big = false }: {
  product: Pick<Product, "imageSeed" | "categoryId" | "title">;
  className?: string;
  big?: boolean;
}) {
  const g = GRADIENTS[hashSeed(product.imageSeed) % GRADIENTS.length];
  const cat = catOf(product);
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
