import mongoose from "mongoose";
import { env } from "../config/env.js";
import Course from "../models/Course.js";
import fs from "fs";

async function analyzeDetails() {
  await mongoose.connect(env.MONGO_URI);
  const courses = await Course.find({}).lean();

  const issues = [];

  courses.forEach((c) => {
    const courseIssues = [];

    // 1. Check legacy/duplicate courses
    if (c.slug?.includes("legacy")) {
      courseIssues.push({
        type: "DUPLICATE_LEGACY_RECORD",
        details: `Slug contains 'legacy' (${c.slug}) and duplicates advanced course in group '${c.learningGroup}' with 0 enrollments.`
      });
    }

    // 2. Check misclassified learning groups (e.g. Full-Stack Web Development or Docker/AWS in Standards 6-8)
    if (
      c.learningGroup === "Standards 6–8" &&
      (c.title.includes("Full-Stack") ||
        c.title.includes("Machine Learning") ||
        c.title.includes("DevOps") ||
        c.title.includes("Docker"))
    ) {
      courseIssues.push({
        type: "MISCLASSIFIED_GROUP",
        details: `Course '${c.title}' is an advanced college/career course placed in '${c.learningGroup}'.`
      });
    }

    // 3. Category mismatches
    if (c.title.toLowerCase().includes("tamil") && c.category === "English & Languages") {
      courseIssues.push({
        type: "CATEGORY_IMPRECISE",
        details: `Category is 'English & Languages' for Tamil Language course. Should be 'Tamil Language' or 'Regional Languages'.`
      });
    }

    if (
      (c.category === "Software Engineering" || c.category === "Full-Stack Engineering" || c.category === "DevOps & Tooling") &&
      c.learningGroup === "After Standard 12 and Above"
    ) {
      // Check if categories are consistent across the platform
    }

    // 4. Check video duplicates or mismatches
    const videoUrls = (c.lessons || []).map((l) => l.videoUrl);
    const uniqueVideos = new Set(videoUrls.filter(Boolean));
    if (videoUrls.length > 1 && uniqueVideos.size === 1) {
      courseIssues.push({
        type: "IDENTICAL_LESSON_VIDEOS",
        details: `All ${videoUrls.length} lessons use the exact same video URL: ${Array.from(uniqueVideos)[0]}`
      });
    }

    // Check if fallback videos are used
    const fallbackList = [
      "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
      "https://www.youtube-nocookie.com/embed/rfscVS0vtbw",
      "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg",
      "https://www.youtube-nocookie.com/embed/8jLOx1hD3_o",
      "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
    ];
    const usesFallbackSequence =
      videoUrls.length === 5 &&
      videoUrls[0] === fallbackList[0] &&
      videoUrls[1] === fallbackList[1] &&
      videoUrls[2] === fallbackList[2] &&
      videoUrls[3] === fallbackList[3] &&
      videoUrls[4] === fallbackList[4];

    if (usesFallbackSequence && c.slug !== "abacus-mental-arithmetic") {
      courseIssues.push({
        type: "UNVERIFIED_FALLBACK_VIDEOS",
        details: `Uses generic fallback videos across unrelated subject (${c.title} / ${c.category}).`
      });
    }

    // Check descriptions and titles
    if (!c.description || c.description.length < 20) {
      courseIssues.push({
        type: "DESCRIPTION_TOO_SHORT",
        details: `Description is too short or missing.`
      });
    }

    issues.push({
      id: c._id.toString(),
      title: c.title,
      slug: c.slug,
      learningGroup: c.learningGroup,
      category: c.category,
      level: c.level,
      issuesCount: courseIssues.length,
      issues: courseIssues
    });
  });

  fs.writeFileSync("course_issues_analysis.json", JSON.stringify(issues, null, 2));
  console.log("Analysis complete. Total courses checked:", issues.length);
  const coursesWithIssues = issues.filter((i) => i.issuesCount > 0);
  console.log("Courses with detected issues:", coursesWithIssues.length);
  coursesWithIssues.forEach((c) => {
    console.log(`[${c.learningGroup}] ${c.title} (${c.category}):`);
    c.issues.forEach((iss) => console.log(`   - ${iss.type}: ${iss.details}`));
  });

  await mongoose.disconnect();
}

analyzeDetails().catch(console.error);
