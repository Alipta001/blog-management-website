import BlogViewPage from "@/components/blog/view/blogViewPage";

interface PublicBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicBlogPage({ params }: PublicBlogPageProps) {
  const { id } = await params;

  return <BlogViewPage id={id} context="public" />;
}