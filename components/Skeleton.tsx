export default function Skeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mb-8">
        <div className="col-span-1 lg:col-span-2 h-[420px] bg-zinc-200 animate-pulse rounded-xl" />
        <div className="flex flex-col gap-4">
          <div className="h-[98px] bg-zinc-200 animate-pulse rounded-xl" />
          <div className="h-[98px] bg-zinc-200 animate-pulse rounded-xl" />
          <div className="h-[98px] bg-zinc-200 animate-pulse rounded-xl" />
          <div className="h-[98px] bg-zinc-200 animate-pulse rounded-xl" />
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[300px] bg-zinc-200 animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );
}
