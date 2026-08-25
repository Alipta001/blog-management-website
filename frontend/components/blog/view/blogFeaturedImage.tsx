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
          rounded-[2rem]
          border
          border-white/10
          bg-gradient-to-br
          from-violet-500/20
          via-[#111114]
          to-[#111114]
          text-sm
          text-slate-500
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
        rounded-[2rem]
        border
        border-white/10
        bg-[#111114]
        shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        blog-featured-image
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
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-1/2
          blog-image-overlay
          bg-gradient-to-t
          from-black/20
          to-transparent
        "
      />
    </figure>
  );
}