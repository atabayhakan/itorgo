import Link from "next/link";
import { EmptyState } from "@/components/ui/States";
import { PushSubscribe } from "@/components/pwa/PushSubscribe";
import { getT } from "@/lib/i18n/server";

const GROUPS = [
  { id: "auctions", icon: "🔥", labelKey: "notifications.group_auctions", items: ["Ваша ставка 42 000 сом — пока лидируете", "Аукцион iPhone 17 Pro Max заканчивается через 2 мин"] },
  { id: "purchases", icon: "💰", labelKey: "notifications.group_purchases", items: ["Заказ #2041 оплачен · ожидается доставка"] },
  { id: "delivery", icon: "📦", labelKey: "notifications.group_delivery", items: ["Посылка в пути · Бишкек, ул. Чуй 123"] },
  { id: "favorites", icon: "❤️", labelKey: "notifications.group_favorites", items: ["Цена на Samsung S25 Ultra снизилась на 5%"] },
  { id: "stores", icon: "🏪", labelKey: "notifications.group_stores", items: ["ApplePoint Bishkek: 3 новых товара"] },
  { id: "security", icon: "🔐", labelKey: "notifications.group_security", items: ["Вход с нового устройства — Бишкек · подтвердите"] },
] as const;

export default async function NotificationsPage() {
  const t = await getT();
  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("nav.notifications")}</h1>

      <div className="mt-3 flex gap-2">
        <button className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">{t("notifications.all")}</button>
        <button className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-card">{t("notifications.unread", { n: 4 })}</button>
      </div>

      <div className="mt-4 space-y-4">
        {GROUPS.map((g) => (
          <section key={g.id} className="rounded-2xl bg-surface p-4 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <span>{g.icon}</span> {t(g.labelKey)}
            </h2>
            <ul className="mt-2 space-y-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-xl bg-surface-dim px-3 py-2.5 text-sm">
                  {item}
                  <span className="ml-2 text-xs text-ink-faint">· {t("common.now")}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-4">
        <PushSubscribe />
      </div>

      <div className="mt-6">
        <EmptyState
          icon="🔕"
          title={t("notifications.end_title")}
          text={t("notifications.end_text")}
          action={
            <Link href="/" className="btn-secondary">
              {t("states.go_home")}
            </Link>
          }
        />
      </div>
    </main>
  );
}
