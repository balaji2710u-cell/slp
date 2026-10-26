import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { env } from "../config/env.js";
import { authenticateToken } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from "../validators/authValidators.js";
import emailService from "../services/emailService.js";


const router = express.Router();

/**
 * POST /api/auth/register
 * Public student registration with strict schema validation,
 * rate limiting, bcrypt password hashing, and role protection.
 */
router.post(
  "/register",
  authRateLimiter,
  validateRequest(registerSchema),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      const existingStudent = await Student.findOne({ email: normalizedEmail });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: "Email already registered"
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // Explicitly enforce role 'student' for all public registrations
      const student = await Student.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "student"
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          role: student.role
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/login
 * Authenticates user credentials with rate limiting and generic error messages.
 * Issues a signed JWT token upon success.
 */
router.post(
  "/login",
  authRateLimiter,
  validateRequest(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      const student = await Student.findOne({ email: normalizedEmail });

      // Generic error response prevents account enumeration
      if (!student || !(await bcrypt.compare(password, student.password))) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const now = new Date();
      student.lastLoginAt = now;
      student.lastActiveAt = now;
      if (typeof student.save === "function") {
        await student.save();
      }

      const token = jwt.sign(
        {
          id: student._id,
          role: student.role
        },
        env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          role: student.role,
          lastLoginAt: student.lastLoginAt || now,
          lastActiveAt: student.lastActiveAt || now,
          weeklyGoalMinutes: student.weeklyGoalMinutes || 180
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/forgot-password
 * Initiates the password reset workflow by generating a cryptographically secure token,
 * hashing it with SHA-256 for MongoDB storage, and delivering the reset link via email.
 * Always returns a generic success message to prevent user enumeration.
 */
router.post(
  "/forgot-password",
  authRateLimiter,
  validateRequest(forgotPasswordSchema),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      const student = await Student.findOne({ email: normalizedEmail });

      // Always return the exact same generic message regardless of whether user exists
      const genericResponse = {
        success: true,
        message: "If an account exists with that email, a password reset link has been sent."
      };

      if (!student) {
        return res.json(genericResponse);
      }

      // Generate cryptographically secure random token (32 bytes = 64 hex chars)
      const rawToken = crypto.randomBytes(32).toString("hex");

      // Store only the SHA-256 hash in MongoDB
      const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
      const expireMinutes = parseInt(env.RESET_PASSWORD_EXPIRE_MINUTES, 10) || 15;
      const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);

      student.resetPasswordToken = tokenHash;
      student.resetPasswordExpires = expiresAt;
      await student.save();

      // Formulate reset URL pointing to configured frontend
      const baseUrl = (env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "");
      const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;

      // Dispatch email via configured transporter (fails safely)
      await emailService.sendPasswordResetEmail({
        to: student.email,
        resetUrl,
        name: student.name
      });


      return res.json(genericResponse);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/reset-password
 * Completes the password reset workflow.
 * Verifies single-use cryptographically hashed token, checks expiration,
 * hashes new password with bcrypt (12 rounds), clears the reset token, and saves the user.
 */
router.post(
  "/reset-password",
  authRateLimiter,
  validateRequest(resetPasswordSchema),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rawToken = token.trim();

      // Hash incoming raw token to find corresponding MongoDB record
      const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

      // Find user with matching token and valid expiration
      // Explicitly select resetPasswordToken and resetPasswordExpires since they have select: false
      const query = {
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: new Date() }
      };

      const studentResult = Student.findOne(query);
      const student = typeof studentResult?.select === "function"
        ? await studentResult.select("+resetPasswordToken +resetPasswordExpires")
        : await studentResult;

      if (!student) {
        return res.status(400).json({
          success: false,
          message: "Password reset token is invalid, expired, or has already been used."
        });
      }

      // Hash the new password using bcrypt with standard cost factor 12
      const hashedPassword = await bcrypt.hash(password, 12);

      // Single-use token enforcement: immediately invalidate token and expiry
      student.password = hashedPassword;
      student.resetPasswordToken = null;
      student.resetPasswordExpires = null;
      await student.save();

      res.json({
        success: true,
        message: "Password has been reset successfully. You can now log in with your new password."
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/auth/me
 * Retrieves current authenticated user profile from the database.
 * Requires a valid JWT Bearer token and never returns password hash.
 */
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "User account not found"
      });
    }

    const now = new Date();
    if (typeof Student.findByIdAndUpdate === "function") {
      try {
        await Student.findByIdAndUpdate(student._id, { $set: { lastActiveAt: now } });
      } catch {}
    }

    res.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        lastLoginAt: student.lastLoginAt,
        lastActiveAt: now,
        weeklyGoalMinutes: student.weeklyGoalMinutes || 180,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/heartbeat
 * Lightweight presence ping that updates student's lastActiveAt timestamp.
 */
router.post("/heartbeat", authenticateToken, async (req, res, next) => {
  try {
    const now = new Date();
    if (typeof Student.findByIdAndUpdate === "function") {
      await Student.findByIdAndUpdate(req.user.id, { $set: { lastActiveAt: now } });
    }
    res.json({ success: true, lastActiveAt: now });
  } catch (error) {
    next(error);
  }
});

export default router;