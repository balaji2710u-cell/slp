import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import express from "express";
import app from "../app.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";
import { env } from "../config/env.js";

import Course from "../models/Course.js";

describe("Shared Authentication & Role Authorization Middleware", () => {
  // 9. Missing Bearer token rejection
  it("Feature 9: Should return 401 when Authorization Bearer header is missing or malformed", async () => {
    // Missing header entirely
    const res1 = await request(app).get("/api/auth/me");
    assert.equal(res1.status, 401);
    assert.equal(res1.body.success, false);
    assert.equal(res1.body.message, "Authentication token required");

    // Header without Bearer prefix
    const res2 = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Basic some_basic_token");
    assert.equal(res2.status, 401);
    assert.equal(res2.body.success, false);
    assert.equal(res2.body.message, "Authentication token required");

    // Empty Bearer token
    const res3 = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer ");
    assert.equal(res3.status, 401);
    assert.equal(res3.body.success, false);
  });

  // 10. Invalid token rejection
  it("Feature 10: Should return 401 when token is forged or signed with an incorrect secret", async () => {
    // Arbitrary malformed string
    const res1 = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer totally_forged_and_invalid_token_signature");
    assert.equal(res1.status, 401);
    assert.equal(res1.body.success, false);
    assert.equal(res1.body.message, "Invalid or expired token");

    // Token signed with wrong secret key
    const forgedToken = jwt.sign(
      { id: "attacker_id", role: "admin" },
      "completely_wrong_secret_key"
    );
    const res2 = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${forgedToken}`);
    assert.equal(res2.status, 401);
    assert.equal(res2.body.success, false);
    assert.equal(res2.body.message, "Invalid or expired token");
  });

  // 11. Expired token rejection
  it("Feature 11: Should return 401 when token is expired", async () => {
    // Token that expired 5 seconds ago
    const expiredToken = jwt.sign(
      { id: "student_expired", role: "student" },
      env.JWT_SECRET,
      { expiresIn: "-5s" }
    );

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${expiredToken}`);

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Invalid or expired token");
  });

  // 12. Correct role authorization
  it("Feature 12: Should permit access when user has the required role and deny otherwise", async () => {
    const testApp = express();
    testApp.use(express.json());
    testApp.get("/admin-only-test", authenticateToken, requireRole("admin"), (req, res) => {
      res.json({ success: true, authorized: true, user: req.user });
    });

    // Admin token permits access
    const adminToken = jwt.sign({ id: "admin_user_01", role: "admin" }, env.JWT_SECRET);
    const adminRes = await request(testApp)
      .get("/admin-only-test")
      .set("Authorization", `Bearer ${adminToken}`);
    assert.equal(adminRes.status, 200);
    assert.equal(adminRes.body.success, true);
    assert.equal(adminRes.body.user.role, "admin");

    // Student token is rejected with 403
    const studentToken = jwt.sign({ id: "student_user_02", role: "student" }, env.JWT_SECRET);
    const studentRes = await request(testApp)
      .get("/admin-only-test")
      .set("Authorization", `Bearer ${studentToken}`);
    assert.equal(studentRes.status, 403);
    assert.equal(studentRes.body.success, false);
    assert.equal(studentRes.body.message, "Admin access required");
  });

  // 13. Denial of student access to admin-only course creation
  it("Feature 13: Should deny student access (HTTP 403) to admin-only course creation POST /api/courses", async () => {
    const studentToken = jwt.sign({ id: "student_007", role: "student" }, env.JWT_SECRET);

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        title: "Malicious Course Injection",
        description: "Attempted course creation by student",
        category: "Security Testing"
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Admin access required");
  });

  // 13b. Allow admin access to course creation
  it("Feature 13b: Should permit admin access (HTTP 201) to course creation POST /api/courses", async () => {
    const originalCreate = Course.create;
    Course.create = async (data) => ({
      _id: "course_admin_123",
      ...data
    });

    const adminToken = jwt.sign({ id: "admin_001", role: "admin" }, env.JWT_SECRET);

    const res = await request(app)
      .post("/api/courses")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Introduction to Computer Science",
        description: "Foundational concepts in computing",
        category: "Computer Science"
      });

    Course.create = originalCreate;

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Course created successfully");
    assert.equal(res.body.course._id, "course_admin_123");
  });
});
