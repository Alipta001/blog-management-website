"use client";

import { Check } from "lucide-react";

interface Tag {
  _id: string;

  name: string;
}

interface BlogTagsProps {
  tags: Tag[];

  selectedTags: string[];

  onChange: (tags: string[]) => void;

  loading?: boolean;
}

export default function BlogTags({
  tags,
  selectedTags,
  onChange,
  loading = false,
}: BlogTagsProps) {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(
        selectedTags.filter(
          (id) => id !== tagId
        )
      );

      return;
    }

    onChange([
      ...selectedTags,
      tagId,
    ]);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#09090b] p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          Tags
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Select relevant tags.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading tags...
        </p>
      ) : tags.length === 0 ? (
        <p className="text-sm text-slate-500">
          No tags available.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const selected =
              selectedTags.includes(tag._id);

            return (
              <button
                key={tag._id}
                type="button"
                onClick={() =>
                  toggleTag(tag._id)
                }
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  selected
                    ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {selected && (
                  <Check className="h-3.5 w-3.5" />
                )}

                {tag.name}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}