import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },
    studentName: {
      type: String,
      required: true,
      trim: true
    },
    courseTitle: {
      type: String,
      required: true,
      trim: true
    },
    learningGroup: {
      type: String,
      default: "Core Curriculum",
      trim: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    issuedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Prevent duplicate certificates for the same student and course
certificateSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const Certificate =
  mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

export default Certificate;
