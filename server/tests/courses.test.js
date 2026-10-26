import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Course from "../models/Course.js";
import { env } from "../config/env.js";

describe("Course Management & Catalog API (Phase 3)", () => {
  let originalFind;
  let originalFindById;
  let originalCreate;
  let originalFindByIdAndUpdate;
  let originalFindByIdAndDelete;

  const validObjectId = "507f1f77bcf86cd799439011";
  const missingObjectId = "507f1f77bcf86cd799439099";

  const adminToken = jwt.sign({ id: "admin_tester_01", role: "admin" }, env.JWT_SECRET);
  const studentToken = jwt.sign({ id: "student_tester_02", role: "student" }, env.JWT_SECRET);

  beforeEach(() => {
    originalFind = Course.find;
    originalFindById = Course.findById;
    originalCreate = Course.create;
    originalFindByIdAndUpdate = Course.findByIdAndUpdate;
    originalFindByIdAndDelete = Course.findByIdAndDelete;
  });

  afterEach(() => {
    Course.find = originalFind;
    Course.findById = originalFindById;
    Course.create = originalCreate;
    Course.findByIdAndUpdate = originalFindByIdAndUpdate;
    Course.findByIdAndDelete = originalFindByIdAndDelete;
  });

  // 1. Public course listing
  it("GET /api/courses should retrieve published courses and count", async () => {
    Course.find = () => ({
      sort: () =>
        Promise.resolve([
          { _id: validObjectId, title: "Web Dev", category: "Programming", isPublished: true }
        ])
    });

    const res = await request(app).get("/api/courses");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 1);
    assert.equal(res.body.courses.length, 1);
    assert.equal(res.body.courses[0].title, "Web Dev");
  });

  // 2. Single course retrieval
  it("GET /api/courses/:id should return course details for a valid ID", async () => {
    Course.findById = async (id) => {
      if (id === validObjectId) {
        return {
          _id: validObjectId,
          title: "Full-Stack Development",
          description: "Comprehensive software engineering curriculum.",
          category: "Computer Science",
          isPublished: true
        };
      }
      return null;
    };

    const res = await request(app).get(`/api/courses/${validObjectId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.course._id, validObjectId);
    assert.equal(res.body.course.title, "Full-Stack Development");
  });

  // 3. Rejection of malformed course ID
  it("GET /api/courses/:id should return 400 for malformed MongoDB ObjectId", async () => {
    const res = await request(app).get("/api/courses/not-a-valid-hex-id");
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
  });

  // 4. Course not found (404)
  it("GET /api/courses/:id should return 404 for nonexistent course", async () => {
    Course.findById = async () => null;

    const res = await request(app).get(`/api/courses/${missingObjectId}`);
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Course not found");
  });

  // 5. Admin course creation with validation
  it("POST /api/courses should create a course when valid admin payload is provided", async () => {
    Course.create = async (data) => ({
      _id: validObjectId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Data Structures & Algorithms",
        description: "In-depth study of arrays, linked lists, trees, and graphs.",
        category: "Computer Science",
        instructor: "Dr. Alan Turing",
        lessons: [
          { title: "Big-O Notation", videoUrl: "https://example.com/big-o", duration: "15m" }
        ]
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Course created successfully");
    assert.equal(res.body.course.title, "Data Structures & Algorithms");
  });

  // 6. Course creation validation failure
  it("POST /api/courses should return 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Incomplete"
        // description and category are omitted
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
    assert.ok(res.body.errors.some((e) => e.field.includes("description")));
    assert.ok(res.body.errors.some((e) => e.field.includes("category")));
  });

  // 7. Course creation forbidden for students
  it("POST /api/courses should return 403 when student attempts course creation", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        title: "Student Attempt",
        description: "Student trying to add course",
        category: "Unauthorized"
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Admin access required");
  });

  // 8. Admin course update (PUT)
  it("PUT /api/courses/:id should update course when requested by admin", async () => {
    Course.findByIdAndUpdate = async (id, update) => {
      if (id === validObjectId) {
        return {
          _id: validObjectId,
          title: "Updated Title",
          description: "Updated course description with sufficient length.",
          category: "Computer Science"
        };
      }
      return null;
    };

    const res = await request(app)
      .put(`/api/courses/${validObjectId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Title",
        description: "Updated course description with sufficient length."
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Course updated successfully");
    assert.equal(res.body.course.title, "Updated Title");
  });

  // 9. Course update 404
  it("PUT /api/courses/:id should return 404 when updating nonexistent course", async () => {
    Course.findByIdAndUpdate = async () => null;

    const res = await request(app)
      .put(`/api/courses/${missingObjectId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Does Not Exist"
      });

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Course not found");
  });

  // 10. Student denial on course update
  it("PUT /api/courses/:id should return 403 when student attempts update", async () => {
    const res = await request(app)
      .put(`/api/courses/${validObjectId}`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        title: "Student Update"
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Admin access required");
  });

  // 11. Admin course deletion (DELETE)
  it("DELETE /api/courses/:id should remove course when requested by admin", async () => {
    Course.findByIdAndDelete = async (id) => {
      if (id === validObjectId) {
        return { _id: validObjectId, title: "Course to Delete" };
      }
      return null;
    };

    const res = await request(app)
      .delete(`/api/courses/${validObjectId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Course deleted successfully");
  });

  // 12. Course deletion 404
  it("DELETE /api/courses/:id should return 404 when deleting nonexistent course", async () => {
    Course.findByIdAndDelete = async () => null;

    const res = await request(app)
      .delete(`/api/courses/${missingObjectId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Course not found");
  });

  // 13. Student denial on course deletion
  it("DELETE /api/courses/:id should return 403 when student attempts deletion", async () => {
    const res = await request(app)
      .delete(`/api/courses/${validObjectId}`)
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Admin access required");
  });

  // 14. Unauthenticated denial on course mutations
  it("Should return 401 on mutations when no token is provided", async () => {
    const resPost = await request(app).post("/api/courses").send({ title: "No Auth" });
    assert.equal(resPost.status, 401);

    const resPut = await request(app).put(`/api/courses/${validObjectId}`).send({ title: "No Auth" });
    assert.equal(resPut.status, 401);

    const resDelete = await request(app).delete(`/api/courses/${validObjectId}`);
    assert.equal(resDelete.status, 401);
  });

  // 15. Category & Learning Group Slug Normalization (Bug 2)
  it("GET /api/courses?learningGroup=12th-standard should normalize slug to 'After Standard 12 and Above'", async () => {
    let capturedFilter = null;
    Course.find = (filter) => {
      capturedFilter = filter;
      return {
        sort: () => ({
          skip: () => ({
            limit: () =>
              Promise.resolve([
                {
                  _id: validObjectId,
                  title: "Advanced Data Structures & Algorithms",
                  category: "Computer Science",
                  learningGroup: "After Standard 12 and Above",
                  isPublished: true
                }
              ])
          })
        })
      };
    };

    const res = await request(app).get("/api/courses?learningGroup=12th-standard");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(capturedFilter.learningGroup instanceof RegExp);
    assert.ok(capturedFilter.learningGroup.test("After Standard 12 and Above"));
    assert.equal(res.body.courses[0].learningGroup, "After Standard 12 and Above");
  });

  it("GET /api/courses?category=12th-standard should correctly map to learningGroup for 12th Standard", async () => {
    let capturedFilter = null;
    Course.find = (filter) => {
      capturedFilter = filter;
      return {
        sort: () => ({
          skip: () => ({
            limit: () =>
              Promise.resolve([
                {
                  _id: validObjectId,
                  title: "Machine Learning Foundations",
                  category: "AI & Data Science",
                  learningGroup: "After Standard 12 and Above",
                  isPublished: true
                }
              ])
          })
        })
      };
    };

    const res = await request(app).get("/api/courses?category=12th-standard");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(capturedFilter.learningGroup instanceof RegExp);
    assert.ok(capturedFilter.learningGroup.test("After Standard 12 and Above"));
  });

  it("GET /api/courses?category=computer-science should normalize subject category slug", async () => {
    let capturedFilter = null;
    Course.find = (filter) => {
      capturedFilter = filter;
      return {
        sort: () => ({
          skip: () => ({
            limit: () =>
              Promise.resolve([
                {
                  _id: validObjectId,
                  title: "Intro to Python",
                  category: "Computer Science",
                  learningGroup: "Standards 6–8",
                  isPublished: true
                }
              ])
          })
        })
      };
    };

    const res = await request(app).get("/api/courses?category=computer-science");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(capturedFilter.category instanceof RegExp);
    assert.ok(capturedFilter.category.test("Computer Science"));
  });
});
