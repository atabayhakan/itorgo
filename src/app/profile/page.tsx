export default function ProfilePage() {
  return (
    <main className="px-4 py-8">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full bg-brand-200" />
        <div>
          <p className="font-bold">Гость</p>
          <p className="text-sm text-ink-faint">🛡 Надёжность — войдите, чтобы увидеть</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-faint">Профиль, кошелёк, ставки, заказы, магазин — следующий этап (spec #25–#26).</p>
    </main>
  );
}
