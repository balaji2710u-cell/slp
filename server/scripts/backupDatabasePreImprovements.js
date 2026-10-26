import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { connectDB, disconnectDB } from "../config/db.js";
import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";
import Course from "../models/Course.js";

async function backupDatabase() {
  console.log("Starting full database backup before Phase 5 improvements...");
  await connectDB();

  try {
    const students = await Student.find().select("+resetPasswordToken +resetPasswordExpires");
    const progress = await Progress.find();
    const certificates = await Certificate.find();
    const courses = await Course.find();

    const backupData = {
      timestamp: new Date().toISOString(),
      counts: {
        students: students.length,
        progress: progress.length,
        certificates: certificates.length,
        courses: courses.length
      },
      students,
      progress,
      certificates,
      courses
    };

    const backupPath = path.resolve("scripts/backup_pre_student_mgmt.json");
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), "utf8");
    console.log(`[Backup] Saved ${students.length} students, ${progress.length} progress, ${certificates.length} certs, ${courses.length} courses to ${backupPath}`);
  } finally {
    await disconnectDB();
  }
}

backupDatabase().catch((err) => {
  console.error("Backup failed:", err);
  process.exit(1);
});
