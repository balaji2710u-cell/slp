import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import { authenticateToken, requireRole, optionalAuthenticate } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createCourseSchema,
  updateCourseSchema,
  courseIdParamSchema,
  courseQuerySchema,
  createLessonSchema,
  updateLessonSchema,
  lessonIdParamSchema,
  reorderLessonsSchema
} from "../validators/courseValidators.js";
import { getMasterCurriculum } from "../curriculum/masterCurriculum.js";

const router = express.Router();

// Composite middleware for backward compatibility if imported elsewhere
export const verifyAdmin = [authenticateToken, requireRole("admin")];

/**
 * Helper to escape special regex characters from user search queries.
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Normalizes URL-safe category or learningGroup slugs to their canonical database values.
 * Maps '12th-standard', 'after-12th', etc. to 'After Standard 12 and Above'.
 */
export function normalizeCategoryOrGroup(input) {
  if (!input) return null;
  const raw = input.trim();
  const slug = raw.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

  // Check 12th standard / after 12th variations
  if (
    slug === "12th-standard" ||
    slug === "12th" ||
    slug === "after-12th" ||
    slug === "after-standard-12" ||
    slug === "after-standard-12-and-above" ||
    slug === "after-12th-standard" ||
    slug === "12th-standard-courses" ||
    slug === "12th-courses" ||
    slug === "standard-12" ||
    slug === "std-12" ||
    slug === "class-12"
  ) {
    return {
      type: "learningGroup",
      value: "After Standard 12 and Above",
      slug: "12th-standard",
      label: "12th Standard & Above"
    };
  }

  // Standards 6-8
  if (
    slug === "standards-6-8" ||
    slug === "standards-6-to-8" ||
    slug === "standard-6-8" ||
    slug === "6-8" ||
    slug === "middle-school"
  ) {
    return {
      type: "learningGroup",
      value: "Standards 6–8",
      slug: "standards-6-8",
      label: "Standards 6–8"
    };
  }

  // Standards 7-10
  if (
    slug === "standards-7-10" ||
    slug === "standards-7-to-10" ||
    slug === "standard-7-10" ||
    slug === "7-10" ||
    slug === "secondary-school"
  ) {
    return {
      type: "learningGroup",
      value: "Standards 7–10",
      slug: "standards-7-10",
      label: "Standards 7–10"
    };
  }

  // Subject categories
  const categoryMap = {
    "mathematics": "Mathematics",
    "math": "Mathematics",
    "maths": "Mathematics",
    "science": "Science",
    "english": "English & Languages",
    "english-languages": "English & Languages",
    "languages": "English & Languages",
    "computer-science": "Computer Science",
    "coding-technology": "Coding & Technology",
    "coding": "Coding & Technology",
    "software-engineering": "Software Engineering",
    "ai-data-science": "AI & Data Science",
    "ai": "AI & Data Science",
    "data-science": "AI & Data Science",
    "cloud-devops": "Cloud & DevOps",
    "cloud": "Cloud & DevOps",
    "devops": "Cloud & DevOps",
    "life-skills": "Life Skills",
    "aptitude-logic": "Aptitude & Logic",
    "aptitude": "Aptitude & Logic"
  };

  if (categoryMap[slug]) {
    return {
      type: "category",
      value: categoryMap[slug],
      slug,
      label: categoryMap[slug]
    };
  }

  return null;
}

/* ==========================================================================
   COURSE CATALOG & CRUD APIS
   ========================================================================== */

/**
 * POST /api/courses
 * Create a new course (Admin only).
 * Validated by Zod createCourseSchema.
 */
