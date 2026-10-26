import express from "express";
import mongoose from "mongoose";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  enrollCourseSchema,
  completeLessonSchema,
  progressCourseParamSchema,
  progressStudentParamSchema,
  updateGoalSchema
} from "../validators/progressValidators.js";
import {
  recordLearningActivity,
  getStudentActivitySummary
} from "../services/activityService.js";

const router = express.Router();

/**
 * GET /api/progress/summary
 * Retrieve dynamic learning statistics: streak calculation, weekly goal progress,
 * daily minutes breakdown, and authentic activity records.
 */
router.get("/summary", authenticateToken, async (req, res, next) => {
  try {
    const summary = await getStudentActivitySummary(req.user.id);
    res.json({
      success: true,
      summary
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/progress/goal
 * Update configurable weekly study goal (minutes) for the authenticated student.
 */
router.put(
  "/goal",
  authenticateToken,
  validateRequest(updateGoalSchema),
  async (req, res, next) => {
    try {
      const { weeklyGoalMinutes } = req.body;
      const student = await Student.findByIdAndUpdate(
        req.user.id,
        { $set: { weeklyGoalMinutes } },
        { new: true }
      ).select("-password -passwordResetToken -passwordResetExpires");

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      res.json({
        success: true,
        message: "Weekly study goal updated successfully",
        weeklyGoalMinutes: student.weeklyGoalMinutes
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/progress
 * Retrieve all course progress records for the currently authenticated student.
 */
router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const progressList = await Progress.find({ studentId: req.user.id })
      .populate("courseId", "title category thumbnail instructor isPublished lessons")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: progressList.length,
      enrollments: progressList
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/progress/:courseId
 * Retrieve detailed course progress for a specific course.
 */
router.get(
  "/:courseId",
  authenticateToken,
  validateRequest(progressCourseParamSchema),
  async (req, res, next) => {
    try {
      const progress = await Progress.findOne({
        studentId: req.user.id,
        courseId: req.params.courseId
      });

      if (!progress) {
        return res.json({
          success: true,
          enrolled: false,
          progress: null
        });
      }

      res.json({
        success: true,
        enrolled: true,
        progress
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/progress/enroll
 * Enroll the authenticated student in a course.
 */
router.post(
  "/enroll",
  authenticateToken,
  validateRequest(enrollCourseSchema),
  async (req, res, next) => {
    try {
      const { courseId } = req.body;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      let existing = await Progress.findOne({
        studentId: req.user.id,
        courseId
      });

      if (existing) {
        return res.status(200).json({
          success: true,
          message: "Already enrolled in this course",
          progress: existing
        });
      }

      const firstLessonId = course.lessons?.[0]?._id || null;

      const newProgress = await Progress.create({
        studentId: req.user.id,
        courseId,
        completedLessons: [],
        lastLessonId: firstLessonId,
        quizAttempts: [],
        completionPercentage: 0,
        isCompleted: false
      });

      // Record authentic enrollment activity
      try {
        await recordLearningActivity({
          studentId: req.user.id,
          activityType: "course_enrollment",
          courseId,
          durationMinutes: 5,
          metadata: {
            courseTitle: course.title
          }
        });
      } catch (actErr) {
        console.warn("Notice: Activity recording deferred:", actErr.message);
      }

      res.status(201).json({
        success: true,
        message: "Enrolled in course successfully",
        progress: newProgress
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/progress/:courseId/complete-lesson
 * Mark a lesson as completed for the authenticated student.
 * Enforces lesson progression: prerequisite lessons must be completed to unlock next level.
 */
router.post(
  "/:courseId/complete-lesson",
  authenticateToken,
  validateRequest(completeLessonSchema),
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { lessonId } = req.body;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const lessons = course.lessons || [];
      const lessonIndex = lessons.findIndex((l) => l._id?.toString() === lessonId.toString());

      if (lessonIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found in this course"
        });
      }

      // Check student enrollment
      let progress = await Progress.findOne({
        studentId: req.user.id,
        courseId
      });

      if (!progress) {
        return res.status(403).json({
          success: false,
          message: "You must enroll in this course before tracking progress"
        });
      }

      const completedIds = progress.completedLessons.map((id) => id?.toString());

      // Progression Rule: If not the first lesson, check if previous lesson is completed
      if (lessonIndex > 0) {
        const previousLessonId = lessons[lessonIndex - 1]._id?.toString();
        if (!completedIds.includes(previousLessonId)) {
          return res.status(403).json({
            success: false,
            message: "Cannot complete this lesson. Previous lesson must be completed first to unlock."
          });
        }
      }

      // Add lesson to completedLessons if not already present
      if (!completedIds.includes(lessonId.toString())) {
        progress.completedLessons.push(lessonId);
      }

      // Determine next lesson to unlock
      const nextLesson = lessons[lessonIndex + 1];
      if (nextLesson) {
        progress.lastLessonId = nextLesson._id;
      }

      // Recalculate completion percentage
      const totalLessons = lessons.length || 1;
      progress.completionPercentage = Math.min(
        100,
        Math.round((progress.completedLessons.length / totalLessons) * 100)
      );
      progress.isCompleted = progress.completedLessons.length >= totalLessons;

      await progress.save();

      // Record authentic lesson completion activity
      const completedLesson = lessons[lessonIndex];
      const durationVal = typeof completedLesson?.duration === "number" ? completedLesson.duration : 15;
      try {
        await recordLearningActivity({
          studentId: req.user.id,
          activityType: "lesson_completion",
          courseId: course._id,
          lessonId: completedLesson?._id || lessonId,
          durationMinutes: durationVal,
          metadata: {
            courseTitle: course.title,
            lessonTitle: completedLesson?.title || "Lesson"
          }
        });
      } catch (actErr) {
        console.warn("Notice: Activity recording deferred:", actErr.message);
      }

      res.json({
        success: true,
        message: "Lesson completed successfully",
        progress,
        unlockedNextLesson: nextLesson ? nextLesson._id : null
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/progress/student/:studentId
 * Retrieve complete learning progress for a student. Admin only.
 */
router.get(
  "/student/:studentId",
  authenticateToken,
  requireRole("admin"),
  validateRequest(progressStudentParamSchema),
  async (req, res, next) => {
    try {
      const records = await Progress.find({ studentId: req.params.studentId })
        .populate("courseId", "title category lessons")
        .sort({ updatedAt: -1 });

      res.json({
        success: true,
        count: records.length,
        progress: records
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
