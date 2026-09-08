"use client";

import { dictionaries } from "@/lib/i18n/dictionaries";
import { makeT } from "@/lib/i18n/t";

// Renders its own <html> outside LocaleProvider, so the hook is unavailable here; Russian fallback is used.
const t = makeT(dictionaries.ru, dictionaries.ru);

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <main className="mx-auto max-w-xl px-4 py-10 text-center">
          <p className="text-4xl">😕</p>
          <h1 className="mt-3 text-lg font-extrabold">{t("states.error_title")}</h1>
          <p className="mt-1 text-sm text-ink-faint">{t("states.error_text")}</p>
          {error.digest && <p className="mt-2 font-mono text-xs text-ink-faint">ID: {error.digest}</p>}
          <button onClick={() => reset()} className="btn-primary mt-6">
            {t("common.retry")}
          </button>
          <a href="/" className="btn-secondary ml-2 mt-6 inline-flex">
            {t("states.go_home")}
          </a>
        </main>
      </body>
    </html>
  );
}
