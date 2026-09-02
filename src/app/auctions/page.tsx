import { getLiveAuctions } from "@/lib/data/catalog";
import { AuctionCard } from "@/components/auction/AuctionCard";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  const live = await getLiveAuctions();

  return (
    <main className="min-h-screen bg-[#0f0f14] pb-32 text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-4 lg:px-10 lg:py-6">
        {/* Premium header */}
        <div className="rounded-[20px] border border-white/[0.06] bg-gradient-to-br from-[#0a0a12] via-[#0f0f14] to-[#12121a] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-auction-500 to-auction-600 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              LIVE
            </span>
            <span className="text-xs font-bold text-white/40">{live.length} активных торгов</span>
          </div>
          <h1 className="mt-3 text-[28px] font-black leading-tight tracking-tight lg:text-[36px]">
            Аукционы
            <br />
            <span className="bg-gradient-to-r from-auction-400 to-auction-600 bg-clip-text text-transparent">
              в реальном времени
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Делайте ставки, наблюдайте за торгами и покупайте по лучшей цене
          </p>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { v: live.length, l: "LIVE" },
              { v: "1.2K", l: "ставок сегодня" },
              { v: "−34%", l: "vs рынок" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-[12px] border border-white/[0.06] bg-[#16161f] px-3 py-2 text-center"
              >
                <div className="text-[18px] font-extrabold text-white">{s.v}</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-white/40">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section title */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h2 className="text-[18px] font-extrabold">Сейчас на торгах</h2>
            <p className="text-xs text-white/50">Свайп → чтобы увидеть больше</p>
          </div>
          <button className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-1.5 text-xs font-bold text-white/70">
            Фильтр
          </button>
        </div>

        {/* Horizontal scroll premium cards */}
        <div className="mt-4">
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory lg:mx-0 lg:px-0">
            {live.map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-white/30">
            Горизонтальный свайп · нажмите «Ставка» для bottom sheet
          </p>
        </div>
      </div>
    </main>
  );
}
