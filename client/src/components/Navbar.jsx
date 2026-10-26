import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import {
  GraduationCap,
  Menu,
  X,
  User,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export default function Navbar() {
  const { currentUser, logout, isAdmin, systemHealth } = useAuth();
  const { courses } = useCourses();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const publishedCount = (courses || []).filter((c) => c.isPublished).length;


  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid #e2e8f0",
      transition: "all 0.2s ease"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "72px"
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 4px 10px rgba(79, 70, 229, 0.3)"
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <span style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#0f172a" }}>
              Smart<span style={{ color: "#4f46e5" }}>Learn</span>
            </span>
            <span style={{
              display: "block",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#94a3b8",
              lineHeight: 1
            }}>
              Next-Gen Learning
            </span>
          </div>
        </Link>

        {/* System Connectivity Status Indicator */}
        {systemHealth && (
          <div
            title={
              systemHealth.database?.connected
                ? "MongoDB Atlas cluster connected successfully. Real-time database persistence active."
                : "MongoDB Atlas cluster in degraded mode. System operating with client-side resilience."
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.25rem 0.7rem",
              borderRadius: "9999px",
              fontSize: "0.72rem",
              fontWeight: 700,
              backgroundColor: systemHealth.database?.connected ? "#ecfdf5" : "#fffbeb",
              color: systemHealth.database?.connected ? "#065f46" : "#b45309",
              border: `1px solid ${systemHealth.database?.connected ? "#a7f3d0" : "#fde68a"}`
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: systemHealth.database?.connected ? "#10b981" : "#f59e0b",
                boxShadow: systemHealth.database?.connected ? "0 0 8px #10b981" : "none"
              }}
            />
            {systemHealth.database?.connected ? `Atlas Live • ${publishedCount} Tracks` : "Atlas Degraded Mode"}

          </div>
        )}

        {/* Desktop Navigation Links */}
        <nav style={{
          display: "none",
          alignItems: "center",
          gap: "1.75rem"
        }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive("/") ? "#4f46e5" : "#475569",
              transition: "color 0.2s ease"
            }}
          >
            Home
          </Link>
          <Link
            to="/courses"
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive("/courses") ? "#4f46e5" : "#475569",
              transition: "color 0.2s ease"
            }}
          >
            Courses
          </Link>
          <Link
            to="/dashboard"
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isActive("/dashboard") ? "#4f46e5" : "#475569",
              transition: "color 0.2s ease"
            }}
          >
            Student Portal
          </Link>
          <a
            href="/#benefits"
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#475569",
              transition: "color 0.2s ease"
            }}
          >
            Benefits
          </a>
          <a
            href="/#about"
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#475569",
              transition: "color 0.2s ease"
            }}
          >
            About
          </a>
        </nav>

        {/* Desktop User / Auth Actions */}
        <div style={{ display: "none", alignItems: "center", gap: "1rem" }} className="desktop-nav">
          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: "0.4rem", borderColor: "#c7d2fe", backgroundColor: "#eef2ff", color: "#4338ca" }}
                >
                  <ShieldCheck size={16} />
                  Admin Console
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: "0.4rem" }}
                >
                  <LayoutDashboard size={16} />
                  My Dashboard
                </Link>
              )}

              {/* User Avatar Capsule */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.3rem 0.75rem 0.3rem 0.4rem",
                borderRadius: "9999px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0"
              }}>
                <img
                  src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    backgroundColor: "#e2e8f0"
                  }}
                />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e293b", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {currentUser.name}
                </span>
                <span className={`badge ${isAdmin ? "badge-secondary" : "badge-primary"}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                  {isAdmin ? "Admin" : "Student"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Logout"
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.4rem",
                  borderRadius: "8px",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                <Sparkles size={14} />
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "block",
            background: "none",
            border: "none",
            padding: "0.5rem",
            color: "#1e293b",
            cursor: "pointer"
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={{
          padding: "1.25rem",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, padding: "0.5rem 0", color: "#1e293b" }}
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, padding: "0.5rem 0", color: "#1e293b" }}
          >
            Courses
          </Link>
          <a
            href="/#benefits"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, padding: "0.5rem 0", color: "#1e293b" }}
          >
            Benefits
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, padding: "0.5rem 0", color: "#1e293b" }}
          >
            About
          </a>

          <div style={{ height: "1px", backgroundColor: "#e2e8f0", margin: "0.25rem 0" }} />

          {currentUser ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <img
                  src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
                  alt={currentUser.name}
                  style={{ width: "36px", height: "36px", borderRadius: "50%" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{currentUser.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{currentUser.email}</div>
                </div>
              </div>

              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <ShieldCheck size={18} />
                  Admin Console
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <LayoutDashboard size={18} />
                  My Student Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center", color: "#ef4444" }}
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Style overrides for media queries */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
