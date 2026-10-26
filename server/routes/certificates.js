import express from "express";
import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
import { authenticateToken } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  issueCertificateSchema,
  verifyCertificateParamSchema,
  courseCertificateParamSchema
} from "../validators/certificateValidators.js";
import { getMasterCurriculum } from "../curriculum/masterCurriculum.js";

const router = express.Router();

/**
 * POST /api/certificates/issue
 * Issues and permanently persists a graduation certificate for the authenticated student.
 * Validates course enrollment and completion/assessment pass on the backend.
 * Prevents duplicate certificate issuance for the same student and course.
 */
router.post(
  "/issue",
  authenticateToken,
  validateRequest(issueCertificateSchema),
  async (req, res, next) => {
    try {
      const studentId = req.user.id;
      const { courseId, score } = req.body;

      // 1. Verify student exists
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student account not found"
        });
      }

      // 2. Resolve course from DB or curriculum blueprints
      let course = null;
      if (mongoose.Types.ObjectId.isValid(courseId)) {
        course = await Course.findById(courseId);
      }
      if (!course) {
        course = await Course.findOne({ slug: courseId });
      }
      if (!course) {
        const { allCourses } = getMasterCurriculum();
        const fallback = allCourses.find(
          (c) =>
            c.slug === courseId ||
            c.id === courseId ||
            (c._id && c._id.toString() === courseId)
        );
        if (fallback) {
          course = fallback;
        }
      }

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const targetCourseId = course._id || course.id;

      // 3. Verify student eligibility: check Progress record
      let progress = null;
      if (mongoose.Types.ObjectId.isValid(targetCourseId)) {
        progress = await Progress.findOne({
          studentId,
          courseId: targetCourseId
        });
      }

      if (!progress) {
        return res.status(403).json({
          success: false,
          message: "Student is not enrolled in this course. You must enroll and complete the curriculum before earning a certificate."
        });
      }

      const passingScore = course.assessment?.passingPercentage || 70;
      const numericScore = typeof score === "number" ? score : 100;
      const totalLessons = course.lessons?.length || 1;
      const completedCount = progress.completedLessons?.length || 0;

      // Backend verification: student must have completed lessons or passed assessment
      const isEligible =
        progress.isCompleted ||
        completedCount >= totalLessons ||
        (completedCount > 0 && numericScore >= passingScore);

      if (!isEligible) {
        return res.status(400).json({
          success: false,
          message: `Ineligible for certificate: You must complete the course lessons and achieve at least ${passingScore}% on the assessment.`
        });
      }

      // 4. Duplicate prevention: check if certificate already exists
      const existingCert = await Certificate.findOne({
        studentId,
        courseId: targetCourseId
      });

      if (existingCert) {
        return res.status(200).json({
          success: true,
          message: "Certificate already issued for this course",
          certificate: existingCert,
          alreadyIssued: true
        });
      }

      // 5. Generate canonical unique certificate ID: SL-CERT-XXXXXX-YYYY
      const courseHex = targetCourseId.toString().replace(/[^a-fA-F0-9]/g, "").slice(-6).toUpperCase() || "COURSE";
      const studentHex = studentId.toString().replace(/[^a-fA-F0-9]/g, "").slice(-4).toUpperCase() || "STUD";
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      let certificateId = `SL-CERT-${courseHex}-${studentHex}`;

      // Ensure certificateId is globally unique
      const collision = await Certificate.findOne({ certificateId });
      if (collision) {
        certificateId = `SL-CERT-${courseHex}-${studentHex}-${randomSuffix}`;
      }

      // 6. Create and persist certificate in MongoDB
      const certificate = await Certificate.create({
        certificateId,
        studentId,
        courseId: targetCourseId,
        studentName: student.name,
        courseTitle: course.title,
        learningGroup: course.learningGroup || "Core Curriculum",
        score: numericScore,
        issuedAt: new Date()
      });

      // 7. Mark progress as completed
      if (!progress.isCompleted) {
        progress.isCompleted = true;
        progress.completionPercentage = 100;
        await progress.save().catch(() => {});
      }

      res.status(201).json({
        success: true,
        message: "Certificate issued and saved successfully",
        certificate
      });
    } catch (error) {
      // If concurrent insert triggered compound index unique constraint
      if (error.code === 11000) {
        const existing = await Certificate.findOne({
          studentId: req.user.id,
          courseId: req.body.courseId
        });
        if (existing) {
          return res.status(200).json({
            success: true,
            message: "Certificate already issued for this course",
            certificate: existing,
            alreadyIssued: true
          });
        }
      }
      next(error);
    }
  }
);

/**
 * GET /api/certificates/my
 * Returns all earned certificates for the currently authenticated student.
 * Enforces that students can only retrieve their own certificates.
 */
router.get("/my", authenticateToken, async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ studentId: req.user.id })
      .populate("courseId", "title category thumbnail instructor learningGroup")
      .sort({ issuedAt: -1 });

    res.json({
      success: true,
      count: certificates.length,
      certificates
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/certificates/course/:courseId
 * Retrieve the authenticated student's certificate for a specific course if earned.
 */
router.get(
  "/course/:courseId",
  authenticateToken,
  validateRequest(courseCertificateParamSchema),
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      let targetCourseId = courseId;

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        const course = await Course.findOne({ slug: courseId });
        if (course) {
          targetCourseId = course._id;
        }
      }

      const certificate = await Certificate.findOne({
        studentId: req.user.id,
        courseId: targetCourseId
      });

      res.json({
        success: true,
        earned: Boolean(certificate),
        certificate: certificate || null
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/certificates/verify/:certificateId
 * Public endpoint to verify certificate authenticity.
 */
router.get(
  "/verify/:certificateId",
  validateRequest(verifyCertificateParamSchema),
  async (req, res, next) => {
    try {
      const { certificateId } = req.params;

      const certificate = await Certificate.findOne({
        certificateId: certificateId.trim().toUpperCase()
      }).populate("courseId", "title category instructor learningGroup");

      if (!certificate) {
        return res.status(404).json({
          success: false,
          valid: false,
          message: "Certificate not found or invalid credential ID"
        });
      }

      res.json({
        success: true,
        valid: true,
        certificate
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
