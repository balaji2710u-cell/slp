import mongoose from "mongoose";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import { env } from "../config/env.js";

const sampleCourses = [
  {
    title: "Full-Stack Web Development Mastery",
    description: "Master modern web development from HTML, CSS, and modern JavaScript to React, Node.js, Express, and MongoDB. Build production-ready web apps.",
    category: "Web Development",
    instructor: "Sarah Jenkins, Lead Software Architect",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Introduction to Modern Web Architecture",
        description: "Understand the client-server model, REST APIs, HTTP protocols, and modern frontend frameworks.",
        duration: 760,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        order: 0,
        isPreview: true
      },
      {
        title: "Deep Dive into React Components & State",
        description: "Explore functional components, React Hooks (useState, useEffect, useContext), and immutable state patterns.",
        duration: 1100,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        order: 1,
        isPreview: false
      },
      {
        title: "Building Scalable RESTful Backends with Node & Express",
        description: "Design modular Express routers, middleware authentication pipelines, and structured controller architecture.",
        duration: 1335,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        order: 2,
        isPreview: false
      },
      {
        title: "MongoDB Schema Modeling & Atlas Integration",
        description: "Model complex relationships, use Mongoose schemas, and optimize queries with indexes.",
        duration: 1550,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        order: 3,
        isPreview: false
      }
    ]
  },
  {
    title: "Applied AI & Machine Learning Foundations",
    description: "Learn practical artificial intelligence, modern machine learning workflows, neural networks, and Python data analysis.",
    category: "AI & Data Science",
    instructor: "Dr. Elena Rostova, AI Research Director",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Python for Data Science & Numerical Computing",
        description: "Vectorized computing with NumPy, dataframes with Pandas, and exploratory data visualizations.",
        duration: 900,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        order: 0,
        isPreview: true
      },
      {
        title: "Supervised Learning: Regression & Classification",
        description: "Linear regression, logistic classifiers, evaluation metrics (ROC-AUC, F1), and cross-validation.",
        duration: 1200,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        order: 1,
        isPreview: false
      }
    ]
  },
  {
    title: "Cloud Infrastructure & DevOps with Docker & AWS",
    description: "Containerize applications with Docker, configure CI/CD pipelines, and deploy scalable cloud infrastructure.",
    category: "Cloud & DevOps",
    instructor: "Marcus Vance, Principal DevOps Engineer",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80",
    isPublished: true,
    lessons: [
      {
        title: "Container Fundamentals: Docker & Multi-stage Builds",
        description: "Container virtualization, Dockerfiles, caching strategies, and multi-container orchestration.",
        duration: 1020,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        order: 0,
        isPreview: true
      }
    ]
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    const count = await Course.countDocuments();
    if (count > 0) {
      console.log(`Courses collection already has ${count} courses. Preserving existing courses.`);
      return;
    }

    console.log("Seeding initial verified courses into MongoDB Atlas...");
    for (const cData of sampleCourses) {
      const course = await Course.create(cData);
      console.log(`Created course: ${course.title} (ID: ${course._id})`);

      // Create a quiz for lesson 1
      if (course.lessons && course.lessons.length > 0) {
        const lesson = course.lessons[0];
        await Quiz.create({
          courseId: course._id,
          lessonId: lesson._id,
          title: `Checkpoint Quiz: ${lesson.title}`,
          description: "Verify comprehension of core architectural concepts covered in this lesson.",
          passingPercentage: 70,
          questions: [
            {
              question: "What protocol forms the primary transport foundation for World Wide Web client-server communication?",
              options: ["FTP", "HTTP / HTTPS", "SMTP", "SSH"],
              correctAnswer: 1,
              explanation: "HTTP (and HTTPS) is the foundational application layer protocol used for web communication."
            },
            {
              question: "Which of the following executes directly on the client side in the user's browser?",
              options: ["Node.js Express routing", "MongoDB database queries", "React UI components and DOM rendering", "Server environment variables"],
              correctAnswer: 2,
              explanation: "React components and JavaScript execute in the browser's JavaScript engine."
            }
          ]
        });
        console.log(`Created checkpoint quiz for lesson: ${lesson.title}`);
      }
    }

    console.log("Course and quiz seeding completed successfully!");
  } catch (err) {
    console.error("Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedCourses();
