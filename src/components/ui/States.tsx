"use client";

import { IconShield } from "@/components/icons/Icons";
import { useT } from "@/lib/i18n/LocaleProvider";

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
  const t = useT();
  return (
    <div className="rounded-2xl bg-surface px-6 py-10 text-center shadow-card">
      <p className="text-3xl">😕</p>
      <h3 className="mt-3 font-bold">{t("states.error_title")}</h3>
      <p className="mt-1 text-sm text-ink-faint">{t("states.error_text")}</p>
      <button onClick={onRetry ?? (() => location.reload())} className="btn-primary mt-4">
        {t("common.retry")}
      </button>
    </div>
  );
}

export function TrustBadge({ pct = 96 }: { pct?: number }) {
  const t = useT();
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-xs font-bold text-success">
      <IconShield size={12} /> {t("seller.score")} {pct}%
    </span>
  );
}
