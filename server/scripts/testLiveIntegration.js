import mongoose from "mongoose";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import { connectDB, disconnectDB } from "../config/db.js";
import { env } from "../config/env.js";

async function runLiveIntegrationTest() {
  console.log("Starting safe live MongoDB Atlas integration test for Phase 4...");

  let testCourseId = null;

  try {
    await connectDB();
    console.log("Connected to MongoDB Atlas successfully.");

    const db = mongoose.connection.db;

    // 1. Verify ping
    const pingRes = await db.admin().ping();
    assert.equal(pingRes.ok, 1, "Ping to Atlas cluster failed");
    console.log("Atlas ping check: PASSED ({ ok: 1 })");

    // 2. Measure baseline student and course counts
    const baselineStudentCount = await Student.countDocuments();
    const baselineCourseCount = await Course.countDocuments();
    console.log(`Baseline student count: ${baselineStudentCount}`);
    console.log(`Baseline course count: ${baselineCourseCount}`);

    // Create admin token for authenticated API calls
    const adminToken = jwt.sign({ id: "live_admin_tester", role: "admin" }, env.JWT_SECRET, {
      expiresIn: "1h"
    });

    // 3. Create temporary test course
    const testCourseData = {
      title: "LIVE_INTEGRATION_TEST_COURSE_PHASE_4",
      description: "Automated integration verification record for Phase 4. Safe to clean up immediately.",
      category: "Integration Testing",
      instructor: "Verification Subsystem",
      thumbnail: "https://example.com/test.png",
      lessons: [],
      isPublished: true
    };

    const createdCourse = await Course.create(testCourseData);
    testCourseId = createdCourse._id.toString();
    assert.ok(testCourseId, "Course creation did not return an _id");
    console.log(`Created temporary test course with _id: ${testCourseId}`);

    // 4. API Test: Add Lesson 1 (Preview Lesson) via POST /api/courses/:courseId/lessons
    const lesson1Payload = {
      title: "Phase 4 Intro to Systems",
      description: "Free preview introduction to cloud architecture",
      videoUrl: "https://example.com/videos/lesson1.mp4",
      duration: 360,
      order: 0,
      isPreview: true
    };

    const addLesson1Res = await request(app)
      .post(`/api/courses/${testCourseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(lesson1Payload);

    assert.equal(addLesson1Res.status, 201, "Failed to create lesson 1");
    assert.equal(addLesson1Res.body.success, true);
    assert.equal(addLesson1Res.body.lesson.title, lesson1Payload.title);
    assert.equal(addLesson1Res.body.lesson.isPreview, true);
    assert.equal(addLesson1Res.body.lesson.duration, 360);
    const lesson1Id = addLesson1Res.body.lesson._id;
    console.log(`Added lesson 1 (preview) with _id: ${lesson1Id}`);

    // 5. API Test: Add Lesson 2 (Restricted Lesson)
    const lesson2Payload = {
      title: "Phase 4 Deep Dive Memory Models",
      description: "Restricted technical lecture",
      videoUrl: "https://example.com/videos/lesson2.mp4",
      duration: 720,
      order: 1,
      isPreview: false
    };

    const addLesson2Res = await request(app)
      .post(`/api/courses/${testCourseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(lesson2Payload);

    assert.equal(addLesson2Res.status, 201, "Failed to create lesson 2");
    const lesson2Id = addLesson2Res.body.lesson._id;
    console.log(`Added lesson 2 (restricted) with _id: ${lesson2Id}`);

    // 6. Access Control: Public caller retrieves lessons
    const publicLessonsRes = await request(app).get(`/api/courses/${testCourseId}/lessons`);
    assert.equal(publicLessonsRes.status, 200);
    assert.equal(publicLessonsRes.body.count, 1, "Public caller should only see preview lesson");
    assert.equal(publicLessonsRes.body.lessons[0]._id, lesson1Id);
    console.log("Public lesson preview restriction check: PASSED");

    // 7. Access Control: Admin caller retrieves all lessons
    const adminLessonsRes = await request(app)
      .get(`/api/courses/${testCourseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`);
    assert.equal(adminLessonsRes.status, 200);
    assert.equal(adminLessonsRes.body.count, 2, "Admin caller should see all lessons");
    console.log("Admin full lesson visibility check: PASSED");

    // 8. Access Control: Single lesson retrieval
    // Public user gets 200 for preview lesson
    const publicLesson1Res = await request(app).get(
      `/api/courses/${testCourseId}/lessons/${lesson1Id}`
    );
    assert.equal(publicLesson1Res.status, 200);
    assert.equal(publicLesson1Res.body.lesson.title, lesson1Payload.title);

    // Public user gets 404 for restricted lesson
    const publicLesson2Res = await request(app).get(
      `/api/courses/${testCourseId}/lessons/${lesson2Id}`
    );
    assert.equal(publicLesson2Res.status, 404, "Public user should receive 404 for non-preview lesson");
    console.log("Single lesson preview/restricted access check: PASSED");

    // 9. API Test: Update lesson via PUT /api/courses/:courseId/lessons/:lessonId
    const updateRes = await request(app)
      .put(`/api/courses/${testCourseId}/lessons/${lesson1Id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Phase 4 Intro to Systems (Updated)", duration: 420 });

    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.lesson.title, "Phase 4 Intro to Systems (Updated)");
    assert.equal(updateRes.body.lesson.duration, 420);
    console.log("Lesson update verification: PASSED");

    // 10. API Test: Reorder lessons via PATCH /api/courses/:courseId/lessons/reorder
    const reorderRes = await request(app)
      .patch(`/api/courses/${testCourseId}/lessons/reorder`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ lessonIds: [lesson2Id, lesson1Id] });

    assert.equal(reorderRes.status, 200);
    assert.equal(reorderRes.body.lessons[0]._id, lesson2Id);
    assert.equal(reorderRes.body.lessons[0].order, 0);
    assert.equal(reorderRes.body.lessons[1]._id, lesson1Id);
    assert.equal(reorderRes.body.lessons[1].order, 1);
    console.log("Lesson reordering verification: PASSED");

    // 11. API Test: Delete a lesson via DELETE /api/courses/:courseId/lessons/:lessonId
    const deleteLessonRes = await request(app)
      .delete(`/api/courses/${testCourseId}/lessons/${lesson2Id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(deleteLessonRes.status, 200);
    const postDeleteCourse = await Course.findById(testCourseId);
    assert.equal(postDeleteCourse.lessons.length, 1);
    console.log("Lesson deletion verification: PASSED");

    // 12. Catalog Pagination Verification with Live Atlas
    const paginationRes = await request(app).get("/api/courses?page=1&limit=5");
    assert.equal(paginationRes.status, 200);
    assert.equal(paginationRes.body.success, true);
    assert.equal(typeof paginationRes.body.total, "number");
    assert.equal(typeof paginationRes.body.totalPages, "number");
    console.log(`Live catalog pagination check: PASSED (total courses: ${paginationRes.body.total}, totalPages: ${paginationRes.body.totalPages})`);

    // 13. Clean up: Delete temporary test course
    const deletedCourse = await Course.findByIdAndDelete(testCourseId);
    assert.ok(deletedCourse, "Course deletion failed during cleanup");
    testCourseId = null;
    console.log("Temporary course cleanup: PASSED");

    // 14. Confirm baseline consistency
    const finalCourseCount = await Course.countDocuments();
    const finalStudentCount = await Student.countDocuments();

    assert.equal(
      finalCourseCount,
      baselineCourseCount,
      "Final course count does not match baseline count"
    );
    assert.equal(
      finalStudentCount,
      baselineStudentCount,
      "Existing student count was modified! Student accounts must be preserved."
    );
    console.log(`Final course count: ${finalCourseCount} (matches baseline: ${baselineCourseCount})`);
    console.log(`Final student count: ${finalStudentCount} (matches baseline: ${baselineStudentCount})`);

    console.log("\nALL SAFE LIVE INTEGRATION CHECKS FOR PHASE 4 PASSED SUCCESSFULLY!\n");
  } catch (error) {
    console.error("Live integration test failed:", error);
    process.exit(1);
  } finally {
    // Guaranteed cleanup if test failed before deleting testCourseId
    if (testCourseId) {
      try {
        await Course.findByIdAndDelete(testCourseId);
        console.log(`Guaranteed cleanup executed for test course: ${testCourseId}`);
      } catch (cleanupErr) {
        console.error("Error during guaranteed cleanup:", cleanupErr);
      }
    }
    await disconnectDB();
  }
}

runLiveIntegrationTest();
