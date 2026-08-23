import Image from "next/image";

import type { BlogImage } from "@/types/blog.types";

interface BlogContentImagesProps {
  images?: BlogImage[];
  title: string;
}

export default function BlogContentImages({
  images,
  title,
}: BlogContentImagesProps) {
  const contentImages =
    images?.filter((image) => image.url) || [];

  if (contentImages.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Blog photos"
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {contentImages.map((image, index) => (
        <figure
          key={`${image.publicId || image.url}-${index}`}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#111114]"
        >
          <Image
            src={image.url}
            alt={image.alt || `${title} photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition duration-500 hover:scale-[1.015]"
          />
        </figure>
      ))}
    </section>
  );
}