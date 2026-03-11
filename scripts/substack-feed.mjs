export const FEED_URL = "https://togethersports.substack.com/feed";

export function decodeHtml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function stripHtml(value = "") {
  return decodeHtml(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTagValue(item, tagName) {
  const pattern = new RegExp(`<${tagName}(?:[^>]*)>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = item.match(pattern);
  return match ? decodeHtml(match[1].trim()) : "";
}

function getEnclosureUrl(item) {
  const match = item.match(/<enclosure[^>]*url="([^"]+)"/i);
  return match ? match[1] : "";
}

function getSlugFromLink(link) {
  try {
    const pathname = new URL(link).pathname;
    return pathname.split("/").filter(Boolean).pop() || "";
  } catch {
    return "";
  }
}

function toExcerpt(description, contentHtml) {
  const source = stripHtml(description) || stripHtml(contentHtml);
  return source.length > 180 ? `${source.slice(0, 177).trim()}...` : source;
}

export function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const title = getTagValue(item, "title");
    const description = getTagValue(item, "description");
    const link = getTagValue(item, "link");
    const publishedAt = getTagValue(item, "pubDate");
    const author = getTagValue(item, "dc:creator") || "Together Sports";
    const contentHtml = getTagValue(item, "content:encoded") || `<p>${description}</p>`;
    const slug = getSlugFromLink(link);

    return {
      title,
      slug,
      excerpt: toExcerpt(description, contentHtml),
      publishedAt,
      author,
      sourceUrl: link,
      image: getEnclosureUrl(item) || null,
      contentHtml,
      featured: false,
      tag: "",
    };
  });
}

export async function fetchSubstackPosts() {
  const response = await fetch(FEED_URL, {
    headers: {
      "user-agent": "TogetherSportsSite/1.0",
      accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Substack feed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  return parseFeed(xml);
}
