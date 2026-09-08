"use client";

import { useState, type FormEvent } from "react";

const ERRORS: Record<string, string> = {
  invalid_credentials: "Неверный email или пароль.",
  too_many_attempts: "Слишком много попыток. Подождите 10 минут.",
  admin_not_configured: "Админ-доступ не настроен на сервере (ADMIN_EMAIL / ADMIN_PASSWORD_HASH).",
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (r.ok) {
        const next = new URLSearchParams(location.search).get("next");
        location.href = next && next.startsWith("/admin") ? next : "/admin";
        return;
      }
      const data = (await r.json().catch(() => ({}))) as { error?: string };
      setError(ERRORS[data.error ?? ""] ?? "Ошибка входа. Попробуйте ещё раз.");
    } catch {
      setError("Нет соединения с сервером.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface-dim px-4">
      <form onSubmit={submit} autoComplete="off" className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-card">
        <p className="text-lg font-black tracking-tight">
          <span className="text-brand-700">IT</span>
          <span className="text-auction-600">Orgo</span>
          <span className="ml-1.5 text-xs font-semibold text-ink-faint">admin</span>
        </p>
        <h1 className="mt-4 text-xl font-extrabold">Вход в панель</h1>

        <label className="mt-5 block">
          <span className="text-sm font-semibold">Email</span>
          <input
            type="email"
            name="admin_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          />
        </label>
        <label className="mt-3 block">
          <span className="text-sm font-semibold">Пароль</span>
          <input
            type="password"
            name="admin_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          />
        </label>

        {error && <p className="mt-3 rounded-xl bg-danger-bg px-3 py-2 text-sm font-semibold text-danger">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary mt-5 w-full disabled:opacity-60">
          {busy ? "Проверяем…" : "Войти"}
        </button>
      </form>
    </main>
  );
}
