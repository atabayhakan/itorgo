import { notFound } from "next/navigation";
import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";

const ORDERS: Record<string, { id: string; title: string; price: number; status: string; at: string; addr: string }> = {
  o2041: { id: "o2041", title: "iPhone 17 Pro Max 256GB", price: 49500, status: "paid", at: "2026-08-20", addr: "Бишкек, ул. Чуй 123, кв. 4" },
  o2038: { id: "o2038", title: "Кроссовки Nike Air Force 1", price: 7200, status: "delivered", at: "2026-08-12", addr: "Ош, ул. Ленина 45" },
  o2035: { id: "o2035", title: "Трактор МТЗ-82", price: 480000, status: "processing", at: "2026-08-10", addr: "Каракол, ул. Токтогула 10" },
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = ORDERS[id];
  if (!o) notFound();

  return (
    <main className="px-4 py-4">
      <Link href="/orders" className="text-sm font-semibold text-brand-600">← Мои покупки</Link>
      <h1 className="mt-2 text-lg font-extrabold">{o.id} · {o.title}</h1>
      <p className="text-xs text-ink-faint">{o.at} · {formatKGS(o.price)} сом · статус: {o.status}</p>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Доставка</p>
        <p className="mt-1 text-sm">{o.addr}</p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-success" /> В пути — ожидается 25 авг
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Оплата</p>
        <p className="mt-1 text-sm">{formatKGS(o.price)} сом · {o.status === "paid" ? "оплачено" : o.status}</p>
        <p className="mt-1 text-xs text-ink-faint">Чек: TX-{o.id.toUpperCase()} · Защита покупателя</p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="btn-secondary">Связаться с продавцом</button>
        <button className="rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold">Поддержка</button>
      </div>
    </main>
  );
}
