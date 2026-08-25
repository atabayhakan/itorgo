import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";

export default function RegisterPage() {
  return (
    <main className="px-4 py-4">
      <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
        <IconBack size={18} />
      </Link>
      <h1 className="mt-4 text-xl font-extrabold">Регистрация</h1>
      <p className="mt-1 text-sm text-ink-faint">Создайте аккаунт за 30 секунд</p>
      <div className="mt-6 space-y-3">
        <input placeholder="Имя" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <input placeholder="+996 5XX XXX XXX" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <input placeholder="Email (необязательно)" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <button className="btn-primary w-full">Создать аккаунт</button>
        <p className="text-center text-xs text-ink-faint">Нажимая, вы соглашаетесь с условиями ITOrgo</p>
      </div>
      <p className="mt-4 text-center text-xs text-ink-faint">
        Уже есть аккаунт? <Link href="/login" className="font-semibold text-brand-600">Вход</Link>
      </p>
    </main>
  );
}
