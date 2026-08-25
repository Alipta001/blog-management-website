// import Image from "next/image";
// import type { Blog } from "@/types/blog.types";

// interface BlogFeaturedImageProps {
//   blog: Blog;
// }

// export default function BlogFeaturedImage({
//   blog,
// }: BlogFeaturedImageProps) {
//   const image =
//     blog.featuredImage?.url;

//   if (!image) {
//     return (
//       <div
//         className="
//           flex
//           aspect-[16/8]
//           w-full
//           items-center
//           justify-center
//           overflow-hidden
//           rounded-3xl
//           border
//           border-white/10
//           bg-gradient-to-br
//           from-violet-500/10
//           via-[#111114]
//           to-[#111114]
//           text-sm
//           text-slate-600
//         "
//       >
//         No featured image
//       </div>
//     );
//   }

//   return (
//     <figure
//       className="
//         relative
//         aspect-[16/8]
//         w-full
//         overflow-hidden
//         rounded-3xl
//         border
//         border-white/10
//         bg-[#111114]
//         shadow-2xl
//         shadow-black/20
//       "
//     >
//       <Image
//         src={image}
//         alt={
//           blog.featuredImage?.alt ||
//           blog.title
//         }
//         fill
//         priority
//         sizes="
//           (max-width: 768px) 100vw,
//           (max-width: 1280px) 80vw,
//           1000px
//         "
//         className="
//           object-cover
//           transition
//           duration-700
//           hover:scale-[1.015]
//         "
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
//     </figure>
//   );
// }


import Image from "next/image";
import type { Blog } from "@/types/blog.types";

interface BlogFeaturedImageProps {
  blog: Blog;
}

export default function BlogFeaturedImage({
  blog,
}: BlogFeaturedImageProps) {
  const image = blog.featuredImage?.url;

  if (!image) {
    return (
      <div
        className="
          flex
          aspect-[16/9]
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-slate-100
          text-sm
          text-slate-600
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-400
        "
      >
        No featured image available
      </div>
    );
  }

  return (
    <figure
      className="
        group
        relative
        aspect-[16/9]
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900/60
        dark:shadow-none
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
          (max-width: 1280px) 85vw,
          1100px
        "
        className="
          object-cover
          transition
          duration-700
          ease-out
          group-hover:scale-[1.03]
        "
      />

      <div
        className="
          absolute
          inset-0
          blog-image-overlay
          bg-transparent
          dark:bg-gradient-to-t
          dark:from-black/40
          dark:via-transparent
          dark:to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          blog-image-overlay
          bg-transparent
          dark:bg-gradient-to-t
          dark:from-black/20
          dark:to-transparent
        "
      />
    </figure>
  );
}