import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";
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

const validCourseId = "507f1f77bcf86cd799439012";
const validQuizId = "507f1f77bcf86cd799439013";

describe("Quiz and Assessment System", () => {
  it("POST /api/quizzes should allow admin to create a quiz with questions", async () => {
    Course.findById = async (id) => ({
      _id: id,
      title: "Test Course",
      lessons: []
    });

    Quiz.create = async (data) => ({
      _id: validQuizId,
      ...data,
      createdAt: new Date()
    });

    const payload = {
      courseId: validCourseId,
      title: "Introduction to HTML & CSS",
      passingPercentage: 75,
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Method Logic"
          ],
          correctAnswer: 0,
          explanation: "HTML stands for Hyper Text Markup Language."
        }
      ]
    };

    const res = await request(app)
      .post("/api/quizzes")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(payload);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.quiz.title, payload.title);
    assert.equal(res.body.quiz.passingPercentage, 75);
  });

  it("POST /api/quizzes should return 403 when student attempts quiz creation", async () => {
    const res = await request(app)
      .post("/api/quizzes")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        courseId: validCourseId,
        title: "Unauthorized Quiz",
        questions: [{ question: "Test?", options: ["A", "B"], correctAnswer: 0 }]
      });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  it("POST /api/quizzes should return 400 when question has fewer than 2 options", async () => {
    const res = await request(app)
      .post("/api/quizzes")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        courseId: validCourseId,
        title: "Invalid Quiz",
        questions: [
          {
            question: "Only one option?",
            options: ["Only one"],
            correctAnswer: 0
          }
        ]
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
  });

  it("GET /api/quizzes/:id should NEVER expose correctAnswer or explanation to students", async () => {
    Quiz.findById = async (id) => ({
      _id: id,
      title: "Secure Web Quiz",
      passingPercentage: 70,
      questions: [
        {
          _id: "507f1f77bcf86cd799439099",
          question: "Which port does HTTPS default to?",
          options: ["80", "443", "8080", "22"],
          correctAnswer: 1,
          explanation: "HTTPS defaults to port 443."
        }
      ]
    });

    const res = await request(app)
      .get(`/api/quizzes/${validQuizId}`)
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    const q = res.body.quiz.questions[0];
    assert.equal(q.question, "Which port does HTTPS default to?");
    assert.equal(q.correctAnswer, undefined, "Security vulnerability: correctAnswer leaked to student!");
    assert.equal(q.explanation, undefined, "Security vulnerability: explanation leaked to student before submission!");
  });

  it("GET /api/quizzes/:id should include correctAnswer for admin users", async () => {
    Quiz.findById = async (id) => ({
      _id: id,
      title: "Secure Web Quiz",
      passingPercentage: 70,
      questions: [
        {
          _id: "507f1f77bcf86cd799439099",
          question: "Which port does HTTPS default to?",
          options: ["80", "443", "8080", "22"],
          correctAnswer: 1,
          explanation: "HTTPS defaults to port 443."
        }
      ]
    });

    const res = await request(app)
      .get(`/api/quizzes/${validQuizId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.quiz.questions[0].correctAnswer, 1);
    assert.equal(res.body.quiz.questions[0].explanation, "HTTPS defaults to port 443.");
  });

  it("POST /api/quizzes/:id/submit should calculate scores and pass/fail on the server", async () => {
    Quiz.findById = async (id) => ({
      _id: id,
      courseId: validCourseId,
      passingPercentage: 70,
      questions: [
        { question: "Q1", correctAnswer: 0, explanation: "Exp 1" },
        { question: "Q2", correctAnswer: 1, explanation: "Exp 2" }
      ]
    });

    // Submitting 2 correct answers (100% score -> Passed)
    const resPass = await request(app)
      .post(`/api/quizzes/${validQuizId}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ answers: [0, 1] });

    assert.equal(resPass.status, 200);
    assert.equal(resPass.body.score, 100);
    assert.equal(resPass.body.passed, true);
    assert.equal(resPass.body.correctCount, 2);

    // Submitting 0 correct answers (0% score -> Failed)
    const resFail = await request(app)
      .post(`/api/quizzes/${validQuizId}/submit`)
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ answers: [1, 0] });

    assert.equal(resFail.status, 200);
    assert.equal(resFail.body.score, 0);
    assert.equal(resFail.body.passed, false);
    assert.equal(resFail.body.correctCount, 0);
  });
});
