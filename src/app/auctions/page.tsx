import Link from "next/link";
export default function AuctionsPage() {
  return (
    <main className="px-4 py-10 text-center">
      <p className="text-3xl">🔨</p>
      <h1 className="mt-2 text-lg font-bold">Аукционы</h1>
      <p className="mt-1 text-sm text-ink-faint">Полный раздел аукционов — следующий этап.</p>
      <Link href="/" className="btn-primary mt-6">На главную</Link>
    </main>
  );
}
