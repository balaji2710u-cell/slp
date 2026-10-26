import mongoose from "mongoose";
import { env } from "../config/env.js";
import Course from "../models/Course.js";
import fs from "fs";

async function auditAllCourses() {
  await mongoose.connect(env.MONGO_URI);
  const courses = await Course.find({}).sort({ learningGroup: 1, createdAt: 1 }).lean();

  const auditReport = [];
  const videoFrequency = {};

  courses.forEach((c, i) => {
    const courseData = {
      index: i + 1,
      id: c._id.toString(),
      title: c.title,
      category: c.category,
      learningGroup: c.learningGroup,
      level: c.level,
      description: c.description,
      lessons: (c.lessons || []).map((l, li) => {
        const vUrl = l.videoUrl || "";
        if (vUrl) {
          videoFrequency[vUrl] = videoFrequency[vUrl] || [];
          videoFrequency[vUrl].push({
            courseIndex: i + 1,
            courseTitle: c.title,
            courseGroup: c.learningGroup,
            courseCategory: c.category,
            lessonIndex: li + 1,
            lessonTitle: l.title
          });
        }
        return {
          lessonIndex: li + 1,
          title: l.title,
          videoUrl: vUrl,
          videoType: l.videoType
        };
      })
    };
    auditReport.push(courseData);
  });

  // Identify duplicate video usages across different courses
  const duplicates = Object.entries(videoFrequency).filter(([url, occurrences]) => occurrences.length > 1);

  const summary = {
    totalCourses: courses.length,
    coursesByGroup: courses.reduce((acc, c) => {
      acc[c.learningGroup] = (acc[c.learningGroup] || 0) + 1;
      return acc;
    }, {}),
    uniqueVideoUrls: Object.keys(videoFrequency).length,
    repeatedVideoUrlsCount: duplicates.length,
    repeatedVideos: duplicates.map(([url, occ]) => ({
      url,
      totalUsages: occ.length,
      usedIn: occ
    }))
  };

  fs.writeFileSync("audit_output.json", JSON.stringify({ summary, courses: auditReport }, null, 2));
  console.log("Audit complete. Total courses:", courses.length);
  console.log("Courses by group:", summary.coursesByGroup);
  console.log("Unique video URLs:", summary.uniqueVideoUrls);
  console.log("Repeated video URLs count:", summary.repeatedVideoUrlsCount);

  // Print top repeated video URLs
  duplicates
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)
    .forEach(([url, occ]) => {
      console.log(`\nURL: ${url} used in ${occ.length} lessons:`);
      occ.slice(0, 5).forEach((o) => {
        console.log(`  - [${o.courseGroup}] ${o.courseTitle} -> Lesson ${o.lessonIndex}: "${o.lessonTitle}"`);
      });
      if (occ.length > 5) console.log(`  ... and ${occ.length - 5} more.`);
    });

  await mongoose.disconnect();
}

auditAllCourses().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
