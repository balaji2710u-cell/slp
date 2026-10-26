import mongoose from "mongoose";
import Activity from "../models/Activity.js";
import Student from "../models/Student.js";
import Progress from "../models/Progress.js";
import Course from "../models/Course.js";

/**
 * Normalizes a Date object to YYYY-MM-DD string format in consistent ISO/local calendar representation.
 */
export function toDateString(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates current and longest daily learning streaks from a set of calendar day strings.
 * Qualifying activity: at least one completed lesson or quiz attempt on that calendar date.
 */
export function calculateStreakFromDates(dateStrings = []) {
  if (!dateStrings || dateStrings.length === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false };
  }

  // Deduplicate and sort descending (newest first)
  const uniqueDates = Array.from(new Set(dateStrings)).sort().reverse();
  const dateSet = new Set(uniqueDates);

  const now = new Date();
  const todayStr = toDateString(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  // Determine current streak anchor
  let currentStreak = 0;
  let cursor = null;

  if (dateSet.has(todayStr)) {
    cursor = new Date(now);
  } else if (dateSet.has(yesterdayStr)) {
    cursor = new Date(yesterday);
  }

  if (cursor) {
    while (true) {
      const cStr = toDateString(cursor);
      if (dateSet.has(cStr)) {
        currentStreak++;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest historical streak
  let longestStreak = currentStreak;
  let tempStreak = 0;
  let prevDate = null;

  // Sort ascending for historical pass
  const sortedAsc = Array.from(dateSet).sort();
  for (const dateStr of sortedAsc) {
    const currentDate = new Date(dateStr);
    if (!prevDate) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevDate = currentDate;
  }

  const isActiveToday = dateSet.has(todayStr);

  return { currentStreak, longestStreak, isActiveToday };
}

/**
 * Calculates current week Monday-Sunday date breakdown and minutes against weekly goal.
 */
export function calculateWeeklyProgress(activities = [], weeklyGoalMinutes = 180) {
  const now = new Date();
  // Get Monday of current week
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday...
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(now);
  monday.setDate(now.getDate() + distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const daysBreakdown = [];
  let weeklyMinutesLearned = 0;
  let weeklyLessonsCompleted = 0;
  let weeklyQuizzesTaken = 0;

  for (let i = 0; i < 7; i++) {
    const curDay = new Date(monday);
    curDay.setDate(monday.getDate() + i);
    const dateStr = toDateString(curDay);

    const dayActivities = activities.filter((act) => toDateString(act.createdAt) === dateStr);
    const dayMinutes = dayActivities.reduce((acc, a) => acc + (a.durationMinutes || 0), 0);
    const dayLessons = dayActivities.filter((a) => a.activityType === "lesson_completion").length;
    const dayQuizzes = dayActivities.filter((a) => a.activityType === "quiz_attempt").length;

    weeklyMinutesLearned += dayMinutes;
    weeklyLessonsCompleted += dayLessons;
    weeklyQuizzesTaken += dayQuizzes;

    daysBreakdown.push({
      day: dayNames[i],
      date: dateStr,
      minutes: dayMinutes,
      lessonsCount: dayLessons,
      quizzesCount: dayQuizzes,
      isToday: dateStr === toDateString(now)
    });
  }

  const weeklyPercent = weeklyGoalMinutes > 0
    ? Math.min(100, Math.round((weeklyMinutesLearned / weeklyGoalMinutes) * 100))
    : 0;

  const weeklyMinutesRemaining = Math.max(0, weeklyGoalMinutes - weeklyMinutesLearned);
  const isGoalMet = weeklyMinutesLearned >= weeklyGoalMinutes;

  return {
    weeklyGoalMinutes,
    weeklyMinutesLearned,
    weeklyPercent,
    weeklyPercentage: weeklyPercent,
    weeklyMinutesRemaining,
    isGoalMet,
    weeklyLessonsCompleted,
    weeklyQuizzesTaken,
    daysBreakdown
  };
}

/**
 * Safely records a learning activity event, preventing duplicate identical lesson completions.
 */
export async function recordLearningActivity({
  studentId,
  activityType,
  courseId,
  lessonId = null,
  quizId = null,
  score = null,
  passed = null,
  durationMinutes = 15,
  metadata = {}
}) {
  if (!studentId || !activityType || !courseId) return null;

  try {
    const isMocked = typeof Activity.findOne === "function" && Activity.findOne !== mongoose.Model.findOne;
    if (mongoose.connection.readyState === 1 || isMocked) {
      // Prevent duplicate lesson completion activity records
      if (activityType === "lesson_completion" && lessonId) {
        const existing = await Activity.findOne({
          studentId,
          activityType: "lesson_completion",
          courseId,
          lessonId
        });
        if (existing) return existing;
      }

      // Parse and safely clamp duration to realistic bounds (1 to 180 minutes)
      let parsedMinutes = 15;
      if (typeof durationMinutes === "number" && !isNaN(durationMinutes)) {
        parsedMinutes = durationMinutes;
      } else if (typeof durationMinutes === "string") {
        const match = durationMinutes.match(/(\d+)/);
        if (match) parsedMinutes = parseInt(match[1], 10);
      }
      const safeMinutes = Math.min(180, Math.max(1, parsedMinutes));

      const created = await Activity.create({
        studentId,
        activityType,
        courseId,
        lessonId,
        quizId,
        score,
        passed,
        durationMinutes: safeMinutes,
        metadata: {
          courseTitle: metadata.courseTitle || "",
          lessonTitle: metadata.lessonTitle || "",
          quizTitle: metadata.quizTitle || ""
        }
      });

      // Update student's lastActiveAt timestamp
      if (typeof Student.findByIdAndUpdate === "function") {
        await Student.findByIdAndUpdate(studentId, { $set: { lastActiveAt: new Date() } }).catch(() => {});
      }

      return created;
    }
  } catch (err) {
    console.warn("Notice: learning activity recording deferred:", err.message);
  }
  return null;
}

/**
 * Compiles a student's full activity summary by synthesizing Activity records,
 * completed lessons, and quiz attempts.
 */
export async function getStudentActivitySummary(studentId) {
  let student = null;
  let activities = [];
  let progressRecords = [];

  try {
    const isStudentMocked = typeof Student.findById === "function" && Student.findById !== mongoose.Model.findById;
    if (mongoose.connection.readyState === 1 || isStudentMocked) {
      student = await Student.findById(studentId);
    }
    const isActivityMocked = typeof Activity.find === "function" && Activity.find !== mongoose.Model.find;
    if (mongoose.connection.readyState === 1 || isActivityMocked) {
      activities = await Activity.find({ studentId }).sort({ createdAt: -1 });
    }
    const isProgressMocked = typeof Progress.find === "function" && Progress.find !== mongoose.Model.find;
    if (mongoose.connection.readyState === 1 || isProgressMocked) {
      progressRecords = await Progress.find({ studentId }).populate("courseId", "title");
    }
  } catch (err) {
    console.warn("Notice reading student activity:", err.message);
  }

  const weeklyGoalMinutes = student?.weeklyGoalMinutes || 180;

  // Extract all calendar dates from genuine activities & existing progress timestamps
  const qualifyingDateStrings = [];

  activities.forEach((act) => {
    if (act.activityType === "lesson_completion" || act.activityType === "quiz_attempt") {
      qualifyingDateStrings.push(toDateString(act.createdAt));
    }
  });

  // Synthesize dates from existing Progress records if activities were not backfilled
  progressRecords.forEach((prog) => {
    (prog.quizAttempts || []).forEach((att) => {
      if (att.attemptedAt) {
        qualifyingDateStrings.push(toDateString(att.attemptedAt));
      }
    });
    if (prog.completedLessons?.length > 0 && prog.updatedAt) {
      qualifyingDateStrings.push(toDateString(prog.updatedAt));
    }
  });

  const { currentStreak, longestStreak } = calculateStreakFromDates(qualifyingDateStrings);
  const weeklyData = calculateWeeklyProgress(activities, weeklyGoalMinutes);

  // Total all-time minutes learned
  let totalMinutesLearned = activities.reduce((acc, a) => acc + (a.durationMinutes || 0), 0);
  if (totalMinutesLearned === 0 && progressRecords.length > 0) {
    // If historical activities weren't yet logged, calculate from verified completed lessons
    const totalCompletedLessons = progressRecords.reduce((acc, p) => acc + (p.completedLessons?.length || 0), 0);
    const totalQuizzes = progressRecords.reduce((acc, p) => acc + (p.quizAttempts?.length || 0), 0);
    totalMinutesLearned = totalCompletedLessons * 15 + totalQuizzes * 10;
  }

  // Format recent activity feed (up to 10 entries)
  const recentActivities = activities.slice(0, 10).map((act) => ({
    id: act._id,
    type: act.activityType,
    courseTitle: act.metadata?.courseTitle || "Educational Course",
    title: act.metadata?.lessonTitle || act.metadata?.quizTitle || (act.activityType === "lesson_completion" ? "Completed Lesson" : "Checkpoint Quiz"),
    score: act.score,
    passed: act.passed,
    durationMinutes: act.durationMinutes,
    timestamp: act.createdAt
  }));

  return {
    student: {
      id: student?._id || studentId,
      name: student?.name || "Student",
      email: student?.email || "",
      lastLoginAt: student?.lastLoginAt || null,
      lastActiveAt: student?.lastActiveAt || null,
      weeklyGoalMinutes
    },
    currentStreak,
    longestStreak,
    totalMinutesLearned,
    totalActivities: activities.length,
    ...weeklyData,
    recentActivities
  };
}
