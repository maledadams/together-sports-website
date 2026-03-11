import { fetchSubstackPosts } from "../scripts/substack-feed.mjs";

export async function GET() {
  try {
    const posts = await fetchSubstackPosts();
    return Response.json(
      { posts },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store",
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
          "Cache-Control": "private, no-store",
        },
      },
    );
  }
}
