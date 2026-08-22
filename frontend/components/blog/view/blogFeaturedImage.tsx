import Image from "next/image";
import type { Blog } from "@/types/blog.types";

interface BlogFeaturedImageProps {
  blog: Blog;
}

export default function BlogFeaturedImage({
  blog,
}: BlogFeaturedImageProps) {
  const image =
    blog.featuredImage?.url;

  if (!image) {
    return (
      <div
        className="
          flex
          aspect-[16/8]
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-violet-500/10
          via-[#111114]
          to-[#111114]
          text-sm
          text-slate-600
        "
      >
        No featured image
      </div>
    );
  }

  return (
    <figure
      className="
        relative
        aspect-[16/8]
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111114]
        shadow-2xl
        shadow-black/20
      "
    >
      <Image
        src={image}
        alt={
          blog.featuredImage?.alt ||
          blog.title
        }
        fill
        priority
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1280px) 80vw,
          1000px
        "
        className="
          object-cover
          transition
          duration-700
          hover:scale-[1.015]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </figure>
  );
}