import EditBlogForm from "@/components/author/editBlog/editBlogForm";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;

  return <div className="mx-auto w-full max-w-[1600px]"><EditBlogForm id={id} /></div>;
}