// export default function BlogViewSkeleton() {
//   return <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6"><div className="h-4 w-40 rounded bg-white/10" /><div className="h-12 max-w-3xl rounded bg-white/10" /><div className="h-5 max-w-2xl rounded bg-white/10" /><div className="aspect-[16/8] rounded-2xl bg-white/[0.06]" /><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"><div className="space-y-4"><div className="h-5 rounded bg-white/10" /><div className="h-5 rounded bg-white/10" /><div className="h-5 rounded bg-white/10" /></div><div className="h-48 rounded-2xl bg-white/[0.06]" /></div></div>;
// }


export default function BlogViewSkeleton() {
  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="max-w-4xl space-y-4">
          <div className="h-6 w-20 rounded-full bg-white/[0.06]" />

          <div className="h-12 w-3/4 rounded-lg bg-white/[0.06]" />

          <div className="h-5 w-full max-w-2xl rounded bg-white/[0.06]" />

          <div className="h-5 w-2/3 rounded bg-white/[0.06]" />
        </div>

        <div className="h-5 w-full border-b border-white/10" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-8">
            <div className="aspect-[16/8] rounded-2xl bg-white/[0.06]" />

            <div className="rounded-2xl border border-white/10 bg-[#111114] p-8">
              <div className="space-y-4">
                {Array.from({
                  length: 12,
                }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-4 rounded bg-white/[0.06] ${
                      index % 4 === 0
                        ? "w-3/4"
                        : "w-full"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="h-16 rounded-2xl bg-white/[0.06]" />
          </div>

          <div className="h-80 rounded-2xl bg-white/[0.06]" />
        </div>
      </div>
    </main>
  );
}