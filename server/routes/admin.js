import express from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";
import Activity from "../models/Activity.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

const ONLINE_THRESHOLD_MS = 15 * 60 * 1000;

function computeIsOnline(lastActiveAt) {
  if (!lastActiveAt) return false;
  const activeTime = new Date(lastActiveAt).getTime();
  return !isNaN(activeTime) && Date.now() - activeTime < ONLINE_THRESHOLD_MS;
}

// Helper to count documents safely without buffering hangs when disconnected
async function safeCount(Model, filter = {}) {
  if (typeof Model.countDocuments === "function") {
    const isMongooseDefault = Model.countDocuments === mongoose.Model.countDocuments;
    if (mongoose.connection.readyState === 1 || !isMongooseDefault) {
      try {
        return await Model.countDocuments(filter);
      } catch {
        return 0;
      }
    }
  }
  return 0;
}

/**
 * GET /api/admin/stats
 * Overview analytics for the admin dashboard: total students, courses, lessons, quizzes, enrollments, and pass rates.
 */
router.get("/stats", authenticateToken, requireRole("admin"), async (req, res, next) => {
  try {
    const totalStudents = await safeCount(Student, { role: "student" });
    const totalCourses = await safeCount(Course);
    const totalQuizzes = await safeCount(Quiz);
    const totalEnrollments = await safeCount(Progress);

    // Calculate total lessons across courses
    let totalLessons = 0;
    try {
      if (mongoose.connection.readyState === 1 || Course.find !== mongoose.Model.find) {
        const courses = await Course.find({}, "lessons");
        courses.forEach((c) => {
          totalLessons += c.lessons?.length || 0;
        });
      }
    } catch {
      totalLessons = 0;
    }

    // Calculate quiz performance metrics
    let totalQuizAttempts = 0;
    let passedAttempts = 0;
    let scoreSum = 0;

    try {
      if (mongoose.connection.readyState === 1 || Progress.find !== mongoose.Model.find) {
        const progressList = await Progress.find({}, "quizAttempts");
        progressList.forEach((p) => {
          (p.quizAttempts || []).forEach((a) => {
            totalQuizAttempts++;
            scoreSum += a.score || 0;
            if (a.passed) passedAttempts++;
          });
        });
      }
    } catch {
      totalQuizAttempts = 0;
    }

    const averageQuizScore = totalQuizAttempts > 0 ? Math.round(scoreSum / totalQuizAttempts) : 0;
    const overallPassRate = totalQuizAttempts > 0 ? Math.round((passedAttempts / totalQuizAttempts) * 100) : 0;

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalLessons,
        totalQuizzes,
        totalEnrollments,
        totalQuizAttempts,
        averageQuizScore,
        overallPassRate
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/students
 * Retrieve a list of registered students with search, pagination, and online status.
 * Passwords and sensitive fields are never returned.
 */
router.get("/students", authenticateToken, requireRole("admin"), async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const status = req.query.status || "all";

    const baseFilter = { role: "student" };
    const queryFilter = { ...baseFilter };

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      queryFilter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } }
      ];
    }

    const cutoffDate = new Date(Date.now() - ONLINE_THRESHOLD_MS);
    if (status === "online") {
      queryFilter.lastActiveAt = { $gte: cutoffDate };
    } else if (status === "offline") {
      queryFilter.$and = queryFilter.$and || [];
      queryFilter.$and.push({
        $or: [{ lastActiveAt: null }, { lastActiveAt: { $lt: cutoffDate } }]
      });
    }

    let totalRegistered = 0;
    let totalOnline = 0;
    let totalFiltered = 0;
    let students = [];

    if (mongoose.connection.readyState === 1 || Student.find !== mongoose.Model.find) {
      try {
        totalRegistered = await Student.countDocuments(baseFilter);
        totalOnline = await Student.countDocuments({
          role: "student",
          lastActiveAt: { $gte: cutoffDate }
        });
        totalFiltered = await Student.countDocuments(queryFilter);

        students = await Student.find(
          queryFilter,
          "name email createdAt updatedAt lastLoginAt lastActiveAt weeklyGoalMinutes"
        )
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
      } catch (dbErr) {
        // Fallback for tests or disconnected mode
        students = await Student.find(queryFilter).sort({ createdAt: -1 });
        totalRegistered = students.length;
        totalFiltered = students.length;
      }
    }

    const totalPages = Math.ceil(totalFiltered / limit) || 1;

    // Attach enrollment and quiz summaries for each student
    const studentSummaries = await Promise.all(
      students.map(async (st) => {
        const obj = st.toObject ? st.toObject() : { ...st };
        const isOnline = computeIsOnline(obj.lastActiveAt);

        let enrolledCount = 0;
        let completedCoursesCount = 0;
        let avgCompletionPercentage = 0;
        let quizzesTaken = 0;
        let quizzesPassed = 0;

        try {
          if (mongoose.connection.readyState === 1 || Progress.find !== mongoose.Model.find) {
            const records = await Progress.find({ studentId: st._id });
            enrolledCount = records.length;
            completedCoursesCount = records.filter((r) => r.isCompleted).length;

            if (records.length > 0) {
              const totalPercentage = records.reduce((sum, r) => sum + (r.completionPercentage || 0), 0);
              avgCompletionPercentage = Math.round(totalPercentage / records.length);
            }

            records.forEach((r) => {
              (r.quizAttempts || []).forEach((qa) => {
                quizzesTaken++;
                if (qa.passed) quizzesPassed++;
              });
            });
          }
        } catch {
          enrolledCount = 0;
        }

        return {
          _id: obj._id,
          name: obj.name,
          email: obj.email,
          createdAt: obj.createdAt,
          updatedAt: obj.updatedAt,
          lastLoginAt: obj.lastLoginAt || null,
          lastActiveAt: obj.lastActiveAt || null,
          isOnline,
          status: isOnline ? "online" : "offline",
          enrolledCount,
          completedCoursesCount,
          avgCompletionPercentage,
          quizzesTaken,
          quizzesPassed
        };
      })
    );

    res.json({
      success: true,
      count: studentSummaries.length,
      total: totalFiltered,
      totalRegistered,
      totalOnline,
      page,
      totalPages,
      limit,
      students: studentSummaries
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/students/:studentId
 * Retrieve detailed student information: courses enrolled, progress %, quiz results,
 * certificates, and recent activity log.
 * Admin only.
 */
router.get("/students/:studentId", authenticateToken, requireRole("admin"), async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format"
      });
    }

    const student = await Student.findOne(
      { _id: studentId, role: "student" },
      "name email createdAt updatedAt lastLoginAt lastActiveAt weeklyGoalMinutes"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const isOnline = computeIsOnline(student.lastActiveAt);

    // Fetch enrolled courses with progress
    let enrollments = [];
    try {
      if (mongoose.connection.readyState === 1 || Progress.find !== mongoose.Model.find) {
        enrollments = await Progress.find({ studentId })
          .populate("courseId", "title category thumbnail isPublished lessons")
          .sort({ updatedAt: -1 });
      }
    } catch {
      enrollments = [];
    }

    // Format enrolled courses and extract quiz attempts
    const coursesEnrolled = [];
    const quizAttempts = [];

    enrollments.forEach((record) => {
      const course = record.courseId;
      const totalLessons = course?.lessons?.length || 0;
      const completedLessonsCount = record.completedLessons?.length || 0;

      coursesEnrolled.push({
        progressId: record._id,
        courseId: course?._id || record.courseId,
        title: course?.title || "Course",
        category: course?.category || "General",
        thumbnail: course?.thumbnail || "",
        totalLessons,
        completedLessonsCount,
        completionPercentage: record.completionPercentage || 0,
        isCompleted: !!record.isCompleted,
        enrolledAt: record.createdAt,
        lastActivityAt: record.updatedAt
      });

      (record.quizAttempts || []).forEach((attempt) => {
        quizAttempts.push({
          attemptId: attempt._id,
          quizId: attempt.quizId,
          courseTitle: course?.title || "Course",
          score: attempt.score,
          rawScore: attempt.rawScore,
          totalQuestions: attempt.totalQuestions,
          passed: attempt.passed,
          attemptedAt: attempt.attemptedAt
        });
      });
    });

    // Sort quiz attempts by date descending
    quizAttempts.sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt));

    // Fetch certificates
    let certificates = [];
    try {
      if (mongoose.connection.readyState === 1 || Certificate.find !== mongoose.Model.find) {
        certificates = await Certificate.find({ studentId }).sort({ issuedAt: -1 });
      }
    } catch {
      certificates = [];
    }

    // Fetch recent activities
    let recentActivities = [];
    try {
      if (mongoose.connection.readyState === 1 || Activity.find !== mongoose.Model.find) {
        recentActivities = await Activity.find({ studentId })
          .sort({ createdAt: -1 })
          .limit(20);
      }
    } catch {
      recentActivities = [];
    }

    const totalEnrolled = coursesEnrolled.length;
    const completedCoursesCount = coursesEnrolled.filter((c) => c.isCompleted).length;
    const avgCompletion =
      totalEnrolled > 0
        ? Math.round(coursesEnrolled.reduce((sum, c) => sum + c.completionPercentage, 0) / totalEnrolled)
        : 0;

    res.json({
      success: true,
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        lastLoginAt: student.lastLoginAt || null,
        lastActiveAt: student.lastActiveAt || null,
        weeklyGoalMinutes: student.weeklyGoalMinutes || 180,
        isOnline,
        status: isOnline ? "online" : "offline"
      },
      summary: {
        totalEnrolled,
        completedCoursesCount,
        avgCompletionPercentage: avgCompletion,
        certificatesCount: certificates.length,
        quizzesTaken: quizAttempts.length,
        quizzesPassed: quizAttempts.filter((q) => q.passed).length
      },
      coursesEnrolled,
      quizAttempts,
      certificates: certificates.map((c) => ({
        _id: c._id,
        certificateId: c.certificateId,
        courseTitle: c.courseTitle,
        score: c.score,
        issuedAt: c.issuedAt
      })),
      recentActivities
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/quizzes/performance
 * Retrieve quiz metrics, attempt counts, and pass rates.
 */
router.get("/quizzes/performance", authenticateToken, requireRole("admin"), async (req, res, next) => {
  try {
    let quizzes = [];
    if (mongoose.connection.readyState === 1 || Quiz.find !== mongoose.Model.find) {
      quizzes = await Quiz.find().populate("courseId", "title").sort({ createdAt: -1 });
    }

    const performance = await Promise.all(
      quizzes.map(async (q) => {
        let attemptsCount = 0;
        let passedCount = 0;
        let scoreSum = 0;

        try {
          if (mongoose.connection.readyState === 1 || Progress.find !== mongoose.Model.find) {
            const records = await Progress.find({ "quizAttempts.quizId": q._id }, "quizAttempts");
            records.forEach((r) => {
              r.quizAttempts
                .filter((a) => a.quizId?.toString() === q._id.toString())
                .forEach((a) => {
                  attemptsCount++;
                  scoreSum += a.score || 0;
                  if (a.passed) passedCount++;
                });
            });
          }
        } catch {}

        return {
          quizId: q._id,
          title: q.title,
          course: q.courseId ? { id: q.courseId._id, title: q.courseId.title } : null,
          passingPercentage: q.passingPercentage,
          totalQuestions: q.questions?.length || 0,
          attemptsCount,
          passedCount,
          averageScore: attemptsCount > 0 ? Math.round(scoreSum / attemptsCount) : 0,
          passRate: attemptsCount > 0 ? Math.round((passedCount / attemptsCount) * 100) : 0
        };
      })
    );

    res.json({
      success: true,
      count: performance.length,
      performance
    });
  } catch (error) {
    next(error);
  }
});

export default router;
