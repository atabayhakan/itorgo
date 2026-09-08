"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_GROUPS: { label: string; items: { href: string; label: string }[] }[] = [
  { label: "Обзор", items: [{ href: "/admin", label: "Дашборд" }] },
  {
    label: "Продажи",
    items: [
      { href: "/admin/orders", label: "Заказы" },
      { href: "/admin/coupons", label: "Купоны" },
    ],
  },
  {
    label: "Доверие и безопасность",
    items: [
      { href: "/admin/fraud", label: "Антифрод" },
      { href: "/admin/kyc", label: "KYC очередь" },
      { href: "/admin/audit", label: "Журнал аудита" },
    ],
  },
  {
    label: "Контент",
    items: [
      { href: "/admin/cms", label: "CMS · Тексты" },
      { href: "/admin/media", label: "Медиатека" },
      { href: "/admin/push", label: "Push-рассылки" },
    ],
  },
  { label: "Пользователи", items: [{ href: "/admin/users", label: "Пользователи" }] },
];

/** Persistent, grouped admin nav — replaces the per-page "← Admin" back link. */
export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh bg-surface-dim">
      <aside className="hidden w-[220px] shrink-0 border-r border-line bg-surface md:block">
        <div className="px-4 py-4">
          <Link href="/" className="text-base font-black tracking-tight">
            <span className="text-brand-700">IT</span>
            <span className="text-auction-600">Orgo</span>
            <span className="ml-1.5 text-xs font-semibold text-ink-faint">admin</span>
          </Link>
        </div>
        <nav className="pb-6">
          {NAV_GROUPS.map((g) => (
            <div key={g.label} className="mb-1">
              <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-ink-faint">{g.label}</p>
              {g.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mx-2 flex items-center rounded-lg px-3 py-2 text-sm font-semibold ${
                      active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-surface-dim"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-surface px-4 py-3 md:hidden">
          <Link href="/admin" className="text-sm font-bold">← Админ</Link>
          <span className="text-sm font-semibold">{title}</span>
        </div>
        <div className="hidden items-center justify-between border-b border-line bg-surface px-6 py-3 md:flex">
          <span className="text-sm font-bold">{title}</span>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-surface-dim">
              Выйти
            </button>
          </form>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
