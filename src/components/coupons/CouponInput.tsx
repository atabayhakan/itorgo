"use client";

import { useState } from "react";
import { validateCoupon } from "@/lib/coupons/coupons";
import { useT } from "@/lib/i18n/LocaleProvider";

export function CouponInput({ onApply }: { onApply: (discount: number, code: string) => void }) {
  const t = useT();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  function apply() {
    const c = validateCoupon(code);
    if (!c) { setMsg(t("coupons.invalid")); return; }
    setMsg(t("coupons.applied", { code: c.code, pct: c.discountPct }));
    onApply(c.discountPct, c.code);
  }

  return (
    <div className="rounded-xl bg-surface-dim p-3">
      <div className="flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("coupons.placeholder")} className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
        <button onClick={apply} className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">{t("coupons.apply")}</button>
      </div>
      {msg && <p className="mt-2 text-xs font-semibold text-ink-soft">{msg}</p>}
      <p className="mt-1 text-xs text-ink-faint">{t("coupons.demo_hint")}</p>
    </div>
  );
}
