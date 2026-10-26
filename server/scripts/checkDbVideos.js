import mongoose from "mongoose";
import Course from "../models/Course.js";
import { env } from "../config/env.js";

await mongoose.connect(env.MONGO_URI);

const publishedCourses = await Course.find({ isPublished: true }).lean();
console.log("Total published courses:", publishedCourses.length);

let totalLessons = 0;
let emptyVideos = [];
let populatedVideos = new Map(); // videoUrl -> array of { courseTitle, slug, lessonIdx, lessonTitle }

publishedCourses.forEach(c => {
  (c.lessons || []).forEach((l, idx) => {
    totalLessons++;
    const vUrl = (l.videoUrl || "").trim();
    if (!vUrl) {
      emptyVideos.push({
        courseId: c._id,
        courseTitle: c.title,
        group: c.learningGroup,
        slug: c.slug,
        lessonIdx: idx + 1,
        lessonTitle: l.title
      });
    } else {
      if (!populatedVideos.has(vUrl)) {
        populatedVideos.set(vUrl, []);
      }
      populatedVideos.get(vUrl).push({
        courseId: c._id,
        courseTitle: c.title,
        group: c.learningGroup,
        slug: c.slug,
        lessonIdx: idx + 1,
        lessonTitle: l.title
      });
    }
  });
});

console.log(`Total lessons checked: ${totalLessons}`);
console.log(`Lessons with empty videoUrl: ${emptyVideos.length}`);
console.log(`Unique populated video URLs: ${populatedVideos.size}`);

// Check each unique populated video URL against YouTube oEmbed
const videoStatus = new Map();
for (const [url, usages] of populatedVideos.entries()) {
  let videoId = "";
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) videoId = match[1];

  if (!videoId) {
    videoStatus.set(url, { valid: false, reason: "No YouTube ID", usages });
    continue;
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      videoStatus.set(url, {
        valid: true,
        videoId,
        title: data.title,
        author: data.author_name,
        usagesCount: usages.length
      });
    } else {
      videoStatus.set(url, {
        valid: false,
        videoId,
        status: res.status,
        reason: `HTTP ${res.status}`,
        usages
      });
    }
  } catch (err) {
    videoStatus.set(url, {
      valid: false,
      videoId,
      reason: err.message,
      usages
    });
  }
}

let validCount = 0;
let invalidCount = 0;
for (const [url, info] of videoStatus.entries()) {
  if (info.valid) validCount++;
  else {
    invalidCount++;
    console.log(`INVALID URL: ${url} ->`, info);
  }
}

console.log(`Populated URLs valid: ${validCount}, invalid: ${invalidCount}`);

await mongoose.disconnect();
