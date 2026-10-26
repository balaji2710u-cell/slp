import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  LockKeyhole,
  Award,
  BarChart3,
  Users,
  Compass,
  Star,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Search,
  X
} from "lucide-react";
import { PLATFORM_BENEFITS, TESTIMONIALS } from "../data/mockData";

export default function LandingPage() {
  const { currentUser } = useAuth();
  const { courses, enrollInCourse, isEnrolled, getStudentProgress, loading } = useCourses();
  const navigate = useNavigate();

  const publishedCourses = (courses || []).filter((c) => c.isPublished);
  const totalPublishedCount = publishedCourses.length;

  const [selectedLearningGroup, setSelectedLearningGroup] = useState("All Groups");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const learningGroups = ["All Groups", "Standards 6–8", "Standards 7–10", "After Standard 12 and Above"];
  const categories = ["All", "Mathematics", "Science", "English & Languages", "Computer Science", "Coding & Technology", "Software Engineering", "AI & Data Science", "Cloud & DevOps", "Life Skills", "Aptitude & Logic"];

  const filteredCourses = publishedCourses.filter((c) => {

    const matchesGroup = selectedLearningGroup === "All Groups" || c.learningGroup === selectedLearningGroup;
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.title?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.instructor?.toLowerCase().includes(q);
    return matchesGroup && matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId) => {
    if (!currentUser) {
      navigate(`/login?redirect=/course/${courseId}`);
      return;
    }
    enrollInCourse(currentUser.id, courseId);
    navigate(`/course/${courseId}`);
  };

  const getBenefitIcon = (iconName) => {
    switch (iconName) {
      case "GraduationCap": return <GraduationCap size={24} color="#4f46e5" />;
      case "LockKeyhole": return <LockKeyhole size={24} color="#7c3aed" />;
      case "PlayCircle": return <PlayCircle size={24} color="#06b6d4" />;
      case "Award": return <Award size={24} color="#10b981" />;
      case "BarChart3": return <BarChart3 size={24} color="#f59e0b" />;
      case "Users": return <Users size={24} color="#6366f1" />;
      default: return <Sparkles size={24} color="#4f46e5" />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem", paddingBottom: "3rem" }}>
      {/* HERO SECTION */}
      <section style={{
        position: "relative",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        paddingTop: "4.5rem",
        paddingBottom: "5.5rem",
        overflow: "hidden",
        borderBottom: "1px solid #e2e8f0"
      }}>
        {/* Ambient background blur circles */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            maxWidth: "840px",
            margin: "0 auto",
            textAlign: "center"
          }}>
            {/* Top Pill */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(238, 242, 255, 0.9)",
              border: "1px solid #c7d2fe",
              color: "#4338ca",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              boxShadow: "0 2px 8px rgba(79, 70, 229, 0.1)"
            }}>
              <Sparkles size={16} />
              <span>Smart Mastery Learning • Next Lesson Locked Until Quiz Passed</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#0f172a",
              marginBottom: "1.5rem"
            }}>
              Master In-Demand Tech Skills With{" "}
              <span className="text-gradient">Structured Mastery.</span>
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              lineHeight: 1.6,
              color: "#475569",
              marginBottom: "2.5rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              SmartLearn eliminates passive video watching. Progress through high-definition lessons, solve adaptive technical quizzes, and prove real competence before unlocking each next milestone.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem"
            }}>
              {currentUser ? (
                <Link to={currentUser.role === "admin" ? "/admin" : "/dashboard"} className="btn btn-primary btn-lg" style={{ gap: "0.6rem" }}>
                  Go to {currentUser.role === "admin" ? "Admin Console" : "My Student Dashboard"}
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg" style={{ gap: "0.6rem" }}>
                    Start Learning Free
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/courses" className="btn btn-secondary btn-lg" style={{ gap: "0.6rem" }}>
                    <Compass size={18} />
                    Explore Curriculums
                  </Link>
                </>
              )}
            </div>

            {/* Social Proof Row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
              fontSize: "0.875rem",
              color: "#64748b"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Zero credit card required</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Self-paced with verified certificates</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Interactive lesson quizzes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM STATISTICS SECTION */}
      <section className="container" style={{ marginTop: "-2.5rem", position: "relative", zIndex: 10 }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e2e8f0",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          textAlign: "center"
        }}>
          <div>
            <div
              id="landing-courses-count"
              style={{ fontSize: "2.25rem", fontWeight: 800, color: "#4f46e5", marginBottom: "0.25rem" }}
            >
              {loading ? (
                <span style={{ opacity: 0.6 }}>...</span>
              ) : (
                `${totalPublishedCount}`
              )}
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
              Active Curriculum Tracks
            </div>
          </div>
          <div>
            <div
              style={{ fontSize: "2.25rem", fontWeight: 800, color: "#7c3aed", marginBottom: "0.25rem" }}
            >
              {loading ? (
                <span style={{ opacity: 0.6 }}>...</span>
              ) : (
                `${publishedCourses.reduce((acc, c) => acc + (c.lessons?.length || 0), 0)}`
              )}
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
              Interactive Video Lessons
            </div>
          </div>

          <div>
            <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#10b981", marginBottom: "0.25rem" }}>
              3 Tiers
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
              Stds 6–8, 7–10 & 12+
            </div>
          </div>
          <div>
            <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#06b6d4", marginBottom: "0.25rem" }}>
              100%
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
              Free for BPL Students
            </div>
          </div>
          <div>
            <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "#f59e0b", marginBottom: "0.25rem" }}>
              Verified
            </div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b" }}>
              Academic Certificates
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section id="courses" className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
                Curated Engineering Tracks
              </span>
              <h2>Explore Our Featured Courses</h2>
              <p style={{ marginTop: "0.5rem", maxWidth: "600px" }}>
                Step into structured courses designed by tech leaders. Complete high-definition video modules and pass locked checkpoint quizzes.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link to="/courses/12th-standard" className="btn btn-primary btn-sm" style={{ gap: "0.4rem" }}>
                12th Standard Courses
                <ArrowRight size={14} />
              </Link>
              <Link to="/courses" className="btn btn-secondary btn-sm" style={{ gap: "0.4rem" }}>
                Browse All
                <ChevronRight size={14} />
              </Link>
              {currentUser && !currentUser.role?.includes("admin") && (
                <Link to="/dashboard" className="btn btn-secondary btn-sm" style={{ gap: "0.4rem" }}>
                  My Enrolled Courses
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar & Category Filter Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "relative", minWidth: "260px", flex: "1", maxWidth: "420px" }}>
              <input
                type="text"
                placeholder="Search courses, instructors, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.6rem 1rem 0.6rem 2.4rem",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  outline: "none",
                  backgroundColor: "#ffffff"
                }}
              />
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Learning Group Tabs */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "0.75rem"
            }}>
              {learningGroups.map((grp) => {
                const count = grp === "All Groups"
                  ? courses.filter((c) => c.isPublished).length
                  : courses.filter((c) => c.isPublished && c.learningGroup === grp).length;

                const isSelected = selectedLearningGroup === grp;
                return (
                  <button
                    key={grp}
                    onClick={() => setSelectedLearningGroup(grp)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.55rem 1.15rem",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      border: isSelected ? "2px solid #4f46e5" : "1.5px solid #e2e8f0",
                      backgroundColor: isSelected ? "#eef2ff" : "#ffffff",
                      color: isSelected ? "#4f46e5" : "#475569",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span>{grp}</span>
                    <span style={{
                      backgroundColor: isSelected ? "#4f46e5" : "#f1f5f9",
                      color: isSelected ? "#ffffff" : "#64748b",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Category Filter Pills */}
            <div style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.25rem"
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "1px solid",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backgroundColor: selectedCategory === cat ? "#4f46e5" : "#ffffff",
                    color: selectedCategory === cat ? "#ffffff" : "#475569",
                    borderColor: selectedCategory === cat ? "#4f46e5" : "#e2e8f0"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State when no courses found */}
        {filteredCourses.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "3.5rem 1.5rem",
            backgroundColor: "#f8fafc",
            borderRadius: "20px",
            border: "1px dashed #cbd5e1",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <Compass size={44} color="#94a3b8" style={{ margin: "0 auto 1rem auto" }} />
            <h3 style={{ fontSize: "1.25rem", color: "#1e293b", marginBottom: "0.35rem" }}>No matching courses found</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              We couldn't find any courses matching "{searchQuery}". Try a different keyword or clear category filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: "1.25rem" }}
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
            const enrolled = currentUser ? isEnrolled(currentUser.id, course.id) : false;
            const progress = currentUser ? getStudentProgress(currentUser.id, course.id) : null;

            return (
              <CourseCard
                key={course.id}
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

      {/* HOW SMARTLEARN WORKS (3-STEP ROADMAP) */}
      <section style={{ backgroundColor: "#f1f5f9", padding: "5rem 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-secondary" style={{ marginBottom: "0.5rem" }}>
              Scientific Learning Model
            </span>
            <h2>How SmartLearn Works</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Our mastery gating ensures you actually retain what you learn, rather than skimming through hours of video.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}>
            {/* Step 1 */}
            <div className="card" style={{ position: "relative", overflow: "hidden" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginBottom: "1.25rem"
              }}>
                01
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Enroll in a Track</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Select an engineering curriculum aligned with your goals. Receive instant access to module one with high-definition lessons and resources.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ position: "relative", overflow: "hidden" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#f5f3ff",
                color: "#7c3aed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginBottom: "1.25rem"
              }}>
                02
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Watch & Absorb</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Stream high-definition lectures with custom playback speed. Read architectural notes and inspect concrete production code examples.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ position: "relative", overflow: "hidden" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#ecfdf5",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.25rem",
                marginBottom: "1.25rem"
              }}>
                03
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Pass Quiz to Unlock Next</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Every lesson has an adaptive checkpoint quiz. Pass it with 100% comprehension to immediately unlock the downstream lesson and earn your certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM BENEFITS & FEATURES */}
      <section id="benefits" className="container">
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem auto" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
            Engineered for Retention
          </span>
          <h2>Platform Features Designed for Real Growth</h2>
          <p style={{ marginTop: "0.5rem" }}>
            Everything you need to level up your career, built with modern product design and learner psychology.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {PLATFORM_BENEFITS.map((benefit, index) => (
            <div key={index} className="card card-interactive" style={{ display: "flex", gap: "1.25rem", padding: "1.75rem" }}>
              <div style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {getBenefitIcon(benefit.icon)}
              </div>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.55 }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="about" style={{ backgroundColor: "#ffffff", padding: "4.5rem 0", borderTop: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3.5rem auto" }}>
            <span className="badge badge-success" style={{ marginBottom: "0.5rem" }}>
              Verified Learner Outcomes
            </span>
            <h2>Loved by Learners & Engineering Teams</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Read how developers used SmartLearn to switch careers, ship production software, and gain confidence.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2rem" }}>
                <div>
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p style={{ fontStyle: "italic", fontSize: "0.95rem", color: "#334155", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    "{item.quote}"
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="container">
        <div style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
          borderRadius: "24px",
          padding: "4rem 2rem",
          color: "#ffffff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px -15px rgba(79, 70, 229, 0.4)"
        }}>
          {/* Ambient background sparkle */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.3
          }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", margin: "0 auto" }}>
            <span className="badge" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#ffffff", marginBottom: "1rem" }}>
              Join 45,000+ Smart Learners
            </span>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>
              Ready to Accelerate Your Career with Real Skills?
            </h2>
            <p style={{ color: "#c7d2fe", fontSize: "1.05rem", marginBottom: "2.5rem" }}>
              Start your journey today. Unlock free courses, test your knowledge with interactive checkpoint quizzes, and build an exceptional portfolio.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link to="/signup" className="btn btn-lg" style={{ backgroundColor: "#ffffff", color: "#4f46e5", fontWeight: 700 }}>
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-lg btn-outline" style={{ borderColor: "#818cf8", color: "#ffffff" }}>
                Login to Platform
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
