import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load environment variables from server/.env regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters"),
  CORS_ORIGIN: z.string().default("*"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email").optional(),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters").optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.coerce.boolean().optional().default(false),
  EMAIL_FROM: z.string().optional().default("SmartLearn Platform <no-reply@smartlearn.org>"),
  FRONTEND_URL: z.string().optional().default("http://localhost:5173"),
  RESET_PASSWORD_EXPIRE_MINUTES: z.coerce.number().int().positive().default(15)
});

export function validateEnv(inputEnv = process.env) {
  const parsed = envSchema.safeParse(inputEnv);

  if (!parsed.success) {
    const missingOrInvalid = parsed.error.issues.map((issue) => {
      return `${issue.path.join(".")}: ${issue.message}`;
    });

    // Security requirement: Never expose secret values in logs or exceptions
    const summary = `Environment configuration error: ${missingOrInvalid.join("; ")}`;
    throw new Error(summary);
  }

  return parsed.data;
}

// In test environment, provide isolated defaults if not defined so production credentials are never required
const activeEnv = { ...process.env };
const isTestEnv =
  activeEnv.NODE_ENV === "test" ||
  process.env.NODE_ENV === "test" ||
  process.execArgv.includes("--test") ||
  process.argv.some((a) => a.includes("test"));

if (isTestEnv) {
  activeEnv.NODE_ENV = "test";
  activeEnv.MONGO_URI =
    activeEnv.MONGO_URI || "mongodb://127.0.0.1:27017/smartlearn_test";
  activeEnv.JWT_SECRET =
    activeEnv.JWT_SECRET || "test_jwt_secret_min_32_characters_long_isolated";
}

let env;
try {
  env = validateEnv(activeEnv);
} catch (error) {
  // Fail safely at startup with descriptive error without revealing secrets
  console.error("FATAL CONFIGURATION ERROR:");
  console.error(error.message);
  process.exit(1);
}

export { env };
export default env;
