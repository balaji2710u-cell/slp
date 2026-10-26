import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import healthRoutes from "./routes/health.js";
import quizRoutes from "./routes/quizzes.js";
import progressRoutes from "./routes/progress.js";
import adminRoutes from "./routes/admin.js";
import certificateRoutes from "./routes/certificates.js";

const app = express();

// Security headers
app.use(helmet());

// CORS configuration (no wildcard in production if specific origin is provided)
const allowedOrigins =
  env.CORS_ORIGIN === "*"
    ? "*"
    : env.CORS_ORIGIN.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Request body parsing with strict payload size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root route (preserved for uptime checkers and root verification)
app.get("/", (req, res) => {
  res.send("Smart Learning Platform API is running!");
});

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificates", certificateRoutes);

// Centralized 404 handler for unknown routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;
