/**
 * Safe, Idempotent Curriculum Seeder for SmartLearn Platform.
 * Populates and synchronizes the 60 courses, 300 lessons, and 60 assessments in MongoDB Atlas.
 *
 * Rules:
 * - Deterministic upsert by slug/title to guarantee idempotency (no duplicates).
 * - Preserves existing student accounts and progress records.
 * - Preserves existing document _ids so foreign references remain valid.
 * - Prints comprehensive execution summary.
 */

import mongoose from "mongoose";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
import { env } from "../config/env.js";
import { getMasterCurriculum } from "../curriculum/masterCurriculum.js";

async function runSafeSeeder() {
  console.log("============================================================");
  console.log("  SmartLearn Safe Curriculum Seeder (60-Course Catalogue)  ");
  console.log("============================================================");

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB Atlas successfully.\n");

    // Baseline counts check
    const studentCount = await Student.countDocuments();
    const progressCount = await Progress.countDocuments();
    const baselineCourseCount = await Course.countDocuments();
    const baselineQuizCount = await Quiz.countDocuments();

    console.log(`[Baseline] Existing Students: ${studentCount} (will be preserved)`);
    console.log(`[Baseline] Existing Progress Records: ${progressCount} (will be preserved)`);
    console.log(`[Baseline] Existing Courses: ${baselineCourseCount}`);
    console.log(`[Baseline] Existing Quizzes: ${baselineQuizCount}\n`);

    const { groupA, groupB, groupC, allCourses } = getMasterCurriculum();

    console.log(`Curriculum to sync:`);
    console.log(`  - Standards 6–8: ${groupA.length} courses`);
    console.log(`  - Standards 7–10: ${groupB.length} courses`);
    console.log(`  - After Standard 12 and Above: ${groupC.length} courses`);
    console.log(`  - Total Courses: ${allCourses.length}\n`);

    let insertedCourses = 0;
    let updatedCourses = 0;
    let insertedQuizzes = 0;
    let updatedQuizzes = 0;
    let totalLessonsCount = 0;
    let totalQuestionsCount = 0;

    for (const cData of allCourses) {
      // Validation check
      if (!cData.title || !cData.slug || cData.lessons.length < 5 || cData.assessment.questions.length < 10) {
        throw new Error(`Course validation failed for ${cData.title}: must have >= 5 lessons and >= 10 questions.`);
      }

      // Check if course exists by slug or title
      let course = await Course.findOne({
        $or: [{ slug: cData.slug }, { title: cData.title }]
      });

      if (!course) {
        // Insert new course
        course = await Course.create({
          slug: cData.slug,
          title: cData.title,
          description: cData.description,
          category: cData.category,
          learningGroup: cData.learningGroup,
          level: cData.level,
          learningObjectives: cData.learningObjectives,
          prerequisites: cData.prerequisites,
          estimatedDuration: cData.estimatedDuration,
          thumbnail: cData.thumbnail,
          isPublished: cData.isPublished,
          lessons: cData.lessons,
          assessment: cData.assessment
        });
        insertedCourses++;
      } else {
        // Update existing course safely preserving _id
        course.slug = cData.slug;
        course.title = cData.title;
        course.description = cData.description;
        course.category = cData.category;
        course.learningGroup = cData.learningGroup;
        course.level = cData.level;
        course.learningObjectives = cData.learningObjectives;
        course.prerequisites = cData.prerequisites;
        course.estimatedDuration = cData.estimatedDuration;
        course.thumbnail = cData.thumbnail;
        course.isPublished = cData.isPublished;
        course.assessment = cData.assessment;

        // Upsert lessons while preserving existing lesson _ids where title matches
        const existingLessonsMap = new Map();
        (course.lessons || []).forEach((l) => existingLessonsMap.set(l.title.toLowerCase().trim(), l._id));

        course.lessons = cData.lessons.map((newLes) => {
          const matchId = existingLessonsMap.get(newLes.title.toLowerCase().trim());
          return matchId ? { ...newLes, _id: matchId } : newLes;
        });

        await course.save();
        updatedCourses++;
      }

      totalLessonsCount += course.lessons.length;

      // Upsert associated assessment
      const quizData = cData.assessment;
      let quiz = await Quiz.findOne({
        courseId: course._id,
        quizType: "course_assessment"
      });

      if (!quiz) {
        quiz = await Quiz.create({
          slug: `${cData.slug}-assessment`,
          courseId: course._id,
          lessonId: null,
          quizType: "course_assessment",
          learningGroup: cData.learningGroup,
          title: quizData.title,
          description: quizData.description,
          passingPercentage: quizData.passingPercentage,
          questions: quizData.questions
        });
        insertedQuizzes++;
      } else {
        quiz.slug = `${cData.slug}-assessment`;
        quiz.title = quizData.title;
        quiz.description = quizData.description;
        quiz.learningGroup = cData.learningGroup;
        quiz.passingPercentage = quizData.passingPercentage;
        quiz.questions = quizData.questions;
        await quiz.save();
        updatedQuizzes++;
      }

      totalQuestionsCount += quiz.questions.length;
    }

    // Post-seed verification
    const finalCourseCount = await Course.countDocuments();
    const finalQuizCount = await Quiz.countDocuments();
    const finalStudentCount = await Student.countDocuments();
    const finalProgressCount = await Progress.countDocuments();

    console.log("------------------------------------------------------------");
    console.log("                 SEEDING COMPLETED SUCCESSFULLY             ");
    console.log("------------------------------------------------------------");
    console.log(`Courses Inserted: ${insertedCourses}`);
    console.log(`Courses Synchronized/Updated: ${updatedCourses}`);
    console.log(`Total Courses in Database: ${finalCourseCount}`);
    console.log(`Total Lessons Verified: ${totalLessonsCount}`);
    console.log(`Assessments Inserted: ${insertedQuizzes}`);
    console.log(`Assessments Synchronized/Updated: ${updatedQuizzes}`);
    console.log(`Total Quizzes in Database: ${finalQuizCount}`);
    console.log(`Total Questions Verified: ${totalQuestionsCount}`);
    console.log(`Preserved Students: ${finalStudentCount} (Unchanged: ${finalStudentCount === studentCount})`);
    console.log(`Preserved Progress: ${finalProgressCount} (Unchanged: ${finalProgressCount === progressCount})`);
    console.log("============================================================\n");
  } catch (err) {
    console.error("Seeding encountered a fatal error:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas.");
  }
}

runSafeSeeder();
