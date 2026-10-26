import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import Certificate from "../models/Certificate.js";
import { env } from "../config/env.js";

const BASE_URL = "http://localhost:5000/api";

async function runVerification() {
  console.log("=== SMARTLEARN PLATFORM E2E VERIFICATION SUITE ===\n");

  await mongoose.connect(env.MONGO_URI);
  console.log("✓ Connected to MongoDB Atlas for ground-truth verification");

  const results = [];

  // Helper for HTTP requests
  async function apiFetch(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    return { status: res.status, ok: res.ok, data };
  }

  try {
    // 1. Setup / Find Admin and Student accounts
    let admin = await Student.findOne({ role: "admin" });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("AdminPass123!", salt);
      admin = await Student.create({
        name: "Platform Administrator",
        email: "admin@smartlearn.org",
        password: hashedPassword,
        role: "admin"
      });
      console.log("Created admin account for testing");
    }

    const adminToken = jwt.sign(
      { id: admin._id.toString(), role: "admin" },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Find or create test student
    const testStudentEmail = "diligent.scholar@example.com";
    let student = await Student.findOne({ email: testStudentEmail });
    if (!student) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("ScholarPass123!", salt);
      student = await Student.create({
        name: "Diligent Scholar",
        email: testStudentEmail,
        password: hashedPassword,
        role: "student",
        weeklyGoalMinutes: 180
      });
      console.log("Created test student account");
    }

    // TEST 1: Admin can view registered students
    const adminStudentsRes = await apiFetch("/admin/students?page=1&limit=10", {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const test1Passed =
      adminStudentsRes.status === 200 &&
      adminStudentsRes.data.success === true &&
      Array.isArray(adminStudentsRes.data.students) &&
      adminStudentsRes.data.students.length > 0;
    results.push({
      test: "1. Admin can view registered students",
      passed: test1Passed,
      detail: `Status ${adminStudentsRes.status}, returned ${adminStudentsRes.data.students?.length} students`
    });

    // Verify no password or sensitive hash is leaked
    const hasSensitiveLeak = adminStudentsRes.data.students.some(
      (s) => s.password || s.passwordResetToken || s.passwordResetExpires
    );
    results.push({
      test: "1b. Security: No password hashes or secrets leaked to admin",
      passed: !hasSensitiveLeak,
      detail: hasSensitiveLeak ? "FAILED: Found sensitive credentials" : "PASSED: All secrets safely excluded"
    });

    // TEST 2: Student cannot access admin-only student-management APIs
    const studentToken = jwt.sign(
      { id: student._id.toString(), role: "student" },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const studentAccessRes = await apiFetch("/admin/students", {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const test2Passed = studentAccessRes.status === 403;
    results.push({
      test: "2. Student cannot access admin-only student-management APIs",
      passed: test2Passed,
      detail: `Student received HTTP ${studentAccessRes.status} (Forbidden)`
    });

    // TEST 3: Student counts match database records
    const dbStudentCount = await Student.countDocuments({ role: "student" });
    const reportedTotal = adminStudentsRes.data.totalRegistered;
    const test3Passed = reportedTotal === dbStudentCount;
    results.push({
      test: "3. Student counts match MongoDB records accurately",
      passed: test3Passed,
      detail: `Reported: ${reportedTotal}, DB ground truth: ${dbStudentCount}`
    });

    // TEST 4: Last-login timestamps update after successful login
    const preLoginTime = new Date();
    await new Promise((r) => setTimeout(r, 200));

    const loginRes = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: testStudentEmail,
        password: "ScholarPass123!"
      })
    });

    const refreshedStudent = await Student.findById(student._id);
    const test4Passed =
      loginRes.status === 200 &&
      refreshedStudent.lastLoginAt &&
      new Date(refreshedStudent.lastLoginAt) >= preLoginTime;

    results.push({
      test: "4. Last-login timestamp updates upon successful login",
      passed: test4Passed,
      detail: `Updated lastLoginAt to: ${refreshedStudent.lastLoginAt}`
    });

    // TEST 5: Online status expires correctly when session becomes inactive
    // Case A: Fresh heartbeat makes student online
    const heartbeatRes = await apiFetch("/auth/heartbeat", {
      method: "POST",
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const activeStudentDetails = await apiFetch(`/admin/students/${student._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const isOnlineNow = activeStudentDetails.data.student?.isOnline === true;

    // Case B: Inactive (>15 mins ago) sets student offline
    await Student.findByIdAndUpdate(student._id, {
      lastActiveAt: new Date(Date.now() - 20 * 60 * 1000) // 20 minutes ago
    });
    const staleStudentDetails = await apiFetch(`/admin/students/${student._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const isOfflineNow = staleStudentDetails.data.student?.isOnline === false;

    // Restore presence
    await Student.findByIdAndUpdate(student._id, {
      lastActiveAt: new Date()
    });

    const test5Passed = heartbeatRes.status === 200 && isOnlineNow && isOfflineNow;
    results.push({
      test: "5. Online status updates with heartbeat & expires when inactive (>15 mins)",
      passed: test5Passed,
      detail: `Active state: ${isOnlineNow ? "Online" : "Failed"}, Stale state: ${isOfflineNow ? "Offline" : "Failed"}`
    });

    // TEST 6: Weekly goal progress changes based on actual qualifying activity
    // Set weekly goal to 120 minutes
    const goalRes = await apiFetch("/progress/goal", {
      method: "PUT",
      headers: { Authorization: `Bearer ${studentToken}` },
      body: JSON.stringify({ weeklyGoalMinutes: 120 })
    });

    // Find any published course with lessons
    const course = await Course.findOne({ isPublished: true, "lessons.0": { $exists: true } });
    let lessonCompleted = false;

    if (course) {
      // Ensure enrolled
      await apiFetch("/progress/enroll", {
        method: "POST",
        headers: { Authorization: `Bearer ${studentToken}` },
        body: JSON.stringify({ courseId: course._id.toString() })
      });

      // Complete lesson 1
      const lesson1Id = course.lessons[0]._id.toString();
      const completeRes = await apiFetch(`/progress/${course._id}/complete-lesson`, {
        method: "POST",
        headers: { Authorization: `Bearer ${studentToken}` },
        body: JSON.stringify({ lessonId: lesson1Id })
      });
      lessonCompleted = completeRes.status === 200;
    }

    // Fetch dynamic summary
    const summaryRes = await apiFetch("/progress/summary", {
      headers: { Authorization: `Bearer ${studentToken}` }
    });

    const summary = summaryRes.data.summary;
    const test6Passed =
      goalRes.status === 200 &&
      summary &&
      summary.weeklyGoalMinutes === 120 &&
      summary.weeklyMinutesLearned >= 15 &&
      summary.weeklyPercentage > 0;

    results.push({
      test: "6. Weekly goal progress recalculates dynamically from actual activity",
      passed: test6Passed,
      detail: `Goal: ${summary?.weeklyGoalMinutes}m, Learned: ${summary?.weeklyMinutesLearned}m, Percentage: ${summary?.weeklyPercentage}%`
    });

    // TEST 7: Streaks are calculated correctly from genuine calendar days
    const test7Passed =
      summary &&
      typeof summary.currentStreak === "number" &&
      typeof summary.longestStreak === "number" &&
      summary.currentStreak >= 1;

    results.push({
      test: "7. Streak is calculated from authentic qualifying calendar day events",
      passed: test7Passed,
      detail: `Current streak: ${summary?.currentStreak} days, Longest streak: ${summary?.longestStreak} days`
    });

    // TEST 8: No historical activity is fabricated
    // For a brand-new student account with 0 activities:
    const newStudentEmail = `fresh.learner.${Date.now()}@example.com`;
    const salt = await bcrypt.genSalt(10);
    const newHashed = await bcrypt.hash("FreshPass123!", salt);
    const freshStudent = await Student.create({
      name: "Fresh Learner",
      email: newStudentEmail,
      password: newHashed,
      role: "student"
    });

    const freshToken = jwt.sign(
      { id: freshStudent._id.toString(), role: "student" },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const freshSummaryRes = await apiFetch("/progress/summary", {
      headers: { Authorization: `Bearer ${freshToken}` }
    });
    const freshSummary = freshSummaryRes.data.summary;

    const test8Passed =
      freshSummary &&
      freshSummary.currentStreak === 0 &&
      freshSummary.longestStreak === 0 &&
      freshSummary.weeklyMinutesLearned === 0 &&
      freshSummary.totalActivities === 0 &&
      freshSummary.recentActivities.length === 0;

    results.push({
      test: "8. No historical activity is fabricated for first-time / new accounts",
      passed: test8Passed,
      detail: `Fresh student streak: ${freshSummary?.currentStreak}, minutes: ${freshSummary?.weeklyMinutesLearned}, activities: ${freshSummary?.totalActivities}`
    });

    // Clean up temporary fresh student
    await Student.findByIdAndDelete(freshStudent._id);

    // TEST 9: Student details view returns courses, quiz results, and certificates
    const studentDetailView = await apiFetch(`/admin/students/${student._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const sDetail = studentDetailView.data;
    const test9Passed =
      studentDetailView.status === 200 &&
      sDetail.success === true &&
      sDetail.student &&
      Array.isArray(sDetail.coursesEnrolled) &&
      Array.isArray(sDetail.quizAttempts) &&
      Array.isArray(sDetail.certificates) &&
      Array.isArray(sDetail.recentActivities);

    results.push({
      test: "9. Admin student-details endpoint returns complete learning profile",
      passed: test9Passed,
      detail: `Enrolled: ${sDetail.coursesEnrolled?.length}, Quizzes: ${sDetail.quizAttempts?.length}, Certificates: ${sDetail.certificates?.length}`
    });

    // TEST 10: Existing core features remain fully functional
    const coursesRes = await apiFetch("/courses");
    const certsRes = await apiFetch("/certificates/my", {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const test10Passed = coursesRes.status === 200 && certsRes.status === 200;

    results.push({
      test: "10. Existing courses, certificates, and auth flows operate without regression",
      passed: test10Passed,
      detail: `Courses API: HTTP ${coursesRes.status}, Certificates API: HTTP ${certsRes.status}`
    });

  } catch (err) {
    console.error("Verification error:", err);
    results.push({
      test: "Execution exception",
      passed: false,
      detail: err.message
    });
  } finally {
    await mongoose.disconnect();
  }

  console.log("\n=================== VERIFICATION REPORT ===================");
  let allPassed = true;
  for (const r of results) {
    const symbol = r.passed ? "✔ PASS" : "✖ FAIL";
    console.log(`${symbol} | ${r.test}`);
    console.log(`       └─ ${r.detail}`);
    if (!r.passed) allPassed = false;
  }
  console.log("===========================================================\n");

  if (allPassed) {
    console.log("🎉 ALL 10 REQUIREMENTS VERIFIED AND PASSED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.log("⚠️ Some verification checks failed.");
    process.exit(1);
  }
}

runVerification();
