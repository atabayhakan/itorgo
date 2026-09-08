import { notFound } from "next/navigation";
import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";
import { getT } from "@/lib/i18n/server";

const ORDERS: Record<string, { id: string; title: string; price: number; status: string; at: string; addr: string }> = {
  o2041: { id: "o2041", title: "iPhone 17 Pro Max 256GB", price: 49500, status: "paid", at: "2026-08-20", addr: "Бишкек, ул. Чуй 123, кв. 4" },
  o2038: { id: "o2038", title: "Кроссовки Nike Air Force 1", price: 7200, status: "delivered", at: "2026-08-12", addr: "Ош, ул. Ленина 45" },
  o2035: { id: "o2035", title: "Трактор МТЗ-82", price: 480000, status: "processing", at: "2026-08-10", addr: "Каракол, ул. Токтогула 10" },
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = ORDERS[id];
  if (!o) notFound();
  const t = await getT();
  const status = t(`orders.status_${o.status}`);

  return (
    <main className="px-4 py-4">
      <Link href="/orders" className="text-sm font-semibold text-brand-600">{t("orders.back_to_orders")}</Link>
      <h1 className="mt-2 text-lg font-extrabold">{o.id} · {o.title}</h1>
      <p className="text-xs text-ink-faint">{o.at} · {formatKGS(o.price)} {t("currency.som")} · {t("orders.status_label", { s: status })}</p>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">{t("orders.delivery")}</p>
        <p className="mt-1 text-sm">{o.addr}</p>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-success" /> {t("orders.in_transit_expected", { date: "25.08" })}
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">{t("orders.payment")}</p>
        <p className="mt-1 text-sm">{formatKGS(o.price)} {t("currency.som")} · {o.status === "paid" ? t("orders.paid") : status}</p>
        <p className="mt-1 text-xs text-ink-faint">{t("orders.receipt", { tx: `TX-${o.id.toUpperCase()}` })} · {t("orders.buyer_protection")}</p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="btn-secondary">{t("orders.contact_seller")}</button>
        <button className="rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold">{t("orders.support")}</button>
      </div>
    </main>
  );
}
