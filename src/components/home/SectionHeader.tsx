import Link from "next/link";
import { IconChevron } from "@/components/icons/Icons";
import { getT } from "@/lib/i18n/server";

export async function SectionHeader({
  title,
  subtitle,
  href,
  live = false,
  count,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  live?: boolean;
  count?: number;
}) {
  const t = await getT();
  return (
    <div className="flex items-end justify-between gap-3 px-4">
      <div className="min-w-0">
        <h2 className="flex flex-wrap items-center gap-2 text-[18px] font-black tracking-tight lg:text-[20px]">
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-[11px] font-black tracking-wide text-danger">
              <span className="live-dot h-2 w-2 rounded-full bg-danger" />
              LIVE
            </span>
          )}
          <span className="tracking-tight">{title}</span>
          {typeof count === "number" && (
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-bold text-ink-faint">{count}</span>
          )}
        </h2>
        {subtitle && <p className="mt-1 text-xs leading-relaxed text-ink-faint lg:text-sm">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="hidden shrink-0 items-center gap-0.5 rounded-full bg-surface px-3 py-1.5 text-sm font-bold text-ink-soft shadow-card hover:text-brand-600 lg:inline-flex">
          {t("common.see_all")} <IconChevron size={14} strokeWidth={2.2} />
        </Link>
      )}
      {href && (
        <Link href={href} className="inline-flex shrink-0 items-center gap-0.5 text-sm font-bold text-brand-600 lg:hidden">
          {t("common.see_all")} <IconChevron size={16} strokeWidth={2.2} />
        </Link>
      )}
    </div>
  );
}
