import { z } from "zod";

/**
 * Validation schema for public student registration.
 * Explicitly forbids assigning any role other than 'student'.
 */
export const registerSchema = {
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .max(254, "Email cannot exceed 254 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must contain at least 8 characters")
      .max(128, "Password cannot exceed 128 characters"),
    // Security check: Clients cannot grant themselves admin privileges
    role: z
      .enum(["student"], {
        message: "Public registration cannot assign administrative privileges"
      })
      .optional()
  })
};

/**
 * Validation schema for user authentication / login.
 */
export const loginSchema = {
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .max(128, "Password cannot exceed 128 characters")
  })
};

/**
 * Validation schema for forgot-password request.
 */
export const forgotPasswordSchema = {
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .max(254, "Email cannot exceed 254 characters")
  })
};

/**
 * Validation schema for password-reset completion.
 */
export const resetPasswordSchema = {
  body: z.object({
    token: z
      .string({ required_error: "Reset token is required" })
      .trim()
      .min(10, "Invalid reset token format")
      .max(256, "Reset token is too long"),
    password: z
      .string({ required_error: "New password is required" })
      .min(8, "Password must contain at least 8 characters")
      .max(128, "Password cannot exceed 128 characters")
  })
};

export default {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};

