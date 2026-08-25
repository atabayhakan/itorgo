import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <main className="px-4 py-10 text-center">
      <p className="text-4xl">🧭</p>
      <h1 className="mt-3 text-lg font-extrabold">Страница не найдена</h1>
      <p className="mt-1 text-sm text-ink-faint">Проверьте адрес или вернитесь на главную.</p>
      <a href="/" className="btn-primary mt-6 inline-flex">
        На главную
      </a>
    </main>
  );
}
