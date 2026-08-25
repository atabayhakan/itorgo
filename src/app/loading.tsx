export default function Loading() {
  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <div className="space-y-3">
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-28 w-full" />
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton h-40" />
          <div className="skeleton h-40" />
          <div className="skeleton h-40" />
          <div className="skeleton h-40" />
        </div>
      </div>
    </main>
  );
}
