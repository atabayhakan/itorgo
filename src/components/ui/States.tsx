import { IconShield } from "@/components/icons/Icons";

export function EmptyState({
  icon = "❤️",
  title,
  text,
  action,
}: {
  icon?: string;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-surface px-6 py-10 text-center shadow-card">
      <p className="text-4xl">{icon}</p>
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-ink-faint">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-2xl bg-surface px-6 py-10 text-center shadow-card">
      <p className="text-3xl">😕</p>
      <h3 className="mt-3 font-bold">Что-то пошло не так</h3>
      <p className="mt-1 text-sm text-ink-faint">Попробуйте ещё раз.</p>
      <button onClick={onRetry ?? (() => location.reload())} className="btn-primary mt-4">
        Повторить
      </button>
    </div>
  );
}

export function TrustBadge({ pct = 96 }: { pct?: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-xs font-bold text-success">
      <IconShield size={12} /> Надёжность {pct}%
    </span>
  );
}
