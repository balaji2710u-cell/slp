import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please provide a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await signup(formData.name, formData.email, formData.password);
      setLoading(false);
      if (res.success) {
        navigate("/dashboard");
      } else {
        setError(res.message || "Failed to create account.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to create account. Please try again.");
    }
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
        right: "20%",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(255,255,255,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div style={{
        width: "100%",
        maxWidth: "480px",
        position: "relative",
        zIndex: 2
      }}>
        <div className="card" style={{ padding: "2.5rem", borderRadius: "20px", boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.07)" }}>
          {/* Logo & Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
              Create Student Account
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              Start learning today with unlocked courses and checkpoint quizzes
            </p>
          </div>

          {/* Error Banner */}
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
              marginBottom: "1.5rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  className="form-input has-left-icon"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex.morgan@example.com"
                  required
                  className="form-input has-left-icon"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                <span>Password</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 400 }}>Min 8 chars</span>
              </label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
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

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">
                  <Lock size={18} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="form-input has-left-icon has-right-icon"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle-btn"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.75rem", padding: "0.8rem 1rem", fontSize: "0.95rem" }}
            >
              {loading ? "Creating Account..." : "Create Student Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Navigation to Login */}
          <div style={{ textAlign: "center", marginTop: "1.75rem", fontSize: "0.875rem", color: "#64748b" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#4f46e5", fontWeight: 700 }}>
              Sign in here
            </Link>
          </div>

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
            🔒 Looking for the Admin Portal? <Link to="/login" style={{ color: "#4f46e5", fontWeight: 600 }}>Log in via the Admin tab</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
