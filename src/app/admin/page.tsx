export default function AdminPage() {
  const kpis = [
    { label: "GMV", value: "12.4 млн сом" },
    { label: "Выручка", value: "1.1 млн сом" },
    { label: "Заказы", value: "3 842" },
    { label: "Активных аукционов", value: "20" },
    { label: "Пользователи", value: "4 210" },
    { label: "Продавцы", value: "30" },
  ];
  const alerts = [
    { label: "Fraud Alerts", value: "3", tone: "danger" },
    { label: "Pending KYC", value: "12", tone: "warning" },
    { label: "Payment Issues", value: "2", tone: "danger" },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="border-b border-line bg-surface px-4 py-3">
        <p className="text-sm font-black">ITOrgo Admin</p>
        <p className="text-xs text-ink-faint">SaaS · fintech dashboard · RBAC · Feature Flags</p>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-surface p-3 shadow-card">
            <p className="text-xs text-ink-faint">{k.label}</p>
            <p className="mt-1 text-sm font-black tabular-nums">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 px-4">
        {alerts.map((a) => (
          <div
            key={a.label}
            className={`rounded-2xl p-3 text-sm font-bold ${a.tone === "danger" ? "bg-danger-bg text-danger" : "bg-warning-bg text-warning"}`}
          >
            {a.label}: {a.value}
          </div>
        ))}
      </div>

      <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h2 className="font-bold">🤖 ITOrgo AI — админ-ассистент</h2>
        <p className="mt-1 text-sm text-ink-faint">«Покажи подозрительные аукционы» · «Какие категории растут?» — TODO(agent)</p>
        <div className="mt-3 flex gap-2">
          <input placeholder="Спросите AI…" className="flex-1 rounded-xl border border-line bg-surface-dim px-3 py-2 text-sm" />
          <button className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">Спросить</button>
        </div>
      </section>

      <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">System · Feature Flags</h3>
        <p className="text-xs text-ink-faint">Auction / Buy Now / Wallet / AI / KYC / Stores — вкл/выкл без деплоя</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {["Auction ON", "Buy Now ON", "Wallet OFF", "AI ON", "KYC ON", "Dark Mode OFF", "KG ON", "KZ OFF", "UZ OFF"].map((f) => (
            <span key={f} className={`rounded-full px-3 py-2 text-center text-xs font-bold ${f.endsWith("ON") ? "bg-success-bg text-success" : "bg-surface-sunken text-ink-faint"}`}>
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">System Health</h3>
        <p className="mt-1 text-xs text-ink-faint">server · db · api · queue · payment · OCR · AI — TODO(monitoring)</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li className="flex justify-between">
            <span>API</span>
            <span className="text-success">● healthy</span>
          </li>
          <li className="flex justify-between">
            <span>DB</span>
            <span className="text-success">● healthy</span>
          </li>
          <li className="flex justify-between">
            <span>SMS</span>
            <span className="text-warning">● degraded</span>
          </li>
        </ul>
      </section>

      <nav className="mx-4 mt-4 grid grid-cols-2 gap-2 text-sm">
        {[
          ["/admin/users", "Пользователи"],
          ["/admin/orders", "Заказы"],
          ["/admin/media", "Media Library"],
          ["/admin/fraud", "Fraud Center"],
          ["/admin/audit", "Audit Log"],
          ["/kyc", "KYC очередь"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="rounded-xl bg-surface px-4 py-3 text-center font-semibold shadow-card">
            {label}
          </a>
        ))}
      </nav>

      <p className="px-4 py-6 text-center text-xs text-ink-faint">
        RBAC: Super Admin · Auction/Finance/KYC/Fraud/Support/Marketing/Moderator · Audit Log · полный доступ по ролям
      </p>
    </main>
  );
}
