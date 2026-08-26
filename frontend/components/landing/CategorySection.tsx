import Link from "next/link";
import type { Category } from "@/types/category.types";

export default function CategorySection({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return <section id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 sm:px-8 lg:px-10"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-violet-600 dark:text-violet-400">Find your corner</p><h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Explore by category</h2></div><Link href="/blogs" className="text-sm font-medium text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">See the full library</Link></div><div className="mt-6 flex flex-wrap gap-3">{categories.slice(0, 10).map((category) => <Link key={category._id} href={`/blogs?category=${category._id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:bg-violet-950/40 dark:hover:text-violet-300">{category.name}</Link>)}</div></section>;
}
