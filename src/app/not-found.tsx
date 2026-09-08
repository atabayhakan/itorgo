import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const t = await getT();
  return (
    <main className="px-4 py-10 text-center">
      <p className="text-4xl">🧭</p>
      <h1 className="mt-3 text-lg font-extrabold">{t("states.not_found_title")}</h1>
      <p className="mt-1 text-sm text-ink-faint">{t("states.not_found_text")}</p>
      <a href="/" className="btn-primary mt-6 inline-flex">
        {t("states.go_home")}
      </a>
    </main>
  );
}
