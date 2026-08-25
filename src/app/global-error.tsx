"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <main className="mx-auto max-w-xl px-4 py-10 text-center">
          <p className="text-4xl">😕</p>
          <h1 className="mt-3 text-lg font-extrabold">Что-то пошло не так</h1>
          <p className="mt-1 text-sm text-ink-faint">Попробуйте ещё раз. Если ошибка повторяется — свяжитесь с поддержкой.</p>
          {error.digest && <p className="mt-2 font-mono text-xs text-ink-faint">ID: {error.digest}</p>}
          <button onClick={() => reset()} className="btn-primary mt-6">
            Повторить
          </button>
          <a href="/" className="btn-secondary ml-2 mt-6 inline-flex">
            На главную
          </a>
        </main>
      </body>
    </html>
  );
}
