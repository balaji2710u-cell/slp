// Master educational curriculum data for Smart Learning Platform
import { ALL_CURRICULUM_COURSES } from "./allCurriculumCourses.js";

export const INITIAL_COURSES = ALL_CURRICULUM_COURSES;

export const INITIAL_STUDENTS = [
  {
    id: "student-1",
    name: "Alex Morgan",
    email: "student@smartlearn.io",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    enrolledCourses: ["abacus-mental-arithmetic", "python-programming-fundamentals"],
    progress: {
      "abacus-mental-arithmetic": {
        completedLessons: ["les-abacus-mental-arithmetic-0"],
        lastLessonId: "les-abacus-mental-arithmetic-1",
        quizScores: {
          "les-abacus-mental-arithmetic-0": { score: 100, passed: true, completedAt: "2026-10-12T10:30:00Z" }
        }
      },
      "python-programming-fundamentals": {
        completedLessons: [],
        lastLessonId: "les-python-programming-fundamentals-0",
        quizScores: {}
      }
    },
    streakDays: 7,
    totalMinutesLearned: 380,
    joinedDate: "October 2025"
  },
  {
    id: "student-2",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    enrolledCourses: ["html-css-javascript", "physics-motion-force-energy"],
    progress: {
      "html-css-javascript": {
        completedLessons: ["les-html-css-javascript-0", "les-html-css-javascript-1"],
        lastLessonId: "les-html-css-javascript-2",
        quizScores: {
          "les-html-css-javascript-0": { score: 100, passed: true },
          "les-html-css-javascript-1": { score: 100, passed: true }
        }
      },
      "physics-motion-force-energy": {
        completedLessons: ["les-physics-motion-force-energy-0"],
        lastLessonId: "les-physics-motion-force-energy-1",
        quizScores: {
          "les-physics-motion-force-energy-0": { score: 100, passed: true }
        }
      }
    },
    streakDays: 14,
    totalMinutesLearned: 720,
    joinedDate: "September 2025"
  },
  {
    id: "student-3",
    name: "Samantha Wright",
    email: "samantha.w@example.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    enrolledCourses: ["basic-english-communication", "fullstack-web-development"],
    progress: {
      "basic-english-communication": {
        completedLessons: ["les-basic-english-communication-0"],
        lastLessonId: "les-basic-english-communication-1",
        quizScores: {
          "les-basic-english-communication-0": { score: 100, passed: true }
        }
      },
      "fullstack-web-development": {
        completedLessons: [],
        lastLessonId: "les-fullstack-web-development-0",
        quizScores: {}
      }
    },
    streakDays: 4,
    totalMinutesLearned: 410,
    joinedDate: "August 2025"
  }
];

export const ADMIN_USER = {
  id: "admin-1",
  name: "Dr. Evelyn Reed (Platform Admin)",
  email: "admin@smartlearn.io",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  title: "Chief Academic Officer"
};

export const PLATFORM_STATS = {
  activeStudents: "45,000+",
  coursesAvailable: "120+",
  completionRate: "94.2%",
  expertInstructors: "85+",
  learningHours: "350,000+"
};

export const PLATFORM_BENEFITS = [
  {
    icon: "GraduationCap",
    title: "Curated Learning Pathways",
    description: "Follow industry-aligned curriculums designed to take you from foundational principles to production-level proficiency."
  },
  {
    icon: "LockKeyhole",
    title: "Mastery-Gated Progress",
    description: "Lock downstream lessons until you pass adaptive comprehension quizzes, guaranteeing real retention and confidence."
  },
  {
    icon: "PlayCircle",
    title: "HD Video & Interactive Labs",
    description: "Crystal clear lessons with playback control, lesson notes, and hands-on assessments integrated seamlessly."
  },
  {
    icon: "Award",
    title: "Verified Skill Certification",
    description: "Earn shareable certificates of completion recognized by modern technology companies and engineering teams."
  },
  {
    icon: "BarChart3",
    title: "Actionable Analytics",
    description: "Track your streak, time spent, quiz accuracy, and milestone completions with rich real-time visual dashboards."
  },
  {
    icon: "Users",
    title: "Collaborative Admin Tools",
    description: "Empower instructors and admins to create, edit, publish courses and monitor cohort engagement with ease."
  }
];

export const TESTIMONIALS = [
  {
    name: "Marcus Vance",
    role: "Full-Stack Engineer at CloudScale",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote: "The gated quizzes made all the difference. Instead of passive video watching, SmartLearn made me prove I understood every concept before advancing. Landed my dream job in 4 months!"
  },
  {
    name: "Jessica Chen",
    role: "Product Designer at Stripe",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    quote: "The design systems course here is better than most $1,000 masterclasses. The UI is gorgeous, smooth, and genuinely fun to use every single day."
  },
  {
    name: "Liam O'Connor",
    role: "Data Analyst at FinTech AI",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    quote: "The platform's structured roadmap kept me focused and motivated. The progress tracking dashboard gives you that healthy dopamine hit each time you pass a quiz."
  }
];
