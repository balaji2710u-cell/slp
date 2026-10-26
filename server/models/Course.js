import mongoose from "mongoose";

/**
 * Helper to normalize duration to a non-negative number of seconds.
 * Supports numbers, numeric strings, and legacy strings like "15m", "12m 40s", "1h".
 */
export function parseDurationToSeconds(val) {
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "number") return val >= 0 ? Math.floor(val) : 0;
  if (typeof val === "string") {
    const num = Number(val);
    if (!isNaN(num)) return num >= 0 ? Math.floor(num) : 0;

    let totalSeconds = 0;
    const hourMatch = val.match(/(\d+)\s*h/i);
    const minMatch = val.match(/(\d+)\s*m/i);
    const secMatch = val.match(/(\d+)\s*s/i);

    if (hourMatch) totalSeconds += parseInt(hourMatch[1], 10) * 3600;
    if (minMatch) totalSeconds += parseInt(minMatch[1], 10) * 60;
    if (secMatch) totalSeconds += parseInt(secMatch[1], 10);

    return totalSeconds;
  }
  return 0;
}

const practiceActivitySchema = new mongoose.Schema(
  {
    instructions: { type: String, default: "" },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    hints: { type: [String], default: [] }
  },
  { _id: false }
);

const quizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, default: "" }
  },
  { _id: true }
);

const courseAssessmentSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    passingPercentage: { type: Number, default: 70 },
    questions: { type: [quizQuestionSchema], default: [] }
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    objective: {
      type: String,
      default: "",
      trim: true
    },
    content: {
      type: String,
      default: "",
      trim: true
    },
    keyTakeaways: {
      type: [String],
      default: []
    },
    practiceActivity: {
      type: practiceActivitySchema,
      default: () => ({})
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true
    },
    videoType: {
      type: String,
      enum: ["mp4", "youtube", "embed", "none"],
      default: "none"
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
      set: parseDurationToSeconds
    },
    order: {
      type: Number,
      default: 0,
      min: 0
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    quiz: {
      type: [quizQuestionSchema],
      default: []
    }
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      sparse: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    learningGroup: {
      type: String,
      enum: ["Standards 6–8", "Standards 7–10", "After Standard 12 and Above"],
      default: "Standards 6–8",
      index: true
    },
    level: {
      type: String,
      default: "Beginner"
    },
    learningObjectives: {
      type: [String],
      default: []
    },
    prerequisites: {
      type: [String],
      default: []
    },
    estimatedDuration: {
      type: String,
      default: "10 hours"
    },
    instructor: {
      type: String,
      default: "Admin"
    },
    thumbnail: {
      type: String,
      default: ""
    },
    lessons: [lessonSchema],
    assessment: {
      type: courseAssessmentSchema,
      default: () => ({})
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export { lessonSchema };
export default Course;