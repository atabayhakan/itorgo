/** Tone → bar color, all from design tokens (no hardcoded hex). `brand` for the hero metric, `soft` for the rest. */
type Tone = "brand" | "soft" | "success" | "warning";

const BAR: Record<Tone, string> = {
  brand: "bg-brand-600",
  soft: "bg-brand-200",
  success: "bg-success",
  warning: "bg-warning",
};

export function MiniBarChart({ data, tone = "soft" }: { data: number[]; tone?: Tone }) {
  const max = Math.max(...data, 1);
  const last = data.length - 1;
  return (
    <div className="flex h-24 items-end gap-1">
      {data.map((v, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t ${BAR[tone]} ${tone === "soft" && i === last ? "!bg-brand-600" : ""}`}
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export function StatCard({ label, value, data, tone }: { label: string; value: string; data: number[]; tone?: Tone }) {
  return (
    <div className="rounded-2xl bg-surface p-3 shadow-card">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-black tabular-nums">{value}</p>
      <div className="mt-2"><MiniBarChart data={data} tone={tone} /></div>
    </div>
  );
}
