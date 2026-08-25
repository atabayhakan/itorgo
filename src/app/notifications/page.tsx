import Link from "next/link";
import { EmptyState } from "@/components/ui/States";

const GROUPS = [
  { id: "auctions", icon: "🔥", label: "Аукционы", items: ["Ваша ставка 42 000 сом — пока лидируете", "Аукцион iPhone 17 Pro Max заканчивается через 2 мин"] },
  { id: "purchases", icon: "💰", label: "Покупки", items: ["Заказ #2041 оплачен · ожидается доставка"] },
  { id: "delivery", icon: "📦", label: "Доставка", items: ["Посылка в пути · Бишкек, ул. Чуй 123"] },
  { id: "favorites", icon: "❤️", label: "Избранное", items: ["Цена на Samsung S25 Ultra снизилась на 5%"] },
  { id: "stores", icon: "🏪", label: "Магазины", items: ["ApplePoint Bishkek: 3 новых товара"] },
  { id: "security", icon: "🔐", label: "Безопасность", items: ["Вход с нового устройства — Бишкек · подтвердите"] },
] as const;

export default function NotificationsPage() {
  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Уведомления</h1>

      <div className="mt-3 flex gap-2">
        <button className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">Все</button>
        <button className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-card">Непрочитанные · 4</button>
      </div>

      <div className="mt-4 space-y-4">
        {GROUPS.map((g) => (
          <section key={g.id} className="rounded-2xl bg-surface p-4 shadow-card">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <span>{g.icon}</span> {g.label}
            </h2>
            <ul className="mt-2 space-y-2">
              {g.items.map((t) => (
                <li key={t} className="rounded-xl bg-surface-dim px-3 py-2.5 text-sm">
                  {t}
                  <span className="ml-2 text-xs text-ink-faint">· сейчас</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-6">
        <EmptyState
          icon="🔕"
          title="На этом всё"
          text="Push-уведомления — PWA altyapısı hazır (spec #56)."
          action={
            <Link href="/" className="btn-secondary">
              На главную
            </Link>
          }
        />
      </div>
    </main>
  );
}
