import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Course from "../models/Course.js";
import { env } from "../config/env.js";

describe("Phase 4: Lessons, Video Delivery & Access Control", () => {
  let originalFindById;
  let originalFind;
  let originalCountDocuments;

  const courseId = "507f1f77bcf86cd799439011";
  const unpublishedCourseId = "507f1f77bcf86cd799439012";
  const missingCourseId = "507f1f77bcf86cd799439099";

  const lessonId1 = "507f1f77bcf86cd799439021";
  const lessonId2 = "507f1f77bcf86cd799439022";
  const missingLessonId = "507f1f77bcf86cd799439088";
  const foreignLessonId = "507f1f77bcf86cd799439099";

  const adminToken = jwt.sign({ id: "admin_p4_01", role: "admin" }, env.JWT_SECRET);
  const studentToken = jwt.sign({ id: "student_p4_02", role: "student" }, env.JWT_SECRET);

  function createMockCourse(overrides = {}) {
    const rawLessons = [
      {
        _id: lessonId1,
        title: "Lesson 1: Getting Started",
        description: "Public preview of the curriculum",
        videoUrl: "https://cdn.example.com/lessons/lesson1.mp4",
        duration: 480,
        order: 1,
        isPreview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: lessonId2,
        title: "Lesson 2: Advanced State Machine",
        description: "Restricted deep-dive lesson",
        videoUrl: "https://cdn.example.com/lessons/lesson2.mp4",
        duration: 1200,
        order: 0,
        isPreview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const doc = {
      _id: courseId,
      title: "Mastering Node Architecture",
      description: "Advanced distributed systems course",
      category: "Software Engineering",
      isPublished: true,
      lessons: [...rawLessons],
      ...overrides
    };

    // Subdocument helper methods
    doc.lessons.id = function (id) {
      return this.find((l) => l._id.toString() === id.toString()) || null;
    };
    doc.lessons.pull = function (query) {
      const idx = this.findIndex((l) => l._id.toString() === query._id.toString());
      if (idx !== -1) this.splice(idx, 1);
    };
    doc.save = async function () {
      return this;
    };

    return doc;
  }

  beforeEach(() => {
    originalFindById = Course.findById;
    originalFind = Course.find;
    originalCountDocuments = Course.countDocuments;
  });

  afterEach(() => {
    Course.findById = originalFindById;
    Course.find = originalFind;
    Course.countDocuments = originalCountDocuments;
  });

  // 1. Lesson list ordered correctly & 8. Public access to preview lessons
  it("GET /api/courses/:courseId/lessons should return preview lessons sorted by order for public callers", async () => {
    Course.findById = async () => createMockCourse();

    const res = await request(app).get(`/api/courses/${courseId}/lessons`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.courseId, courseId);
    assert.equal(res.body.count, 1); // Only preview lesson returned
    assert.equal(res.body.lessons[0]._id, lessonId1);
    assert.equal(res.body.lessons[0].isPreview, true);
  });

  it("GET /api/courses/:courseId/lessons should return all lessons sorted by order for admin callers", async () => {
    Course.findById = async () => createMockCourse();

    const res = await request(app)
      .get(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 2);
    // Verified sorting by order: lessonId2 (order: 0) comes before lessonId1 (order: 1)
    assert.equal(res.body.lessons[0]._id, lessonId2);
    assert.equal(res.body.lessons[1]._id, lessonId1);
  });

  // 2. Single lesson retrieval & video playback metadata
  it("GET /api/courses/:courseId/lessons/:lessonId should return preview lesson details for public callers", async () => {
    Course.findById = async () => createMockCourse();

    const res = await request(app).get(`/api/courses/${courseId}/lessons/${lessonId1}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.lesson.title, "Lesson 1: Getting Started");
    assert.equal(res.body.lesson.videoUrl, "https://cdn.example.com/lessons/lesson1.mp4");
    assert.equal(res.body.lesson.duration, 480);
    assert.equal(res.body.lesson.order, 1);
    assert.equal(res.body.lesson.isPreview, true);
  });

  // 3. Invalid course and lesson identifiers
  it("Should return 400 when malformed course or lesson ID is provided", async () => {
    const res1 = await request(app).get("/api/courses/invalid-id/lessons");
    assert.equal(res1.status, 400);
    assert.equal(res1.body.success, false);

    const res2 = await request(app).get(`/api/courses/${courseId}/lessons/invalid-lesson-id`);
    assert.equal(res2.status, 400);
    assert.equal(res2.body.success, false);
  });

  // 4. Missing course and lesson (404)
  it("Should return 404 when course or lesson does not exist", async () => {
    Course.findById = async (id) => (id === courseId ? createMockCourse() : null);

    const resCourse = await request(app).get(`/api/courses/${missingCourseId}/lessons`);
    assert.equal(resCourse.status, 404);
    assert.equal(resCourse.body.message, "Course not found");

    const resLesson = await request(app).get(`/api/courses/${courseId}/lessons/${missingLessonId}`);
    assert.equal(resLesson.status, 404);
    assert.equal(resLesson.body.message, "Lesson not found");
  });

  // 5. Admin can create, update, delete, and reorder lessons
  it("POST /api/courses/:courseId/lessons should allow admin to create a lesson", async () => {
    const mock = createMockCourse();
    Course.findById = async () => mock;

    const res = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Lesson 3: Concurrency Patterns",
        description: "Worker threads and event loops",
        videoUrl: "https://cdn.example.com/lessons/lesson3.mp4",
        duration: 900,
        isPreview: false
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.lesson.title, "Lesson 3: Concurrency Patterns");
    assert.equal(res.body.lesson.order, 2); // Calculated next order: max(0, 1) + 1 = 2
  });

  it("PUT /api/courses/:courseId/lessons/:lessonId should allow admin to update a lesson", async () => {
    const mock = createMockCourse();
    Course.findById = async () => mock;

    const res = await request(app)
      .put(`/api/courses/${courseId}/lessons/${lessonId1}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Title for Lesson 1",
        duration: 550,
        isPreview: false
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.lesson.title, "Updated Title for Lesson 1");
    assert.equal(res.body.lesson.duration, 550);
  });

  it("DELETE /api/courses/:courseId/lessons/:lessonId should allow admin to delete a lesson", async () => {
    const mock = createMockCourse();
    Course.findById = async () => mock;

    const res = await request(app)
      .delete(`/api/courses/${courseId}/lessons/${lessonId1}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Lesson deleted successfully");
    assert.equal(mock.lessons.length, 1);
  });

  it("PATCH /api/courses/:courseId/lessons/reorder should reorder lessons correctly", async () => {
    const mock = createMockCourse();
    Course.findById = async () => mock;

    const res = await request(app)
      .patch(`/api/courses/${courseId}/lessons/reorder`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        lessonIds: [lessonId1, lessonId2] // Swap order
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.lessons[0]._id, lessonId1);
    assert.equal(res.body.lessons[0].order, 0);
    assert.equal(res.body.lessons[1]._id, lessonId2);
    assert.equal(res.body.lessons[1].order, 1);
  });

  // 6. Unauthenticated users cannot mutate lessons
  it("Should return 401 when unauthenticated caller attempts lesson mutations", async () => {
    const resPost = await request(app).post(`/api/courses/${courseId}/lessons`).send({ title: "Hack" });
    assert.equal(resPost.status, 401);

    const resPut = await request(app).put(`/api/courses/${courseId}/lessons/${lessonId1}`).send({ title: "Hack" });
    assert.equal(resPut.status, 401);

    const resPatch = await request(app).patch(`/api/courses/${courseId}/lessons/reorder`).send({ lessonIds: [lessonId1] });
    assert.equal(resPatch.status, 401);

    const resDel = await request(app).delete(`/api/courses/${courseId}/lessons/${lessonId1}`);
    assert.equal(resDel.status, 401);
  });

  // 7. Students cannot mutate lessons
  it("Should return 403 when authenticated student attempts lesson mutations", async () => {
    const resPost = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ title: "Student Hack" });
    assert.equal(resPost.status, 403);
    assert.equal(resPost.body.message, "Admin access required");
  });

  // 9. Public access to restricted lessons is denied (404 to hide discovery)
  it("GET /api/courses/:courseId/lessons/:lessonId should return 404 when public user tries to access non-preview lesson", async () => {
    Course.findById = async () => createMockCourse();

    const res = await request(app).get(`/api/courses/${courseId}/lessons/${lessonId2}`); // isPreview is false
    assert.equal(res.status, 404);
    assert.equal(res.body.message, "Lesson not found");
  });

  // 10. Public access to unpublished courses is denied
  it("Should return 404 when public user tries to access lessons of an unpublished course", async () => {
    Course.findById = async () => createMockCourse({ isPublished: false });

    const resList = await request(app).get(`/api/courses/${unpublishedCourseId}/lessons`);
    assert.equal(resList.status, 404);

    const resSingle = await request(app).get(`/api/courses/${unpublishedCourseId}/lessons/${lessonId1}`);
    assert.equal(resSingle.status, 404);
  });

  it("Should allow admin to access lessons of an unpublished course", async () => {
    Course.findById = async () => createMockCourse({ isPublished: false });

    const resList = await request(app)
      .get(`/api/courses/${unpublishedCourseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(resList.status, 200);
    assert.equal(resList.body.count, 2);
  });

  // 11. Invalid video URLs and malformed lesson payloads are rejected
  it("POST /api/courses/:courseId/lessons should reject unsafe and invalid video URLs", async () => {
    // Unsafe javascript: scheme
    const resJs = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Malicious Lesson",
        videoUrl: "javascript:alert(1)"
      });
    assert.equal(resJs.status, 400);
    assert.equal(resJs.body.message, "Validation failed");

    // Unsafe data: scheme
    const resData = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Data URI Lesson",
        videoUrl: "data:text/html;base64,PHNjcmlwdD4="
      });
    assert.equal(resData.status, 400);

    // Completely malformed URL string
    const resBad = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Bad URL",
        videoUrl: "ht!tp://not a url"
      });
    assert.equal(resBad.status, 400);
  });

  // 12. Mass-assignment attempts are rejected or safely ignored
  it("POST /api/courses/:courseId/lessons should reject payload with unexpected keys (mass assignment check)", async () => {
    const res = await request(app)
      .post(`/api/courses/${courseId}/lessons`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Valid Title",
        _id: "507f1f77bcf86cd799439099",
        role: "admin",
        isCourseAdmin: true
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.message, "Validation failed");
  });

  // 13. Reorder requests with duplicates or foreign lesson IDs are rejected
  it("PATCH /api/courses/:courseId/lessons/reorder should reject duplicates and foreign IDs", async () => {
    Course.findById = async () => createMockCourse();

    // Duplicate IDs
    const resDup = await request(app)
      .patch(`/api/courses/${courseId}/lessons/reorder`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        lessonIds: [lessonId1, lessonId1]
      });
    assert.equal(resDup.status, 400);
    assert.equal(resDup.body.message, "Duplicate lesson IDs provided in reorder list");

    // Foreign ID not belonging to course
    const resForeign = await request(app)
      .patch(`/api/courses/${courseId}/lessons/reorder`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        lessonIds: [lessonId1, foreignLessonId]
      });
    assert.equal(resForeign.status, 400);
    assert.equal(resForeign.body.message, "Reorder list contains IDs that do not belong to this course");

    // Incomplete list
    const resIncomplete = await request(app)
      .patch(`/api/courses/${courseId}/lessons/reorder`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        lessonIds: [lessonId1]
      });
    assert.equal(resIncomplete.status, 400);
    assert.equal(resIncomplete.body.message, "Reorder list must contain all lesson IDs belonging to this course");
  });

  // 14. Phase 3 pagination and publication-access behavior
  it("GET /api/courses should support pagination metadata and prevent public users from querying unpublished courses", async () => {
    let capturedFilter;
    Course.find = (filter) => {
      capturedFilter = filter;
      return {
        sort: () => ({
          skip: () => ({
            limit: () => Promise.resolve([{ _id: courseId, title: "Course 1", isPublished: true }])
          })
        })
      };
    };
    Course.countDocuments = async () => 15;

    // Public query with pagination parameters
    const res = await request(app).get("/api/courses?page=2&limit=5&all=true");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.page, 2);
    assert.equal(res.body.total, 15);
    assert.equal(res.body.totalPages, 3);
    assert.equal(res.body.count, 1);
    // Verified: even though all=true was passed by public caller, isPublished: true is enforced!
    assert.equal(capturedFilter.isPublished, true);
  });

  it("GET /api/courses/:id should return 404 for public users when course is unpublished, but 200 for admin", async () => {
    Course.findById = async (id) => ({
      _id: unpublishedCourseId,
      title: "Secret Unpublished Course",
      isPublished: false
    });

    // Public user denied discovery
    const resPublic = await request(app).get(`/api/courses/${unpublishedCourseId}`);
    assert.equal(resPublic.status, 404);
    assert.equal(resPublic.body.message, "Course not found");

    // Admin allowed inspection
    const resAdmin = await request(app)
      .get(`/api/courses/${unpublishedCourseId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    assert.equal(resAdmin.status, 200);
    assert.equal(resAdmin.body.course.title, "Secret Unpublished Course");
  });
});
