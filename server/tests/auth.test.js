import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../app.js";
import Student from "../models/Student.js";
import { env } from "../config/env.js";

describe("Authentication & Authorization Hardening (Auth Routes)", () => {
  let originalFindOne;
  let originalCreate;
  let originalFindById;

  beforeEach(() => {
    originalFindOne = Student.findOne;
    originalCreate = Student.create;
    originalFindById = Student.findById;
  });

  afterEach(() => {
    Student.findOne = originalFindOne;
    Student.create = originalCreate;
    Student.findById = originalFindById;
  });

  // 1. Successful student registration
  it("Feature 1: Should successfully register a new student and return HTTP 201", async () => {
    Student.findOne = async () => null; // No duplicate
    Student.create = async (data) => ({
      _id: "student_id_101",
      name: data.name,
      email: data.email,
      role: data.role
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "StrongPassword123!"
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Registration successful");
    assert.equal(res.body.student.id, "student_id_101");
    assert.equal(res.body.student.name, "Alice Johnson");
    assert.equal(res.body.student.email, "alice@example.com");
    assert.equal(res.body.student.role, "student");
  });

  // 2. Rejection of invalid registration data
  it("Feature 2: Should reject invalid registration data (missing fields, short password, bad email)", async () => {
    // Missing password
    const res1 = await request(app)
      .post("/api/auth/register")
      .send({ name: "Alice", email: "alice@example.com" });
    assert.equal(res1.status, 400);
    assert.equal(res1.body.success, false);
    assert.equal(res1.body.message, "Validation failed");

    // Invalid email format
    const res2 = await request(app)
      .post("/api/auth/register")
      .send({ name: "Alice", email: "not-an-email", password: "Password123!" });
    assert.equal(res2.status, 400);
    assert.equal(res2.body.success, false);

    // Password shorter than 8 characters
    const res3 = await request(app)
      .post("/api/auth/register")
      .send({ name: "Alice", email: "alice@example.com", password: "short" });
    assert.equal(res3.status, 400);
    assert.equal(res3.body.success, false);
  });

  // 3. Duplicate email rejection
  it("Feature 3: Should reject duplicate email address with HTTP 409", async () => {
    Student.findOne = async () => ({
      _id: "existing_student_id",
      email: "existing@example.com"
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Duplicate User",
        email: "existing@example.com",
        password: "Password123!"
      });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Email already registered");
  });

  // 4. Confirmation that passwords are hashed
  it("Feature 4: Should hash the password using bcrypt before saving to database", async () => {
    let capturedData;
    Student.findOne = async () => null;
    Student.create = async (data) => {
      capturedData = data;
      return { _id: "s1", ...data };
    };

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test Hash",
        email: "testhash@example.com",
        password: "MyRawPassword123!"
      });

    assert.ok(capturedData);
    assert.notEqual(capturedData.password, "MyRawPassword123!");
    const isBcryptMatch = await bcrypt.compare("MyRawPassword123!", capturedData.password);
    assert.equal(isBcryptMatch, true);
  });

  // 5. Confirmation that password hashes are excluded from API responses
  it("Feature 5: Should never include password or password hash in registration/login responses", async () => {
    Student.findOne = async () => null;
    Student.create = async (data) => ({
      _id: "s_no_hash",
      name: data.name,
      email: data.email,
      role: data.role
    });

    const regRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Clean Response",
        email: "clean@example.com",
        password: "SafePassword123!"
      });

    assert.equal(regRes.status, 201);
    assert.equal(regRes.body.student.password, undefined);
    assert.equal(regRes.body.student.passwordHash, undefined);
    assert.equal(JSON.stringify(regRes.body).includes("SafePassword123!"), false);
  });

  // 6. Rejection of public admin-role assignment
  it("Feature 6: Should reject attempts to assign admin role via public registration", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin Attempter",
        email: "attempter@example.com",
        password: "Password123!",
        role: "admin"
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
    assert.ok(
      res.body.errors.some((e) =>
        e.message.includes("Public registration cannot assign administrative privileges")
      )
    );
  });

  // 7. Successful login with valid credentials
  it("Feature 7: Should successfully login with valid credentials and return JWT token", async () => {
    const rawPassword = "LoginValid123!";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    Student.findOne = async ({ email }) => {
      if (email === "student.login@example.com") {
        return {
          _id: "student_auth_999",
          name: "Logged Student",
          email: "student.login@example.com",
          password: hashedPassword,
          role: "student"
        };
      }
      return null;
    };

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "student.login@example.com",
        password: rawPassword
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "Login successful");
    assert.ok(res.body.token);
    assert.equal(res.body.student.id, "student_auth_999");
    assert.equal(res.body.student.password, undefined);

    // Verify token claims
    const decoded = jwt.verify(res.body.token, env.JWT_SECRET);
    assert.equal(decoded.id, "student_auth_999");
    assert.equal(decoded.role, "student");
  });

  // 8. Rejection of invalid credentials
  it("Feature 8: Should return generic 401 error for nonexistent user or wrong password", async () => {
    // Nonexistent user
    Student.findOne = async () => null;

    const res1 = await request(app)
      .post("/api/auth/login")
      .send({ email: "doesnotexist@example.com", password: "Password123!" });
    assert.equal(res1.status, 401);
    assert.equal(res1.body.success, false);
    assert.equal(res1.body.message, "Invalid email or password");

    // Existing user but wrong password
    const hashedPassword = await bcrypt.hash("RealPassword123!", 10);
    Student.findOne = async () => ({
      _id: "s1",
      email: "user@example.com",
      password: hashedPassword
    });

    const res2 = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "WrongPassword999!" });
    assert.equal(res2.status, 401);
    assert.equal(res2.body.success, false);
    assert.equal(res2.body.message, "Invalid email or password");
  });

  // 14. Successful authenticated profile retrieval
  it("Feature 14: Should retrieve authenticated user profile via GET /api/auth/me", async () => {
    const userId = "auth_profile_user_01";
    const token = jwt.sign({ id: userId, role: "student" }, env.JWT_SECRET, { expiresIn: "1h" });

    // In the PostgreSQL model, findById returns a plain Promise (no .select() chain needed)
    Student.findById = async (id) => {
      if (id === userId) {
        return {
          _id: userId,
          name: "Profile Student",
          email: "profile@smartlearn.org",
          role: "student",
          createdAt: new Date("2026-01-01"),
          updatedAt: new Date("2026-01-02")
        };
      }
      return null;
    };

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.student.id, userId);
    assert.equal(res.body.student.email, "profile@smartlearn.org");
    assert.equal(res.body.student.password, undefined);
  });

  // 15. Handling of a deleted or nonexistent authenticated account
  it("Feature 15: Should return 404 when authenticated token belongs to deleted account", async () => {
    const deletedUserId = "deleted_account_id_99";
    const token = jwt.sign({ id: deletedUserId, role: "student" }, env.JWT_SECRET, { expiresIn: "1h" });

    Student.findById = async () => null; // Account does not exist in DB

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "User account not found");
  });
});
