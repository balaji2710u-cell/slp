import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const questionInputSchema = z
  .object({
    question: z
      .string({ required_error: "Question text is required" })
      .trim()
      .min(1, "Question text cannot be empty")
      .max(1000, "Question text cannot exceed 1000 characters"),
    options: z
      .array(
        z.string().trim().min(1, "Option cannot be empty").max(500, "Option cannot exceed 500 characters")
      )
      .min(2, "Each question must have at least 2 options")
      .max(10, "Each question can have at most 10 options"),
    correctAnswer: z
      .number({ required_error: "correctAnswer index is required" })
      .int()
      .min(0, "correctAnswer must be a non-negative integer"),
    explanation: z.string().trim().max(1000, "Explanation cannot exceed 1000 characters").optional().default("")
  })
  .refine((data) => data.correctAnswer < data.options.length, {
    message: "correctAnswer index must be less than the number of options",
    path: ["correctAnswer"]
  });

export const createQuizSchema = {
  body: z
    .object({
      courseId: z
        .string({ required_error: "Course ID is required" })
        .regex(objectIdRegex, "Invalid course ID format"),
      lessonId: z
        .string()
        .regex(objectIdRegex, "Invalid lesson ID format")
        .optional()
        .nullable(),
      title: z
        .string({ required_error: "Quiz title is required" })
        .trim()
        .min(1, "Quiz title cannot be empty")
        .max(200, "Quiz title cannot exceed 200 characters"),
      description: z.string().trim().max(2000, "Description cannot exceed 2000 characters").optional().default(""),
      passingPercentage: z
        .coerce
        .number()
        .min(0, "Passing percentage must be at least 0")
        .max(100, "Passing percentage cannot exceed 100")
        .default(70),
      questions: z
        .array(questionInputSchema)
        .min(1, "Quiz must contain at least one question")
    })
    .strict("Unexpected fields in quiz payload.")
};

export const updateQuizSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, "Invalid quiz ID format")
  }),
  body: z
    .object({
      title: z.string().trim().min(1).max(200).optional(),
      description: z.string().trim().max(2000).optional(),
      passingPercentage: z.coerce.number().min(0).max(100).optional(),
      questions: z.array(questionInputSchema).min(1).optional()
    })
    .strict("Unexpected fields in quiz update payload.")
};

export const quizIdParamSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, "Invalid quiz ID format")
  })
};

export const submitQuizSchema = {
  params: z.object({
    id: z.string().regex(objectIdRegex, "Invalid quiz ID format")
  }),
  body: z
    .object({
      answers: z
        .array(z.number().int().min(0, "Answer index must be non-negative"))
        .min(1, "Answers array must not be empty")
    })
    .strict("Unexpected fields in submission payload.")
};
