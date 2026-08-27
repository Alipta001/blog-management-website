import BlogViewPage from "@/components/blog/view/blogViewPage";
import type { Metadata } from "next";
import { FALLBACK_IMAGE, getPublicBlog, SITE_URL, truncateDescription } from "@/app/seo";

interface PublicBlogPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PublicBlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getPublicBlog(id);
  if (!blog) return {};

  const description = truncateDescription(blog.description || blog.content);
  const image = blog.featuredImage?.url || FALLBACK_IMAGE;
  const author = typeof blog.author === "string" ? undefined : blog.author.name;

  return {
    title: blog.title,
    description,
    alternates: { canonical: `/blogs/${blog._id}` },
    openGraph: {
      type: "article",
      title: blog.title,
      description,
      url: `${SITE_URL}/blogs/${blog._id}`,
      images: [{ url: image, alt: blog.title }],
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: author ? [author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [image],
    },
  };
}

export default async function PublicBlogPage({ params }: PublicBlogPageProps) {
  const { id } = await params;

  return <BlogViewPage id={id} context="public" />;
}