import { CATEGORIES } from "@/lib/data/mock-data";
import Link from "next/link";
export default function CategoriesPage() {
  return (
    <main className="px-4 py-8">
      <h1 className="text-lg font-bold">Все категории</h1>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/search?cat=${c.id}`} className="card px-4 py-3 text-sm font-medium">
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
