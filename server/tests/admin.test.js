import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";
import { env } from "../config/env.js";

const adminToken = jwt.sign(
  { id: "507f191e810c19729de860ea", role: "admin" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

const studentToken = jwt.sign(
  { id: "507f1f77bcf86cd799439011", role: "student" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

describe("Admin Dashboard & Analytics", () => {
  it("GET /api/admin/stats should return analytics metrics to admin", async () => {
    Student.countDocuments = async () => 25;
    Course.countDocuments = async () => 5;
    Quiz.countDocuments = async () => 12;
    Progress.countDocuments = async () => 40;
    Course.find = async () => [{ lessons: [{ _id: "1" }, { _id: "2" }] }];
    Progress.find = async () => [
      {
        quizAttempts: [
          { score: 80, passed: true },
          { score: 60, passed: false }
        ]
      }
    ];

    const res = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.stats.totalStudents, 25);
    assert.equal(res.body.stats.totalCourses, 5);
    assert.equal(res.body.stats.totalQuizzes, 12);
    assert.equal(res.body.stats.totalEnrollments, 40);
    assert.equal(res.body.stats.totalLessons, 2);
    assert.equal(res.body.stats.totalQuizAttempts, 2);
    assert.equal(res.body.stats.averageQuizScore, 70);
    assert.equal(res.body.stats.overallPassRate, 50);
  });

  it("GET /api/admin/stats should return 403 when called by student", async () => {
    const res = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  it("GET /api/admin/students should return students list without exposing passwords", async () => {
    Student.find = () => ({
      sort: () =>
        Promise.resolve([
          {
            _id: "507f1f77bcf86cd799439011",
            name: "John Doe",
            email: "john@example.com",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
    });

    Progress.find = async () => [];

    const res = await request(app)
      .get("/api/admin/students")
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.students.length, 1);
    assert.equal(res.body.students[0].name, "John Doe");
    assert.equal(res.body.students[0].password, undefined, "Password leaked in student summary!");
  });
});
