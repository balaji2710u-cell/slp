import mongoose from "mongoose";
import { env } from "../config/env.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";
import fs from "fs";

async function deepAudit() {
  await mongoose.connect(env.MONGO_URI);
  const courses = await Course.find({}).sort({ learningGroup: 1, _id: 1 }).lean();

  const results = [];

  for (let i = 0; i < courses.length; i++) {
    const c = courses[i];
    const progressCount = await Progress.countDocuments({ courseId: c._id });
    const certCount = await Certificate.countDocuments({ courseId: c._id });

    results.push({
      index: i + 1,
      id: c._id.toString(),
      slug: c.slug,
      title: c.title,
      category: c.category,
      learningGroup: c.learningGroup,
      level: c.level,
      isPublished: c.isPublished,
      description: c.description,
      progressCount,
      certCount,
      lessons: (c.lessons || []).map((l, li) => ({
        index: li + 1,
        id: l.id || l._id?.toString(),
        title: l.title,
        videoUrl: l.videoUrl,
        videoType: l.videoType,
        description: (l.description || "").slice(0, 80)
      })),
      assessmentQuestionCount: c.assessment?.questions?.length || 0
    });
  }

  fs.writeFileSync("deep_audit_results.json", JSON.stringify(results, null, 2));
  console.log(`Deep audit finished for ${courses.length} courses.`);

  await mongoose.disconnect();
}

deepAudit().catch(console.error);
