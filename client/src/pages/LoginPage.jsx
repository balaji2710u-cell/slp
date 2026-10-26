import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  User,
  ArrowRight,
  AlertCircle,
  Zap,
  CheckCircle2
} from "lucide-react";
import { ADMIN_USER } from "../data/mockData";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";

  const { login } = useAuth();
  const navigate = useNavigate();

  // Role toggle: 'student' or 'admin'
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password, role);
      setLoading(false);
      if (res.success) {
        if (redirectPath) {
          navigate(redirectPath);
        } else if (role === "admin" || res.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res.message || "Failed to log in. Please check your credentials.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleFillStudent = () => {
    setRole("student");
    setEmail("student@smartlearn.org");
    setPassword("Student123!");
    setError("");
  };

  const handleFillAdmin = () => {
    setRole("admin");
    setEmail("admin@smartlearn.org");
    setPassword("AdminPassword123!");
    setError("");
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 1rem",
      backgroundColor: "#f8fafc",
      position: "relative"
    }}>
      {/* Background ambient lighting */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(255,255,255,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div style={{
        width: "100%",
        maxWidth: "460px",
        position: "relative",
        zIndex: 2
      }}>
        {/* Card */}
        <div className="card" style={{ padding: "2.25rem", borderRadius: "20px", boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.07)" }}>
          {/* Logo & Heading */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <GraduationCap size={24} />
              </div>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", color: "#0f172a" }}>
                Smart<span style={{ color: "#4f46e5" }}>Learn</span>
              </span>
            </Link>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
              Welcome back
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              Sign in to resume your learning and unlock lessons
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            padding: "0.3rem",
            backgroundColor: "#f1f5f9",
            borderRadius: "12px",
            marginBottom: "1.5rem"
          }}>
            <button
              type="button"
              onClick={() => { setRole("student"); setError(""); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.6rem",
                borderRadius: "9px",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: role === "student" ? "#ffffff" : "transparent",
                color: role === "student" ? "#4f46e5" : "#64748b",
                boxShadow: role === "student" ? "0 2px 5px rgba(0,0,0,0.06)" : "none"
              }}
            >
              <User size={16} />
              Student Login
            </button>
            <button
              type="button"
              onClick={() => { setRole("admin"); setError(""); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.6rem",
                borderRadius: "9px",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: role === "admin" ? "#ffffff" : "transparent",
                color: role === "admin" ? "#7c3aed" : "#64748b",
                boxShadow: role === "admin" ? "0 2px 5px rgba(0,0,0,0.06)" : "none"
              }}
            >
              <ShieldCheck size={16} />
              Admin Portal
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fee2e2",
              color: "#b91c1c",
              fontSize: "0.85rem",
              marginBottom: "1.25rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                <span>{role === "admin" ? "Admin Email Address" : "Email Address"}</span>
              </label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "admin" ? "admin@smartlearn.io" : "student@smartlearn.io"}
                  required
                  className="form-input has-left-icon"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label">
                <span>Password</span>
                <Link
                  to="/forgot-password"
                  id="forgot-password-link"
                  style={{ fontSize: "0.82rem", color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
              </div>


              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="form-input has-left-icon has-right-icon"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.8rem 1rem", fontSize: "0.95rem" }}
            >
              {loading ? "Signing In..." : `Sign In as ${role === "admin" ? "Admin" : "Student"}`}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Quick 1-Click Demo Buttons */}
          <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px dashed #e2e8f0" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#94a3b8"
            }}>
              <span>Sample Credentials</span>
              <span className="badge badge-secondary" style={{ fontSize: "0.65rem" }}>Autofill</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              <button
                type="button"
                onClick={handleFillStudent}
                className="btn btn-secondary btn-sm"
                title="Autofill sample student credentials for real backend authentication"
                style={{
                  borderColor: "#c7d2fe",
                  backgroundColor: "#f5f7ff",
                  color: "#4338ca",
                  fontSize: "0.8rem",
                  justifyContent: "center"
                }}
              >
                <Zap size={14} color="#4f46e5" />
                Student Credentials
              </button>

              <button
                type="button"
                onClick={handleFillAdmin}
                className="btn btn-secondary btn-sm"
                title="Autofill sample admin credentials for real backend authentication"
                style={{
                  borderColor: "#ddd6fe",
                  backgroundColor: "#faf5ff",
                  color: "#6d28d9",
                  fontSize: "0.8rem",
                  justifyContent: "center"
                }}
              >
                <ShieldCheck size={14} color="#7c3aed" />
                Admin Credentials
              </button>
            </div>
          </div>

          {/* Navigation to Signup */}
          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
            Don't have an account yet?{" "}
            <Link to="/signup" style={{ color: "#4f46e5", fontWeight: 700 }}>
              Create student account
            </Link>
          </div>

          {/* Note regarding Admin Registration */}
          <div style={{
            marginTop: "1.25rem",
            padding: "0.6rem 0.75rem",
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            fontSize: "0.75rem",
            color: "#64748b",
            textAlign: "center"
          }}>
            🔒 Admin registration is restricted. Platform admins are provisioned internally.
          </div>
        </div>
      </div>
    </div>
  );
}
