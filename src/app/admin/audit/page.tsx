export default function AdminAuditPage() {
  const logs = [
    { id: "a1", actor: "admin@itorgo.kg", action: "feature.toggle", target: "kz=ON", at: "2026-08-25 10:02" },
    { id: "a2", actor: "kyc@itorgo.kg", action: "kyc.approve", target: "user s5", at: "2026-08-25 09:41" },
    { id: "a3", actor: "fraud@itorgo.kg", action: "fraud.case_open", target: "auction a3", at: "2026-08-25 08:15" },
  ];
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Audit Log</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-ink-faint">Кто / что / когда / old→new — spec #52</p>
        <ul className="mt-3 space-y-2">
          {logs.map((l) => (
            <li key={l.id} className="rounded-2xl bg-surface px-4 py-3 text-xs shadow-card">
              <p className="font-bold">{l.action} · {l.target}</p>
              <p className="text-ink-faint">{l.actor} · {l.at}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
