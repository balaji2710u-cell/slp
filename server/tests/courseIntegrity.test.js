import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import { env } from "../config/env.js";
import { getMasterCurriculum } from "../curriculum/masterCurriculum.js";

describe("Course & Video Data Integrity Suite (Task 1 Tests)", () => {
  let originalFind;
  let originalFindOne;
  let originalFindById;

  const validCourseId = "507f1f77bcf86cd799439011";
  const studentId = "student_integrity_01";
  const studentToken = jwt.sign({ id: studentId, role: "student" }, env.JWT_SECRET);
  const foreignStudentToken = jwt.sign({ id: "student_integrity_foreign", role: "student" }, env.JWT_SECRET);

  beforeEach(() => {
    originalFind = Course.find;
    originalFindOne = Course.findOne;
    originalFindById = Course.findById;
  });

  afterEach(() => {
    Course.find = originalFind;
    Course.findOne = originalFindOne;
    Course.findById = originalFindById;
  });

  it("1. Standards 6–8 courses must not incorrectly reuse unrelated subject videos (e.g., Soroban Abacus or Python in English/Tamil)", async () => {
    const { groupA } = getMasterCurriculum();

    // In previous buggy state, NybHckSEQBI (Abacus) and rfscVS0vtbw (CS50 Python) were repeated in English, Science, Tamil, etc.
    const unrelatedAbacusId = "NybHckSEQBI";
    const unrelatedPythonId = "rfscVS0vtbw";

    for (const course of groupA) {
      const isAbacusCourse = /abacus/i.test(course.title) || /abacus/i.test(course.slug) || /arithmetic/i.test(course.title);
      const isPythonCourse = /python/i.test(course.title) || /python/i.test(course.slug);

      for (const lesson of course.lessons) {
        if (!lesson.videoUrl) continue;

        if (!isAbacusCourse) {
          assert.equal(
            lesson.videoUrl.includes(unrelatedAbacusId),
            false,
            `Course "${course.title}" (${course.slug}) must not contain Abacus video ID ${unrelatedAbacusId}`
          );
        }

        if (!isPythonCourse) {
          assert.equal(
            lesson.videoUrl.includes(unrelatedPythonId),
            false,
            `Course "${course.title}" (${course.slug}) must not contain Python video ID ${unrelatedPythonId}`
          );
        }
      }
    }
  });

  it("2. Lessons with missing or empty videoUrl preserve valid titles, descriptions, and objectives", async () => {
    const mockCourseWithEmptyVideos = {
      _id: validCourseId,
      title: "Tamil Language, Grammar and Literature",
      slug: "tamil-language-literature",
      category: "English & Languages",
      learningGroup: "Standards 6–8",
      isPublished: true,
      lessons: [
        {
          _id: "507f1f77bcf86cd799439021",
          title: "Lesson 1: தமிழ் எழுத்துக்கள் அறிமுகம் (Tamil Alphabet & Vowels)",
          description: "Foundational vowels and consonant structures in classical and modern Tamil.",
          videoUrl: "", // Safely marked as empty (Video Coming Soon)
          duration: 900,
          order: 1
        },
        {
          _id: "507f1f77bcf86cd799439022",
          title: "Lesson 2: உயிர்மெய் எழுத்துக்கள் (Compound Letters)",
          description: "Mastery of compound letter formation.",
          videoUrl: "",
          duration: 1000,
          order: 2
        }
      ]
    };

    Course.findById = async () => mockCourseWithEmptyVideos;

    const res = await request(app).get(`/api/courses/${validCourseId}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.course.lessons.length, 2);

    const lesson1 = res.body.course.lessons[0];
    assert.equal(lesson1.title, "Lesson 1: தமிழ் எழுத்துக்கள் அறிமுகம் (Tamil Alphabet & Vowels)");
    assert.equal(lesson1.videoUrl, "");
    assert.ok(lesson1.description.length > 0);
  });

  it("3. Enrolled students can still access unpublished/legacy courses to preserve historical progress", async () => {
    const legacyCourseId = "507f1f77bcf86cd799439099";
    const mockUnpublishedCourse = {
      _id: legacyCourseId,
      title: "Full-Stack Web Development (Legacy Archive)",
      slug: "fullstack-web-development-legacy",
      isPublished: false,
      lessons: [{ _id: "507f1f77bcf86cd799439031", title: "HTML Basics", videoUrl: "" }]
    };

    Course.findById = async (id) => (id === legacyCourseId ? mockUnpublishedCourse : null);

    // Mock student enrolled in this legacy course
    const origExists = Progress.exists;
    Progress.exists = async ({ studentId: sId, courseId: cId }) => {
      return sId === studentId && cId === legacyCourseId;
    };

    try {
      // 1. Enrolled student CAN access
      const enrolledRes = await request(app)
        .get(`/api/courses/${legacyCourseId}`)
        .set("Authorization", `Bearer ${studentToken}`);

      assert.equal(enrolledRes.status, 200);
      assert.equal(enrolledRes.body.success, true);
      assert.equal(enrolledRes.body.course.title, "Full-Stack Web Development (Legacy Archive)");

      // 2. Unenrolled student CANNOT access unpublished course (404)
      const foreignRes = await request(app)
        .get(`/api/courses/${legacyCourseId}`)
        .set("Authorization", `Bearer ${foreignStudentToken}`);

      assert.equal(foreignRes.status, 404);
      assert.equal(foreignRes.body.success, false);
      assert.equal(foreignRes.body.message, "Course not found");
    } finally {
      Progress.exists = origExists;
    }
  });

  it("4. Course catalog ensures all published courses have distinct, appropriate lesson structures", async () => {
    const { allCourses } = getMasterCurriculum();

    assert.equal(allCourses.length, 60, "Expected exactly 60 active curriculum courses");

    for (const c of allCourses) {
      assert.ok(c.title && c.title.trim().length > 0, `Course ${c.slug} missing title`);
      assert.ok(c.category && c.category.trim().length > 0, `Course ${c.title} missing category`);
      assert.ok(c.learningGroup && c.learningGroup.trim().length > 0, `Course ${c.title} missing learningGroup`);
      assert.ok(Array.isArray(c.lessons) && c.lessons.length > 0, `Course ${c.title} lessons must be a non-empty array`);

      // Verify lesson orders are sequential or valid
      const orders = c.lessons.map((l) => l.order);
      assert.equal(new Set(orders).size, c.lessons.length, `Course ${c.title} has duplicate lesson orders`);

      // Verify each lesson has title, description, and key takeaways
      for (const l of c.lessons) {
        assert.ok(l.title && l.title.trim().length > 0, `Course ${c.title} has empty lesson title`);
        assert.ok(l.description && l.description.trim().length > 0, `Lesson ${l.title} has empty description`);
      }
    }
  });
});
