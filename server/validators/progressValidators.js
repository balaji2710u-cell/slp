import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const enrollCourseSchema = {
  body: z
    .object({
      courseId: z
        .string({ required_error: "Course ID is required" })
        .regex(objectIdRegex, "Invalid course ID format")
    })
    .strict("Unexpected fields in enrollment payload.")
};

export const completeLessonSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(objectIdRegex, "Invalid course ID format")
  }),
  body: z
    .object({
      lessonId: z
        .string({ required_error: "Lesson ID is required" })
        .regex(objectIdRegex, "Invalid lesson ID format")
    })
    .strict("Unexpected fields in completion payload.")
};

export const progressCourseParamSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .regex(objectIdRegex, "Invalid course ID format")
  })
};

export const progressStudentParamSchema = {
  params: z.object({
    studentId: z
      .string({ required_error: "Student ID is required" })
      .regex(objectIdRegex, "Invalid student ID format")
  })
};

export const updateGoalSchema = {
  body: z
    .object({
      weeklyGoalMinutes: z
        .number({ required_error: "Weekly goal minutes is required" })
        .int()
        .min(15, "Minimum weekly goal is 15 minutes")
        .max(3000, "Maximum weekly goal is 3000 minutes")
    })
    .strict("Unexpected fields in update goal payload.")
};
