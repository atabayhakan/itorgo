"use client";

import { useT } from "@/lib/i18n/LocaleProvider";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useT();
  return (
    <main className="px-4 py-10 text-center">
      <p className="text-4xl">😕</p>
      <h1 className="mt-3 text-lg font-extrabold">{t("states.error_title")}</h1>
      <p className="mt-1 text-sm text-ink-faint">{t("states.error_text")}</p>
      {error.digest && <p className="mt-2 font-mono text-xs text-ink-faint">ID: {error.digest}</p>}
      <button onClick={() => reset()} className="btn-primary mt-6">
        {t("common.retry")}
      </button>
    </main>
  );
}
