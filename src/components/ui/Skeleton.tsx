export function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-[150px] w-full" />
      <div className="space-y-2 p-3">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonAuctionCard() {
  return (
    <div className="card w-[272px] shrink-0 overflow-hidden">
      <div className="skeleton h-[190px] w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-3 w-3/4" />
        <div className="grid grid-cols-2 gap-2">
          <div className="skeleton h-11" />
          <div className="skeleton h-11" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
