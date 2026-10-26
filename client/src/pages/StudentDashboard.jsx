import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";
import CertificateModal from "../components/CertificateModal";
import confetti from "canvas-confetti";
import { certificateApi, progressApi } from "../services/api";
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Flame,
  Search,
  Filter,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  Compass,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Zap,
  Target,
  Printer
} from "lucide-react";

// Diagnostic test questions covering foundational competencies
const DIAGNOSTIC_QUESTIONS = [
  {
    topic: "Mental Arithmetic",
    question: "If a merchant buys 8 notebooks at ₹25 each and sells them at ₹35 each, what is the total profit?",
    options: ["₹60", "₹70", "₹80", "₹90"],
    correctAnswer: 2,
    explanation: "Profit per book = 35 - 25 = ₹10. Total profit for 8 books = 8 × ₹10 = ₹80."
  },
  {
    topic: "Logical Reasoning",
    question: "Which number completes the series: 3, 9, 27, 81, ___?",
    options: ["162", "243", "324", "729"],
    correctAnswer: 1,
    explanation: "Each term is multiplied by 3 (powers of 3). 81 × 3 = 243."
  },
  {
    topic: "English Communication",
    question: "Select the sentence with correct subject-verb agreement:",
    options: [
      "The list of participants are published.",
      "The list of participants is published.",
      "The list of participants were published yesterday.",
      "The list of participants have been published."
    ],
    correctAnswer: 1,
    explanation: "The singular subject 'list' requires the singular verb 'is published'."
  },
  {
    topic: "Computer Fundamentals",
    question: "Which component of a computer system is responsible for executing program instructions and calculations?",
    options: ["Hard Disk Drive", "Central Processing Unit (CPU)", "Power Supply Unit", "Random Access Memory (RAM)"],
    correctAnswer: 1,
    explanation: "The CPU (Central Processing Unit) interprets and executes machine instructions."
  },
  {
    topic: "Algorithmic Thinking",
    question: "What is the primary benefit of dividing a complex program into modular functions or functions?",
    options: [
      "It makes the file size larger on disk.",
      "It increases execution speed by 10x automatically.",
      "It promotes code reuse, readability, and simplifies debugging.",
      "It removes the need for variable declaration."
    ],
    correctAnswer: 2,
    explanation: "Modular decomposition allows code reuse, clearer structure, and localized debugging."
  }
];

