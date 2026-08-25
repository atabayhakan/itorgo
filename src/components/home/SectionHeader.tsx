import Link from "next/link";
import { IconChevron } from "@/components/icons/Icons";

export function SectionHeader({
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
  return (
    <div className="flex items-end justify-between px-4">
      <div>
        <h2 className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight">
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-[11px] font-bold tracking-wide text-danger">
              <span className="live-dot h-2 w-2 rounded-full bg-danger" />
              LIVE
            </span>
          )}
          {title}
          {typeof count === "number" && (
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-bold text-ink-faint">{count}</span>
          )}
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-ink-faint">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-0.5 text-sm font-semibold text-brand-600">
          Все <IconChevron size={16} strokeWidth={2.2} />
        </Link>
      )}
    </div>
  );
}
