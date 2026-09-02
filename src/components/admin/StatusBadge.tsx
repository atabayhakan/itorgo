type Variant = "success" | "warning" | "danger" | "info" | "neutral";

const STATUS_VARIANT: Record<string, Variant> = {
  paid: "success",
  delivered: "success",
  verified: "success",
  closed: "success",
  pending: "warning",
  processing: "warning",
  reviewing: "warning",
  rejected: "danger",
  open: "danger",
  shipped: "info",
};

const VARIANT_CLASS: Record<Variant, string> = {
  success: "bg-success-bg text-success border-success-border",
  warning: "bg-warning-bg text-warning border-warning-border",
  danger: "bg-danger-bg text-danger border-danger-border",
  info: "bg-info-bg text-info border-info-border",
  neutral: "bg-surface-sunken text-ink-faint border-line",
};

/** Single source of truth for status → color across admin tables. */
export function StatusBadge({ status }: { status: string }) {
  const variant = STATUS_VARIANT[status] ?? "neutral";
  return <span className={`chip border ${VARIANT_CLASS[variant]}`}>{status}</span>;
}
