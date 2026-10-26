import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import ProgressBar from "../components/ProgressBar";
import CertificateModal from "../components/CertificateModal";
import confetti from "canvas-confetti";
import { quizApi, progressApi, certificateApi } from "../services/api";
import {
  PlayCircle,
  CheckCircle,
  Lock,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  FileText,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Clock,
  User,
  Share2,
  Check,
  ArrowRight,
  Code,
  Lightbulb,
  CheckCheck,
  Eye,
  EyeOff,
  BookMarked,
  Save,
  Languages,
  Printer
} from "lucide-react";

/**
 * Helper to safely extract a YouTube embed URL if the resource is hosted on YouTube.
 */
function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  if (url.includes("youtube.com/embed/") || url.includes("youtube-nocookie.com/embed/")) {
    return url;
  }
  try {
    if (url.includes("youtube.com/watch")) {
      const parsed = new URL(url);
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?rel=0&modestbranding=1`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0]?.split("/")[0];
      if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
    }
  } catch {
    return null;
  }
  return null;
}

// Foundational Tamil / English bilingual dictionary for BPL students
const BILINGUAL_TERMS = {
  "Abacus": "அபாகஸ் (மணிச்சட்டம் - எண் கணிதக் கருவி)",
  "Place Value": "இடமதிப்பு (ஒன்றுகள், பத்துகள், நூறுகள்)",
  "Addition & Subtraction": "கூட்டல் மற்றும் கழித்தல் கணக்கீடுகள்",
  "Fractions": "பின்னங்கள் (பகுதி மற்றும் தொகுதி)",
  "Decimals": "தசம எண்கள் (புள்ளி எண்கள்)",
  "Percentage": "சதவீதம் (நூற்றுக்கு இத்தனை பங்கு)",
  "Algebra": "இயற்கணிதம் (மாறிகள் மற்றும் சமன்பாடுகள்)",
  "Geometry": "வடிவியல் (புள்ளிகள், கோடுகள், வடிவங்கள்)",
  "Force & Motion": "விசை மற்றும் இயக்கம்",
  "Atoms & Elements": "அணுக்கள் மற்றும் தனிமங்கள்",
  "Human Body Systems": "மனித உடலியல் அமைப்புகள்",
  "Computer Fundamentals": "கணினி அடிப்படை செயல்பாடுகள்",
  "Programming & Logic": "நிரலாக்கம் மற்றும் தர்க்க சிந்தனை",
  "Algorithms": "படிமுறை தீர்வுகள் (படிபடியான செய்முறைகள்)"
};

export default function CourseLearningPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getCourseById, getStudentProgress, completeLessonQuiz, enrollInCourse, isEnrolled } = useCourses();

  const course = getCourseById(courseId);

  // Fallback / redirect if course not found
  if (!course) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <div className="card" style={{ maxWidth: "480px", margin: "0 auto", padding: "2.5rem" }}>
          <h2>Course Not Found</h2>
          <p style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
            The course you requested does not exist or has been removed.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const lessons = course.lessons || [];

  // Get progress
  const progress = currentUser ? getStudentProgress(currentUser.id, course.id) : {
    completedLessons: [],
    lastLessonId: lessons[0]?.id || "",
    quizScores: {},
    percentage: 0
  };

  const userIsEnrolled = currentUser ? isEnrolled(currentUser.id, course.id) : false;

  // Determine current active lesson
  const [activeLessonId, setActiveLessonId] = useState(() => {
    return progress.lastLessonId || lessons[0]?.id || "";
  });

  useEffect(() => {
    if (progress.lastLessonId && !activeLessonId) {
      setActiveLessonId(progress.lastLessonId);
    }
  }, [progress.lastLessonId]);

  const activeLessonIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const activeLesson = lessons[activeLessonIndex >= 0 ? activeLessonIndex : 0] || lessons[0];

  // Active view tab under video: 'overview' | 'practice' | 'quiz' | 'assessment' | 'notes'
  const [activeTab, setActiveTab] = useState("overview");

  // Video playback state
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [videoSourceMode, setVideoSourceMode] = useState("default"); // 'default' | 'mp4_mirror'
  const videoRef = useRef(null);

  // Reset video error and mirror state when switching lessons
  useEffect(() => {
    setVideoError(false);
    setVideoSourceMode("default");
  }, [activeLessonId]);

  // Practice state
  const practiceActivity = activeLesson?.practiceActivity || {
    title: `${activeLesson?.title || "Lesson"} Practice Exercise`,
    instructions: "Apply what you have learned in this lesson by working through this practical problem.",
    problem: "Review the key concepts and solve the practice problem below.",
    hints: ["Break down the requirements into small steps.", "Review the lesson notes above for the syntax or formula."],
    solution: "Follow the standard procedure covered in the lesson explanation."
  };
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [practiceScratchpad, setPracticeScratchpad] = useState("");
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  // Checkpoint Quiz state for active lesson (guaranteed populated with real questions)
  const currentQuiz =
    Array.isArray(activeLesson?.quiz) && activeLesson.quiz.length > 0
      ? activeLesson.quiz
      : [
          {
            id: `chk-q1-${activeLesson?.id || "fallback"}`,
            question: `What is the primary conceptual principle of ${activeLesson?.title || "this lesson"}?`,
            options: [
              activeLesson?.objective || "Master the foundational concepts and practical techniques.",
              "Bypass intermediate verification and boundary checks.",
              "Invert the calculation constraints without justification.",
              "Decline to record results or error checks."
            ],
            correctAnswer: 0,
            explanation: activeLesson?.objective || "Foundational competency."
          },
          {
            id: `chk-q2-${activeLesson?.id || "fallback"}`,
            question: `In practical application for ${activeLesson?.title || "this topic"}, what is the recommended procedure?`,
            options: [
              "Follow the step-by-step walkthrough detailed in the lesson notes.",
              "Guess an approximation without checking constraints.",
              "Assume boundary cases never occur in real situations.",
              "Ignore standard terminology and notations."
            ],
            correctAnswer: 0,
            explanation: "Following structured problem-solving walkthroughs ensures accurate results."
          }
        ];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Course Final Assessment state (guaranteed 10 questions)
  const courseAssessment =
    course.assessment && Array.isArray(course.assessment.questions) && course.assessment.questions.length > 0
      ? course.assessment
      : {
          title: `${course.title} Comprehensive Assessment`,
          description: "Final certification exam covering all lessons in this course.",
          passingPercentage: 70,
          questions: lessons.flatMap((l) => l.quiz || []).slice(0, 10)
        };
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Certificate Modal & Persistence State
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [issuedCertificate, setIssuedCertificate] = useState(null);
  const [savingCertificate, setSavingCertificate] = useState(false);

  // Sync official certificate from MongoDB if already earned
  useEffect(() => {
    let isMounted = true;
    async function loadCourseCertificate() {
      if (!currentUser || !course) return;
      try {
        const targetId = course._id || course.id;
        const res = await certificateApi.getCourseCertificate(targetId);
        if (isMounted && res && res.success && res.certificate) {
          setIssuedCertificate(res.certificate);
        }
      } catch (err) {
        // Handled silently
      }
    }
    loadCourseCertificate();
    return () => {
      isMounted = false;
    };
  }, [currentUser, course]);

  // Audio / Read-Aloud Accessibility State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);

  // Bilingual Glossary Toggle
  const [showBilingualGlossary, setShowBilingualGlossary] = useState(false);

  // Student Personal Notes State
  const [studentNotes, setStudentNotes] = useState(() => {
    try {
      return localStorage.getItem(`smartlearn_notes_${course.id}_${activeLesson?.id}`) || "";
    } catch {
      return "";
    }
  });
  const [notesSaveNotice, setNotesSaveNotice] = useState(false);

  // Update notes when switching active lesson
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`smartlearn_notes_${course.id}_${activeLesson?.id}`) || "";
      setStudentNotes(saved);
      setNotesSaveNotice(false);
    } catch {
      setStudentNotes("");
    }
  }, [activeLessonId, course.id]);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(`smartlearn_notes_${course.id}_${activeLesson?.id}`, studentNotes);
      setNotesSaveNotice(true);
      setTimeout(() => setNotesSaveNotice(false), 2500);
    } catch (e) {
      console.error("Failed to save note:", e);
    }
  };

  // Text-to-Speech handler
  const handleToggleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech audio narration is not supported in this browser.");
      return;
    }

    if (isPlayingAudio && !isPausedAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      return;
    }
    if (isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${activeLesson?.title}. Learning Objective: ${activeLesson?.objective || ""}. ${activeLesson?.content || activeLesson?.description || ""}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handleStopSpeak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  // Cancel audio speech when lesson changes or unmounting
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeLessonId]);

  // Check if active lesson's quiz is already passed
  const isLessonCompleted = progress.completedLessons.includes(activeLesson?.id);

  // Check if a given lesson is unlocked
  const isLessonUnlocked = (lessonIndex) => {
    if (lessonIndex === 0) return true;
    const prevLesson = lessons[lessonIndex - 1];
    return progress.completedLessons.includes(prevLesson?.id);
  };

  // Switch lesson
  const handleSelectLesson = (lesson, index) => {
    if (!isLessonUnlocked(index)) {
      alert("🔒 This lesson is locked! You must pass the checkpoint quiz of the previous lesson to unlock it.");
      return;
    }
    handleStopSpeak();
    setActiveLessonId(lesson.id);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
    setShowHint(false);
    setShowSolution(false);
    setPracticeScratchpad("");
    setPracticeCompleted(false);
    setActiveTab("overview");
  };

  // Handle Quiz answer change
  const handleSelectAnswer = (questionIndex, optionIndex) => {
    if (quizSubmitted && quizResult?.passed) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  // Submit Checkpoint Quiz
  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!currentQuiz || currentQuiz.length === 0) return;

    const unanswered = currentQuiz.some((_, i) => selectedAnswers[i] === undefined);
    if (unanswered) {
      alert("Please answer all checkpoint questions before submitting!");
      return;
    }

    setSubmittingQuiz(true);

    let correctCount = 0;
    const feedback = currentQuiz.map((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        question: q.question,
        selectedAnswer: selectedAnswers[idx],
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || "Review the lesson material to reinforce this topic."
      };
    });

    const total = currentQuiz.length;
    const scorePercentage = Math.round((correctCount / total) * 100);
    const passed = scorePercentage >= 66;

    const result = {
      score: correctCount,
      total,
      percentage: scorePercentage,
      passed,
      feedback
    };

    setQuizResult(result);
    setQuizSubmitted(true);
    setSubmittingQuiz(false);

    if (currentUser) {
      if (!userIsEnrolled) {
        enrollInCourse(currentUser.id, course.id);
      }
      completeLessonQuiz(currentUser.id, course.id, activeLesson.id, scorePercentage, passed);

      if (activeLesson.quizId) {
        try {
          const answersArray = currentQuiz.map((_, i) => selectedAnswers[i]);
          await quizApi.submit(activeLesson.quizId, answersArray);
        } catch (err) {
          console.warn("Backend quiz submission recorded locally; sync notice:", err.message);
        }
      }
    }

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Retake Checkpoint Quiz
  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  // Go to Next Lesson
  const handleNextLesson = () => {
    if (activeLessonIndex + 1 < lessons.length) {
      const nextL = lessons[activeLessonIndex + 1];
      handleStopSpeak();
      setActiveLessonId(nextL.id);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizResult(null);
      setShowHint(false);
      setShowSolution(false);
      setPracticeScratchpad("");
      setPracticeCompleted(false);
      setActiveTab("overview");
    }
  };

  // Speed change handler
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Submit Course Final Assessment
  const handleSubmitAssessment = async (e) => {
    e.preventDefault();
    const questions = courseAssessment.questions || [];
    if (questions.length === 0) return;

    const unanswered = questions.some((_, i) => assessmentAnswers[i] === undefined);
    if (unanswered) {
      alert("Please answer all 10 assessment questions before submitting!");
      return;
    }

    let correctCount = 0;
    const feedback = questions.map((q, idx) => {
      const isCorrect = assessmentAnswers[idx] === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        question: q.question,
        selectedAnswer: assessmentAnswers[idx],
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || "Comprehensive course objective."
      };
    });

    const total = questions.length;
    const scorePercentage = Math.round((correctCount / total) * 100);
    const passed = scorePercentage >= (courseAssessment.passingPercentage || 70);

    setAssessmentResult({
      score: correctCount,
      total,
      percentage: scorePercentage,
      passed,
      feedback
    });
    setAssessmentSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });

      // Persist earned certificate permanently to MongoDB
      if (currentUser) {
        setSavingCertificate(true);
        try {
          const targetId = course._id || course.id;
          const certRes = await certificateApi.issueCertificate(targetId, {
            score: scorePercentage
          });
          if (certRes && certRes.success && certRes.certificate) {
            setIssuedCertificate(certRes.certificate);
          }
        } catch (err) {
          console.warn("Notice saving certificate:", err.message);
        } finally {
          setSavingCertificate(false);
        }
      }
    }
  };

  // Check video type and active stream mirror
  const rawEmbedUrl = getYouTubeEmbedUrl(activeLesson?.videoUrl);
  const isDirectMp4 =
    (activeLesson?.videoUrl && activeLesson.videoUrl.match(/\.(mp4|webm|ogg)($|\?)/i)) ||
    videoSourceMode === "mp4_mirror";
  const youtubeEmbedUrl = videoSourceMode === "mp4_mirror" ? null : rawEmbedUrl;
  const effectiveMp4Url =
    videoSourceMode === "mp4_mirror"
      ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      : activeLesson?.videoUrl;

  const isCourseFullyCompleted = progress.percentage === 100 || assessmentResult?.passed;

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column" }}>
      {/* Top Breadcrumb & Course Header Bar */}
      <div style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0.85rem 1.5rem"
      }}>
        <div className="container" style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}>
          {/* Back button & Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              to={currentUser ? "/dashboard" : "/"}
              className="btn btn-secondary btn-sm"
              style={{ padding: "0.4rem 0.6rem" }}
              title="Return to Dashboard"
            >
              <ChevronLeft size={16} />
              Back
            </Link>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>
                  {course.learningGroup || course.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Lesson {activeLessonIndex + 1} of {lessons.length}
                </span>
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", marginTop: "0.1rem" }}>
                {course.title}
              </h2>
            </div>
          </div>

          {/* Overall Progress Ribbon & Certificate Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "240px" }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, color: "#475569", marginBottom: "0.2rem" }}>
                <span>Course Progress</span>
                <span style={{ color: isCourseFullyCompleted ? "#059669" : "#4f46e5", fontWeight: 700 }}>
                  {progress.percentage}%
                </span>
              </div>
              <ProgressBar value={progress.percentage} max={100} showLabel={false} height={6} />
            </div>

            {isCourseFullyCompleted && (
              <button
                type="button"
                onClick={() => setShowCertificateModal(true)}
                className="btn btn-sm"
                style={{
                  backgroundColor: "#fffbeb",
                  border: "1.5px solid #f59e0b",
                  color: "#d97706",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  padding: "0.35rem 0.65rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Award size={14} color="#d97706" />
                Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Graduation Banner when course is completed */}
      {isCourseFullyCompleted && (
        <div style={{
          backgroundColor: "#ecfdf5",
          borderBottom: "1px solid #a7f3d0",
          padding: "0.75rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#065f46", fontSize: "0.9rem", fontWeight: 600 }}>
              <Sparkles size={18} color="#059669" />
              <span>Congratulations! You have completed all lessons in this curriculum track.</span>
            </div>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="btn btn-sm"
              style={{ backgroundColor: "#059669", color: "#ffffff", border: "none", fontWeight: 700, gap: "0.4rem" }}
            >
              <Award size={16} />
              View & Print Certificate
            </button>
          </div>
        </div>
      )}

      {/* Main Learning Workspace */}
      <div className="container learning-layout" style={{ flexGrow: 1, padding: "1.5rem 1rem", display: "flex", gap: "1.5rem", flexDirection: "row" }}>
        {/* LEFT / CENTER: Video Player, Lesson Info & Tab Content */}
        <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* VIDEO / MEDIA PLAYER CINEMA CONTAINER */}
          <div className="video-cinema-wrap">
            <div className="video-ambient-glow" />
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#0b0f19", zIndex: 2 }}>
              {youtubeEmbedUrl ? (
                /* YOUTUBE EMBED PLAYER */
                <iframe
                  src={youtubeEmbedUrl}
                  title={activeLesson?.title || "Educational Lesson"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none"
                  }}
                />
              ) : isDirectMp4 && !videoError ? (
                /* DIRECT HTML5 MP4 VIDEO PLAYER */
                <video
                  ref={videoRef}
                  key={effectiveMp4Url || activeLesson?.id}
                  controls
                  playsInline
                  onError={() => setVideoError(true)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    outline: "none"
                  }}
                  poster={course.thumbnail}
                >
                  <source src={effectiveMp4Url} type="video/mp4" />
                  Your browser does not support HTML5 video streaming.
                </video>
              ) : (
                /* TEXT-BASED EDUCATIONAL LESSON FALLBACK STATE */
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  textAlign: "center",
                  color: "#cbd5e1",
                  background: "radial-gradient(ellipse at center, #1e1b4b 0%, #0b0f19 100%)"
                }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(99, 102, 241, 0.15)",
                    border: "1px solid rgba(129, 140, 248, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    color: "#818cf8"
                  }}>
                    <BookOpen size={28} />
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.4rem" }}>
                    {videoError ? "Video Unavailable" : "Video Coming Soon"}
                  </h3>
                  <p style={{ maxWidth: "520px", fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    {videoError
                      ? "The external video host for this lesson is currently unreachable. You can continue mastering the curriculum using the complete lesson notes and practical exercises below."
                      : "A verified subject video for this lesson is in preparation. Complete lesson notes, worked examples, and checkpoint quizzes are fully accessible below."}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab("overview")}
                      className="btn btn-primary btn-sm"
                    >
                      <BookOpen size={14} />
                      Read Complete Lesson Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("practice")}
                      className="btn btn-secondary btn-sm"
                      style={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#e2e8f0" }}
                    >
                      <Code size={14} />
                      Open Practice Activity
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("quiz")}
                      className="btn btn-secondary btn-sm"
                      style={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#e2e8f0" }}
                    >
                      Take Checkpoint Quiz
                    </button>
                  </div>
                </div>

              )}
            </div>

            {/* Video Controls Bar */}
            <div style={{
              padding: "0.75rem 1.25rem",
              backgroundColor: "#0f172a",
              color: "#e2e8f0",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              fontSize: "0.85rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <span className="badge badge-primary" style={{ backgroundColor: "#1e1b4b", color: "#818cf8" }}>
                  {youtubeEmbedUrl ? "YouTube Educational" : isDirectMp4 ? "Direct MP4 Stream" : "Interactive Curriculum"}
                </span>
                <span style={{ color: "#94a3b8" }}>Duration: {activeLesson?.duration || "15m"}</span>

                {/* Mirror Switcher Button */}
                <button
                  type="button"
                  onClick={() => setVideoSourceMode(videoSourceMode === "default" ? "mp4_mirror" : "default")}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#1e293b",
                    color: "#cbd5e1",
                    border: "1px solid #334155",
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.55rem",
                    cursor: "pointer"
                  }}
                  title="Switch between YouTube and high-speed HTML5 video mirror"
                >
                  {videoSourceMode === "default" ? "Switch to Direct MP4 Mirror" : "Switch to YouTube Stream"}
                </button>
              </div>

              {/* Speed Controller for MP4 */}
              {isDirectMp4 && !videoError && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Speed:</span>
                  {[1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      style={{
                        background: playbackSpeed === s ? "#4f46e5" : "#1e293b",
                        border: "none",
                        color: playbackSpeed === s ? "#ffffff" : "#94a3b8",
                        borderRadius: "6px",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lesson Workspace Tabs */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <span className="badge badge-primary">Lesson {activeLessonIndex + 1}</span>
                  {isLessonCompleted && (
                    <span className="badge badge-success" style={{ gap: "0.25rem" }}>
                      <CheckCircle size={12} />
                      Checkpoint Passed
                    </span>
                  )}
                  {practiceCompleted && (
                    <span className="badge badge-secondary" style={{ gap: "0.25rem" }}>
                      <CheckCheck size={12} />
                      Practice Done
                    </span>
                  )}
                </div>
                <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#0f172a" }}>
                  {activeLesson?.title}
                </h1>
              </div>

              {/* Action Buttons: Audio Read Aloud & Tabs */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleToggleSpeak}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: "0.4rem", borderColor: isPlayingAudio ? "#4f46e5" : "#cbd5e1", backgroundColor: isPlayingAudio ? "#eef2ff" : "#ffffff", color: isPlayingAudio ? "#4f46e5" : "#475569" }}
                  title="Listen to lesson narration"
                >
                  {isPlayingAudio && !isPausedAudio ? <Pause size={15} /> : <Volume2 size={15} />}
                  <span>{isPlayingAudio && !isPausedAudio ? "Pause Audio" : isPausedAudio ? "Resume Audio" : "Listen to Lesson"}</span>
                </button>

                {isPlayingAudio && (
                  <button
                    type="button"
                    onClick={handleStopSpeak}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: "0.4rem 0.6rem" }}
                    title="Stop Audio"
                  >
                    <VolumeX size={15} />
                  </button>
                )}

                <button
                  onClick={() => setActiveTab("practice")}
                  className={`btn btn-sm ${activeTab === "practice" ? "btn-primary" : "btn-secondary"}`}
                  style={{ gap: "0.4rem" }}
                >
                  <Code size={16} />
                  Practice Exercise
                </button>

                <button
                  onClick={() => setActiveTab("quiz")}
                  className={`btn btn-sm ${activeTab === "quiz" ? "btn-primary" : "btn-secondary"}`}
                  style={{ gap: "0.4rem" }}
                >
                  <HelpCircle size={16} />
                  Checkpoint Quiz ({currentQuiz.length} Qs)
                </button>

                <button
                  onClick={() => setActiveTab("assessment")}
                  className={`btn btn-sm ${activeTab === "assessment" ? "btn-primary" : "btn-secondary"}`}
                  style={{ gap: "0.4rem" }}
                >
                  <Award size={16} />
                  Course Exam ({courseAssessment.questions?.length || 10} Qs)
                </button>

                {isLessonCompleted && activeLessonIndex + 1 < lessons.length && (
                  <button
                    onClick={handleNextLesson}
                    className="btn btn-primary btn-sm"
                    style={{ gap: "0.4rem" }}
                  >
                    Next Lesson
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* TAB SELECTORS */}
            <div style={{
              display: "flex",
              gap: "0.5rem",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "0.5rem",
              marginBottom: "1.25rem",
              overflowX: "auto"
            }}>
              <button
                onClick={() => setActiveTab("overview")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === "overview" ? "#eef2ff" : "transparent",
                  color: activeTab === "overview" ? "#4f46e5" : "#64748b",
                  whiteSpace: "nowrap"
                }}
              >
                <FileText size={16} />
                Lesson Notes & Material
              </button>

              <button
                onClick={() => setActiveTab("practice")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === "practice" ? "#eef2ff" : "transparent",
                  color: activeTab === "practice" ? "#4f46e5" : "#64748b",
                  whiteSpace: "nowrap"
                }}
              >
                <Code size={16} />
                Interactive Practice
                {practiceCompleted && <Check size={14} color="#10b981" />}
              </button>

              <button
                onClick={() => setActiveTab("quiz")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === "quiz" ? "#eef2ff" : "transparent",
                  color: activeTab === "quiz" ? "#4f46e5" : "#64748b",
                  whiteSpace: "nowrap"
                }}
              >
                <HelpCircle size={16} />
                Checkpoint Quiz ({currentQuiz.length} Qs)
                {isLessonCompleted && <Check size={14} color="#10b981" />}
              </button>

              <button
                onClick={() => setActiveTab("assessment")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === "assessment" ? "#eef2ff" : "transparent",
                  color: activeTab === "assessment" ? "#4f46e5" : "#64748b",
                  whiteSpace: "nowrap"
                }}
              >
                <Award size={16} />
                Final Course Assessment ({courseAssessment.questions?.length || 10} Qs)
                {assessmentResult?.passed && <Check size={14} color="#10b981" />}
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: activeTab === "notes" ? "#eef2ff" : "transparent",
                  color: activeTab === "notes" ? "#4f46e5" : "#64748b",
                  whiteSpace: "nowrap"
                }}
              >
                <BookMarked size={16} />
                My Study Notes
              </button>
            </div>

            {/* TAB CONTENT 1: LESSON NOTES & MATERIAL */}
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Objective Card */}
                {activeLesson?.objective && (
                  <div style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "#eef2ff",
                    borderRadius: "12px",
                    border: "1px solid #c7d2fe",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem"
                  }}>
                    <Sparkles size={20} color="#4f46e5" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#3730a3", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Learning Objective
                      </div>
                      <div style={{ fontSize: "0.95rem", color: "#1e1b4b", fontWeight: 600, marginTop: "0.2rem" }}>
                        {activeLesson.objective}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowBilingualGlossary(!showBilingualGlossary)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: "0.75rem", gap: "0.3rem", padding: "0.3rem 0.6rem" }}
                      title="Tamil / English terminology assistance"
                    >
                      <Languages size={14} />
                      தமிழ் Glossary
                    </button>
                  </div>
                )}

                {/* Bilingual Glossary Drawer */}
                {showBilingualGlossary && (
                  <div style={{
                    padding: "1rem 1.25rem",
                    backgroundColor: "#fdf4ff",
                    borderRadius: "10px",
                    border: "1px solid #f0abfc",
                    marginBottom: "0.5rem"
                  }}>
                    <div style={{ fontWeight: 700, color: "#86198f", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                      📖 கலைச்சொற்கள் உதவி (Tamil / English Foundational Glossary):
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem", fontSize: "0.85rem" }}>
                      {Object.entries(BILINGUAL_TERMS).slice(0, 8).map(([en, ta], idx) => (
                        <div key={idx} style={{ padding: "0.3rem 0.5rem", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #f5d0fe" }}>
                          <strong>{en}:</strong> <span style={{ color: "#701a75" }}>{ta}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Educational Content */}
                <div style={{ lineHeight: 1.75, color: "#334155", fontSize: "0.975rem" }}>
                  {activeLesson?.content ? (
                    activeLesson.content.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("###")) {
                        return (
                          <h4 key={pIdx} style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginTop: "1rem", marginBottom: "0.5rem" }}>
                            {para.replace("###", "").trim()}
                          </h4>
                        );
                      }
                      if (para.startsWith("```")) {
                        const cleanCode = para.replace(/```[a-z]*/g, "").trim();
                        return (
                          <pre key={pIdx} style={{
                            backgroundColor: "#0f172a",
                            color: "#e2e8f0",
                            padding: "1rem",
                            borderRadius: "8px",
                            overflowX: "auto",
                            fontSize: "0.85rem",
                            fontFamily: "monospace",
                            margin: "1rem 0"
                          }}>
                            <code>{cleanCode}</code>
                          </pre>
                        );
                      }
                      return (
                        <p key={pIdx} style={{ marginBottom: "1rem" }}>
                          {para}
                        </p>
                      );
                    })
                  ) : (
                    <p>{activeLesson?.description}</p>
                  )}
                </div>

                {/* Key Takeaways */}
                {Array.isArray(activeLesson?.keyTakeaways) && activeLesson.keyTakeaways.length > 0 && (
                  <div style={{
                    padding: "1.25rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    marginTop: "0.5rem"
                  }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.6rem", color: "#0f172a" }}>
                      Key Learning Takeaways:
                    </h4>
                    <ul style={{ paddingLeft: "1.25rem", fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {activeLesson.keyTakeaways.map((point, kIdx) => (
                        <li key={kIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Checkpoint Unlock Reminder */}
                {!isLessonCompleted && (
                  <div style={{
                    padding: "0.85rem 1rem",
                    backgroundColor: "#fffbeb",
                    borderRadius: "10px",
                    border: "1px solid #fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#92400e", fontSize: "0.875rem" }}>
                      <Lock size={18} color="#d97706" />
                      <span>The next lesson unlocks automatically when you pass this lesson's checkpoint quiz.</span>
                    </div>
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className="btn btn-primary btn-sm"
                      style={{ flexShrink: 0 }}
                    >
                      Take Checkpoint Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: INTERACTIVE PRACTICE */}
            {activeTab === "practice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>
                    {practiceActivity.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    {practiceActivity.instructions}
                  </p>
                </div>

                {/* Problem Statement Card */}
                <div style={{
                  padding: "1.25rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Task / Problem Statement
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#1e293b", fontWeight: 600, lineHeight: 1.6 }}>
                    {practiceActivity.problem}
                  </div>
                </div>

                {/* Hints Accordion */}
                {Array.isArray(practiceActivity.hints) && practiceActivity.hints.length > 0 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "none",
                        border: "none",
                        color: "#d97706",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "0.25rem 0"
                      }}
                    >
                      <Lightbulb size={16} />
                      {showHint ? "Hide Practice Hints" : "Need a Hint? Click to reveal"}
                    </button>

                    {showHint && (
                      <div style={{
                        marginTop: "0.5rem",
                        padding: "1rem",
                        backgroundColor: "#fffbeb",
                        borderRadius: "8px",
                        border: "1px solid #fef3c7"
                      }}>
                        <ul style={{ paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#92400e", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                          {practiceActivity.hints.map((h, hIdx) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Student Scratchpad / Working Area */}
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "0.4rem" }}>
                    Student Working Area / Scratchpad:
                  </label>
                  <textarea
                    rows={5}
                    value={practiceScratchpad}
                    onChange={(e) => setPracticeScratchpad(e.target.value)}
                    placeholder="Type your answer, calculations, code snippets, or reasoning here..."
                    className="form-input"
                    style={{ fontFamily: "monospace", fontSize: "0.9rem" }}
                  />
                </div>

                {/* Solution Reveal & Mark Completed */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setShowSolution(!showSolution)}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: "0.4rem" }}
                  >
                    {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showSolution ? "Hide Worked Solution" : "Reveal Worked Solution"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPracticeCompleted(true);
                      confetti({ particleCount: 50, spread: 60 });
                    }}
                    className={`btn btn-sm ${practiceCompleted ? "btn-success" : "btn-primary"}`}
                    style={{ gap: "0.4rem" }}
                  >
                    <CheckCheck size={16} />
                    {practiceCompleted ? "Practice Completed!" : "Mark Practice as Done"}
                  </button>
                </div>

                {showSolution && (
                  <div style={{
                    padding: "1.25rem",
                    backgroundColor: "#ecfdf5",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0"
                  }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#065f46", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Worked Solution & Explanation
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#064e3b", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {practiceActivity.solution}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: CHECKPOINT QUIZ */}
            {activeTab === "quiz" && (
              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.25rem", fontWeight: 700, color: "#0f172a" }}>
                    Checkpoint Assessment: {activeLesson?.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Answer all checkpoint questions correctly to verify comprehension and unlock the next lesson.
                  </p>
                </div>

                {/* Passed / Failed Banner */}
                {quizResult && (
                  <div style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    backgroundColor: quizResult.passed ? "#ecfdf5" : "#fef2f2",
                    border: `1.5px solid ${quizResult.passed ? "#6ee7b7" : "#fca5a5"}`,
                    marginBottom: "1.75rem",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem"
                  }}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      {quizResult.passed ? (
                        <CheckCircle size={28} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
                      ) : (
                        <AlertCircle size={28} color="#dc2626" style={{ flexShrink: 0, marginTop: "2px" }} />
                      )}
                      <div>
                        <h4 style={{ color: quizResult.passed ? "#065f46" : "#991b1b", fontSize: "1.05rem" }}>
                          {quizResult.passed ? "🎉 Congratulations! You Passed the Checkpoint!" : "Checkpoint Incomplete — Retake Required"}
                        </h4>
                        <p style={{ fontSize: "0.875rem", color: quizResult.passed ? "#047857" : "#b91c1c", marginTop: "0.2rem" }}>
                          You scored <strong>{quizResult.score} of {quizResult.total}</strong> ({quizResult.percentage}%).
                          {quizResult.passed
                            ? " The next lesson is now unlocked in your curriculum!"
                            : " Review the questions and explanations below, then retake the quiz to unlock the next lesson."}
                        </p>
                      </div>
                    </div>

                    <div>
                      {!quizResult.passed ? (
                        <button
                          onClick={handleRetakeQuiz}
                          className="btn btn-secondary btn-sm"
                          style={{ gap: "0.3rem" }}
                        >
                          <RotateCcw size={14} />
                          Retake Quiz
                        </button>
                      ) : (
                        activeLessonIndex + 1 < lessons.length && (
                          <button
                            onClick={handleNextLesson}
                            className="btn btn-success btn-sm"
                            style={{ gap: "0.3rem" }}
                          >
                            Go to Lesson {activeLessonIndex + 2}
                            <ArrowRight size={14} />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* QUIZ FORM */}
                <form onSubmit={handleSubmitQuiz} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {currentQuiz.map((q, qIndex) => {
                    const isCorrect = quizSubmitted && selectedAnswers[qIndex] === q.correctAnswer;

                    return (
                      <div
                        key={q.id || qIndex}
                        style={{
                          padding: "1.25rem",
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          border: `1.5px solid ${quizSubmitted ? (isCorrect ? "#10b981" : "#ef4444") : "#e2e8f0"}`,
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>
                            Question {qIndex + 1} of {currentQuiz.length}
                          </span>
                          {quizSubmitted && (
                            <span className={`badge ${isCorrect ? "badge-success" : "badge-danger"}`}>
                              {isCorrect ? "Correct" : "Incorrect"}
                            </span>
                          )}
                        </div>

                        <p style={{ fontWeight: 600, color: "#1e293b", fontSize: "1rem", marginBottom: "1rem" }}>
                          {q.question}
                        </p>

                        {/* Modern Option Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                          {q.options.map((option, optIndex) => {
                            const isSelected = selectedAnswers[qIndex] === optIndex;
                            const isOptionCorrect = q.correctAnswer === optIndex;
                            const optionLetter = String.fromCharCode(65 + optIndex);

                            let cardClass = "quiz-option-card";
                            if (isSelected) cardClass += " selected";
                            if (quizSubmitted) {
                              if (isOptionCorrect) cardClass += " correct";
                              else if (isSelected && !isOptionCorrect) cardClass += " incorrect";
                            }

                            return (
                              <label
                                key={optIndex}
                                onClick={() => handleSelectAnswer(qIndex, optIndex)}
                                className={cardClass}
                                style={{
                                  cursor: quizSubmitted && quizResult?.passed ? "default" : "pointer"
                                }}
                              >
                                <div className="quiz-option-indicator">
                                  {quizSubmitted && isOptionCorrect ? "✓" : quizSubmitted && isSelected && !isOptionCorrect ? "✕" : optionLetter}
                                </div>
                                <span style={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: isSelected ? 600 : 500, flexGrow: 1 }}>
                                  {option}
                                </span>
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  checked={isSelected}
                                  onChange={() => handleSelectAnswer(qIndex, optIndex)}
                                  disabled={quizSubmitted && quizResult?.passed}
                                  style={{ display: "none" }}
                                />
                              </label>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        {quizSubmitted && q.explanation && (
                          <div style={{
                            marginTop: "1rem",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            backgroundColor: "#f1f5f9",
                            fontSize: "0.85rem",
                            color: "#475569"
                          }}>
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Submit / Retake Controls */}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {!quizSubmitted ? (
                      <button
                        type="submit"
                        disabled={submittingQuiz}
                        className="btn btn-primary"
                        style={{ padding: "0.75rem 1.75rem" }}
                      >
                        {submittingQuiz ? "Evaluating Answers..." : "Submit Answers & Verify Checkpoint"}
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        {!quizResult?.passed ? (
                          <button
                            type="button"
                            onClick={handleRetakeQuiz}
                            className="btn btn-primary"
                          >
                            <RotateCcw size={16} />
                            Retake Quiz
                          </button>
                        ) : (
                          activeLessonIndex + 1 < lessons.length && (
                            <button
                              type="button"
                              onClick={handleNextLesson}
                              className="btn btn-success"
                            >
                              Unlock Next Lesson ({activeLessonIndex + 2})
                              <ArrowRight size={16} />
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT 4: FINAL COURSE ASSESSMENT */}
            {activeTab === "assessment" && (
              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span className="badge badge-primary">Comprehensive Exam</span>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Passing Threshold: {courseAssessment.passingPercentage || 70}%
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
                    {courseAssessment.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "0.25rem" }}>
                    {courseAssessment.description}
                  </p>
                </div>

                {assessmentResult && (
                  <div style={{
                    padding: "1.25rem",
                    borderRadius: "12px",
                    backgroundColor: assessmentResult.passed ? "#ecfdf5" : "#fef2f2",
                    border: `1.5px solid ${assessmentResult.passed ? "#6ee7b7" : "#fca5a5"}`,
                    marginBottom: "1.75rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        {assessmentResult.passed ? (
                          <Award size={32} color="#059669" />
                        ) : (
                          <AlertCircle size={32} color="#dc2626" />
                        )}
                        <div>
                          <h4 style={{ color: assessmentResult.passed ? "#065f46" : "#991b1b", fontSize: "1.1rem" }}>
                            {assessmentResult.passed ? "🏆 Course Assessment Passed — Certified!" : "Assessment Needs Improvement"}
                          </h4>
                          <p style={{ fontSize: "0.875rem", color: assessmentResult.passed ? "#047857" : "#b91c1c", marginTop: "0.2rem" }}>
                            You scored <strong>{assessmentResult.score} of {assessmentResult.total}</strong> ({assessmentResult.percentage}%).
                            {assessmentResult.passed
                              ? " You have earned your verified SmartLearn academic certificate!"
                              : " A score of 70% is required to earn course certification. Review the explanations below and retake."}
                          </p>
                        </div>
                      </div>

                      {assessmentResult.passed && (
                        <button
                          type="button"
                          onClick={() => setShowCertificateModal(true)}
                          className="btn btn-sm"
                          style={{ backgroundColor: "#059669", color: "#ffffff", border: "none", fontWeight: 700, gap: "0.4rem" }}
                        >
                          <Printer size={16} />
                          Print Certificate
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmitAssessment} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {(courseAssessment.questions || []).map((q, idx) => {
                    const isCorrect = assessmentSubmitted && assessmentAnswers[idx] === q.correctAnswer;

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: "1.25rem",
                          borderRadius: "12px",
                          backgroundColor: "#f8fafc",
                          border: `1.5px solid ${assessmentSubmitted ? (isCorrect ? "#10b981" : "#ef4444") : "#e2e8f0"}`
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>
                            Question {idx + 1} of {courseAssessment.questions.length}
                          </span>
                          {assessmentSubmitted && (
                            <span className={`badge ${isCorrect ? "badge-success" : "badge-danger"}`}>
                              {isCorrect ? "Correct" : "Incorrect"}
                            </span>
                          )}
                        </div>

                        <p style={{ fontWeight: 600, color: "#1e293b", fontSize: "1rem", marginBottom: "1rem" }}>
                          {q.question}
                        </p>

                        {/* Modern Assessment Option Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                          {q.options.map((opt, oIdx) => {
                            const isSelected = assessmentAnswers[idx] === oIdx;
                            const isOptionCorrect = q.correctAnswer === oIdx;
                            const optionLetter = String.fromCharCode(65 + oIdx);

                            let cardClass = "quiz-option-card";
                            if (isSelected) cardClass += " selected";
                            if (assessmentSubmitted) {
                              if (isOptionCorrect) cardClass += " correct";
                              else if (isSelected && !isOptionCorrect) cardClass += " incorrect";
                            }

                            return (
                              <label
                                key={oIdx}
                                onClick={() => {
                                  if (!assessmentSubmitted) {
                                    setAssessmentAnswers({ ...assessmentAnswers, [idx]: oIdx });
                                  }
                                }}
                                className={cardClass}
                                style={{
                                  cursor: assessmentSubmitted ? "default" : "pointer"
                                }}
                              >
                                <div className="quiz-option-indicator">
                                  {assessmentSubmitted && isOptionCorrect ? "✓" : assessmentSubmitted && isSelected && !isOptionCorrect ? "✕" : optionLetter}
                                </div>
                                <span style={{ fontSize: "0.92rem", color: "#1e293b", fontWeight: isSelected ? 600 : 500, flexGrow: 1 }}>
                                  {opt}
                                </span>
                                <input
                                  type="radio"
                                  name={`assessment-q-${idx}`}
                                  checked={isSelected}
                                  onChange={() => setAssessmentAnswers({ ...assessmentAnswers, [idx]: oIdx })}
                                  disabled={assessmentSubmitted}
                                  style={{ display: "none" }}
                                />
                              </label>
                            );
                          })}
                        </div>

                        {assessmentSubmitted && q.explanation && (
                          <div style={{
                            marginTop: "1rem",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            backgroundColor: "#f1f5f9",
                            fontSize: "0.85rem",
                            color: "#475569"
                          }}>
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div>
                    {!assessmentSubmitted ? (
                      <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
                        Submit Final Assessment
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAssessmentAnswers({});
                          setAssessmentSubmitted(false);
                          setAssessmentResult(null);
                        }}
                        className="btn btn-secondary"
                        style={{ gap: "0.4rem" }}
                      >
                        <RotateCcw size={16} />
                        Retake Assessment
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT 5: MY STUDY NOTES & BOOKMARKS */}
            {activeTab === "notes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>
                    Personal Study Notes & Key Takeaways
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                    Write and save your own study summary for {activeLesson?.title}. Notes are automatically stored in your local browser profile.
                  </p>
                </div>

                <textarea
                  rows={8}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Record your thoughts, definitions, reminders, or formula derivations for this lesson..."
                  className="form-input"
                  style={{ fontSize: "0.95rem", lineHeight: 1.6 }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    {notesSaveNotice && (
                      <span style={{ fontSize: "0.85rem", color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Check size={16} />
                        Study notes saved successfully!
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="btn btn-primary btn-sm"
                    style={{ gap: "0.4rem" }}
                  >
                    <Save size={16} />
                    Save My Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR: LESSON CURRICULUM LIST & LOCK STATUS */}
        <div style={{ width: "340px", flexShrink: 0 }} className="curriculum-sidebar">
          <div className="card" style={{ padding: 0, overflow: "hidden", position: "sticky", top: "90px" }}>
            <div style={{ padding: "1.25rem", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                Course Curriculum
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b" }}>
                <span>{progress.completedLessons.length} of {lessons.length} Completed</span>
                <span style={{ fontWeight: 700, color: isCourseFullyCompleted ? "#059669" : "#4f46e5" }}>
                  {progress.percentage}%
                </span>
              </div>
            </div>

            {/* Lesson Items */}
            <div style={{ maxHeight: "calc(100vh - 280px)", overflowY: "auto", padding: "0.5rem" }}>
              {lessons.map((lesson, idx) => {
                const isCurrent = lesson.id === activeLesson?.id;
                const completed = progress.completedLessons.includes(lesson.id);
                const unlocked = isLessonUnlocked(idx);

                let itemClass = "lesson-playlist-item";
                if (isCurrent) itemClass += " active";
                if (!unlocked) itemClass += " locked";

                return (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson, idx)}
                    className={itemClass}
                  >
                    {/* Status Icon */}
                    <div style={{ flexShrink: 0 }}>
                      {completed ? (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#10b981", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)" }}>
                          <Check size={14} />
                        </div>
                      ) : isCurrent ? (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#4f46e5", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)" }}>
                          <PlayCircle size={15} />
                        </div>
                      ) : unlocked ? (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                          <PlayCircle size={14} />
                        </div>
                      ) : (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#e2e8f0", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Lock size={12} />
                        </div>
                      )}
                    </div>

                    {/* Lesson Title & Duration */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: isCurrent ? "#4f46e5" : "#64748b", marginBottom: "0.1rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        Lesson {idx + 1} {!unlocked && "• Locked"}
                      </div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: unlocked ? "#0f172a" : "#94a3b8", lineHeight: 1.35, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.2rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Clock size={11} />
                        <span>{lesson.duration || "15m"}</span>
                        <span>•</span>
                        <span>{lesson.quiz?.length || 0} Checkpoints</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Course Final Assessment item */}
              <div
                onClick={() => setActiveTab("assessment")}
                style={{
                  padding: "1rem 1.25rem",
                  borderTop: "2px solid #e2e8f0",
                  backgroundColor: activeTab === "assessment" ? "#f5f3ff" : "#ffffff",
                  borderLeft: activeTab === "assessment" ? "4px solid #7c3aed" : "4px solid transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}
              >
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: assessmentResult?.passed ? "#10b981" : "#7c3aed",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Award size={14} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed" }}>
                    Final Certification Exam
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a" }}>
                    Course Assessment (10 Qs)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          studentName={issuedCertificate?.studentName || currentUser?.name || "Diligent Student"}
          courseTitle={issuedCertificate?.courseTitle || course.title}
          learningGroup={issuedCertificate?.learningGroup || course.learningGroup}
          completionDate={
            issuedCertificate?.issuedAt
              ? new Date(issuedCertificate.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          }
          certificateId={
            issuedCertificate?.certificateId ||
            `SL-CERT-${(course._id || course.id)?.toString().slice(-6).toUpperCase()}-${currentUser?.id?.toString().slice(-4).toUpperCase()}`
          }
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .learning-layout {
            flex-direction: column !important;
          }
          .curriculum-sidebar {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
