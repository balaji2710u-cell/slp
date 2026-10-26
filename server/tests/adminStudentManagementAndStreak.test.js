import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";
import Activity from "../models/Activity.js";
import { env } from "../config/env.js";
import { calculateStreakFromDates, calculateWeeklyProgress } from "../services/activityService.js";

const adminToken = jwt.sign(
  { id: "507f191e810c19729de860ea", role: "admin" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

const studentId = "507f1f77bcf86cd799439011";
const studentToken = jwt.sign(
  { id: studentId, role: "student" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

describe("Part 1: Admin Student Management & Presence API", () => {
  it("GET /api/admin/students should reject unauthenticated requests with 401", async () => {
    const res = await request(app).get("/api/admin/students");
    assert.equal(res.status, 401);
  });

  it("GET /api/admin/students should reject student callers with 403", async () => {
    const res = await request(app)
      .get("/api/admin/students")
      .set("Authorization", `Bearer ${studentToken}`);
    assert.equal(res.status, 403);
  });

  it("GET /api/admin/students should return paginated students with online status and progress", async () => {
    const now = new Date();
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000); // Online
    const twentyMinAgo = new Date(Date.now() - 20 * 60 * 1000); // Offline

    const mockStudents = [
      {
        _id: "507f1f77bcf86cd799439011",
        name: "Aarthi Kumar",
        email: "aarthi@example.com",
        createdAt: new Date("2026-01-15"),
        lastLoginAt: tenMinAgo,
        lastActiveAt: tenMinAgo,
        weeklyGoalMinutes: 180
      },
      {
        _id: "507f1f77bcf86cd799439022",
        name: "Balaji V",
        email: "balaji@example.com",
        createdAt: new Date("2026-02-01"),
        lastLoginAt: twentyMinAgo,
        lastActiveAt: twentyMinAgo,
        weeklyGoalMinutes: 120
      }
    ];

    Student.countDocuments = async (filter) => {
      if (filter && filter.lastActiveAt) return 1; // 1 online
      return 2;
    };

    Student.find = () => ({
      sort: () => ({
        skip: () => ({
          limit: () => Promise.resolve(mockStudents)
        })
      })
    });

    Progress.find = async ({ studentId: sId }) => {
      if (sId === "507f1f77bcf86cd799439011") {
        return [
          {
            isCompleted: true,
            completionPercentage: 100,
            quizAttempts: [{ passed: true, score: 90 }]
          }
        ];
      }
      return [];
    };

    const res = await request(app)
      .get("/api/admin/students?page=1&limit=10")
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.totalRegistered, 2);
    assert.equal(res.body.totalOnline, 1);
    assert.equal(res.body.students.length, 2);

    const first = res.body.students[0];
    assert.equal(first.name, "Aarthi Kumar");
    assert.equal(first.isOnline, true);
    assert.equal(first.status, "online");
    assert.equal(first.enrolledCount, 1);
    assert.equal(first.completedCoursesCount, 1);
    assert.equal(first.avgCompletionPercentage, 100);
    assert.equal(first.quizzesTaken, 1);
    assert.equal(first.quizzesPassed, 1);
    assert.equal(first.password, undefined);

    const second = res.body.students[1];
    assert.equal(second.name, "Balaji V");
    assert.equal(second.isOnline, false);
    assert.equal(second.status, "offline");
  });

  it("GET /api/admin/students/:studentId should return detailed profile with enrollments, quizzes, and certificates", async () => {
    const mockStudent = {
      _id: studentId,
      name: "Aarthi Kumar",
      email: "aarthi@example.com",
      createdAt: new Date("2026-01-15"),
      lastLoginAt: new Date(),
      lastActiveAt: new Date(),
      weeklyGoalMinutes: 180,
      toObject() {
        return { ...this };
      }
    };

    Student.findOne = async () => mockStudent;

    Progress.find = () => ({
      populate: () => ({
        sort: () =>
          Promise.resolve([
            {
              _id: "progress-1",
              courseId: {
                _id: "course-1",
                title: "HTML & Web Basics",
                category: "Computer Science",
                thumbnail: "/thumb.png",
                lessons: [{ _id: "l1" }, { _id: "l2" }]
              },
              completedLessons: ["l1"],
              completionPercentage: 50,
              isCompleted: false,
              quizAttempts: [
                {
                  _id: "attempt-1",
                  quizId: "quiz-1",
                  score: 85,
                  rawScore: 9,
                  totalQuestions: 10,
                  passed: true,
                  attemptedAt: new Date()
                }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ])
      })
    });

    Certificate.find = () => ({
      sort: () =>
        Promise.resolve([
          {
            _id: "cert-1",
            certificateId: "CERT-12345",
            courseTitle: "HTML & Web Basics",
            score: 85,
            issuedAt: new Date()
          }
        ])
    });

    Activity.find = () => ({
      sort: () => ({
        limit: () => Promise.resolve([])
      })
    });

    const res = await request(app)
      .get(`/api/admin/students/${studentId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.student.name, "Aarthi Kumar");
    assert.equal(res.body.student.isOnline, true);
    assert.equal(res.body.coursesEnrolled.length, 1);
    assert.equal(res.body.coursesEnrolled[0].title, "HTML & Web Basics");
    assert.equal(res.body.coursesEnrolled[0].completionPercentage, 50);
    assert.equal(res.body.quizAttempts.length, 1);
    assert.equal(res.body.quizAttempts[0].passed, true);
    assert.equal(res.body.certificates.length, 1);
    assert.equal(res.body.certificates[0].certificateId, "CERT-12345");
  });

  it("POST /api/auth/heartbeat should refresh student presence", async () => {
    let updatedActiveAt = null;
    Student.findByIdAndUpdate = async (id, update) => {
      updatedActiveAt = update.$set.lastActiveAt;
      return { _id: id, lastActiveAt: updatedActiveAt };
    };

    const res = await request(app)
      .post("/api/auth/heartbeat")
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.notEqual(updatedActiveAt, null);
  });
});

describe("Part 2: Dynamic Streak & Weekly Goal Calculation", () => {
  it("Streak calculation: first-time student with 0 activity should return 0 current and longest streak", () => {
    const streak = calculateStreakFromDates([]);
    assert.equal(streak.currentStreak, 0);
    assert.equal(streak.longestStreak, 0);
    assert.equal(streak.isActiveToday, false);
  });

  it("Streak calculation: consecutive calendar days with active today", () => {
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 3600 * 1000);

    const fmt = (d) => d.toISOString().split("T")[0];
    const dates = [fmt(today), fmt(yesterday), fmt(twoDaysAgo)];

    const streak = calculateStreakFromDates(dates);
    assert.equal(streak.currentStreak, 3);
    assert.equal(streak.longestStreak, 3);
    assert.equal(streak.isActiveToday, true);
  });

  it("Streak calculation: active yesterday but not yet today maintains current streak", () => {
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 3600 * 1000);

    const fmt = (d) => d.toISOString().split("T")[0];
    const dates = [fmt(yesterday), fmt(twoDaysAgo)];

    const streak = calculateStreakFromDates(dates);
    assert.equal(streak.currentStreak, 2);
    assert.equal(streak.longestStreak, 2);
    assert.equal(streak.isActiveToday, false);
  });

  it("Streak calculation: missed day resets current streak to 0 while preserving longest streak", () => {
    const threeDaysAgo = new Date(Date.now() - 72 * 3600 * 1000);
    const fourDaysAgo = new Date(Date.now() - 96 * 3600 * 1000);

    const fmt = (d) => d.toISOString().split("T")[0];
    const dates = [fmt(threeDaysAgo), fmt(fourDaysAgo)];

    const streak = calculateStreakFromDates(dates);
    assert.equal(streak.currentStreak, 0);
    assert.equal(streak.longestStreak, 2);
  });

  it("Streak calculation: multiple events on same day do not count as multiple streak days", () => {
    const today = new Date();
    const fmt = (d) => d.toISOString().split("T")[0];
    const duplicateDates = [fmt(today), fmt(today), fmt(today)];

    const streak = calculateStreakFromDates(duplicateDates);
    assert.equal(streak.currentStreak, 1);
    assert.equal(streak.longestStreak, 1);
  });

  it("Weekly goal progress: dynamically calculates minutes against configurable goal", () => {
    const goalMinutes = 120;
    // 3 activities this week: 30m, 20m, 10m = 60m
    const activities = [
      { durationMinutes: 30, createdAt: new Date() },
      { durationMinutes: 20, createdAt: new Date() },
      { durationMinutes: 10, createdAt: new Date() }
    ];

    const weekly = calculateWeeklyProgress(activities, goalMinutes);
    assert.equal(weekly.weeklyGoalMinutes, 120);
    assert.equal(weekly.weeklyMinutesLearned, 60);
    assert.equal(weekly.weeklyPercentage, 50);
    assert.equal(weekly.weeklyMinutesRemaining, 60);
    assert.equal(weekly.isGoalMet, false);
    assert.equal(weekly.daysBreakdown.length, 7);
  });

  it("PUT /api/progress/goal updates student's weekly study goal", async () => {
    Student.findByIdAndUpdate = () => ({
      select: () => Promise.resolve({ weeklyGoalMinutes: 240 })
    });

    const res = await request(app)
      .put("/api/progress/goal")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ weeklyGoalMinutes: 240 });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.weeklyGoalMinutes, 240);
  });
});
