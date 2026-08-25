import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";

const MOCK_ORDERS = [
  { id: "o2041", title: "iPhone 17 Pro Max 256GB", price: 49500, status: "paid" as const, at: "2026-08-20" },
  { id: "o2038", title: "Кроссовки Nike Air Force 1", price: 7200, status: "delivered" as const, at: "2026-08-12" },
  { id: "o2035", title: "Трактор МТЗ-82", price: 480000, status: "processing" as const, at: "2026-08-10" },
];

const tone: Record<string, string> = { paid: "bg-success-bg text-success", delivered: "bg-success-bg text-success", processing: "bg-warning-bg text-warning", pending: "bg-surface-sunken text-ink-soft" };

export default function OrdersPage() {
  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Мои покупки</h1>
      <p className="text-xs text-ink-faint">История заказов · статусы: pending → processing → paid → shipped → delivered</p>
      <ul className="mt-4 space-y-2">
        {MOCK_ORDERS.map((o) => (
          <li key={o.id}>
            <Link href={`/orders/${o.id}`} className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
              <div>
                <p className="text-sm font-semibold">{o.title}</p>
                <p className="text-xs text-ink-faint">{o.id} · {o.at} · {formatKGS(o.price)} сом</p>
              </div>
              <span className={`chip ${tone[o.status]}`}>{o.status}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="btn-secondary mt-4 w-full">На главную</Link>
    </main>
  );
}
