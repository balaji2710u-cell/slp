/**
 * Utility functions for parsing, validating, and formatting video sources.
 * Supports YouTube embeds (with privacy-enhanced nocookie domain), direct MP4 streams, and generic embeds.
 */

export function parseVideoSource(url) {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return { type: "none", valid: false, embedUrl: null, rawUrl: null };
  }

  const trimmed = url.trim();

  // YouTube standard watch or share URL: youtube.com/watch?v=XYZ or youtu.be/XYZ
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = trimmed.match(youtubeRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      valid: true,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`,
      rawUrl: trimmed
    };
  }

  // Already a YouTube embed URL
  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("youtube-nocookie.com/embed/")) {
    return {
      type: "youtube",
      valid: true,
      embedUrl: trimmed,
      rawUrl: trimmed
    };
  }

  // Direct MP4 / WebM / OGG video stream
  if (/\.(mp4|webm|ogg)($|\?)/i.test(trimmed)) {
    return {
      type: "mp4",
      valid: true,
      streamUrl: trimmed,
      rawUrl: trimmed
    };
  }

  // Generic HTTPS embed URL (Khan Academy, educational CDN player, etc.)
  if (trimmed.startsWith("https://") && (trimmed.includes("/embed/") || trimmed.includes("player."))) {
    return {
      type: "embed",
      valid: true,
      embedUrl: trimmed,
      rawUrl: trimmed
    };
  }

  // Fallback for generic http/https URL that might be an MP4 endpoint without file extension
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return {
      type: "mp4",
      valid: true,
      streamUrl: trimmed,
      rawUrl: trimmed
    };
  }

  return { type: "none", valid: false, embedUrl: null, rawUrl: trimmed };
}
