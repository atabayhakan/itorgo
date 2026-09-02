import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/admin/Chart";

export default function AdminPage() {
  const kpis = [
    { label: "GMV", value: "12.4 млн сом", data: [4, 6, 5, 8, 7, 9, 6], color: "#5b46e8" },
    { label: "Выручка", value: "1.1 млн сом", data: [2, 3, 2, 4, 3, 5, 4], color: "#16a34a" },
    { label: "Заказы", value: "3 842", data: [12, 18, 14, 20, 16, 22, 19], color: "#0284c7" },
    { label: "Активных аукционов", value: "20", data: [8, 12, 10, 20, 15, 18, 20], color: "#f97316" },
    { label: "Пользователи", value: "4 210", data: [30, 42, 38, 45, 48, 52, 49], color: "#a855f7" },
    { label: "Продавцы", value: "30", data: [22, 24, 26, 28, 30, 32, 30], color: "#eab308" },
  ] as const;
  const alerts = [
    { label: "Fraud Alerts", value: "3", tone: "danger" },
    { label: "Pending KYC", value: "12", tone: "warning" },
    { label: "Payment Issues", value: "2", tone: "danger" },
  ];

  return (
    <AdminShell title="Дашборд">
      <p className="text-xs text-ink-faint">SaaS · fintech dashboard · RBAC · Feature Flags</p>

      {/* Hierarchy: GMV hero → 2 medium → 3 small */}
      <div className="mt-3">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <StatCard label={kpis[0].label} value={kpis[0].value} data={[...kpis[0].data]} color={kpis[0].color} />
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            <StatCard label={kpis[2].label} value={kpis[2].value} data={[...kpis[2].data]} color={kpis[2].color} />
            <StatCard label={kpis[1].label} value={kpis[1].value} data={[...kpis[1].data]} color={kpis[1].color} />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {kpis.slice(3).map((k) => (
            <StatCard key={k.label} label={k.label} value={k.value} data={[...k.data]} color={k.color} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {alerts.map((a) => (
          <div
            key={a.label}
            className={`rounded-2xl p-3 text-sm font-bold ${a.tone === "danger" ? "bg-danger-bg text-danger" : "bg-warning-bg text-warning"}`}
          >
            {a.label}: {a.value}
          </div>
        ))}
      </div>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h2 className="font-bold">🤖 ITOrgo AI — админ-ассистент</h2>
        <p className="mt-1 text-sm text-ink-faint">«Покажи подозрительные аукционы» · «Какие категории растут?» — TODO(agent)</p>
        <div className="mt-3 flex gap-2">
          <input placeholder="Спросите AI…" className="flex-1 rounded-xl border border-line bg-surface-dim px-3 py-2 text-sm" />
          <button className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">Спросить</button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
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

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
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

      <p className="py-6 text-center text-xs text-ink-faint">
        RBAC: Super Admin · Auction/Finance/KYC/Fraud/Support/Marketing/Moderator · Audit Log · полный доступ по ролям
      </p>
    </AdminShell>
  );
}
