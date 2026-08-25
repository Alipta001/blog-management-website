import Image from "next/image";
import { BookOpen, Eye, UserRound } from "lucide-react";
import type { Blog } from "@/types/blog.types";

interface BlogSidebarProps { blog: Blog; }

export default function BlogSidebar({ blog }: BlogSidebarProps) {
  const author = typeof blog.author === "string" ? null : blog.author;
  return <aside className="blog-sidebar space-y-4"><section className="rounded-2xl border border-white/10 bg-[#111114] p-5"><div className="flex items-center gap-3">{author?.profileImage ? <Image src={author.profileImage} alt={author.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" /> : <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/10 text-violet-400"><UserRound className="h-5 w-5" /></div>}<div><p className="text-xs text-slate-500">Written by</p><p className="font-medium text-white">{author?.name || "Unknown author"}</p></div></div>{author?.bio && <p className="mt-4 text-sm leading-6 text-slate-400">{author.bio}</p>}</section><section className="rounded-2xl border border-white/10 bg-[#111114] p-5"><p className="text-sm font-semibold text-white">Blog stats</p><div className="mt-4 space-y-3 text-sm text-slate-400"><span className="flex items-center justify-between"><span className="flex items-center gap-2"><Eye className="h-4 w-4" />Views</span><strong className="text-white">{blog.views.toLocaleString()}</strong></span><span className="flex items-center justify-between"><span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />Status</span><strong className="capitalize text-white">{blog.status}</strong></span></div></section></aside>;
}