// Interactive SVG Weekly Activity Chart - Powered by genuine date-stamped activity
function WeeklyActivityChart({
  daysBreakdown = [],
  totalMinutes = 0,
  streakDays = 0,
  longestStreak = 0,
  weeklyGoalMinutes = 180,
  onOpenGoalModal
}) {
  const defaultDays = [
    { day: "Mon", minutes: 0 },
    { day: "Tue", minutes: 0 },
    { day: "Wed", minutes: 0 },
    { day: "Thu", minutes: 0 },
    { day: "Fri", minutes: 0 },
    { day: "Sat", minutes: 0 },
    { day: "Sun", minutes: 0 }
  ];

  const days = daysBreakdown && daysBreakdown.length === 7 ? daysBreakdown : defaultDays;
  const dailyTarget = Math.max(10, Math.round(weeklyGoalMinutes / 7));
  const maxMinutes = Math.max(60, dailyTarget * 1.5, ...days.map((d) => d.minutes || 0));
  const [hoveredDay, setHoveredDay] = useState(null);

  return (
    <div className="card" style={{ padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Weekly Study Rhythm</span>
            {streakDays > 0 ? (
              <span className="badge badge-emerald" style={{ fontSize: "0.72rem", gap: "0.3rem" }}>
                <Flame size={12} color="#f59e0b" fill="#f59e0b" />
                {streakDays} Day Streak Active
              </span>
            ) : (
              <span className="badge badge-secondary" style={{ fontSize: "0.72rem", gap: "0.3rem", color: "#64748b" }}>
                <Flame size={12} color="#94a3b8" />
                0 Day Streak (Start today!)
              </span>
            )}
            {longestStreak > 0 && longestStreak !== streakDays && (
              <span className="badge badge-indigo" style={{ fontSize: "0.72rem" }}>
                Personal Best: {longestStreak} days
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>
            Total this week: <strong>{totalMinutes} mins</strong> • Daily Target: {dailyTarget} mins
            {onOpenGoalModal && (
              <button
                type="button"
                onClick={onOpenGoalModal}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4f46e5",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  marginLeft: "0.6rem",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Adjust Goal ({weeklyGoalMinutes}m/wk)
              </button>
            )}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#4f46e5" }}>
            {Math.round(totalMinutes / 7)} <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#64748b" }}>mins/day avg</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div style={{ position: "relative", width: "100%", height: "150px", display: "flex", alignItems: "flex-end", gap: "0.75rem", paddingTop: "20px" }}>
        {/* Goal threshold dashed line */}
        <div style={{
          position: "absolute",
          top: `${Math.max(10, Math.min(140, 150 - (dailyTarget / maxMinutes) * 110))}px`,
          left: 0,
          right: 0,
          borderTop: "1.5px dashed #cbd5e1",
          zIndex: 1,
          pointerEvents: "none"
        }}>
          <span style={{ position: "absolute", right: "0", top: "-18px", fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600 }}>
            Daily Target ({dailyTarget}m)
          </span>
        </div>

        {days.map((item, idx) => {
          const minutes = item.minutes || 0;
          const barHeight = minutes > 0
            ? Math.max(14, Math.round((minutes / maxMinutes) * 110))
            : 6;
          const isHovered = hoveredDay === idx;
          const exceedsGoal = minutes >= dailyTarget;

          return (
            <div
              key={item.day || idx}
              onMouseEnter={() => setHoveredDay(idx)}
              onMouseLeave={() => setHoveredDay(null)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
                position: "relative",
                cursor: "pointer"
              }}
            >
              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: "absolute",
                  bottom: `${barHeight + 35}px`,
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.3rem 0.55rem",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}>
                  {minutes} mins {exceedsGoal ? "🎯 Target Reached" : ""}
                </div>
              )}

              {/* Bar */}
              <div style={{
                width: "100%",
                maxWidth: "38px",
                height: `${barHeight}px`,
                borderRadius: "8px 8px 3px 3px",
                background: minutes === 0
                  ? "#e2e8f0"
                  : exceedsGoal
                  ? "linear-gradient(180deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)",
                boxShadow: isHovered && minutes > 0 ? "0 0 12px rgba(79, 70, 229, 0.4)" : "none",
                transform: isHovered && minutes > 0 ? "scaleY(1.05)" : "none",
                transformOrigin: "bottom",
                transition: "all 0.2s ease",
                zIndex: 2
              }} />

              {/* Label */}
              <span style={{
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                fontWeight: isHovered ? 800 : 600,
                color: item.isToday ? "#4f46e5" : isHovered ? "#0f172a" : "#64748b"
              }}>
                {item.day}{item.isToday ? " •" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {totalMinutes === 0 && (
        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.82rem", color: "#94a3b8" }}>
          No learning activity recorded yet this week. Complete lessons or quizzes to record your genuine study rhythm.
        </div>
      )}
    </div>
  );
}

export default function StudentDashboard() {
  const { currentUser, logout } = useAuth();
  const { courses, enrollInCourse, isEnrolled, getStudentProgress } = useCourses();
  const navigate = useNavigate();

  // Navigation tab in dashboard: 'learning' | 'explore' | 'assessments' | 'achievements'
  const [activeTab, setActiveTab] = useState("learning");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLearningGroup, setSelectedLearningGroup] = useState("All Groups");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Diagnostic Test State
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
  const [diagnosticResult, setDiagnosticResult] = useState(() => {
    try {
      const saved = localStorage.getItem("smartlearn_diagnostic_result");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);

  // Real Persistent Certificates State (MongoDB)
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [certificateError, setCertificateError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Genuine Activity & Streak State (MongoDB Activity model & Streak calculations)
  const [activitySummary, setActivitySummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Weekly Goal Configuration State
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [customGoalMinutes, setCustomGoalMinutes] = useState(180);
  const [updatingGoal, setUpdatingGoal] = useState(false);
  const [goalUpdateNotice, setGoalUpdateNotice] = useState(null);

  // Fetch student's real earned certificates from MongoDB
  const fetchCertificates = async () => {
    if (!currentUser) return;
    setLoadingCertificates(true);
    setCertificateError(null);
    try {
      const res = await certificateApi.getMyCertificates();
      if (res && res.success && Array.isArray(res.certificates)) {
        setCertificates(res.certificates);
      }
    } catch (err) {
      console.warn("Notice fetching certificates:", err.message);
      setCertificateError(err.message);
    } finally {
      setLoadingCertificates(false);
    }
  };

  // Fetch genuine activity summary, streak, and weekly progress
  const fetchActivitySummary = async () => {
    if (!currentUser) return;
    setLoadingSummary(true);
    setSummaryError(null);
    try {
      const res = await progressApi.getSummary();
      if (res && res.success && res.summary) {
        setActivitySummary(res.summary);
        setCustomGoalMinutes(res.summary.weeklyGoalMinutes || 180);
      }
    } catch (err) {
      console.warn("Notice loading activity summary:", err.message);
      setSummaryError(err.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleUpdateWeeklyGoal = async (minutes) => {
    setUpdatingGoal(true);
    setGoalUpdateNotice(null);
    try {
      const res = await progressApi.updateGoal(minutes);
      if (res && res.success) {
        setGoalUpdateNotice(`Weekly study goal successfully updated to ${minutes} minutes!`);
        await fetchActivitySummary();
        setTimeout(() => {
          setIsGoalModalOpen(false);
          setGoalUpdateNotice(null);
        }, 1200);
      }
    } catch (err) {
      alert(err.message || "Failed to update weekly goal.");
    } finally {
      setUpdatingGoal(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchActivitySummary();
  }, [currentUser]);

  // If not logged in, show student prompt
  if (!currentUser) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center", minHeight: "60vh" }}>
        <div className="card" style={{ maxWidth: "500px", margin: "0 auto", padding: "2.5rem" }}>
          <GraduationCap size={48} color="#4f46e5" style={{ margin: "0 auto 1rem auto" }} />
          <h2>Student Portal Login Required</h2>
          <p style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
            Please sign in to view your enrolled courses, learning analytics, and resume locked lessons.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link to="/login" className="btn btn-primary">
              Log In as Student
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const enrolledCourseIds = currentUser.enrolledCourses || [];
  const enrolledCourses = courses.filter((c) => {
    return (
      isEnrolled(currentUser.id, c.id) ||
      isEnrolled(currentUser.id, c._id) ||
      isEnrolled(currentUser.id, c.slug) ||
      enrolledCourseIds.includes(c.id) ||
      enrolledCourseIds.includes(c._id) ||
      enrolledCourseIds.includes(c.slug)
    );
  });

  let totalCompletedLessons = 0;
  let totalQuizzesPassed = 0;
  const assessmentHistory = [];

  enrolledCourses.forEach((course) => {
    const cId = course.id || course._id || course.slug;
    const prog = getStudentProgress(currentUser.id, cId);
    totalCompletedLessons += (prog.completedLessons || []).length;
    Object.entries(prog.quizScores || {}).forEach(([lessonId, q]) => {
      if (q.passed) totalQuizzesPassed++;
      const lesson = course.lessons?.find((l) => l.id === lessonId || l._id === lessonId);
      assessmentHistory.push({
        courseTitle: course.title,
        lessonTitle: lesson?.title || "Lesson Checkpoint",
        score: q.score,
        passed: q.passed,
        date: q.completedAt || new Date().toISOString()
      });
    });
  });

  // Determine "Continue Learning" course
  const continueCourse = enrolledCourses.find((c) => {
    const cId = c.id || c._id || c.slug;
    const prog = getStudentProgress(currentUser.id, cId);
    return prog.percentage < 100;
  }) || enrolledCourses[0] || null;

  const continueCourseId = continueCourse ? (continueCourse.id || continueCourse._id || continueCourse.slug) : null;
  const continueProgress = continueCourse ? getStudentProgress(currentUser.id, continueCourseId) : null;
  const continueLesson = continueCourse?.lessons?.find((l) => l.id === continueProgress?.lastLessonId || l._id === continueProgress?.lastLessonId) || continueCourse?.lessons?.[0];

  // Available courses
  const availableCourses = courses.filter((c) => c.isPublished);

  // Filter explore courses
  const filteredCourses = availableCourses.filter((course) => {
    const matchesGroup =
      selectedLearningGroup === "All Groups" ||
      course.learningGroup === selectedLearningGroup;

    const matchesCategory =
      selectedCategory === "All" ||
      course.category === selectedCategory;

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesGroup && matchesCategory && matchesSearch;
  });

  const learningGroups = [
    "All Groups",
    "Standards 6–8",
    "Standards 7–10",
    "After Standard 12 and Above"
  ];

  const handleEnroll = (courseId) => {
    enrollInCourse(currentUser.id, courseId);
    navigate(`/course/${courseId}`);
  };

  // Submit Diagnostic Test
  const handleSubmitDiagnostic = (e) => {
    e.preventDefault();
    if (Object.keys(diagnosticAnswers).length < DIAGNOSTIC_QUESTIONS.length) {
      alert("Please answer all diagnostic questions before submitting.");
      return;
    }

    let score = 0;
    const strengths = [];
    const recommendations = [];

    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      const isCorrect = diagnosticAnswers[idx] === q.correctAnswer;
      if (isCorrect) {
        score++;
        strengths.push(q.topic);
      } else {
        recommendations.push(q.topic);
      }
    });

    const percentage = Math.round((score / DIAGNOSTIC_QUESTIONS.length) * 100);
    const resultObj = {
      score,
      total: DIAGNOSTIC_QUESTIONS.length,
      percentage,
      strengths,
      recommendations,
      completedAt: new Date().toLocaleDateString()
    };

    setDiagnosticResult(resultObj);
    localStorage.setItem("smartlearn_diagnostic_result", JSON.stringify(resultObj));
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="dashboard-wrapper">
      {/* MODERN SIDEBAR NAVIGATION */}
      <aside className="dashboard-sidebar dashboard-sidebar-desktop">
        {/* User Profile Card */}
        <div style={{
          padding: "1rem",
          background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
          borderRadius: "16px",
          border: "1px solid #e0e7ff",
          marginBottom: "1.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <img
              src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(currentUser.name || "Student")}`}
              alt={currentUser.name}
              style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ffffff", boxShadow: "0 2px 8px rgba(79, 70, 229, 0.15)" }}
            />
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#4f46e5", fontWeight: 700 }}>
                Scholar • Level 4
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <span className="badge badge-amber" style={{ fontSize: "0.7rem", fontWeight: 700, gap: "0.25rem" }}>
              <Flame size={12} color="#f59e0b" fill={activitySummary?.currentStreak > 0 ? "#f59e0b" : "none"} />
              {activitySummary ? activitySummary.currentStreak : 0} Day Streak
            </span>
            <span className="badge badge-indigo" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
              {enrolledCourses.length} Tracks
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flexGrow: 1 }}>
          <button
            onClick={() => setActiveTab("learning")}
            className={`sidebar-nav-item ${activeTab === "learning" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span>My Learning</span>
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`sidebar-nav-item ${activeTab === "explore" ? "active" : ""}`}
          >
            <Compass size={18} />
            <span>Explore Catalog</span>
            <span className="sidebar-badge badge-indigo">{availableCourses.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("assessments")}
            className={`sidebar-nav-item ${activeTab === "assessments" ? "active" : ""}`}
          >
            <Target size={18} />
            <span>Quiz & History</span>
            <span className="sidebar-badge badge-emerald">{totalQuizzesPassed}</span>
          </button>

          <button
            onClick={() => setActiveTab("achievements")}
            className={`sidebar-nav-item ${activeTab === "achievements" ? "active" : ""}`}
          >
            <Award size={18} />
            <span>Certificates</span>
            <span className="sidebar-badge badge-violet">
              {certificates.length}
            </span>
          </button>
        </div>

        {/* Study Goal Progress Meter */}
        <div style={{
          padding: "1rem",
          backgroundColor: "#f8fafc",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          marginBottom: "1rem"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.4rem" }}>
            <span>Weekly Study Goal</span>
            <button
              type="button"
              onClick={() => setIsGoalModalOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "#4f46e5",
                fontSize: "0.72rem",
                fontWeight: 700,
                cursor: "pointer",
                padding: "0.1rem 0.3rem",
                borderRadius: "4px"
              }}
            >
              Configure
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginBottom: "0.35rem" }}>
            <span>Progress</span>
            <span style={{ color: "#4f46e5", fontWeight: 700 }}>
              {activitySummary?.weeklyMinutesLearned || 0} / {activitySummary?.weeklyGoalMinutes || 180}m
            </span>
          </div>
          <ProgressBar value={activitySummary?.weeklyPercentage || 0} max={100} showLabel={false} height={6} />
          <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "0.4rem" }}>
            {activitySummary?.weeklyPercentage || 0}% completed • {activitySummary?.weeklyMinutesRemaining || 0} mins remaining
          </p>
        </div>

        {/* Diagnostic Assessment Launcher */}
        <div style={{
          padding: "1rem",
          background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)",
          borderRadius: "14px",
          border: "1px solid #c7d2fe",
          marginBottom: "1rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#3730a3", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.25rem" }}>
            <Zap size={15} color="#4f46e5" />
            <span>Skill Diagnostic</span>
          </div>
          <p style={{ fontSize: "0.72rem", color: "#4338ca", lineHeight: 1.4, marginBottom: "0.5rem" }}>
            {diagnosticResult
              ? `Last Score: ${diagnosticResult.percentage}%`
              : "Discover your optimal curriculum starting tier."}
          </p>
          <button
            type="button"
            onClick={() => setShowDiagnosticModal(true)}
            className="btn btn-primary btn-sm"
            style={{ width: "100%", fontSize: "0.75rem", padding: "0.45rem" }}
          >
            {diagnosticResult ? "Retake Evaluation" : "Launch Evaluation"}
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="sidebar-nav-item"
          style={{ marginTop: "auto", color: "#ef4444" }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        {/* Mobile Tab Header */}
        <div style={{ display: "none", marginBottom: "1.5rem" }} className="mobile-tab-bar">
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
            <button
              onClick={() => setActiveTab("learning")}
              className={`btn btn-sm ${activeTab === "learning" ? "btn-primary" : "btn-secondary"}`}
            >
              My Learning
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`btn btn-sm ${activeTab === "explore" ? "btn-primary" : "btn-secondary"}`}
            >
              Explore Courses
            </button>
            <button
              onClick={() => setActiveTab("assessments")}
              className={`btn btn-sm ${activeTab === "assessments" ? "btn-primary" : "btn-secondary"}`}
            >
              Assessments
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`btn btn-sm ${activeTab === "achievements" ? "btn-primary" : "btn-secondary"}`}
            >
              Certificates
            </button>
          </div>
        </div>

        {/* TAB 1: MY LEARNING */}
        {activeTab === "learning" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Modern Top Greeting & Banner */}
            <div style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
              borderRadius: "20px",
              padding: "2.25rem 2.5rem",
              color: "#ffffff",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 30px -5px rgba(79, 70, 229, 0.35)"
            }}>
              {/* Background ambient lighting */}
              <div style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none"
              }} />

              <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(8px)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  marginBottom: "0.85rem"
                }}>
                  <Sparkles size={14} color="#a5b4fc" />
                  <span>Welcome back, {currentUser.name}! 🚀</span>
                </div>
                <h1 style={{ color: "#ffffff", fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.2 }}>
                  Your Future-Ready Learning Pathway
                </h1>
                <p style={{ color: "#c7d2fe", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                  You have enrolled in {enrolledCourses.length} course tracks and verified {totalQuizzesPassed} checkpoint milestones.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setActiveTab("explore")}
                    className="btn btn-sm"
                    style={{ backgroundColor: "#ffffff", color: "#4338ca", fontWeight: 700, padding: "0.6rem 1.2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                  >
                    Explore Complete Catalog
                    <ChevronRight size={15} />
                  </button>
                  {!diagnosticResult && (
                    <button
                      onClick={() => setShowDiagnosticModal(true)}
                      className="btn btn-sm"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                      Take Diagnostic Test
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modern 4-Column Stat Metric Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.25rem"
            }}>
              <div className="stat-card-modern">
                <div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Enrolled Tracks
                  </div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a" }}>
                    {enrolledCourses.length}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#4f46e5", fontWeight: 600, marginTop: "0.25rem" }}>
                    Across 3 Tiers
                  </div>
                </div>
                <div className="stat-icon-wrap" style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}>
                  <BookOpen size={24} />
                </div>
              </div>

              <div className="stat-card-modern">
                <div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Completed Lessons
                  </div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a" }}>
                    {totalCompletedLessons}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600, marginTop: "0.25rem" }}>
                    Verified Progress
                  </div>
                </div>
                <div className="stat-icon-wrap" style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}>
                  <CheckCircle2 size={24} />
                </div>
              </div>

              <div className="stat-card-modern">
                <div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Passed Checkpoints
                  </div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a" }}>
                    {totalQuizzesPassed}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#d97706", fontWeight: 600, marginTop: "0.25rem" }}>
                    Adaptive Quizzes
                  </div>
                </div>
                <div className="stat-icon-wrap" style={{ backgroundColor: "#fffbeb", color: "#d97706" }}>
                  <Target size={24} />
                </div>
              </div>

              <div className="stat-card-modern">
                <div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Certificates Earned
                  </div>
                  <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a" }}>
                    {certificates.length}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 600, marginTop: "0.25rem" }}>
                    Official Credentials
                  </div>
                </div>
                <div className="stat-icon-wrap" style={{ backgroundColor: "#f5f3ff", color: "#7c3aed" }}>
                  <Award size={24} />
                </div>
              </div>
            </div>

            {/* Weekly Study Rhythm SVG Bar Chart */}
            <WeeklyActivityChart
              daysBreakdown={activitySummary?.daysBreakdown || []}
              totalMinutes={activitySummary?.weeklyMinutesLearned || 0}
              streakDays={activitySummary?.currentStreak || 0}
              longestStreak={activitySummary?.longestStreak || 0}
              weeklyGoalMinutes={activitySummary?.weeklyGoalMinutes || 180}
              onOpenGoalModal={() => setIsGoalModalOpen(true)}
            />

            {/* Authentic Recent Learning Activity Timeline */}
            <div className="card" style={{ padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Recent Learning Activity</h3>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    Chronological record of verified lesson completions, checkpoint quizzes, and enrolled courses.
                  </p>
                </div>
                <span className="badge badge-indigo" style={{ fontSize: "0.75rem" }}>
                  {activitySummary?.recentActivities?.length || 0} Recorded Events
                </span>
              </div>

              {(!activitySummary?.recentActivities || activitySummary.recentActivities.length === 0) ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#64748b" }}>
                  <Clock size={36} color="#cbd5e1" style={{ margin: "0 auto 0.75rem auto" }} />
                  <p style={{ fontWeight: 600, color: "#475569", marginBottom: "0.25rem" }}>No learning activities logged yet</p>
                  <p style={{ fontSize: "0.82rem", color: "#94a3b8", maxWidth: "420px", margin: "0 auto" }}>
                    As you complete lessons and submit checkpoint quizzes, your date-stamped activity history will appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {activitySummary.recentActivities.slice(0, 5).map((act, aIdx) => {
                    const isQuiz = act.activityType === "quiz_attempt";
                    const isLesson = act.activityType === "lesson_completion";
                    const isEnroll = act.activityType === "course_enrollment";

                    return (
                      <div
                        key={act._id || aIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          backgroundColor: "#f8fafc",
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          flexWrap: "wrap",
                          gap: "0.75rem"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isQuiz ? "#fffbeb" : isLesson ? "#ecfdf5" : "#eef2ff",
                            color: isQuiz ? "#d97706" : isLesson ? "#10b981" : "#4f46e5",
                            flexShrink: 0
                          }}>
                            {isQuiz ? <Target size={18} /> : isLesson ? <CheckCircle2 size={18} /> : <BookOpen size={18} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>
                              {act.metadata?.lessonTitle || act.metadata?.quizTitle || act.metadata?.courseTitle || (isLesson ? "Completed Lesson" : isQuiz ? "Checkpoint Quiz" : "Course Enrolled")}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                              {act.metadata?.courseTitle && <span>{act.metadata.courseTitle} • </span>}
                              <span>{new Date(act.createdAt).toLocaleDateString()} at {new Date(act.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          {isQuiz && (
                            <span className={`badge ${act.passed ? "badge-success" : "badge-danger"}`} style={{ fontSize: "0.75rem" }}>
                              Score: {act.score}% {act.passed ? "(Passed)" : "(Retake)"}
                            </span>
                          )}
                          {isLesson && (
                            <span className="badge badge-emerald" style={{ fontSize: "0.75rem" }}>
                              +{act.durationMinutes || 15} mins
                            </span>
                          )}
                          {isEnroll && (
                            <span className="badge badge-indigo" style={{ fontSize: "0.75rem" }}>
                              Enrolled
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Resume Hero Card */}
            {continueCourse && (
              <div className="card" style={{
                padding: "1.75rem",
                borderRadius: "16px",
                border: "1.5px solid #e0e7ff",
                background: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
                boxShadow: "0 4px 15px -3px rgba(79, 70, 229, 0.08)"
              }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                    {/* Thumbnail Preview */}
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      flexShrink: 0,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      position: "relative"
                    }}>
                      <img
                        src={continueCourse.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
                        alt={continueCourse.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PlayCircle size={24} color="#ffffff" />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span className="badge badge-indigo">{continueCourse.learningGroup || continueCourse.category}</span>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Track</span>
                      </div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>{continueCourse.title}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#475569", marginTop: "0.2rem" }}>
                        Current Lesson: <strong>{continueLesson?.title || "Foundations"}</strong>
                      </p>
                      <div style={{ marginTop: "0.6rem", maxWidth: "340px" }}>
                        <ProgressBar value={continueProgress?.percentage || 0} max={100} showLabel={true} height={6} />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/course/${continueCourse.id || continueCourse._id || continueCourse.slug}`)}
                    className="btn btn-primary"
                    style={{ gap: "0.5rem", padding: "0.8rem 1.6rem", fontSize: "0.95rem" }}
                  >
                    <PlayCircle size={18} />
                    Resume Lesson
                  </button>
                </div>
              </div>
            )}

            {/* Enrolled Courses Grid */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
                    My Enrolled Courses ({enrolledCourses.length})
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    Progress through locked lessons and prove mastery with checkpoint quizzes.
                  </p>
                </div>

                {enrolledCourses.length > 0 && (
                  <button
                    onClick={() => setActiveTab("explore")}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: "0.4rem" }}
                  >
                    <Compass size={14} />
                    Explore More
                  </button>
                )}
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="card" style={{ textAlign: "center", padding: "3.5rem 1.5rem", borderRadius: "20px" }}>
                  <BookOpen size={48} color="#94a3b8" style={{ margin: "0 auto 1rem auto" }} />
                  <h3 style={{ fontSize: "1.25rem", color: "#0f172a" }}>You haven't enrolled in any courses yet</h3>
                  <p style={{ maxWidth: "460px", margin: "0.5rem auto 1.5rem auto", color: "#64748b", fontSize: "0.9rem" }}>
                    Choose from our complete {availableCourses.length}-course curriculum tailored for Standards 6–8, Standards 7–10, and Senior / Professional learners.
                  </p>
                  <button onClick={() => setActiveTab("explore")} className="btn btn-primary">
                    <Compass size={16} />
                    Explore All {availableCourses.length} Courses
                  </button>
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                  gap: "1.75rem"
                }}>
                  {enrolledCourses.map((course) => {
                    const prog = getStudentProgress(currentUser.id, course.id || course._id || course.slug);
                    return (
                      <CourseCard
                        key={course.id || course._id || course.slug}
                        course={course}
                        isEnrolled={true}
                        progress={prog}
                        onEnroll={handleEnroll}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EXPLORE  COURSES */}
        {activeTab === "explore" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                Complete Course Catalogue
              </h2>
              <p style={{ color: "#64748b", marginTop: "0.25rem" }}>
                Filter by your education level to access structured lessons, genuine exercises, and certifications.
              </p>
            </div>

            {/* Learning Group Filter Buttons */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {learningGroups.map((grp) => {
                const count = grp === "All Groups"
                  ? availableCourses.length
                  : availableCourses.filter(c => c.learningGroup === grp).length;

                return (
                  <button
                    key={grp}
                    onClick={() => setSelectedLearningGroup(grp)}
                    style={{
                      padding: "0.6rem 1.1rem",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      border: "1.5px solid",
                      cursor: "pointer",
                      backgroundColor: selectedLearningGroup === grp ? "#4f46e5" : "#ffffff",
                      color: selectedLearningGroup === grp ? "#ffffff" : "#475569",
                      borderColor: selectedLearningGroup === grp ? "#4f46e5" : "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <span>{grp}</span>
                    <span style={{
                      padding: "0.15rem 0.45rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      backgroundColor: selectedLearningGroup === grp ? "rgba(255,255,255,0.25)" : "#f1f5f9",
                      color: selectedLearningGroup === grp ? "#ffffff" : "#64748b"
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="form-input-wrapper" style={{ maxWidth: "450px" }}>
              <span className="form-input-icon">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${availableCourses.length} courses by title or topic...`}
                className="form-input has-left-icon"
              />
            </div>

            {/* Filtered Courses Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.75rem"
            }}>
              {filteredCourses.map((course) => {
                const enrolled = isEnrolled(currentUser.id, course.id);
                const prog = getStudentProgress(currentUser.id, course.id);

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolled}
                    progress={prog}
                    onEnroll={handleEnroll}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ASSESSMENTS & ATTEMPT HISTORY */}
        {activeTab === "assessments" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                Quiz & Assessment History
              </h2>
              <p style={{ color: "#64748b", marginTop: "0.25rem" }}>
                Permanent server-evaluated records of your checkpoint quizzes and certification exams.
              </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase" }}>
                      <th style={{ padding: "1rem 1.25rem" }}>Course</th>
                      <th style={{ padding: "1rem 1.25rem" }}>Checkpoint / Assessment</th>
                      <th style={{ padding: "1rem 1.25rem" }}>Score</th>
                      <th style={{ padding: "1rem 1.25rem" }}>Status</th>
                      <th style={{ padding: "1rem 1.25rem" }}>Attempt Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentHistory.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                          No quiz attempts recorded yet. Open a lesson to take your first checkpoint quiz!
                        </td>
                      </tr>
                    ) : (
                      assessmentHistory.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "1rem 1.25rem", fontWeight: 700, color: "#0f172a" }}>
                            {row.courseTitle}
                          </td>
                          <td style={{ padding: "1rem 1.25rem", color: "#475569" }}>
                            {row.lessonTitle}
                          </td>
                          <td style={{ padding: "1rem 1.25rem", fontWeight: 700 }}>
                            {row.score}%
                          </td>
                          <td style={{ padding: "1rem 1.25rem" }}>
                            <span className={`badge ${row.passed ? "badge-success" : "badge-danger"}`}>
                              {row.passed ? "Passed" : "Retake Required"}
                            </span>
                          </td>
                          <td style={{ padding: "1rem 1.25rem", color: "#64748b", fontSize: "0.8rem" }}>
                            {new Date(row.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES & ACHIEVEMENTS */}
        {activeTab === "achievements" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a" }}>
                  Your Academic Certificates ({certificates.length})
                </h2>
                <p style={{ color: "#64748b", marginTop: "0.25rem" }}>
                  Verified graduation credentials authenticated and saved permanently on MongoDB Atlas.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchCertificates}
                className="btn btn-secondary btn-sm"
                style={{ gap: "0.4rem" }}
              >
                <RotateCcw size={14} />
                Refresh Records
              </button>
            </div>

            {loadingCertificates ? (
              <div className="card" style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                <Award size={36} color="#4f46e5" style={{ margin: "0 auto 0.75rem auto", animation: "pulse 1.5s infinite" }} />
                <p>Loading your verified certificates from the database...</p>
              </div>
            ) : certificateError ? (
              <div className="card" style={{ padding: "2rem", backgroundColor: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}>
                <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Unable to load certificates: {certificateError}</p>
                <button type="button" onClick={fetchCertificates} className="btn btn-sm btn-secondary">
                  Try Again
                </button>
              </div>
            ) : certificates.length === 0 ? (
              <div className="card" style={{ textAlign: "center", padding: "3.5rem 1.5rem", borderRadius: "20px" }}>
                <Award size={48} color="#94a3b8" style={{ margin: "0 auto 1rem auto" }} />
                <h3 style={{ fontSize: "1.25rem", color: "#0f172a" }}>No Certificates Earned Yet</h3>
                <p style={{ maxWidth: "480px", margin: "0.5rem auto 1.5rem auto", color: "#64748b", fontSize: "0.9rem" }}>
                  Complete all lessons in a course track and pass the final certification examination with at least 70% to receive your verified credential.
                </p>
                <button onClick={() => setActiveTab("learning")} className="btn btn-primary">
                  <BookOpen size={16} />
                  Continue Learning
                </button>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.75rem"
              }}>
                {certificates.map((cert) => (
                  <div
                    key={cert._id || cert.certificateId}
                    className="card"
                    style={{
                      padding: "1.75rem",
                      borderRadius: "18px",
                      border: "1.5px solid #d97706",
                      background: "linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)",
                      boxShadow: "0 6px 20px -4px rgba(245, 158, 11, 0.15)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "14px",
                          backgroundColor: "#fef3c7",
                          color: "#d97706",
                          border: "1.5px solid #fde68a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 10px rgba(245, 158, 11, 0.2)"
                        }}>
                          <Award size={28} />
                        </div>

                        <span className="badge badge-amber" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                          Score: {cert.score}%
                        </span>
                      </div>

                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d97706", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {cert.learningGroup || "Core Curriculum"}
                      </span>

                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                        {cert.courseTitle}
                      </h3>

                      <div style={{
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "1px dashed #f59e0b",
                        fontSize: "0.75rem",
                        color: "#475569",
                        marginBottom: "1.25rem"
                      }}>
                        <div><strong>Credential ID:</strong> <code style={{ color: "#d97706" }}>{cert.certificateId}</code></div>
                        <div style={{ marginTop: "0.2rem" }}>
                          <strong>Issued:</strong> {new Date(cert.issuedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(cert)}
                      className="btn btn-sm btn-primary"
                      style={{
                        width: "100%",
                        gap: "0.4rem",
                        backgroundColor: "#d97706",
                        borderColor: "#d97706",
                        boxShadow: "0 2px 8px rgba(217, 119, 6, 0.3)"
                      }}
                    >
                      <Award size={15} />
                      View & Print Certificate
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* In-progress courses awaiting completion */}
            {enrolledCourses.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.35rem" }}>
                  Tracks In Progress Toward Certification
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.25rem" }}>
                  Pass all checkpoint quizzes and the comprehensive exam to unlock your certificates.
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.25rem"
                }}>
                  {enrolledCourses.map((course) => {
                    const cId = course.id || course._id || course.slug;
                    const prog = getStudentProgress(currentUser.id, cId);
                    const alreadyCertified = certificates.some(
                      (c) => c.courseId === cId || c.courseId?._id === cId || c.courseTitle === course.title
                    );

                    return (
                      <div key={cId} className="card" style={{ padding: "1.25rem", opacity: alreadyCertified ? 0.75 : 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{course.title}</h4>
                          <span className={`badge ${alreadyCertified ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.7rem" }}>
                            {alreadyCertified ? "Certified" : `${prog.percentage}%`}
                          </span>
                        </div>
                        <ProgressBar value={prog.percentage} max={100} showLabel={false} height={5} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                            {prog.completedLessons?.length || 0} / {course.lessons?.length || 0} lessons
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate(`/course/${cId}`)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
                          >
                            {alreadyCertified ? "Review" : "Continue"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* DIAGNOSTIC TEST MODAL */}
      {showDiagnosticModal && (
        <div className="modal-overlay" onClick={() => setShowDiagnosticModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "#0f172a" }}>Initial Diagnostic Assessment</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>
                  A short multi-topic evaluation to identify strengths and recommend courses.
                </p>
              </div>
              <button onClick={() => setShowDiagnosticModal(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitDiagnostic}>
              <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxHeight: "65vh", overflowY: "auto" }}>
                {diagnosticResult && (
                  <div style={{
                    padding: "1.25rem",
                    backgroundColor: "#ecfdf5",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0"
                  }}>
                    <h4 style={{ color: "#065f46", fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                      Your Last Assessment Score: {diagnosticResult.percentage}% ({diagnosticResult.score} / {diagnosticResult.total})
                    </h4>
                    <p style={{ fontSize: "0.85rem", color: "#047857" }}>
                      Demonstrated competencies in: <strong>{diagnosticResult.strengths.join(", ") || "Foundations"}</strong>.
                    </p>
                  </div>
                )}

                {DIAGNOSTIC_QUESTIONS.map((q, idx) => (
                  <div key={idx} style={{ padding: "1.25rem", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4f46e5", textTransform: "uppercase" }}>
                        {q.topic}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        Question {idx + 1} of {DIAGNOSTIC_QUESTIONS.length}
                      </span>
                    </div>
                    <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: "0.75rem" }}>{q.question}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {q.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.6rem 0.85rem",
                            borderRadius: "8px",
                            backgroundColor: diagnosticAnswers[idx] === oIdx ? "#eef2ff" : "#ffffff",
                            border: `1px solid ${diagnosticAnswers[idx] === oIdx ? "#4f46e5" : "#e2e8f0"}`,
                            cursor: "pointer",
                            fontSize: "0.9rem"
                          }}
                        >
                          <input
                            type="radio"
                            name={`diag-${idx}`}
                            checked={diagnosticAnswers[idx] === oIdx}
                            onChange={() => setDiagnosticAnswers({ ...diagnosticAnswers, [idx]: oIdx })}
                            style={{ accentColor: "#4f46e5" }}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowDiagnosticModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Diagnostic Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal for Real Saved Certificates */}
      {selectedCertificate && (
        <CertificateModal
          studentName={selectedCertificate.studentName || currentUser?.name || "Diligent Student"}
          courseTitle={selectedCertificate.courseTitle}
          learningGroup={selectedCertificate.learningGroup}
          completionDate={new Date(selectedCertificate.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          certificateId={selectedCertificate.certificateId}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {/* Fallback Certificate Modal */}
      {selectedCertCourse && !selectedCertificate && (
        <CertificateModal
          studentName={currentUser?.name || "Diligent Student"}
          courseTitle={selectedCertCourse.title}
          learningGroup={selectedCertCourse.learningGroup}
          completionDate={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          certificateId={`SL-CERT-${selectedCertCourse.id?.toUpperCase() || "CRED"}`}
          onClose={() => setSelectedCertCourse(null)}
        />
      )}

      {/* WEEKLY STUDY GOAL CONFIGURATION MODAL */}
      {isGoalModalOpen && (
        <div className="modal-overlay" onClick={() => setIsGoalModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "#0f172a" }}>Configure Weekly Study Goal</h3>
                <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.2rem" }}>
                  Set a realistic target based on your schedule to build consistent learning habits.
                </p>
              </div>
              <button onClick={() => setIsGoalModalOpen(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {goalUpdateNotice && (
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "10px", color: "#065f46", fontSize: "0.85rem", fontWeight: 600 }}>
                  {goalUpdateNotice}
                </div>
              )}

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", display: "block", marginBottom: "0.5rem" }}>
                  Select Target Pace
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { label: "Light", minutes: 60, desc: "~9 mins/day" },
                    { label: "Steady", minutes: 120, desc: "~17 mins/day" },
                    { label: "Standard", minutes: 180, desc: "~26 mins/day" },
                    { label: "Intensive", minutes: 300, desc: "~43 mins/day" }
                  ].map((preset) => (
                    <button
                      key={preset.minutes}
                      type="button"
                      onClick={() => setCustomGoalMinutes(preset.minutes)}
                      style={{
                        padding: "0.85rem",
                        borderRadius: "10px",
                        border: customGoalMinutes === preset.minutes ? "2px solid #4f46e5" : "1px solid #e2e8f0",
                        backgroundColor: customGoalMinutes === preset.minutes ? "#eef2ff" : "#ffffff",
                        cursor: "pointer",
                        textAlign: "left"
                      }}
                    >
                      <div style={{ fontWeight: 700, color: customGoalMinutes === preset.minutes ? "#4f46e5" : "#0f172a" }}>
                        {preset.label} ({preset.minutes}m)
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.2rem" }}>
                        {preset.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", display: "block", marginBottom: "0.4rem" }}>
                  Custom Weekly Goal (Minutes)
                </label>
                <input
                  type="number"
                  min={15}
                  max={3000}
                  step={15}
                  value={customGoalMinutes}
                  onChange={(e) => setCustomGoalMinutes(Math.max(15, parseInt(e.target.value, 10) || 15))}
                  className="form-input"
                  style={{ width: "100%" }}
                />
                <span style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.3rem", display: "block" }}>
                  Equivalent to ~{Math.round(customGoalMinutes / 7)} minutes per calendar day.
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setIsGoalModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateWeeklyGoal(customGoalMinutes)}
                disabled={updatingGoal}
                className="btn btn-primary"
              >
                {updatingGoal ? "Saving..." : "Save Goal"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar-desktop {
            display: none !important;
          }
          .mobile-tab-bar {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
