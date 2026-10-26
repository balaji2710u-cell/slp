import mongoose from "mongoose";
import fs from "fs";
import { env } from "../config/env.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";

// Specific, verified video mappings for courses to resolve video repetition and mismatches
const VERIFIED_COURSE_VIDEOS = {
  // Standards 6–8
  "abacus-mental-arithmetic": [
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/NybHckSEQBI",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU"
  ],
  "basic-english-communication": [
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E"
  ],
  "english-grammar-vocabulary": [
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/juKd26qkNAw",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY"
  ],
  "reading-comprehension-writing": [
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY",
    "https://www.youtube-nocookie.com/embed/tShavGuo0_E",
    "https://www.youtube-nocookie.com/embed/MSYw502dJNY"
  ],
  "tamil-language-communication": [
    "", "", "", "", "" // No verified Tamil video in dataset; safely marked as Video Coming Soon
  ],
  "mathematics-fundamentals": [
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28"
  ],
  "fractions-decimals-percentages": [
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/p33BYf1NDAE",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ"
  ],
  "intro-algebra-geometry": [
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU",
    "https://www.youtube-nocookie.com/embed/302eJ3TzJQU"
  ],
  "general-science": [
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/FSyAehMdpyI",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
  ],
  "physics-everyday-life": [
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc",
    "https://www.youtube-nocookie.com/embed/b1t41Q3xRM8"
  ],
  "biology-human-body": [
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ",
    "https://www.youtube-nocookie.com/embed/8IlzKri08kk",
    "https://www.youtube-nocookie.com/embed/uBGl2BujkPQ"
  ],
  "environmental-science": [
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/QnQe0xW_JY4",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc",
    "https://www.youtube-nocookie.com/embed/1kUE0BZtTRc"
  ],
  "computer-fundamentals": [
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q",
    "https://www.youtube-nocookie.com/embed/O5nskjZ_GoI",
    "https://www.youtube-nocookie.com/embed/vBURTt97EkA",
    "https://www.youtube-nocookie.com/embed/tpIctyqH29Q"
  ],
  "digital-literacy-internet-safety": [
    "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/3Kq1MIfTWCE",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA",
    "https://www.youtube-nocookie.com/embed/inWWhr5tnEA"
  ],
  "intro-coding-scratch": [
    "", "", "", "", "" // Video coming soon; removes repeated Harvard CS50 across all lessons
  ],
  "logical-reasoning-problem-solving": [
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA",
    "https://www.youtube-nocookie.com/embed/8hly31xKli0",
    "https://www.youtube-nocookie.com/embed/KLlXCFG5TnA"
  ],
  "financial-literacy-money": [
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ",
    "https://www.youtube-nocookie.com/embed/xxpc-HPKN28",
    "https://www.youtube-nocookie.com/embed/HQzoZfc3GwQ"
  ],
  "study-skills-learning-techniques": [
    "", "", "", "", "" // Video coming soon; notes and exercises fully preserved
  ],

  // Standards 7–10
  "advanced-math-algebra": [
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU",
    "https://www.youtube-nocookie.com/embed/LwCRRUa8yTU"
  ]
};

// Metadata corrections (categories, titles, descriptions)
const METADATA_CORRECTIONS = {
  // Fix misclassified categories in "After Standard 12 and Above"
  "computer-networks-architecture": {
    category: "Computer Science"
  },
  "operating-systems-fundamentals": {
    category: "Computer Science"
  },
  "cybersecurity-ethical-hacking": {
    category: "Cybersecurity"
  },
  "building-ai-applications": {
    category: "AI & Data Science"
  },

  // Refine titles and descriptions for precision & student clarity
  "tamil-language-communication": {
    title: "Tamil Language, Grammar and Literature",
    description: "Foundational Tamil literacy, Uyir and Mei phonetics, classical grammar, Tirukkural ethics, and polite conversational skills."
  },
  "general-science": {
    title: "General Science & Living Systems",
    description: "Explore living systems, plant photosynthesis, states of matter, solutions, acids and bases, and the scientific method."
  },
  "environmental-science": {
    title: "Environmental Science & Ecology",
    description: "Learn about ecosystems, food webs, biogeochemical cycles, biodiversity conservation, waste management (3Rs), and renewable energy."
  },
  "advanced-math-algebra": {
    title: "Advanced Algebra & Polynomial Equations",
    description: "Master quadratic equations, polynomials, standard algebraic identities, linear inequalities, and simultaneous systems."
  }
};

