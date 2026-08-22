import { Tags } from "lucide-react";

interface TagEmptyStateProps {
  filtered: boolean;
}

export default function TagEmptyState({ filtered }: TagEmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-2xl bg-white/[0.03] p-4"><Tags className="h-7 w-7 text-slate-500" /></div>
      <h3 className="mt-4 text-base font-semibold text-white">{filtered ? "No tags found" : "No tags created yet"}</h3>
      <p className="mt-2 text-sm text-slate-500">{filtered ? "Try changing your search criteria." : "Create a tag to organize blog content."}</p>
    </div>
  );
}
