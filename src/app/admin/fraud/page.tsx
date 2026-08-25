export default function AdminFraudPage() {
  const cases = [
    { id: "f1", kind: "shill_bidding", score: 0.82, subject: "auction a3", status: "open" },
    { id: "f2", kind: "duplicate_account", score: 0.64, subject: "user s7", status: "reviewing" },
    { id: "f3", kind: "fake_listing", score: 0.91, subject: "product p12", status: "open" },
  ];
  const tone: Record<string, string> = { open: "bg-danger-bg text-danger", reviewing: "bg-warning-bg text-warning" };
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Fraud Center</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-ink-faint">Spec #46 · duplicate / shill / fake image / abnormal login · score &gt;0.7 → case</p>
        <ul className="mt-3 space-y-2">
          {cases.map((c) => (
            <li key={c.id} className="rounded-2xl bg-surface px-4 py-3 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{c.kind}</p>
                <span className={`chip ${tone[c.status]}`}>{c.status}</span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">{c.subject} · score {(c.score * 100).toFixed(0)}%</p>
              <div className="mt-2 flex gap-2">
                <button className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white">Разобрать</button>
                <button className="rounded-full bg-surface-sunken px-3 py-1.5 text-xs font-semibold">Закрыть</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
