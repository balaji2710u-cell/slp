import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Middleware to authenticate requests using JWT Bearer tokens.
 * Extracts and verifies the token from the Authorization header.
 * Attaches validated minimal identity { id, role } to req.user.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token.trim() === "") {
    return res.status(401).json({
      success: false,
      message: "Authentication token required"
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Attach minimal, validated identity strictly from token claims
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    // Never expose token or secret in error logs
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

/**
 * Middleware that optionally extracts and validates a JWT Bearer token if present.
 * If no token is provided, continues as unauthenticated (req.user = null).
 * If a valid token is provided, sets req.user = { id, role }.
 * If an invalid token is provided, safely sets req.user = null without throwing 401.
 */
export const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token.trim() === "") {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded && decoded.id && decoded.role) {
      req.user = {
        id: decoded.id,
        role: decoded.role
      };
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }

  next();
};

/**
 * Middleware factory for role-based authorization.
 * Ensures the authenticated user possesses the required role.
 * Cannot be bypassed by client-supplied payload or query params.
 * 
 * @param {string} requiredRole - Role required (e.g. "admin", "student")
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required"
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: requiredRole === "admin" ? "Admin access required" : "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

export default {
  authenticateToken,
  optionalAuthenticate,
  requireRole
};
