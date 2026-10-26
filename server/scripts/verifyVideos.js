import fs from "fs";

// Read all unique video URLs from deep_audit_results.json and CURRICULUM_VIDEOS
const deepAudit = JSON.parse(fs.readFileSync("deep_audit_results.json"));

const allUrls = new Set();

deepAudit.forEach((c) => {
  (c.lessons || []).forEach((l) => {
    if (l.videoUrl) allUrls.add(l.videoUrl);
  });
});

console.log(`Found ${allUrls.size} unique video URLs in MongoDB courses.`);

async function verifyAllVideos() {
  const results = {};

  for (const url of allUrls) {
    // Extract video ID from youtube URL
    let videoId = "";
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];

    if (!videoId) {
      results[url] = { valid: false, reason: "No YouTube ID extracted" };
      continue;
    }

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const data = await res.json();
        results[url] = {
          valid: true,
          videoId,
          title: data.title,
          author: data.author_name
        };
      } else {
        results[url] = {
          valid: false,
          videoId,
          status: res.status,
          reason: `HTTP ${res.status}`
        };
      }
    } catch (err) {
      results[url] = {
        valid: false,
        videoId,
        reason: err.message
      };
    }
  }

  fs.writeFileSync("verified_videos_metadata.json", JSON.stringify(results, null, 2));
  console.log("Verification finished. Results saved to verified_videos_metadata.json");

  // Print summary
  for (const [url, meta] of Object.entries(results)) {
    console.log(`${meta.videoId} | ${meta.valid ? 'VALID' : 'INVALID'} | "${meta.title || meta.reason}" (${meta.author || ''})`);
  }
}

verifyAllVideos().catch(console.error);
