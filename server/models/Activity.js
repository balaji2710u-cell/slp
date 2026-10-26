import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    activityType: {
      type: String,
      enum: ["lesson_completion", "quiz_attempt", "course_enrollment"],
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      default: null
    },
    score: {
      type: Number,
      default: null
    },
    passed: {
      type: Boolean,
      default: null
    },
    durationMinutes: {
      type: Number,
      default: 15,
      min: 1,
      max: 1440
    },
    metadata: {
      courseTitle: { type: String, default: "" },
      lessonTitle: { type: String, default: "" },
      quizTitle: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

// Optimize queries for student activity feeds and weekly date range queries
activitySchema.index({ studentId: 1, createdAt: -1 });
activitySchema.index({ studentId: 1, activityType: 1, courseId: 1, lessonId: 1 });

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
