import type { Blog, BlogsResponse } from "@/types/blog.types";

export const SITE_URL = (
  process.env.PUBLIC_SITE_URL || "https://yourdomain.com"
).replace(/\/$/, "");

const API_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://blog-management-website.onrender.com"
).replace(/\/$/, "");

export const FALLBACK_IMAGE = `${SITE_URL}/file.svg`;

export async function getPublicBlog(id: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_URL}/blog/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data?: Blog };
    return payload.data || null;
  } catch {
    return null;
  }
}

export async function getPublishedBlogs(): Promise<Blog[]> {
  const blogs: Blog[] = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const response = await fetch(`${API_URL}/blog?page=${page}&limit=100`, {
        next: { revalidate: 300 },
      });
      if (!response.ok) break;
      const payload = (await response.json()) as { data?: BlogsResponse };
      const data = payload.data;
      if (!data) break;
      blogs.push(...data.blogs.filter((blog) => blog.status === "published" && !blog.isDeleted));
      totalPages = data.pagination.totalPages;
      page += 1;
    }
  } catch {
    return blogs;
  }

  return blogs;
}

export function truncateDescription(value: string, maxLength = 160) {
  const plainText = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength - 1).trimEnd()}…`;
}
