export default function TagSkeleton() {
  return (
    <div className="space-y-3 p-6" aria-label="Loading tags">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 border-b border-white/[0.06] py-5">
          <div className="h-5 w-32 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-5 w-24 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-5 w-28 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-5 w-20 animate-pulse rounded bg-white/[0.06]" />
        </div>
      ))}
    </div>
  );
}
