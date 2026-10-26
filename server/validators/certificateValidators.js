import { z } from "zod";

export const issueCertificateSchema = {
  body: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .trim()
      .min(1, "Course ID cannot be empty"),
    score: z.coerce
      .number()
      .min(0, "Score cannot be negative")
      .max(100, "Score cannot exceed 100")
      .optional()
      .default(100)
  })
};

export const verifyCertificateParamSchema = {
  params: z.object({
    certificateId: z
      .string({ required_error: "Certificate ID is required" })
      .trim()
      .min(1, "Certificate ID cannot be empty")
  })
};

export const courseCertificateParamSchema = {
  params: z.object({
    courseId: z
      .string({ required_error: "Course ID is required" })
      .trim()
      .min(1, "Course ID cannot be empty")
  })
};

export default {
  issueCertificateSchema,
  verifyCertificateParamSchema,
  courseCertificateParamSchema
};
