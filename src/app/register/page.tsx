import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";
import { getT } from "@/lib/i18n/server";

export default async function RegisterPage() {
  const t = await getT();
  return (
    <main className="px-4 py-4">
      <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
        <IconBack size={18} />
      </Link>
      <h1 className="mt-4 text-xl font-extrabold">{t("auth.register")}</h1>
      <p className="mt-1 text-sm text-ink-faint">{t("auth.register_subtitle")}</p>
      <div className="mt-6 space-y-3">
        <input placeholder={t("auth.name")} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <input placeholder="+996 5XX XXX XXX" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <input placeholder={t("auth.email_optional")} className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
        <button className="btn-primary w-full">{t("auth.create_account")}</button>
        <p className="text-center text-xs text-ink-faint">{t("auth.terms_notice")}</p>
      </div>
      <p className="mt-4 text-center text-xs text-ink-faint">
        {t("auth.have_account")} <Link href="/login" className="font-semibold text-brand-600">{t("auth.login")}</Link>
      </p>
    </main>
  );
}
