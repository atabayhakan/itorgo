"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";

export default function LoginPage() {
  const [phone, setPhone] = useState("+996 ");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  return (
    <main className="px-4 py-4">
      <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
        <IconBack size={18} />
      </Link>
      <h1 className="mt-4 text-xl font-extrabold">Вход</h1>
      <p className="mt-1 text-sm text-ink-faint">Телефон · SMS OTP — spec #47</p>

      {!sent ? (
        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm font-semibold">Телефон</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+996 555 123 456" className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
          </label>
          <button onClick={() => setSent(true)} className="btn-primary w-full">
            Получить код
          </button>
          <p className="text-center text-xs text-ink-faint">На номер придёт SMS с кодом · TODO: SMS provider</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold">Код из SMS отправлен на {phone}</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" inputMode="numeric" maxLength={6} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-center text-lg tracking-[0.3em]" />
          <button onClick={() => (location.href = "/profile")} className="btn-primary w-full">
            Подтвердить
          </button>
          <button onClick={() => setSent(false)} className="btn-secondary w-full">
            Изменить номер
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-ink-faint">
        Нет аккаунта? <Link href="/register" className="font-semibold text-brand-600">Регистрация</Link>
      </p>
    </main>
  );
}
