import { getT } from "@/lib/i18n/server";

export default async function StoresPage() {
  const t = await getT();
  return <main className="px-4 py-8"><h1 className="text-lg font-bold">{t("nav.stores")}</h1><p className="mt-2 text-sm text-ink-faint">{t("home.stores_coming")}</p></main>;
}
