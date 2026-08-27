import type { MetadataRoute } from "next";
import { getPublishedBlogs, SITE_URL } from "@/app/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "daily", priority: 0.9 },
  ];
  const blogs = await getPublishedBlogs();
  return [
    ...staticEntries,
    ...blogs.map((blog) => ({
      url: `${SITE_URL}/blogs/${blog._id}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}