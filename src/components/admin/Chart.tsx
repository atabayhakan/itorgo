export function MiniBarChart({ data, color = "#5b46e8" }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-24 items-end gap-1">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t" style={{ height: `${(v / max) * 100}%`, background: color }} />
      ))}
    </div>
  );
}

export function StatCard({ label, value, data, color }: { label: string; value: string; data: number[]; color?: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3 shadow-card">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-black tabular-nums">{value}</p>
      <div className="mt-2"><MiniBarChart data={data} color={color} /></div>
    </div>
  );
}
