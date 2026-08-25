export default function SearchPage() {
  return (
    <main className="px-4 py-8">
      <h1 className="text-lg font-bold">Поиск</h1>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3 text-sm text-ink-faint">
        Что вы ищете? <span className="ml-auto text-xs">например: iPhone до 50000 сом в Бишкеке</span>
      </div>
      <p className="mt-4 text-sm text-ink-faint">AI-поиск и фильтры — следующий этап (spec #11–#12).</p>
    </main>
  );
}
