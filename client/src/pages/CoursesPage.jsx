import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import NotFoundPage from "./NotFoundPage";
import {
  Compass,
  Search,
  X,
  ChevronRight,
  GraduationCap,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// Canonical mapping of URL slugs to curriculum groups & categories
const SLUG_TO_LEARNING_GROUP = {
  "12th-standard": "After Standard 12 and Above",
  "after-12th": "After Standard 12 and Above",
  "12th": "After Standard 12 and Above",
  "after-standard-12": "After Standard 12 and Above",
  "after-standard-12-and-above": "After Standard 12 and Above",
  "12th-standard-courses": "After Standard 12 and Above",
  "standards-6-8": "Standards 6–8",
  "standards-6-to-8": "Standards 6–8",
  "6-8": "Standards 6–8",
  "standards-7-10": "Standards 7–10",
  "standards-7-to-10": "Standards 7–10",
  "7-10": "Standards 7–10"
};

const SLUG_TO_CATEGORY = {
  "mathematics": "Mathematics",
  "math": "Mathematics",
  "science": "Science",
  "english-languages": "English & Languages",
  "languages": "English & Languages",
  "computer-science": "Computer Science",
  "coding-technology": "Coding & Technology",
  "coding": "Coding & Technology",
  "software-engineering": "Software Engineering",
  "ai-data-science": "AI & Data Science",
  "cloud-devops": "Cloud & DevOps",
  "life-skills": "Life Skills",
  "aptitude-logic": "Aptitude & Logic"
};

const LEARNING_GROUPS_LIST = [
  { slug: "all", label: "All Curriculums", group: "All Groups" },
  { slug: "standards-6-8", label: "Standards 6–8 (Middle School)", group: "Standards 6–8" },
  { slug: "standards-7-10", label: "Standards 7–10 (Secondary School)", group: "Standards 7–10" },
  { slug: "12th-standard", label: "12th Standard & Above (Senior / Professional)", group: "After Standard 12 and Above" }
];

const CATEGORIES_LIST = [
  "All",
  "Computer Science",
  "Software Engineering",
  "Coding & Technology",
  "AI & Data Science",
  "Cloud & DevOps",
  "Mathematics",
  "Science",
  "English & Languages",
  "Life Skills",
  "Aptitude & Logic"
];

export default function CoursesPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { courses, enrollInCourse, isEnrolled, getStudentProgress, loading } = useCourses();

  // Normalize slug into active group or category
  const activeSlug = (categorySlug || "").toLowerCase().trim();

  // Validate whether the provided slug is genuine
  const resolvedGroup = SLUG_TO_LEARNING_GROUP[activeSlug] || null;
  const resolvedCategory = SLUG_TO_CATEGORY[activeSlug] || null;

  // Determine if this is a genuinely unknown slug
  const isAllOrEmpty = !activeSlug || activeSlug === "all";
  const isKnownSlug = isAllOrEmpty || Boolean(resolvedGroup || resolvedCategory);

  // If slug is provided but not recognized, check if any course has this exact category/group
  const matchesAnyCourseDirectly = !isKnownSlug && courses.some(
    (c) =>
      c.category?.toLowerCase() === activeSlug ||
      c.learningGroup?.toLowerCase() === activeSlug ||
      c.slug?.toLowerCase() === activeSlug
  );

  // If genuinely invalid, render the application's standard 404 page
  if (!isKnownSlug && !matchesAnyCourseDirectly) {
    return <NotFoundPage />;
  }

  // Local state for UI filter selection
  const [selectedGroup, setSelectedGroup] = useState(() => {
    if (resolvedGroup) return resolvedGroup;
    return "All Groups";
  });

  const [selectedCategoryState, setSelectedCategoryState] = useState(() => {
    if (resolvedCategory) return resolvedCategory;
    return "All";
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Sync state if categorySlug changes via in-app navigation or URL back/forward
  useEffect(() => {
    if (resolvedGroup) {
      setSelectedGroup(resolvedGroup);
    } else if (isAllOrEmpty) {
      setSelectedGroup("All Groups");
    }

    if (resolvedCategory) {
      setSelectedCategoryState(resolvedCategory);
    } else if (isAllOrEmpty) {
      setSelectedCategoryState("All");
    }
  }, [activeSlug, resolvedGroup, resolvedCategory, isAllOrEmpty]);

  // Set page document title dynamically for SEO and browser history
  useEffect(() => {
    let title = "Courses Catalog — SmartLearn Platform";
    if (resolvedGroup) {
      title = `${resolvedGroup === "After Standard 12 and Above" ? "12th Standard & Above" : resolvedGroup} Courses — SmartLearn`;
    } else if (resolvedCategory) {
      title = `${resolvedCategory} Courses — SmartLearn`;
    }
    document.title = title;
  }, [resolvedGroup, resolvedCategory]);

  // Handle enrollment
  const handleEnroll = (courseId) => {
    if (!currentUser) {
      navigate(`/login?redirect=/course/${courseId}`);
      return;
    }
    enrollInCourse(currentUser.id, courseId);
    navigate(`/course/${courseId}`);
  };

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (!course.isPublished) return false;

      // Learning Group filter
      if (selectedGroup !== "All Groups" && course.learningGroup !== selectedGroup) {
        return false;
      }

      // Category filter
      if (selectedCategoryState !== "All" && course.category !== selectedCategoryState) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title?.toLowerCase().includes(q);
        const matchesDesc = course.description?.toLowerCase().includes(q);
        const matchesInstructor = course.instructor?.toLowerCase().includes(q);
        const matchesCategory = course.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [courses, selectedGroup, selectedCategoryState, searchQuery]);

  // Header Title and Description based on active filter
  const pageHeading = useMemo(() => {
    if (selectedGroup === "After Standard 12 and Above") {
      return "12th Standard & Career Acceleration Courses";
    }
    if (selectedGroup === "Standards 6–8") {
      return "Standards 6–8 Curriculum Tracks";
    }
    if (selectedGroup === "Standards 7–10") {
      return "Standards 7–10 High School Curriculums";
    }
    if (selectedCategoryState !== "All") {
      return `${selectedCategoryState} Tracks`;
    }
    return "All Educational Curriculums";
  }, [selectedGroup, selectedCategoryState]);

  const pageDescription = useMemo(() => {
    if (selectedGroup === "After Standard 12 and Above") {
      return "Comprehensive college-prep, software engineering, cloud, and professional career skill courses designed for students completing Standard 12 and above.";
    }
    if (selectedGroup === "Standards 6–8") {
      return "Foundational math, science, language, and early computer literacy modules for middle-school scholars.";
    }
    if (selectedGroup === "Standards 7–10") {
      return "Secondary education modules with interactive simulations, coding basics, and logic challenges.";
    }
    const pubCount = (courses || []).filter((c) => c.isPublished).length;
    return `Explore all ${pubCount || 60} interactive courses across three distinct educational tiers with video lectures, checkpoint quizzes, and verified certification.`;
  }, [selectedGroup, courses]);



  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "calc(100vh - 72px)", paddingBottom: "5rem" }}>
      {/* HEADER SECTION */}
      <section style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
        borderBottom: "1px solid #e2e8f0",
        paddingTop: "2.5rem",
        paddingBottom: "3rem"
      }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem" }}>
            <Link to="/" style={{ color: "#4f46e5", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/courses" style={{ color: "#4f46e5", fontWeight: 600 }}>
              Courses
            </Link>
            {selectedGroup !== "All Groups" && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: "#0f172a", fontWeight: 700 }}>
                  {selectedGroup === "After Standard 12 and Above" ? "12th Standard" : selectedGroup}
                </span>
              </>
            )}
            {selectedCategoryState !== "All" && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: "#0f172a", fontWeight: 700 }}>{selectedCategoryState}</span>
              </>
            )}
          </nav>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ maxWidth: "780px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#eef2ff",
                color: "#4338ca",
                fontSize: "0.8rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                border: "1px solid #c7d2fe"
              }}>
                <Sparkles size={14} />
                <span>Verified Curriculum • {filteredCourses.length} Courses Available</span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                {pageHeading}
              </h1>

              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6 }}>
                {pageDescription}
              </p>
            </div>

            {currentUser && (
              <Link to="/dashboard" className="btn btn-secondary" style={{ gap: "0.4rem" }}>
                <GraduationCap size={18} />
                My Student Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH TOOLBAR */}
      <section className="container" style={{ marginTop: "2rem" }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "1.5rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          marginBottom: "2.5rem"
        }}>
          {/* Top row: Search and Learning Group Tabs */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "280px", flexGrow: 1, maxWidth: "460px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, instructors, lessons..."
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.5rem",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: "0.92rem",
                  outline: "none"
                }}
              />
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Total count badge */}
            <div style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>
              Showing <strong style={{ color: "#0f172a" }}>{filteredCourses.length}</strong> published courses
            </div>
          </div>

          {/* Education Tier Tabs */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Education Tiers
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {LEARNING_GROUPS_LIST.map((item) => {
                const isSelected = selectedGroup === item.group;
                const count = item.group === "All Groups"
                  ? courses.filter((c) => c.isPublished).length
                  : courses.filter((c) => c.isPublished && c.learningGroup === item.group).length;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => {
                      setSelectedGroup(item.group);
                      if (item.slug === "all") {
                        navigate("/courses");
                      } else {
                        navigate(`/courses/${item.slug}`);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.55rem 1rem",
                      borderRadius: "10px",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: isSelected ? "2px solid #4f46e5" : "1.5px solid #e2e8f0",
                      backgroundColor: isSelected ? "#eef2ff" : "#ffffff",
                      color: isSelected ? "#4f46e5" : "#475569",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{
                      backgroundColor: isSelected ? "#4f46e5" : "#f1f5f9",
                      color: isSelected ? "#ffffff" : "#64748b",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem"
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Topics & Domains
            </div>
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
              {CATEGORIES_LIST.map((cat) => {
                const isSelected = selectedCategoryState === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategoryState(cat)}
                    style={{
                      padding: "0.45rem 0.9rem",
                      borderRadius: "9999px",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid",
                      whiteSpace: "nowrap",
                      backgroundColor: isSelected ? "#4f46e5" : "#ffffff",
                      color: isSelected ? "#ffffff" : "#475569",
                      borderColor: isSelected ? "#4f46e5" : "#e2e8f0",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* COURSES GRID OR EMPTY STATE */}
        {filteredCourses.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            border: "1px dashed #cbd5e1",
            maxWidth: "540px",
            margin: "0 auto"
          }}>
            <Compass size={48} color="#94a3b8" style={{ margin: "0 auto 1rem auto" }} />
            <h3 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "0.35rem" }}>
              No Courses Match Your Criteria
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "1.5rem" }}>
              We couldn't find any courses matching your current filters. Try resetting your search or exploring another education tier.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedGroup("All Groups");
                setSelectedCategoryState("All");
                setSearchQuery("");
                navigate("/courses");
              }}
              className="btn btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem"
          }}>
            {filteredCourses.map((course) => {
              const targetId = course.id || course._id || course.slug;
              const enrolled = currentUser ? isEnrolled(currentUser.id, targetId) : false;
              const progress = currentUser ? getStudentProgress(currentUser.id, targetId) : null;

              return (
                <CourseCard
                  key={targetId}
                  course={course}
                  isEnrolled={enrolled}
                  progress={progress}
                  onEnroll={handleEnroll}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