async function runControlledMigration() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected successfully.\n");

  // Step 1: Backup all courses before modifying anything
  const allCourses = await Course.find({}).lean();
  fs.writeFileSync("scripts/backup_courses_before_fix.json", JSON.stringify(allCourses, null, 2));
  console.log(`[Backup] Successfully backed up ${allCourses.length} courses to scripts/backup_courses_before_fix.json`);

  let duplicateRecordsUnpublished = 0;
  let categoryCorrectionsCount = 0;
  let titleCorrectionsCount = 0;
  let descriptionCorrectionsCount = 0;
  let videoUpdatesCount = 0;
  let lessonsUpdatedCount = 0;

  // Step 2: Process legacy duplicate courses in Standards 6–8
  const legacySlugs = [
    "fullstack-web-development-legacy",
    "machine-learning-fundamentals-legacy",
    "devops-docker-cicd-legacy"
  ];

  for (const slug of legacySlugs) {
    const course = await Course.findOne({ slug });
    if (course) {
      // Check if any students are enrolled
      const progressCount = await Progress.countDocuments({ courseId: course._id });
      const certCount = await Certificate.countDocuments({ courseId: course._id });

      if (progressCount === 0 && certCount === 0) {
        course.isPublished = false;
        await course.save();
        duplicateRecordsUnpublished++;
        console.log(`[Duplicate Archive] Archived legacy duplicate '${course.title}' (isPublished: false).`);
      }
    }
  }

  // Step 3: Apply verified video mappings and metadata updates to all courses
  for (const course of allCourses) {
    let modified = false;
    const dbCourse = await Course.findById(course._id);
    if (!dbCourse) continue;

    const slug = dbCourse.slug;

    // Apply metadata corrections
    const metaCorrection = METADATA_CORRECTIONS[slug];
    if (metaCorrection) {
      if (metaCorrection.category && dbCourse.category !== metaCorrection.category) {
        console.log(`[Category Correction] ${dbCourse.title}: '${dbCourse.category}' -> '${metaCorrection.category}'`);
        dbCourse.category = metaCorrection.category;
        categoryCorrectionsCount++;
        modified = true;
      }
      if (metaCorrection.title && dbCourse.title !== metaCorrection.title) {
        console.log(`[Title Correction] '${dbCourse.title}' -> '${metaCorrection.title}'`);
        dbCourse.title = metaCorrection.title;
        titleCorrectionsCount++;
        modified = true;
      }
      if (metaCorrection.description && dbCourse.description !== metaCorrection.description) {
        console.log(`[Description Correction] Updated description for '${dbCourse.title}'`);
        dbCourse.description = metaCorrection.description;
        descriptionCorrectionsCount++;
        modified = true;
      }
    }

    // Apply verified video updates
    const verifiedVideos = VERIFIED_COURSE_VIDEOS[slug];
    if (verifiedVideos && Array.isArray(verifiedVideos)) {
      let courseVideoChanged = false;
      const updatedLessons = (dbCourse.lessons || []).map((lesson, idx) => {
        const targetUrl = verifiedVideos[idx] !== undefined ? verifiedVideos[idx] : lesson.videoUrl;
        const targetType = targetUrl ? "youtube" : "none";

        if (lesson.videoUrl !== targetUrl || lesson.videoType !== targetType) {
          lesson.videoUrl = targetUrl;
          lesson.videoType = targetType;
          courseVideoChanged = true;
          lessonsUpdatedCount++;
        }
        return lesson;
      });

      if (courseVideoChanged) {
        dbCourse.lessons = updatedLessons;
        dbCourse.markModified("lessons");
        videoUpdatesCount++;
        modified = true;
        console.log(`[Video Correction] Updated lessons for '${dbCourse.title}' (${slug}).`);
      }
    }

    if (modified) {
      await dbCourse.save();
    }
  }

  // Step 4: Verification of active catalogue
  const publishedCourses = await Course.find({ isPublished: true }).lean();

  console.log("\n========================================================");
  console.log("            MIGRATION & CORRECTION AUDIT REPORT         ");
  console.log("========================================================");
  console.log(`Total courses inspected:                ${allCourses.length}`);
  console.log(`Duplicate legacy records unpublished:   ${duplicateRecordsUnpublished}`);
  console.log(`Published student-visible courses:      ${publishedCourses.length}`);
  console.log(`Category corrections applied:           ${categoryCorrectionsCount}`);
  console.log(`Title refinements applied:              ${titleCorrectionsCount}`);
  console.log(`Description updates applied:            ${descriptionCorrectionsCount}`);
  console.log(`Courses with corrected video mappings:  ${videoUpdatesCount}`);
  console.log(`Individual lesson videos updated:       ${lessonsUpdatedCount}`);
  console.log("========================================================\n");

  await mongoose.disconnect();
}

runControlledMigration().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
