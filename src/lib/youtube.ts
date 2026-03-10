export const normalizeYouTubeEmbedUrl = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  try {
    const url = new URL(trimmedValue);
    const hostname = url.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "www.youtube.com" || hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) {
        const videoId = url.pathname.split("/embed/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const videoId = url.pathname.split("/shorts/")[1]?.split("/")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

export const isYouTubeVideoUrl = (value: string) => {
  if (!value.trim()) {
    return false;
  }

  return Boolean(normalizeYouTubeEmbedUrl(value));
};
