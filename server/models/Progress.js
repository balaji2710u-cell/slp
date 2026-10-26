import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  rawScore: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  passed: {
    type: Boolean,
    required: true
  },
  answers: {
    type: [Number],
    default: []
  },
  attemptedAt: {
    type: Date,
    default: Date.now
  }
});

const progressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    lastLessonId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    quizAttempts: [quizAttemptSchema],
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Prevent duplicate enrollment records for the same student and course
progressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema);

export { quizAttemptSchema };
export default Progress;
