import express from "express";
import { getDbStatus } from "../config/db.js";

const router = express.Router();

/**
 * Health check endpoint
 * Preserves legacy { success: true, message: "API is running" } while providing
 * extended application availability and database connectivity status.
 */
router.get("/", (req, res) => {
  const dbStatus = getDbStatus();

  res.status(200).json({
    success: true,
    message: "API is running",
    status: dbStatus.connected ? "healthy" : "degraded",
    database: {
      status: dbStatus.status,
      connected: dbStatus.connected
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

export default router;
