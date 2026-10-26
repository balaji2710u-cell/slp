import { z } from "zod";
import { parseDurationToSeconds } from "../models/Course.js";

/**
 * Validates that an optional string is a secure external HTTP or HTTPS URL.
 * Rejects unsafe schemes like javascript:, data:, ftp:, etc.
 */
export const safeVideoUrlValidator = z
  .string()
  .trim()
  .refine(
    (url) => {
      if (!url || url === "") return true; // Optional field
      try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch (err) {
        return false;
      }
    },
    { message: "videoUrl must be a valid HTTP or HTTPS URL" }
  )
  .optional()
  .default("");

/**
 * Validates and converts duration into a non-negative integer of seconds.
 * Accepts numbers, numeric strings, and legacy formats ("15m", "1h 30m").
 */
export const durationValidator = z.preprocess(
  (val) => parseDurationToSeconds(val),
  z.number().int().min(0, "Duration must be a non-negative number of seconds")
);

const lessonInputSchema = z.object({
  title: z
    .string({ required_error: "Lesson title is required" })
    .trim()
    .min(1, "Lesson title cannot be empty")
    .max(200, "Lesson title cannot exceed 200 characters"),
  description: z.string().trim().max(10000, "Description cannot exceed 10000 characters").optional().default(""),
  objective: z.string().trim().max(2000).optional().default(""),
  content: z.string().trim().optional().default(""),
  keyTakeaways: z.array(z.string()).optional().default([]),
  practiceActivity: z.any().optional().default(() => ({})),
  videoUrl: safeVideoUrlValidator,
  videoType: z.string().trim().optional().default("none"),
  duration: durationValidator.optional().default(0),
  order: z.coerce.number().int().min(0, "Order must be a non-negative integer").optional(),
  isPreview: z.boolean().optional().default(false)
});

/**
 * Validation schema for course creation.
 */
export const createCourseSchema = {
  body: z.object({
    title: z
      .string({ required_error: "Course title is required" })
      .trim()
      .min(3, "Course title must be at least 3 characters")
      .max(200, "Course title cannot exceed 200 characters"),
    description: z
      .string({ required_error: "Course description is required" })
      .trim()
      .min(10, "Course description must be at least 10 characters")
      .max(10000, "Course description cannot exceed 10000 characters"),
    category: z
      .string({ required_error: "Course category is required" })
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(100, "Category cannot exceed 100 characters"),
    learningGroup: z
      .enum(["Standards 6–8", "Standards 7–10", "After Standard 12 and Above"])
      .optional()
      .default("Standards 6–8"),
    level: z.string().trim().optional().default("Beginner"),
    slug: z.string().trim().optional(),
    learningObjectives: z.array(z.string()).optional().default([]),
    prerequisites: z.array(z.string()).optional().default([]),
    estimatedDuration: z.string().trim().optional().default("10 hours"),
    instructor: z.string().trim().max(100, "Instructor name cannot exceed 100 characters").optional(),
    thumbnail: z.string().trim().optional(),
    lessons: z.array(lessonInputSchema).optional().default([]),
    isPublished: z.boolean().optional().default(true)
  })
};

/**
 * Validation schema for course updates.
 */
export const updateCourseSchema = {
  params: z.object({
    id: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format")
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Course title must be at least 3 characters")
      .max(200, "Course title cannot exceed 200 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .min(10, "Course description must be at least 10 characters")
      .max(10000, "Course description cannot exceed 10000 characters")
      .optional(),
    category: z
      .string()
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(100, "Category cannot exceed 100 characters")
      .optional(),
    learningGroup: z
      .enum(["Standards 6–8", "Standards 7–10", "After Standard 12 and Above"])
      .optional(),
    level: z.string().trim().optional(),
    slug: z.string().trim().optional(),
    learningObjectives: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    estimatedDuration: z.string().trim().optional(),
    instructor: z.string().trim().max(100, "Instructor name cannot exceed 100 characters").optional(),
    thumbnail: z.string().trim().optional(),
    lessons: z.array(lessonInputSchema).optional(),
    isPublished: z.boolean().optional()
  })
};

/**
 * Validation schema for single course lookup or deletion by ID.
 */
export const courseIdParamSchema = {
  params: z.object({
    id: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format")
  })
};

/**
 * Validation schema for catalog querying and pagination.
 */
export const courseQuerySchema = {
  query: z.object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").optional().default(1),
    limit: z.coerce.number().int().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").optional().default(100),
    category: z.string().trim().optional(),
    learningGroup: z.string().trim().optional(),
    search: z.string().trim().optional(),
    all: z.string().optional()
  })
};

/**
 * Validation schema for adding a lesson to a course.
 */
export const createLessonSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format")
  }),
  body: z
    .object({
      title: z
        .string({ required_error: "Lesson title is required" })
        .trim()
        .min(1, "Lesson title cannot be empty")
        .max(200, "Lesson title cannot exceed 200 characters"),
      description: z.string().trim().max(10000, "Description cannot exceed 10000 characters").optional().default(""),
      objective: z.string().trim().max(2000).optional().default(""),
      content: z.string().trim().optional().default(""),
      keyTakeaways: z.array(z.string()).optional().default([]),
      practiceActivity: z.any().optional(),
      videoUrl: safeVideoUrlValidator,
      videoType: z.string().trim().optional().default("none"),
      duration: durationValidator.optional(),
      order: z.coerce.number().int().min(0, "Order must be a non-negative integer").optional(),
      isPreview: z.boolean().optional().default(false)
    })
    .strict("Unexpected fields in lesson payload. Mass assignment is disallowed.")
};

/**
 * Validation schema for updating a lesson.
 */
export const updateLessonSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format"),
    lessonId: z
      .string({ required_error: "Lesson ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid lesson ID format")
  }),
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(1, "Lesson title cannot be empty")
        .max(200, "Lesson title cannot exceed 200 characters")
        .optional(),
      description: z.string().trim().max(10000, "Description cannot exceed 10000 characters").optional(),
      objective: z.string().trim().max(2000).optional(),
      content: z.string().trim().optional(),
      keyTakeaways: z.array(z.string()).optional(),
      practiceActivity: z.any().optional(),
      videoUrl: safeVideoUrlValidator,
      videoType: z.string().trim().optional(),
      duration: durationValidator.optional(),
      order: z.coerce.number().int().min(0, "Order must be a non-negative integer").optional(),
      isPreview: z.boolean().optional()
    })
    .strict("Unexpected fields in lesson payload. Mass assignment is disallowed.")
};

/**
 * Validation schema for single lesson operations by courseId and lessonId.
 */
export const lessonIdParamSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format"),
    lessonId: z
      .string({ required_error: "Lesson ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid lesson ID format")
  })
};

/**
 * Validation schema for reordering lessons.
 */
export const reorderLessonsSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID format")
  }),
  body: z.object({
    lessonIds: z
      .array(
        z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid lesson ID format in reorder list"),
        { required_error: "lessonIds array is required" }
      )
      .min(1, "lessonIds array must contain at least one lesson ID")
  })
};

export default {
  createCourseSchema,
  updateCourseSchema,
  courseIdParamSchema,
  courseQuerySchema,
  createLessonSchema,
  updateLessonSchema,
  lessonIdParamSchema,
  reorderLessonsSchema
};
