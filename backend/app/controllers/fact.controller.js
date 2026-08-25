const RSS_FEEDS = [
  { region: "india", category: "India", url: "https://indianexpress.com/section/india/feed/" },
  { region: "india", category: "Business India", url: "https://indianexpress.com/section/business/feed/" },
  { region: "india", category: "Technology India", url: "https://indianexpress.com/section/technology/feed/" },
  { region: "india", category: "Science India", url: "https://indianexpress.com/section/explained/science/feed/" },
  { region: "india", category: "India Today", url: "https://www.indiatoday.in/rss/1206514" },
  { region: "india", category: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss" },
  { region: "world", category: "World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { region: "world", category: "Technology", url: "https://feeds.bbci.co.uk/news/technology/rss.xml" },
  { region: "world", category: "Science", url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" },
  { region: "world", category: "NPR", url: "https://feeds.npr.org/1001/rss.xml" },
];

const CACHE_TTL = 10 * 60 * 1000;
let cache = { expiresAt: 0, stories: [] };

const decodeXml = (value = "") => value
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .trim();

const stripHtml = (value = "") => decodeXml(value)
  .replace(/<[^>]*>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const getTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const getImage = (item) => {
  const media = item.match(/<(?:media:content|media:thumbnail|enclosure)[^>]*(?:url|href)=["']([^"']+)["'][^>]*>/i);
  return media?.[1] || null;
};

const parseFeed = (xml, category) => {
  const entries = xml.match(/<(?:item|entry)(?:\s[^>]*)?>[\s\S]*?<\/(?:item|entry)>/gi) || [];
  return entries.map((entry) => {
    const title = stripHtml(getTag(entry, "title"));
    const url = getTag(entry, "link") || entry.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] || "";
    const description = stripHtml(getTag(entry, "description") || getTag(entry, "summary") || getTag(entry, "content"));
    const publishedAt = getTag(entry, "pubDate") || getTag(entry, "published") || getTag(entry, "updated");
    return {
      category,
      title,
      excerpt: description.slice(0, 240),
      image: getImage(entry),
      url,
      publishedAt: publishedAt || new Date().toISOString(),
    };
  }).filter((story) => story.title && story.url);
};

const fetchFeed = async ({ region, category, url }) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "GolpoKotha/1.0 news reader" },
    });
    if (!response.ok) return [];
    return parseFeed(await response.text(), category).map((story) => ({ ...story, region }));
  } catch (error) {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};

const getStories = async () => {
  if (cache.expiresAt > Date.now()) return cache.stories;
  const results = await Promise.all(RSS_FEEDS.map(fetchFeed));
  const seen = new Set();
  const allStories = results.flat()
    .sort((first, second) => new Date(second.publishedAt) - new Date(first.publishedAt))
    .filter((story) => {
      const key = story.url || story.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const indianStories = allStories.filter((story) => story.region === "india");
  const worldStories = allStories.filter((story) => story.region === "world");
  const indianQuota = Math.ceil(allStories.length * 0.6);
  const worldQuota = Math.floor(allStories.length * 0.4);
  const stories = [
    ...indianStories.slice(0, indianQuota),
    ...worldStories.slice(0, worldQuota),
  ].sort((first, second) => new Date(second.publishedAt) - new Date(first.publishedAt));
  cache = { expiresAt: Date.now() + CACHE_TTL, stories };
  return stories;
};

class FactController {
  async getDailyFacts(req, res, next) {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 1000);
      const stories = await getStories();
      const start = (page - 1) * limit;
      const pageStories = stories.slice(start, start + limit);

      return res.status(200).json({
        success: true,
        data: {
          facts: pageStories,
          pagination: {
            page,
            limit,
            total: stories.length,
            hasMore: start + limit < stories.length,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FactController();
