import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import { env } from "../config/env.js";

async function createAdmin() {
  const email = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

  if (!email || !password || password.length < 8) {
    console.error(
      "Provisioning failed: ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) must be provided in the environment."
    );
    console.error(
      "Example: ADMIN_EMAIL=admin@smartlearn.org ADMIN_PASSWORD=SecurePassword123! node scripts/createAdmin.js"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });

    const normalizedEmail = email.toLowerCase().trim();
    const existingAdmin = await Student.findOne({ email: normalizedEmail });

    if (existingAdmin) {
      console.log(`Notice: Account for ${normalizedEmail} already exists. Existing record preserved.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Student.create({
      name: "Platform Administrator",
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin"
    });

    // Security requirement: Never print passwords or secrets to console/logs
    console.log(`Success: Administrator account successfully provisioned for: ${normalizedEmail}`);
  } catch (error) {
    console.error("Admin provisioning failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

// Only execute automatically when run directly from command line
if (process.argv[1] && process.argv[1].endsWith("createAdmin.js")) {
  createAdmin();
}

export default createAdmin;