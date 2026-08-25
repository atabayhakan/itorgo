"use client";

import { useState } from "react";

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  at: string;
}

const MOCK_REVIEWS: Record<string, Review[]> = {
  p1: [
    { id: "r1", author: "Азамат", rating: 5, text: "Отличный телефон, пришёл в срок, упаковка идеальная.", at: "2026-08-20" },
    { id: "r2", author: "Гульмира", rating: 5, text: "Продавец проверенный, рекомендую!", at: "2026-08-18" },
    { id: "r3", author: "Timur", rating: 4, text: "Всё хорошо, но доставка заняла 3 дня.", at: "2026-08-15" },
  ],
};

export function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS[productId] ?? [
    { id: "rx1", author: "Айгүл С.", rating: 5, text: "Супер товар, как на фото.", at: "2026-08-19" },
    { id: "rx2", author: "Bek", rating: 4, text: "Хорошее соотношение цена/качество.", at: "2026-08-17" },
  ]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    setReviews((r) => [{ id: `r${Date.now()}`, author: "Вы", rating, text: text.trim(), at: new Date().toISOString().slice(0, 10) }, ...r]);
    setText("");
  }

  return (
    <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
      <h3 className="font-bold">Отзывы · {reviews.length}</h3>
      <div className="mt-3 rounded-xl bg-surface-dim p-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} className={`text-lg ${n <= rating ? "text-amber-400" : "text-line"}`}>★</button>
          ))}
          <span className="ml-2 text-xs text-ink-faint">{rating} звёзд</span>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Поделитесь впечатлением…" rows={2} className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
        <button onClick={submit} className="btn-primary mt-2 !min-h-9 w-full !text-sm">Оставить отзыв</button>
        <p className="mt-1 text-center text-xs text-ink-faint">TODO: POST /api/reviews → Review + analytics review_created</p>
      </div>
      <ul className="mt-3 space-y-2">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-xl bg-surface-dim px-3 py-2.5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              {r.author} <span className="text-amber-400">{"★".repeat(r.rating)}</span> <span className="text-xs font-normal text-ink-faint">{r.at}</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
