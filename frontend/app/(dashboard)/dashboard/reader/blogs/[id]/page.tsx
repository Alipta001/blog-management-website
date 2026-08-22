import BlogViewPage from "@/components/blog/view/blogViewPage";

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: BlogPageProps) {
  const { id } = await params;

  return <BlogViewPage id={id} context="public" />;
}
