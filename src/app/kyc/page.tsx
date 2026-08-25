import Link from "next/link";

export default function KycPage() {
  const steps = [
    { label: "Телефон", status: "done", desc: "+996 5XX XXX XXX · SMS OTP ✓" },
    { label: "Email", status: "done", desc: "name@itorgo.kg ✓" },
    { label: "Документы", status: "pending", desc: "Паспорт / ID карта — проверка" },
    { label: "Банк", status: "pending", desc: "Привязка счёта для выплат" },
    { label: "История продаж", status: "done", desc: "3 продажи · 100% успешно" },
  ] as const;

  return (
    <main className="px-4 py-4">
      <h1 className="flex items-center gap-2 text-lg font-extrabold">🛡 Верификация · KYC</h1>
      <p className="mt-1 text-sm text-ink-faint">Повысьте доверие покупателей. Проверенные продавцы получают больше показов.</p>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <div className="flex items-center justify-between">
          <span className="font-bold">Надёжность</span>
          <span className="text-lg font-black text-success">72%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-surface-dim">
          <div className="h-2 rounded-full bg-success" style={{ width: "72%" }} />
        </div>
        <ul className="mt-4 space-y-3">
          {steps.map((s) => (
            <li key={s.label} className="flex items-start justify-between rounded-xl bg-surface-dim px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-ink-faint">{s.desc}</p>
              </div>
              <span className={`chip shrink-0 ${s.status === "done" ? "bg-success-bg text-success" : "bg-warning-bg text-warning"}`}>
                {s.status === "done" ? "✓ Готово" : "— Требуется"}
              </span>
            </li>
          ))}
        </ul>
        <button className="btn-primary mt-4 w-full">Пройти верификацию</button>
        <p className="mt-2 text-center text-xs text-ink-faint">Spec #47 · Продавец / бизнес-верификация · TODO: KYC provider</p>
      </section>

      <div className="mt-4 flex gap-2">
        <Link href="/profile" className="btn-secondary flex-1">
          Профиль
        </Link>
        <Link href="/admin" className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold">
          Админ · KYC очередь
        </Link>
      </div>
    </main>
  );
}
