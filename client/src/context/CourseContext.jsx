import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { INITIAL_COURSES } from "../data/mockData";
import { coursesApi, progressApi } from "../services/api";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};

// Normalize Mongoose MongoDB document IDs so both .id and ._id are accessible,
// and hydrate any missing video sessions, checkpoint quizzes, or assessments
export const normalizeCourse = (c) => {
  if (!c) return c;
  const id = c._id?.toString() || c.id || c.slug;
  const fallback = INITIAL_COURSES.find(
    (fc) => fc.slug === c.slug || fc.title?.toLowerCase() === c.title?.toLowerCase()
  );

  const lessons = (c.lessons || []).map((l, idx) => {
    const lessonId = l._id?.toString() || l.id || `les-${idx}`;
    const fbLesson = fallback?.lessons?.[idx];

    // Ensure lesson always has checkpoint quiz questions
    const quiz =
      Array.isArray(l.quiz) && l.quiz.length > 0
        ? l.quiz
        : Array.isArray(fbLesson?.quiz) && fbLesson.quiz.length > 0
        ? fbLesson.quiz
        : [];

    // Preserve lesson videoUrl without substituting unrelated videos
    const videoUrl =
      l.videoUrl && l.videoUrl.trim() !== ""
        ? l.videoUrl
        : (fbLesson?.videoUrl && fbLesson.videoUrl.trim() !== "")
        ? fbLesson.videoUrl
        : "";

    const videoType =
      videoUrl ? (l.videoType && l.videoType !== "none" ? l.videoType : fbLesson?.videoType || "youtube") : "none";


    return {
      ...l,
      id: lessonId,
      _id: lessonId,
      quiz,
      videoUrl,
      videoType
    };
  });

  // Ensure course always has comprehensive assessment
  const assessment =
    c.assessment && Array.isArray(c.assessment.questions) && c.assessment.questions.length > 0
      ? c.assessment
      : fallback?.assessment || {
          title: `${c.title} - Comprehensive Assessment`,
          description: `Test your mastery of ${c.title} concepts.`,
          passingPercentage: 70,
          questions: []
        };

  return {
    ...c,
    id,
    _id: id,
    slug: c.slug || id,
    lessons,
    assessment
  };
};

