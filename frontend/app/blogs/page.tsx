import PublicNavbar from "@/components/landing/PublicNavbar";
import BlogExplorerPage from "@/components/reader/blogExplorerPage";
import PublicFooter from "@/components/landing/PublicFooter";

export default function PublicBlogsPage() {
  return <main className="theme-page min-h-screen"><PublicNavbar /><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10"><BlogExplorerPage title="Explore all blogs" /></div><PublicFooter /></main>;
}
