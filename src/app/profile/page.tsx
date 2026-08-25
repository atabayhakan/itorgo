import Link from "next/link";
import { CountrySwitcher, LocaleSwitcher } from "@/components/i18n/LocaleCountrySwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function ProfilePage() {
  return (
    <main className="px-4 py-4">
      <section className="rounded-2xl bg-surface p-4 shadow-card">
        <div className="flex gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-200 text-lg font-black text-brand-800">Г</div>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold">Гость</p>
            <p className="text-sm text-ink-faint">Войдите, чтобы видеть заказы и ставки</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-surface-dim px-2.5 py-1 text-xs font-bold">
              🛡 Надёжность 96% <span className="text-success">· Телефон ✓ Email ✓</span>
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
          <div className="rounded-xl bg-surface-dim py-2">
            <p className="font-black">0</p>Заказы
          </div>
          <div className="rounded-xl bg-surface-dim py-2">
            <p className="font-black">0</p>Ставки
          </div>
          <div className="rounded-xl bg-surface-dim py-2">
            <p className="font-black">0</p>Избранное
          </div>
          <div className="rounded-xl bg-surface-dim py-2">
            <p className="font-black">₽</p>Кошелёк
          </div>
        </div>
      </section>

      <nav className="mt-4 space-y-2">
        {[
          ["Мои покупки", "/orders"],
          ["Мои ставки", "/auctions"],
          ["Сообщения", "/messages"],
          ["Мои объявления", "/seller/s1"],
          ["Мой магазин", "/store/st1"],
          ["Кошелёк", "/wallet"],
          ["Корзина", "/cart"],
          ["Избранное", "/favorites"],
          ["Уведомления", "/notifications"],
          ["Настройки", "/settings"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
            <span className="text-sm font-medium">{label}</span>
            <span className="text-ink-faint">›</span>
          </Link>
        ))}
      </nav>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Язык и страна</p>
        <p className="mt-1 text-xs text-ink-faint">Spec #43–44 · переводы по ключам (auction.bid…), KZ/UZ из админки</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium">Язык</span>
          <LocaleSwitcher />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium">Страна</span>
          <CountrySwitcher />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium">Тема</span>
          <ThemeToggle />
        </div>
      </section>

      <div className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Trust — детали</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li className="flex justify-between">
            <span>Телефон</span>
            <span className="text-success">✓</span>
          </li>
          <li className="flex justify-between">
            <span>Email</span>
            <span className="text-success">✓</span>
          </li>
          <li className="flex justify-between">
            <span>Документы</span>
            <span className="text-ink-faint">—</span>
          </li>
          <li className="flex justify-between">
            <span>Банк</span>
            <span className="text-ink-faint">—</span>
          </li>
          <li className="flex justify-between">
            <span>История продаж</span>
            <span className="text-success">✓</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
