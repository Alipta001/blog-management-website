// "use client";

// import DOMPurify from "dompurify";

// interface BlogContentProps {
//   content: string;
// }

// export default function BlogContent({
//   content,
// }: BlogContentProps) {
//   const sanitizedContent =
//     DOMPurify.sanitize(content || "");

//   return (
//     <article
//       className="
//         overflow-hidden
//         rounded-2xl
//         border
//         border-white/10
//         bg-[#111114]
//         shadow-2xl
//         shadow-black/10
//       "
//     >
//       <div
//         className="
//           blog-content
//           max-w-none
//           px-5
//           py-8
//           text-[16px]
//           leading-8
//           text-slate-300
//           sm:px-8
//           sm:py-10
//           lg:px-12
//           lg:py-12

//           [&_p]:mb-6
//           [&_p]:text-slate-300

//           [&_h1]:mb-6
//           [&_h1]:mt-10
//           [&_h1]:text-3xl
//           [&_h1]:font-bold
//           [&_h1]:leading-tight
//           [&_h1]:text-white

//           [&_h2]:mb-5
//           [&_h2]:mt-10
//           [&_h2]:text-2xl
//           [&_h2]:font-bold
//           [&_h2]:leading-tight
//           [&_h2]:text-white

//           [&_h3]:mb-4
//           [&_h3]:mt-8
//           [&_h3]:text-xl
//           [&_h3]:font-semibold
//           [&_h3]:text-white

//           [&_h4]:mb-3
//           [&_h4]:mt-7
//           [&_h4]:text-lg
//           [&_h4]:font-semibold
//           [&_h4]:text-white

//           [&_strong]:font-semibold
//           [&_strong]:text-white

//           [&_em]:italic
//           [&_em]:text-slate-200

//           [&_a]:font-medium
//           [&_a]:text-violet-400
//           [&_a]:underline
//           [&_a]:underline-offset-4
//           [&_a]:transition
//           hover:[&_a]:text-violet-300

//           [&_ul]:mb-7
//           [&_ul]:ml-6
//           [&_ul]:list-disc

//           [&_ol]:mb-7
//           [&_ol]:ml-6
//           [&_ol]:list-decimal

//           [&_li]:mb-2
//           [&_li]:pl-1
//           [&_li]:text-slate-300

//           [&_blockquote]:my-8
//           [&_blockquote]:border-l-4
//           [&_blockquote]:border-violet-500
//           [&_blockquote]:bg-violet-500/[0.06]
//           [&_blockquote]:px-6
//           [&_blockquote]:py-5
//           [&_blockquote]:text-slate-300

//           [&_blockquote_p]:mb-0

//           [&_code]:rounded-md
//           [&_code]:bg-black/40
//           [&_code]:px-1.5
//           [&_code]:py-1
//           [&_code]:font-mono
//           [&_code]:text-sm
//           [&_code]:text-violet-300

//           [&_pre]:my-8
//           [&_pre]:overflow-x-auto
//           [&_pre]:rounded-xl
//           [&_pre]:border
//           [&_pre]:border-white/10
//           [&_pre]:bg-black/50
//           [&_pre]:p-5

//           [&_pre_code]:bg-transparent
//           [&_pre_code]:p-0
//           [&_pre_code]:text-slate-300

//           [&_img]:my-8
//           [&_img]:max-h-[650px]
//           [&_img]:w-full
//           [&_img]:rounded-2xl
//           [&_img]:object-cover

//           [&_hr]:my-10
//           [&_hr]:border-white/10

//           [&_table]:my-8
//           [&_table]:w-full
//           [&_table]:border-collapse

//           [&_th]:border
//           [&_th]:border-white/10
//           [&_th]:bg-white/[0.04]
//           [&_th]:px-4
//           [&_th]:py-3
//           [&_th]:text-left
//           [&_th]:font-semibold
//           [&_th]:text-white

//           [&_td]:border
//           [&_td]:border-white/10
//           [&_td]:px-4
//           [&_td]:py-3
//           [&_td]:text-slate-300
//         "
//         dangerouslySetInnerHTML={{
//           __html: sanitizedContent,
//         }}
//       />
//     </article>
//   );
// }

