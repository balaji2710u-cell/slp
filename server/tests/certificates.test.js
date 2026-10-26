import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
import { env } from "../config/env.js";

const student1Id = "507f1f77bcf86cd799439011";
const student2Id = "507f1f77bcf86cd799439099";
const validCourseId = "507f1f77bcf86cd799439012";
const lesson1Id = "507f1f77bcf86cd799439021";

const student1Token = jwt.sign(
  { id: student1Id, role: "student" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

const student2Token = jwt.sign(
  { id: student2Id, role: "student" },
  env.JWT_SECRET,
  { expiresIn: "1h" }
);

describe("Certificate Persistence and Issuance System (Bug 1)", () => {
  const originalStudentFindById = Student.findById;
  const originalCourseFindById = Course.findById;
  const originalCourseFindOne = Course.findOne;
  const originalProgressFindOne = Progress.findOne;
  const originalCertFindOne = Certificate.findOne;
  const originalCertFind = Certificate.find;
  const originalCertCreate = Certificate.create;

  beforeEach(() => {
    // Default mocks
    Student.findById = async (id) => ({
      _id: id,
      name: id === student1Id ? "Aarav Sharma" : "Priya Patel",
      email: `${id}@example.com`,
      role: "student"
    });

    Course.findById = async (id) => ({
      _id: id,
      title: "Full-Stack Web Development",
      category: "Computer Science",
      learningGroup: "After Standard 12 and Above",
      lessons: [{ _id: lesson1Id, title: "HTML & CSS" }],
      assessment: { passingPercentage: 70 }
    });
  });

  afterEach(() => {
    Student.findById = originalStudentFindById;
    Course.findById = originalCourseFindById;
    Course.findOne = originalCourseFindOne;
    Progress.findOne = originalProgressFindOne;
    Certificate.findOne = originalCertFindOne;
    Certificate.find = originalCertFind;
    Certificate.create = originalCertCreate;
  });

  it("Eligible student completes a course, passes assessment, and certificate is issued & saved in MongoDB", async () => {
    // Student 1 has completed lesson 1
    Progress.findOne = async () => ({
      _id: "507f1f77bcf86cd799439031",
      studentId: student1Id,
      courseId: validCourseId,
      completedLessons: [lesson1Id],
      isCompleted: true,
      save: async () => true
    });

    // No existing certificate
    Certificate.findOne = async () => null;

    let createdRecord = null;
    Certificate.create = async (data) => {
      createdRecord = {
        _id: "507f1f77bcf86cd799439088",
        ...data
      };
      return createdRecord;
    };

    const res = await request(app)
      .post("/api/certificates/issue")
      .set("Authorization", `Bearer ${student1Token}`)
      .send({ courseId: validCourseId, score: 90 });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Certificate issued and saved successfully");
    assert.ok(res.body.certificate);
    assert.equal(res.body.certificate.studentId, student1Id);
    assert.equal(res.body.certificate.courseTitle, "Full-Stack Web Development");
    assert.equal(res.body.certificate.score, 90);
    assert.ok(res.body.certificate.certificateId.startsWith("SL-CERT-"));
    assert.ok(createdRecord !== null, "Certificate must be permanently saved in MongoDB");
  });

  it("Certificate appears in the student's dashboard and increases count by one", async () => {
    const savedCertificates = [
      {
        _id: "507f1f77bcf86cd799439088",
        certificateId: "SL-CERT-39012-9011",
        studentId: student1Id,
        courseId: {
          _id: validCourseId,
          title: "Full-Stack Web Development",
          category: "Computer Science",
          learningGroup: "After Standard 12 and Above"
        },
        courseTitle: "Full-Stack Web Development",
        studentName: "Aarav Sharma",
        score: 90,
        issuedAt: new Date()
      }
    ];

    Certificate.find = (query) => {
      assert.equal(query.studentId, student1Id);
      return {
        populate: () => ({
          sort: () => Promise.resolve(savedCertificates)
        })
      };
    };

    const res = await request(app)
      .get("/api/certificates/my")
      .set("Authorization", `Bearer ${student1Token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 1);
    assert.equal(res.body.certificates.length, 1);
    assert.equal(res.body.certificates[0].certificateId, "SL-CERT-39012-9011");
  });

  it("Duplicate certificate issuance is prevented for the same student and course", async () => {
    Progress.findOne = async () => ({
      _id: "507f1f77bcf86cd799439031",
      studentId: student1Id,
      courseId: validCourseId,
      completedLessons: [lesson1Id],
      isCompleted: true
    });

    const existingCert = {
      _id: "507f1f77bcf86cd799439088",
      certificateId: "SL-CERT-39012-9011",
      studentId: student1Id,
      courseId: validCourseId,
      studentName: "Aarav Sharma",
      courseTitle: "Full-Stack Web Development",
      score: 90
    };

    // Return existing certificate
    Certificate.findOne = async () => existingCert;

    let createCalled = false;
    Certificate.create = async () => {
      createCalled = true;
    };

    const res = await request(app)
      .post("/api/certificates/issue")
      .set("Authorization", `Bearer ${student1Token}`)
      .send({ courseId: validCourseId, score: 95 });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.alreadyIssued, true);
    assert.equal(res.body.certificate.certificateId, "SL-CERT-39012-9011");
    assert.equal(createCalled, false, "Must not create duplicate certificate record");
  });

  it("A student cannot retrieve another student's certificates", async () => {
    Certificate.find = (query) => {
      // Must filter strictly by authenticated student's ID
      assert.equal(query.studentId, student2Id);
      return {
        populate: () => ({
          sort: () => Promise.resolve([]) // student 2 has 0 certificates
        })
      };
    };

    const res = await request(app)
      .get("/api/certificates/my")
      .set("Authorization", `Bearer ${student2Token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 0);
    assert.equal(res.body.certificates.length, 0);
  });

  it("An ineligible student cannot issue a certificate (not enrolled)", async () => {
    // Not enrolled: Progress.findOne returns null
    Progress.findOne = async () => null;

    const res = await request(app)
      .post("/api/certificates/issue")
      .set("Authorization", `Bearer ${student1Token}`)
      .send({ courseId: validCourseId, score: 95 });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("not enrolled"));
  });

  it("An ineligible student cannot issue a certificate (score below passing threshold)", async () => {
    Progress.findOne = async () => ({
      _id: "507f1f77bcf86cd799439031",
      studentId: student1Id,
      courseId: validCourseId,
      completedLessons: [],
      isCompleted: false
    });

    Certificate.findOne = async () => null;

    const res = await request(app)
      .post("/api/certificates/issue")
      .set("Authorization", `Bearer ${student1Token}`)
      .send({ courseId: validCourseId, score: 45 }); // Passing is 70

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes("Ineligible for certificate"));
  });

  it("Public can verify an authentic certificate by ID", async () => {
    const certRecord = {
      _id: "507f1f77bcf86cd799439088",
      certificateId: "SL-CERT-39012-9011",
      studentName: "Aarav Sharma",
      courseTitle: "Full-Stack Web Development",
      learningGroup: "After Standard 12 and Above",
      score: 90
    };

    Certificate.findOne = (query) => {
      assert.equal(query.certificateId, "SL-CERT-39012-9011");
      return {
        populate: () => Promise.resolve(certRecord)
      };
    };

    const res = await request(app).get("/api/certificates/verify/SL-CERT-39012-9011");

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.valid, true);
    assert.equal(res.body.certificate.studentName, "Aarav Sharma");
  });
});
