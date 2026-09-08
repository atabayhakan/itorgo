import Link from "next/link";
import { getT } from "@/lib/i18n/server";

export default async function KycPage() {
  const t = await getT();

  const steps = [
    { label: t("kyc.phone"), status: "done", desc: "+996 5XX XXX XXX · SMS OTP ✓" },
    { label: t("kyc.email"), status: "done", desc: "name@itorgo.kg ✓" },
    { label: t("kyc.documents"), status: "pending", desc: t("kyc.documents_desc") },
    { label: t("kyc.bank"), status: "pending", desc: t("kyc.bank_desc") },
    { label: t("kyc.sales_history"), status: "done", desc: t("kyc.sales_history_desc", { n: 3, pct: 100 }) },
  ] as const;

  return (
    <main className="px-4 py-4">
      <h1 className="flex items-center gap-2 text-lg font-extrabold">🛡 {t("kyc.title")}</h1>
      <p className="mt-1 text-sm text-ink-faint">{t("kyc.subtitle")}</p>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <div className="flex items-center justify-between">
          <span className="font-bold">{t("kyc.trust_score")}</span>
          <span className="text-lg font-black text-success">72%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-surface-dim">
          <div className="h-2 rounded-full bg-success" style={{ width: "72%" }} />
        </div>
        <ul className="mt-4 space-y-3">
          {steps.map((s) => (
            <li key={s.label} className="flex items-start justify-between rounded-xl bg-surface-dim px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-ink-faint">{s.desc}</p>
              </div>
              <span className={`chip shrink-0 ${s.status === "done" ? "bg-success-bg text-success" : "bg-warning-bg text-warning"}`}>
                {s.status === "done" ? t("kyc.status_done") : t("kyc.status_required")}
              </span>
            </li>
          ))}
        </ul>
        <button className="btn-primary mt-4 w-full">{t("kyc.start_verification")}</button>
      </section>

      <div className="mt-4 flex gap-2">
        <Link href="/profile" className="btn-secondary flex-1">
          {t("nav.profile")}
        </Link>
        <Link href="/admin" className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold">
          {t("kyc.admin_queue")}
        </Link>
      </div>
    </main>
  );
}
