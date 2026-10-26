import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

/**
 * Factory to create rate limiters with standardized responses.
 * 
 * @param {Object} options - Override options
 */
export const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
    max: options.max !== undefined ? options.max : (env.NODE_ENV === "test" ? 1000 : 30),
    standardHeaders: true,
    legacyHeaders: false,
    statusCode: 429,
    message: {
      success: false,
      message: "Too many requests, please try again later"
    },
    ...options
  });
};

/**
 * Auth rate limiter for login and registration endpoints.
 * Defends against brute-force credential stuffing and denial of service.
 */
export const authRateLimiter = createRateLimiter();

export default authRateLimiter;