router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  validateRequest(createCourseSchema),
  async (req, res, next) => {
    try {
      const course = await Course.create(req.body);

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/courses
 * Retrieve courses with pagination, category filtering, and safe text search.
 * Public access: restricted strictly to published courses (isPublished: true).
 * Admin access: can view unpublished courses when authenticated and passing ?all=true.
 */
router.get(
  "/",
  optionalAuthenticate,
  validateRequest(courseQuerySchema),
  async (req, res, next) => {
    try {
      const { category, learningGroup, search, all } = req.query;
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
      const skip = (page - 1) * limit;

      const filter = {};

      // Only administrators can query unpublished courses
      const isAdmin = req.user && req.user.role === "admin";
      if (!isAdmin || all !== "true") {
        filter.isPublished = true;
      }

      const normCat = normalizeCategoryOrGroup(category);
      const normGrp = normalizeCategoryOrGroup(learningGroup);

      if (normGrp) {
        if (normGrp.type === "learningGroup") {
          filter.learningGroup = new RegExp(`^${escapeRegex(normGrp.value)}$`, "i");
        } else {
          filter.category = new RegExp(`^${escapeRegex(normGrp.value)}$`, "i");
        }
      } else if (learningGroup) {
        filter.learningGroup = new RegExp(`^${escapeRegex(learningGroup.trim())}$`, "i");
      }

      if (normCat) {
        if (normCat.type === "learningGroup" && !filter.learningGroup) {
          filter.learningGroup = new RegExp(`^${escapeRegex(normCat.value)}$`, "i");
        } else {
          filter.category = new RegExp(`^${escapeRegex(normCat.value)}$`, "i");
        }
      } else if (category) {
        filter.category = new RegExp(`^${escapeRegex(category.trim())}$`, "i");
      }

      if (search) {
        const escapedSearch = escapeRegex(search.trim());
        filter.$or = [
          { title: { $regex: escapedSearch, $options: "i" } },
          { description: { $regex: escapedSearch, $options: "i" } }
        ];
      }

      // Execute query with pagination support (gracefully handles test mocks and DB offline)
      let courses = [];
      let total = 0;

      try {
        let query = Course.find(filter).sort({ createdAt: -1 });
        if (typeof query.skip === "function") {
          query = query.skip(skip);
        }
        if (typeof query.limit === "function") {
          query = query.limit(limit);
        }

        courses = await query;

        total = courses.length;
        if (typeof Course.countDocuments === "function") {
          const isDefaultMongoose = Course.countDocuments === mongoose.Model.countDocuments;
          if (mongoose.connection.readyState === 1 || !isDefaultMongoose) {
            try {
              total = await Course.countDocuments(filter);
            } catch {
              total = courses.length;
            }
          }
        }
      } catch (dbErr) {
        // Fallback to rich built-in curriculum catalog if MongoDB is unreachable or in server selection error
        const { allCourses } = getMasterCurriculum();
        const filtered = allCourses.filter((c) => {
          if (normGrp) {
            if (normGrp.type === "learningGroup" && c.learningGroup.toLowerCase() !== normGrp.value.toLowerCase()) return false;
            if (normGrp.type === "category" && c.category.toLowerCase() !== normGrp.value.toLowerCase()) return false;
          } else if (learningGroup && c.learningGroup.toLowerCase() !== learningGroup.trim().toLowerCase()) return false;

          if (normCat) {
            if (normCat.type === "learningGroup" && !learningGroup && c.learningGroup.toLowerCase() !== normCat.value.toLowerCase()) return false;
            if (normCat.type === "category" && c.category.toLowerCase() !== normCat.value.toLowerCase()) return false;
          } else if (category && c.category.toLowerCase() !== category.trim().toLowerCase()) return false;

          if (search) {
            const s = search.toLowerCase().trim();
            const titleMatch = c.title?.toLowerCase().includes(s);
            const descMatch = c.description?.toLowerCase().includes(s);
            if (!titleMatch && !descMatch) return false;
          }
          return true;
        });
        total = filtered.length;
        courses = filtered.slice(skip, skip + limit);
      }

      const totalPages = Math.ceil(total / limit) || 1;

      res.json({
        success: true,
        count: courses.length,
        total,
        page,
        totalPages,
        courses
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/courses/:id
 * Retrieve a single course by its MongoDB ObjectId or slug.
 * Public users can only retrieve published courses.
 * Admins can retrieve published or unpublished courses.
 */
router.get(
  "/:id",
  optionalAuthenticate,
  validateRequest(courseIdParamSchema),
  async (req, res, next) => {
    try {
      let course = null;
      try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
          course = await Course.findById(req.params.id);
        }
        if (!course) {
          course = await Course.findOne({ slug: req.params.id });
        }
      } catch (dbErr) {
        // If DB query fails, search master curriculum
      }

      if (!course) {
        const { allCourses } = getMasterCurriculum();
        course = allCourses.find(
          (c) => c.slug === req.params.id || c.id === req.params.id || (c._id && c._id.toString() === req.params.id)
        );
      }

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      // Publication access check: permit admins and already-enrolled students
      const isAdmin = req.user && req.user.role === "admin";
      let isEnrolledStudent = false;
      if (req.user && !isAdmin) {
        try {
          const Progress = mongoose.models.Progress || mongoose.model("Progress");
          isEnrolledStudent = Boolean(await Progress.exists({ studentId: req.user.id, courseId: course._id }));
        } catch {}
      }

      if (!course.isPublished && !isAdmin && !isEnrolledStudent) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }


      res.json({
        success: true,
        course
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/courses/:id
 * Update an existing course by ID (Admin only).
 * Validated by updateCourseSchema.
 */
router.put(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  validateRequest(updateCourseSchema),
  async (req, res, next) => {
    try {
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { returnDocument: "after", runValidators: true }
      );

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      res.json({
        success: true,
        message: "Course updated successfully",
        course
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/courses/:id
 * Remove a course by ID (Admin only).
 */
router.delete(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  validateRequest(courseIdParamSchema),
  async (req, res, next) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      res.json({
        success: true,
        message: "Course deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);

/* ==========================================================================
   LESSON APIS & VIDEO PLAYBACK
   ========================================================================== */

/**
 * GET /api/courses/:courseId/lessons
 * Retrieve lessons for a specific course sorted by sequence order.
 * Public users / students can only access preview lessons of published courses.
 * Admins can inspect all lessons of published or unpublished courses.
 */
router.get(
  "/:courseId/lessons",
  optionalAuthenticate,
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid course ID format"
        });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const isAdmin = req.user && req.user.role === "admin";

      // Non-admins cannot discover unpublished course lessons
      if (!course.isPublished && !isAdmin) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      // Check if student is enrolled
      let isEnrolled = false;
      if (req.user && req.user.id) {
        try {
          const prog = await Progress.findOne({ studentId: req.user.id, courseId: course._id });
          if (prog) isEnrolled = true;
        } catch {
          // graceful fallback
        }
      }

      // Filter lessons: admins and enrolled students see all lessons; public sees only preview
      let lessons = course.lessons || [];
      if (!isAdmin && !isEnrolled) {
        lessons = lessons.filter((l) => l.isPreview === true);
      }

      // Sort lessons by non-negative sequence order
      lessons.sort((a, b) => (a.order || 0) - (b.order || 0));

      res.json({
        success: true,
        courseId: course._id,
        courseTitle: course.title,
        count: lessons.length,
        lessons
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/courses/:courseId/lessons
 * Append a new lesson to a course (Admin only).
 * Validated by createLessonSchema.
 */
router.post(
  "/:courseId/lessons",
  authenticateToken,
  requireRole("admin"),
  validateRequest(createLessonSchema),
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const existingLessons = course.lessons || [];
      const calculatedOrder =
        req.body.order !== undefined
          ? req.body.order
          : existingLessons.length > 0
          ? Math.max(...existingLessons.map((l) => l.order || 0)) + 1
          : 0;

      const newLessonData = {
        title: req.body.title,
        description: req.body.description || "",
        objective: req.body.objective || "",
        content: req.body.content || "",
        keyTakeaways: req.body.keyTakeaways || [],
        practiceActivity: req.body.practiceActivity || {},
        videoUrl: req.body.videoUrl || "",
        videoType: req.body.videoType || (req.body.videoUrl ? (req.body.videoUrl.includes("youtube") || req.body.videoUrl.includes("youtu.be") ? "youtube" : "mp4") : "none"),
        duration: req.body.duration !== undefined ? req.body.duration : 0,
        order: calculatedOrder,
        isPreview: req.body.isPreview !== undefined ? req.body.isPreview : false
      };

      course.lessons.push(newLessonData);
      await course.save();

      const createdLesson = course.lessons[course.lessons.length - 1];

      res.status(201).json({
        success: true,
        message: "Lesson created successfully",
        lesson: createdLesson
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PATCH /api/courses/:courseId/lessons/reorder
 * Reorder lessons of a course in a single atomic update (Admin only).
 * Validated by reorderLessonsSchema.
 */
router.patch(
  "/:courseId/lessons/reorder",
  authenticateToken,
  requireRole("admin"),
  validateRequest(reorderLessonsSchema),
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { lessonIds } = req.body;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      // Check for duplicate IDs in payload
      const uniqueIds = new Set(lessonIds);
      if (uniqueIds.size !== lessonIds.length) {
        return res.status(400).json({
          success: false,
          message: "Duplicate lesson IDs provided in reorder list"
        });
      }

      const courseLessonMap = new Map();
      course.lessons.forEach((l) => courseLessonMap.set(l._id.toString(), l));

      // Verify all supplied IDs belong to this course
      const hasForeignId = lessonIds.some((id) => !courseLessonMap.has(id));
      if (hasForeignId) {
        return res.status(400).json({
          success: false,
          message: "Reorder list contains IDs that do not belong to this course"
        });
      }

      // Verify all existing lessons are accounted for
      if (lessonIds.length !== course.lessons.length) {
        return res.status(400).json({
          success: false,
          message: "Reorder list must contain all lesson IDs belonging to this course"
        });
      }

      // Apply new ordering sequence based on array index
      lessonIds.forEach((id, index) => {
        const lesson = courseLessonMap.get(id);
        lesson.order = index;
      });

      await course.save();

      // Return sorted lessons
      const sortedLessons = [...course.lessons].sort((a, b) => (a.order || 0) - (b.order || 0));

      res.json({
        success: true,
        message: "Lessons reordered successfully",
        lessons: sortedLessons
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/courses/:courseId/lessons/:lessonId
 * Retrieve a single lesson including metadata for video playback.
 * Public users / students can only access preview lessons of published courses.
 * Admins can access any lesson of any course.
 */
router.get(
  "/:courseId/lessons/:lessonId",
  optionalAuthenticate,
  validateRequest(lessonIdParamSchema),
  async (req, res, next) => {
    try {
      const { courseId, lessonId } = req.params;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const isAdmin = req.user && req.user.role === "admin";

      // Non-admins cannot access unpublished courses
      if (!course.isPublished && !isAdmin) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const lesson = course.lessons ? course.lessons.id(lessonId) : null;
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found"
        });
      }

      // Check if student is enrolled in this course
      let isEnrolled = false;
      if (req.user && req.user.id) {
        try {
          const prog = await Progress.findOne({ studentId: req.user.id, courseId: course._id });
          if (prog) isEnrolled = true;
        } catch {
          // graceful fallback
        }
      }

      // Non-admins and non-enrolled students cannot access non-preview lessons
      if (!lesson.isPreview && !isAdmin && !isEnrolled) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found"
        });
      }

      res.json({
        success: true,
        courseId: course._id,
        lesson: {
          id: lesson._id,
          _id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          objective: lesson.objective || "",
          content: lesson.content || "",
          keyTakeaways: lesson.keyTakeaways || [],
          practiceActivity: lesson.practiceActivity || {},
          videoUrl: lesson.videoUrl || "",
          videoType: lesson.videoType || "none",
          duration: lesson.duration,
          order: lesson.order,
          isPreview: lesson.isPreview,
          createdAt: lesson.createdAt,
          updatedAt: lesson.updatedAt
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/courses/:courseId/lessons/:lessonId
 * Update an existing lesson (Admin only).
 * Validated by updateLessonSchema. Prevents mass assignment.
 */
router.put(
  "/:courseId/lessons/:lessonId",
  authenticateToken,
  requireRole("admin"),
  validateRequest(updateLessonSchema),
  async (req, res, next) => {
    try {
      const { courseId, lessonId } = req.params;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const lesson = course.lessons ? course.lessons.id(lessonId) : null;
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found"
        });
      }

      // Explicit field assignment prevents mass assignment
      if (req.body.title !== undefined) lesson.title = req.body.title;
      if (req.body.description !== undefined) lesson.description = req.body.description;
      if (req.body.objective !== undefined) lesson.objective = req.body.objective;
      if (req.body.content !== undefined) lesson.content = req.body.content;
      if (req.body.keyTakeaways !== undefined) lesson.keyTakeaways = req.body.keyTakeaways;
      if (req.body.practiceActivity !== undefined) lesson.practiceActivity = req.body.practiceActivity;
      if (req.body.videoUrl !== undefined) lesson.videoUrl = req.body.videoUrl;
      if (req.body.videoType !== undefined) lesson.videoType = req.body.videoType;
      if (req.body.duration !== undefined) lesson.duration = req.body.duration;
      if (req.body.order !== undefined) lesson.order = req.body.order;
      if (req.body.isPreview !== undefined) lesson.isPreview = req.body.isPreview;

      await course.save();

      res.json({
        success: true,
        message: "Lesson updated successfully",
        lesson
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/courses/:courseId/lessons/:lessonId
 * Remove a specific lesson from a course (Admin only).
 */
router.delete(
  "/:courseId/lessons/:lessonId",
  authenticateToken,
  requireRole("admin"),
  validateRequest(lessonIdParamSchema),
  async (req, res, next) => {
    try {
      const { courseId, lessonId } = req.params;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      const lesson = course.lessons ? course.lessons.id(lessonId) : null;
      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found"
        });
      }

      course.lessons.pull({ _id: lessonId });
      await course.save();

      res.json({
        success: true,
        message: "Lesson deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
);
/**
 * POST /api/courses/validate-video
 * Validate video resource accessibility, format, and embeddability.
 * Distinguishes direct MP4s, YouTube URLs, and generic embed pages.
 */
router.post("/validate-video", async (req, res) => {
  const rawUrl = req.body?.url || req.body?.videoUrl;
  if (!rawUrl || typeof rawUrl !== "string") {
    return res.status(400).json({
      success: false,
      valid: false,
      message: "A valid URL string is required (url or videoUrl)"
    });
  }
  const trimmed = rawUrl.trim();

  // 1. YouTube detection & conversion
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const videoId = ytMatch[1];
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return res.json({
      success: true,
      valid: true,
      type: "youtube",
      originalUrl: trimmed,
      embedUrl,
      message: "Valid YouTube video. Configured for responsive embed playback."
    });
  }

  // 2. Generic embed or iframe URL check
  if (trimmed.includes("/embed/")) {
    return res.json({
      success: true,
      valid: true,
      type: "embed",
      originalUrl: trimmed,
      embedUrl: trimmed,
      message: "Valid embeddable resource URL."
    });
  }

  // 3. Direct video check (MP4 / WebM / OGG)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(trimmed, {
      method: "GET",
      headers: { Range: "bytes=0-1024" },
      signal: controller.signal
    });
    clearTimeout(timeout);

    const contentType = response.headers.get("content-type") || "";
    const isVideo = contentType.startsWith("video/") || trimmed.endsWith(".mp4") || trimmed.endsWith(".webm");

    if ((response.status === 200 || response.status === 206) && isVideo) {
      return res.json({
        success: true,
        valid: true,
        type: "mp4",
        originalUrl: trimmed,
        contentType,
        message: "Direct video stream verified and playable."
      });
    }

    if (response.status === 403 || response.status === 401) {
      return res.json({
        success: true,
        valid: false,
        type: "unreachable",
        status: response.status,
        message: "Video resource access denied (HTTP 403/401). Host requires authentication or restricted origin."
      });
    }

    return res.json({
      success: true,
      valid: false,
      type: "unsupported",
      status: response.status,
      message: `Resource returned HTTP ${response.status} with content-type: ${contentType}. May not play reliably.`
    });
  } catch (netErr) {
    return res.json({
      success: true,
      valid: false,
      type: "error",
      message: `Failed to connect to video server: ${netErr.message}`
    });
  }
});

export default router;