export const CourseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [courses, setCourses] = useState(() => {
    try {
      const stored = localStorage.getItem("smartlearn_courses");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only trust cache if it has all 60 courses and lesson quizzes populated
        const hasValidQuizzes =
          Array.isArray(parsed) &&
          parsed.length >= 60 &&
          parsed[0]?.lessons?.[0]?.quiz?.length > 0;
        if (hasValidQuizzes) {
          return parsed.map(normalizeCourse);
        } else {
          localStorage.removeItem("smartlearn_courses");
        }
      }
    } catch (e) {
      console.error("Error reading cached courses:", e);
    }
    const fresh = INITIAL_COURSES.map(normalizeCourse);
    try {
      localStorage.setItem("smartlearn_courses", JSON.stringify(fresh));
    } catch {}
    return fresh;
  });

  const [enrollments, setEnrollments] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch published courses from the Express backend API (limit 100 to retrieve full catalog)
  const refreshCourses = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await coursesApi.getAll("limit=100");
      if (res && res.success && Array.isArray(res.courses) && res.courses.length > 0) {
        const normalized = res.courses.map(normalizeCourse);
        setCourses(normalized);
        localStorage.setItem("smartlearn_courses", JSON.stringify(normalized));
      }
    } catch (err) {
      console.warn("Backend course fetch notice:", err.message);
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch enrolled progress for currently authenticated student
  const refreshProgress = useCallback(async () => {
    if (!currentUser || currentUser.role !== "student") {
      setEnrollments({});
      return;
    }

    try {
      const res = await progressApi.getAll();
      if (res && res.success && Array.isArray(res.enrollments)) {
        const progMap = {};
        res.enrollments.forEach((record) => {
          const courseId = record.courseId?._id?.toString() || record.courseId?.id || record.courseId?.toString();
          if (courseId) {
            progMap[courseId] = {
              completedLessons: (record.completedLessons || []).map((id) => id?.toString()),
              lastLessonId: record.lastLessonId?.toString() || "",
              quizScores: record.quizAttempts ? record.quizAttempts.reduce((acc, a) => {
                const qKey = a.lessonId?.toString() || a.quizId?.toString();
                if (qKey) acc[qKey] = { score: a.score, passed: a.passed, attemptedAt: a.attemptedAt };
                return acc;
              }, {}) : {},
              percentage: record.completionPercentage || 0,
              isCompleted: record.isCompleted || false
            };
          }
        });
        setEnrollments(progMap);
      }
    } catch (err) {
      console.warn("Progress fetch notice:", err.message);
    }
  }, [currentUser]);

  // Load courses on initial mount
  useEffect(() => {
    refreshCourses();
  }, [refreshCourses]);

  // Sync progress whenever current user changes
  useEffect(() => {
    refreshProgress();
  }, [currentUser, refreshProgress]);

  // Helper: Get single course by ID or slug (with alias and fallback resilience)
  const getCourseById = (courseId) => {
    if (!courseId) return null;
    const strId = courseId.toString();

    // 1. Direct match in state
    const found = courses.find((c) => c.id === strId || c._id === strId || c.slug === strId);
    if (found) return found;

    // 2. Legacy alias support (course-1 -> first course, course-2 -> second course, etc.)
    if (strId.startsWith("course-")) {
      const idx = parseInt(strId.replace("course-", ""), 10) - 1;
      if (idx >= 0 && idx < courses.length) return courses[idx];
    }
    const numIdx = parseInt(strId, 10) - 1;
    if (!isNaN(numIdx) && numIdx >= 0 && numIdx < courses.length) {
      return courses[numIdx];
    }

    // 3. Match in master catalog fallback
    const fallback = INITIAL_COURSES.find((c) => c.id === strId || c._id === strId || c.slug === strId);
    if (fallback) return normalizeCourse(fallback);

    return null;
  };

  // Check if current user is enrolled in course
  const isEnrolled = (studentId, courseId) => {
    if (!courseId) return false;
    const course = getCourseById(courseId);
    const strCourseId = course ? (course._id || course.id || course.slug) : courseId.toString();
    return Boolean(enrollments[strCourseId] || enrollments[courseId.toString()]);
  };

  // Enroll student in course via backend API
  const enrollInCourse = async (studentId, courseId) => {
    if (!courseId) return false;
    const strCourseId = courseId.toString();

    // Optimistically update local enrollment
    setEnrollments((prev) => ({
      ...prev,
      [strCourseId]: prev[strCourseId] || {
        completedLessons: [],
        lastLessonId: "",
        quizScores: {},
        percentage: 0,
        isCompleted: false
      }
    }));

    // Persist via backend API
    try {
      const res = await progressApi.enroll(strCourseId);
      if (res && res.success) {
        await refreshProgress();
        return true;
      }
    } catch (err) {
      console.warn("Backend enrollment deferred / error:", err.message);
    }
    return true;
  };

  // Get student progress for a course
  const getStudentProgress = (studentId, courseId) => {
    const course = getCourseById(courseId);
    const strCourseId = courseId ? courseId.toString() : "";

    const prog = enrollments[strCourseId];
    if (!prog || !course) {
      return {
        completedLessons: [],
        lastLessonId: course?.lessons?.[0]?.id || "",
        quizScores: {},
        percentage: 0,
        isCompleted: false
      };
    }

    const totalLessons = course.lessons?.length || 1;
    const completedCount = prog.completedLessons?.length || 0;
    const percentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    return {
      completedLessons: prog.completedLessons || [],
      lastLessonId: prog.lastLessonId || course.lessons?.[0]?.id || "",
      quizScores: prog.quizScores || {},
      percentage: prog.percentage !== undefined ? prog.percentage : percentage,
      isCompleted: prog.isCompleted || (completedCount >= totalLessons && totalLessons > 0)
    };
  };

  // Complete lesson quiz and unlock next lesson via backend API
  const completeLessonQuiz = async (studentId, courseId, lessonId, score, passed) => {
    const course = getCourseById(courseId);
    if (!course) return { success: false };

    const strCourseId = courseId.toString();
    const strLessonId = lessonId ? lessonId.toString() : "";
    const lessons = course.lessons || [];
    const currentIndex = lessons.findIndex((l) => l.id === strLessonId || l._id === strLessonId);
    const nextLesson = currentIndex >= 0 && currentIndex + 1 < lessons.length ? lessons[currentIndex + 1] : null;

    // Update local enrollment state
    setEnrollments((prev) => {
      const current = prev[strCourseId] || {
        completedLessons: [],
        lastLessonId: strLessonId,
        quizScores: {}
      };

      const alreadyCompleted = current.completedLessons.includes(strLessonId);
      const updatedCompleted = alreadyCompleted
        ? current.completedLessons
        : passed
        ? [...current.completedLessons, strLessonId]
        : current.completedLessons;

      return {
        ...prev,
        [strCourseId]: {
          ...current,
          completedLessons: updatedCompleted,
          lastLessonId: passed && nextLesson ? nextLesson.id : current.lastLessonId || strLessonId,
          quizScores: {
            ...current.quizScores,
            [strLessonId]: { score, passed, completedAt: new Date().toISOString() }
          },
          percentage: Math.min(100, Math.round((updatedCompleted.length / (lessons.length || 1)) * 100)),
          isCompleted: updatedCompleted.length >= lessons.length && lessons.length > 0
        }
      };
    });

    // Call backend API to persist completion and verify progression prerequisites
    if (passed && strLessonId) {
      try {
        await progressApi.completeLesson(strCourseId, strLessonId);
      } catch (err) {
        console.warn("Backend progression update deferred / notice:", err.message);
      }
    }

    return {
      success: true,
      unlockedNext: Boolean(passed && nextLesson),
      nextLessonId: nextLesson?.id || null
    };
  };

  // Admin Course CRUD with live API backend calls
  const addCourse = async (courseData) => {
    try {
      const res = await coursesApi.create(courseData);
      if (res && res.success && res.course) {
        const normalized = normalizeCourse(res.course);
        setCourses((prev) => [normalized, ...prev]);
        return normalized;
      }
    } catch (err) {
      console.warn("Backend course creation deferred / error:", err.message);
    }

    // Local fallback
    const newCourse = normalizeCourse({
      ...courseData,
      _id: "course-" + Date.now(),
      id: "course-" + Date.now(),
      rating: 5.0,
      enrolledCount: 0,
      isPublished: courseData.isPublished !== undefined ? courseData.isPublished : true,
      lessons: courseData.lessons || []
    });

    setCourses((prev) => [newCourse, ...prev]);
    localStorage.setItem("smartlearn_courses", JSON.stringify([newCourse, ...courses]));
    return newCourse;
  };

  const updateCourse = async (courseId, updatedData) => {
    const strId = courseId.toString();
    try {
      const res = await coursesApi.update(strId, updatedData);
      if (res && res.success && res.course) {
        const normalized = normalizeCourse(res.course);
        setCourses((prev) => prev.map((c) => (c.id === strId || c._id === strId ? normalized : c)));
        return;
      }
    } catch (err) {
      console.warn("Backend course update deferred / error:", err.message);
    }

    setCourses((prev) =>
      prev.map((c) => (c.id === strId || c._id === strId ? { ...c, ...updatedData } : c))
    );
  };

  const deleteCourse = async (courseId) => {
    const strId = courseId.toString();
    try {
      await coursesApi.delete(strId);
    } catch (err) {
      console.warn("Backend course deletion deferred / error:", err.message);
    }

    setCourses((prev) => prev.filter((c) => c.id !== strId && c._id !== strId));
  };

  const togglePublish = async (courseId) => {
    const strId = courseId.toString();
    const course = getCourseById(strId);
    if (!course) return;

    const newStatus = !course.isPublished;
    await updateCourse(strId, { isPublished: newStatus });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        apiError,
        refreshCourses,
        getCourseById,
        isEnrolled,
        enrollInCourse,
        getStudentProgress,
        completeLessonQuiz,
        addCourse,
        updateCourse,
        deleteCourse,
        togglePublish
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
