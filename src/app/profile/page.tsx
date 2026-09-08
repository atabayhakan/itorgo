import Link from "next/link";
import { CountrySwitcher, LocaleSwitcher } from "@/components/i18n/LocaleCountrySwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { IconShield, IconCheck, IconArrowRight, IconPhone, IconMail, IconFileText, IconCreditCard, IconHistory, IconPalette } from "@/components/icons/Icons";
import { getT } from "@/lib/i18n/server";

export default async function ProfilePage() {
  const t = await getT();

  return (
    <main className="min-h-dvh bg-[#0f0f14] text-white">
      {/* Dark premium header */}
      <div className="sticky top-0 z-30 bg-[#0f0f14]/90 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-xl px-4 py-3 flex items-center gap-3">
          <Link href="/" className="text-[17px] font-black tracking-tight shrink-0">
            <span className="text-brand-400">IT</span><span className="text-auction-400">Orgo</span>
          </Link>
          <div className="flex-1" />
          <Link href="/notifications" aria-label={t("nav.notifications")} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition">
            <IconShield size={18} />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-6 space-y-6">
        {/* Profile hero */}
        <section className="rounded-[20px] bg-gradient-to-br from-[#16161f] to-[#1a1a28] border border-white/[0.06] p-5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]">
          <div className="flex gap-4">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-xl font-black text-white shadow-[0_4px_16px_rgba(111,92,247,0.35)]">
              {t("profile.guest_initial")}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-extrabold tracking-tight">{t("profile.guest_name")}</h1>
              <p className="text-sm text-white/40 mt-0.5">{t("profile.login_hint")}</p>
              <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/[0.08] px-3 py-1 text-[11px] font-bold text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("profile.trust_badge", { score: 96 })}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            {[
              { label: t("nav.orders"), value: "0" },
              { label: t("profile.bids"), value: "0" },
              { label: t("nav.favorites"), value: "0" },
              { label: t("nav.wallet"), value: "₽" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.06] px-3 py-3 text-center">
                <p className="text-xl font-black tracking-tight">{s.value}</p>
                <p className="text-[10px] font-semibold text-white/30 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Menu links */}
        <nav className="space-y-1">
          {[
            { label: t("profile.my_purchases"), href: "/orders", icon: IconHistory },
            { label: t("profile.my_bids"), href: "/auctions", icon: IconShield },
            { label: t("nav.messages"), href: "/messages", icon: IconMail },
            { label: t("profile.my_listings"), href: "/seller/s1", icon: IconFileText },
            { label: t("profile.my_store"), href: "/store/st1", icon: IconCreditCard },
            { label: t("nav.wallet"), href: "/wallet", icon: IconCreditCard },
            { label: t("nav.cart"), href: "/cart", icon: IconHistory },
            { label: t("nav.favorites"), href: "/favorites", icon: IconShield },
            { label: t("nav.notifications"), href: "/notifications", icon: IconShield },
            { label: t("profile.settings"), href: "/settings", icon: IconPalette },
          ].map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center justify-between rounded-2xl bg-[#16161f] border border-white/[0.06] px-5 py-3.5 hover:bg-[#1a1a28] hover:border-white/[0.1] transition shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white/70">
                  <Icon size={16} />
                </span>
                <span className="text-[15px] font-semibold">{label}</span>
              </div>
              <IconArrowRight size={16} className="text-white/20" />
            </Link>
          ))}
        </nav>

        {/* Language & country */}
        <section className="rounded-[20px] bg-[#16161f] border border-white/[0.06] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <h2 className="text-sm font-extrabold tracking-tight">{t("profile.language_country")}</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("profile.language")}</span>
              <LocaleSwitcher />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("profile.country")}</span>
              <CountrySwitcher />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("profile.theme")}</span>
              <ThemeToggle />
            </div>
          </div>
        </section>

        {/* Trust details */}
        <section className="rounded-[20px] bg-[#16161f] border border-white/[0.06] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <h2 className="text-sm font-extrabold tracking-tight">{t("profile.trust_details")}</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            {[
              { label: t("profile.phone"), ok: true },
              { label: t("profile.email"), ok: true },
              { label: t("profile.documents"), ok: false },
              { label: t("profile.bank"), ok: false },
              { label: t("profile.sales_history"), ok: true },
            ].map(({ label, ok }) => (
              <li key={label} className="flex items-center justify-between">
                <span className="text-white/70">{label}</span>
                <span className={ok ? "text-emerald-400" : "text-white/15"}>
                  {ok ? <IconCheck size={16} /> : <span className="text-[10px]">—</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
