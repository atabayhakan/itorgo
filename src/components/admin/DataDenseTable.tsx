"use client";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

export function DataDenseTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onSort,
  sortKey,
  sortDir = "asc",
}: {
  columns: Column<T>[];
  rows: T[];
  onSort?: (key: string) => void;
  sortKey?: string;
  sortDir?: "asc" | "desc";
}) {
  return (
    <div className="overflow-auto rounded-2xl border border-line bg-surface shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-xs">
        <thead className="sticky top-0 bg-surface-dim text-[11px] font-bold tracking-widest text-ink-faint">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                style={c.width ? { width: c.width } : undefined}
                className={`whitespace-nowrap px-3 py-2 ${c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left"} ${c.sortable ? "cursor-pointer select-none hover:text-ink" : ""}`}
                onClick={() => c.sortable && onSort?.(String(c.key))}
              >
                <span className="inline-flex items-center gap-1">
                  {c.header}
                  {c.sortable && sortKey === String(c.key) && <span>{sortDir === "asc" ? "▲" : "▼"}</span>}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-xs">
          {rows.map((r, i) => (
            <tr key={String((r as Record<string, unknown>).id ?? i)} className="hover:bg-surface-dim/60">
              {columns.map((c) => (
                <td key={String(c.key)} className={`px-3 py-2 ${c.align === "right" ? "text-right tabular-nums" : c.align === "center" ? "text-center" : ""}`}>
                  {c.render ? c.render(r) : String((r as Record<string, unknown>)[String(c.key)] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-ink-faint">
                Нет данных
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
