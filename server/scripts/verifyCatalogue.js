import mongoose from "mongoose";
import { env } from "../config/env.js";
import Course from "../models/Course.js";

async function verifyCatalogue() {
  await mongoose.connect(env.MONGO_URI);
  const courses = await Course.find({ isPublished: true }).sort({ learningGroup: 1, _id: 1 }).lean();

  console.log(`Total Published Courses: ${courses.length}`);

  const groups = {};
  courses.forEach((c) => {
    groups[c.learningGroup] = (groups[c.learningGroup] || 0) + 1;
  });
  console.log("Groups:", groups);

  console.log("\n=================== STANDARDS 6–8 COURSES ===================");
  courses
    .filter((c) => c.learningGroup === "Standards 6–8")
    .forEach((c, idx) => {
      console.log(`\n${idx + 1}. [${c.category}] "${c.title}"`);
      (c.lessons || []).forEach((l, li) => {
        const v = l.videoUrl ? l.videoUrl.replace("https://www.youtube-nocookie.com/embed/", "") : "COMING_SOON";
        console.log(`   L${li + 1}: ${l.title} [${v}]`);
      });
    });

  console.log("\n=================== CATEGORY CORRECTIONS ===================");
  const correctedSlugs = [
    "computer-networks-architecture",
    "operating-systems-fundamentals",
    "cybersecurity-ethical-hacking",
    "building-ai-applications"
  ];
  courses
    .filter((c) => correctedSlugs.includes(c.slug))
    .forEach((c) => {
      console.log(`${c.title} -> Category: "${c.category}"`);
    });

  await mongoose.disconnect();
}

verifyCatalogue().catch(console.error);
