import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import app from "../app.js";
import Student from "../models/Student.js";
import emailService from "../services/emailService.js";

describe("Forgot Password & Secure Reset System (Task 4 Tests)", () => {
  let originalFindOne;
  let originalSendMail;

  beforeEach(() => {
    originalFindOne = Student.findOne;
    originalSendMail = emailService.sendPasswordResetEmail;
  });

  afterEach(() => {
    Student.findOne = originalFindOne;
    emailService.sendPasswordResetEmail = originalSendMail;
  });

  it("1. Should return generic success for existing email and save SHA-256 hashed token", async () => {
    let savedFields = {};
    const mockStudent = {
      _id: "student_reset_123",
      name: "Suresh Kumar",
      email: "suresh@example.com",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      save: async function () {
        savedFields.resetPasswordToken = this.resetPasswordToken;
        savedFields.resetPasswordExpires = this.resetPasswordExpires;
        return this;
      }
    };

    Student.findOne = async (query) => {
      if (query.email === "suresh@example.com") return mockStudent;
      return null;
    };

    let emailSent = false;
    let emailSentTo = "";
    emailService.sendPasswordResetEmail = async (opts) => {
      emailSent = true;
      emailSentTo = opts.to;
      return { delivered: true };
    };

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "suresh@example.com" });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "If an account exists with that email, a password reset link has been sent.");
    assert.equal(emailSent, true);
    assert.equal(emailSentTo, "suresh@example.com");

    // Token must be stored as SHA-256 hash (64 hex characters)
    assert.ok(savedFields.resetPasswordToken);
    assert.equal(savedFields.resetPasswordToken.length, 64);
    assert.ok(savedFields.resetPasswordExpires instanceof Date);
    assert.ok(savedFields.resetPasswordExpires.getTime() > Date.now());
  });

  it("2. Should return identical generic success for non-existent email without enumeration", async () => {
    Student.findOne = async () => null;

    let emailSent = false;
    emailService.sendPasswordResetEmail = async () => {
      emailSent = true;
      return { delivered: true };
    };

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "unknown_student@example.com" });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "If an account exists with that email, a password reset link has been sent.");
    assert.equal(emailSent, false); // No email sent to unknown addresses
  });

  it("3. Should reject invalid email format with HTTP 400", async () => {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "not-an-email" });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("4. Should reject password reset when token is invalid or does not exist", async () => {
    Student.findOne = () => ({
      select: async () => null
    });

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({
        token: "completely_invalid_token_1234567890",
        password: "NewStrongPassword123!"
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /invalid, expired, or has already been used/i);
  });

  it("5. Should reject password reset if new password is too short (< 8 chars)", async () => {
    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({
        token: "a".repeat(64),
        password: "short"
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("6. Should successfully reset password with bcrypt 12-round hash and invalidate token", async () => {
    const rawToken = "my_secure_reset_token_64_characters_long_for_testing_purposes_123";
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    let savedStudent = null;
    const mockStudent = {
      _id: "student_reset_456",
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "old_hashed_password",
      resetPasswordToken: tokenHash,
      resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
      save: async function () {
        savedStudent = this;
        return this;
      }
    };

    Student.findOne = (query) => ({
      select: async () => {
        if (query.resetPasswordToken === tokenHash && query.resetPasswordExpires?.$gt) {
          return mockStudent;
        }
        return null;
      }
    });

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({
        token: rawToken,
        password: "BrandNewPassword2026!"
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.match(res.body.message, /reset successfully/i);

    // Verify token was cleared (single-use enforcement)
    assert.equal(savedStudent.resetPasswordToken, null);
    assert.equal(savedStudent.resetPasswordExpires, null);

    // Verify password was hashed with bcrypt
    assert.notEqual(savedStudent.password, "BrandNewPassword2026!");
    const isMatch = await bcrypt.compare("BrandNewPassword2026!", savedStudent.password);
    assert.equal(isMatch, true);
  });

  it("7. Should reject reusing the same token after it has already been used", async () => {
    const rawToken = "already_used_token_64_characters_long_for_testing_purposes_999";
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    // Token already cleared in DB
    Student.findOne = (query) => ({
      select: async () => {
        // Query looks for tokenHash, but user in DB has resetPasswordToken: null
        return null;
      }
    });

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({
        token: rawToken,
        password: "AnotherNewPassword123!"
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /invalid, expired, or has already been used/i);
  });

  it("8. Should reject expired token", async () => {
    const rawToken = "expired_token_64_characters_long_for_testing_purposes_expired_1";

    // Expired query ({ $gt: now }) matches nothing
    Student.findOne = () => ({
      select: async () => null
    });

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({
        token: rawToken,
        password: "BrandNewPassword2026!"
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /invalid, expired, or has already been used/i);
  });
});
