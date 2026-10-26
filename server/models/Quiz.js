import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (val) => Array.isArray(val) && val.length >= 2,
      message: "Each question must have at least 2 options."
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0
  },
  explanation: {
    type: String,
    default: "",
    trim: true
  }
});

const quizSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      sparse: true,
      index: true
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
    quizType: {
      type: String,
      enum: ["course_assessment", "lesson_quiz", "diagnostic"],
      default: "course_assessment"
    },
    learningGroup: {
      type: String,
      default: ""
    },
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
    passingPercentage: {
      type: Number,
      default: 70,
      min: 0,
      max: 100
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: (val) => Array.isArray(val) && val.length > 0,
        message: "A quiz must have at least one question."
      }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export { questionSchema };
export default Quiz;