"use client";

import DOMPurify from "dompurify";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({
  content,
}: BlogContentProps) {
  const sanitizedContent =
    DOMPurify.sanitize(content || "");

  return (
    <article className="mx-auto max-w-3xl">
      <div
        className="
          blog-content
          blog-content-surface
          text-[17px]
          leading-8
          text-slate-300
          sm:text-[18px]
          sm:leading-9

          [&_p]:mb-7
          [&_p]:leading-8
          [&_p]:text-slate-300

          [&_h1]:mb-6
          [&_h1]:mt-14
          [&_h1]:text-3xl
          [&_h1]:font-bold
          [&_h1]:leading-tight
          [&_h1]:tracking-tight
          [&_h1]:text-white
          sm:[&_h1]:text-4xl

          [&_h2]:mb-5
          [&_h2]:mt-14
          [&_h2]:text-2xl
          [&_h2]:font-bold
          [&_h2]:leading-tight
          [&_h2]:text-white
          sm:[&_h2]:text-3xl

          [&_h3]:mb-4
          [&_h3]:mt-10
          [&_h3]:text-xl
          [&_h3]:font-semibold
          [&_h3]:text-white
          sm:[&_h3]:text-2xl

          [&_strong]:font-semibold
          [&_strong]:text-white

          [&_em]:text-slate-200

          [&_a]:font-medium
          [&_a]:text-violet-400
          [&_a]:underline
          [&_a]:decoration-violet-500/50
          [&_a]:underline-offset-4
          hover:[&_a]:text-violet-300

          [&_ul]:mb-8
          [&_ul]:ml-5
          [&_ul]:list-disc
          [&_ul]:space-y-3

          [&_ol]:mb-8
          [&_ol]:ml-5
          [&_ol]:list-decimal
          [&_ol]:space-y-3

          [&_li]:pl-2
          [&_li]:text-slate-300

          [&_blockquote]:my-10
          [&_blockquote]:rounded-r-2xl
          [&_blockquote]:border-l-4
          [&_blockquote]:border-violet-500
          [&_blockquote]:bg-gradient-to-r
          [&_blockquote]:from-violet-500/10
          [&_blockquote]:to-transparent
          [&_blockquote]:px-6
          [&_blockquote]:py-6
          [&_blockquote]:text-lg
          [&_blockquote]:italic
          [&_blockquote]:leading-8
          [&_blockquote]:text-slate-200

          [&_blockquote_p]:mb-0

          [&_code]:rounded-md
          [&_code]:border
          [&_code]:border-violet-500/10
          [&_code]:bg-violet-500/10
          [&_code]:px-2
          [&_code]:py-1
          [&_code]:font-mono
          [&_code]:text-sm
          [&_code]:text-violet-300

          [&_pre]:my-10
          [&_pre]:overflow-x-auto
          [&_pre]:rounded-2xl
          [&_pre]:border
          [&_pre]:border-white/10
          [&_pre]:bg-black/50
          [&_pre]:p-6
          [&_pre]:shadow-xl

          [&_pre_code]:border-0
          [&_pre_code]:bg-transparent
          [&_pre_code]:p-0
          [&_pre_code]:text-slate-300

          [&_img]:my-10
          [&_img]:w-full
          [&_img]:rounded-2xl
          [&_img]:border
          [&_img]:border-white/10

          [&_hr]:my-14
          [&_hr]:border-white/10

          [&_table]:my-10
          [&_table]:w-full
          [&_table]:border-collapse
          [&_table]:overflow-hidden
          [&_table]:rounded-xl

          [&_th]:border
          [&_th]:border-white/10
          [&_th]:bg-white/[0.05]
          [&_th]:px-4
          [&_th]:py-3
          [&_th]:text-left
          [&_th]:font-semibold
          [&_th]:text-white

          [&_td]:border
          [&_td]:border-white/10
          [&_td]:px-4
          [&_td]:py-3
          [&_td]:text-slate-300
        "
        dangerouslySetInnerHTML={{
          __html: sanitizedContent,
        }}
      />
    </article>
  );
}