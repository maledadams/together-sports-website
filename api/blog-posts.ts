import { fetchSubstackPosts } from "../scripts/substack-feed.mjs";

const BLOG_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=300";

export async function GET() {
  try {
    const posts = await fetchSubstackPosts();
    return Response.json(
      { posts },
      {
        status: 200,
        headers: {
          "Cache-Control": BLOG_CACHE_CONTROL,
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch blog posts.";
    return Response.json(
      { error: message },
      {
        status: 502,
        headers: {
          "Cache-Control": BLOG_CACHE_CONTROL,
        },
      },
    );
  }
}
