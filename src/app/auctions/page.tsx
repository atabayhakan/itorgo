import { getLiveAuctions } from "@/lib/data/mock-data";
import { AuctionCard } from "@/components/auction/AuctionCard";

export const dynamic = "force-dynamic";

export default function AuctionsPage() {
  const live = getLiveAuctions();
  return (
    <main className="px-4 py-4">
      <h1 className="flex items-center gap-2 text-lg font-extrabold">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-xs font-bold text-danger">
          <span className="live-dot h-2 w-2 rounded-full bg-danger" /> LIVE
        </span>
        Аукционы
      </h1>
      <p className="mt-1 text-xs text-ink-faint">{live.length} активных торгов — делайте ставки в реальном времени</p>
      <div className="mt-4 grid gap-4">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 snap-x">
          {live.map((a) => (
            <div key={a.id} className="snap-start">
              <AuctionCard auctionId={a.id} />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-ink-faint">Горизонтальный свайп · нажмите «Ставка» для открытия bottom sheet</p>
      </div>
    </main>
  );
}
