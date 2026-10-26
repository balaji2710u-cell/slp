import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import { env } from "../config/env.js";

const studentToken = jwt.sign(
  { id: "507f1f77bcf86cd799439011", role: "student" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

const validCourseId = "507f1f77bcf86cd799439012";
const lesson1Id = "507f1f77bcf86cd799439021";
const lesson2Id = "507f1f77bcf86cd799439022";

describe("Student Progress & Progression Enforcement", () => {
  it("POST /api/progress/enroll should enroll student in a course", async () => {
    Course.findById = async (id) => ({
      _id: id,
      title: "Fullstack Web",
      lessons: [{ _id: lesson1Id, title: "L1" }]
    });

    Progress.findOne = async () => null;
    Progress.create = async (data) => ({
      _id: "507f1f77bcf86cd799439031",
      ...data
    });

    const res = await request(app)
      .post("/api/progress/enroll")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ courseId: validCourseId });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Enrolled in course successfully");
    assert.equal(res.body.progress.courseId, validCourseId);
  });

  it("POST /api/progress/enroll should return existing progress if already enrolled", async () => {
    Course.findById = async (id) => ({ _id: id, title: "Fullstack Web" });
    Progress.findOne = async () => ({
      _id: "507f1f77bcf86cd799439031",
      studentId: "507f1f77bcf86cd799439011",
      courseId: validCourseId
    });

    const res = await request(app)
      .post("/api/progress/enroll")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ courseId: validCourseId });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Already enrolled in this course");
  });

  it("POST /api/progress/:courseId/complete-lesson should complete lesson 1 and unlock lesson 2", async () => {
    Course.findById = async (id) => ({
      _id: id,
      lessons: [
        { _id: lesson1Id, title: "L1", order: 0 },
        { _id: lesson2Id, title: "L2", order: 1 }
      ]
    });

    const mockProgress = {
      studentId: "507f1f77bcf86cd799439011",
      courseId: validCourseId,
      completedLessons: [],
      lastLessonId: lesson1Id,
      completionPercentage: 0,
      isCompleted: false,
      save: async function () {
        return this;
      }
    };

    Progress.findOne = async () => mockProgress;

    const res = await request(app)
      .post(`/api/progress/${validCourseId}/complete-lesson`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ lessonId: lesson1Id });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.unlockedNextLesson, lesson2Id);
    assert.equal(res.body.progress.completionPercentage, 50);
  });

  it("POST /api/progress/:courseId/complete-lesson should deny completing lesson 2 if lesson 1 is not completed", async () => {
    Course.findById = async (id) => ({
      _id: id,
      lessons: [
        { _id: lesson1Id, title: "L1", order: 0 },
        { _id: lesson2Id, title: "L2", order: 1 }
      ]
    });

    const mockProgress = {
      studentId: "507f1f77bcf86cd799439011",
      courseId: validCourseId,
      completedLessons: [], // Lesson 1 NOT completed
      lastLessonId: lesson1Id,
      save: async function () {
        return this;
      }
    };

    Progress.findOne = async () => mockProgress;

    const res = await request(app)
      .post(`/api/progress/${validCourseId}/complete-lesson`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ lessonId: lesson2Id });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("Previous lesson must be completed first"));
  });
});
