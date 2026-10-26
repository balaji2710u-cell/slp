import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Sparkles, Shield } from "lucide-react";
import { authApi } from "../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(trimmed);
      setSubmitted(true);
    } catch (err) {
      // Security: Even if network fails or backend errors, provide user-friendly feedback
      setError(err.message || "Failed to process password reset request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      position: "relative",
      backgroundColor: "#f8fafc",
      overflow: "hidden"
    }}>
      {/* Background Glow Orbs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "15%",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "15%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      <div style={{
        width: "100%",
        maxWidth: "460px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)",
          border: "1px solid #e2e8f0"
        }}>
          {/* Logo / Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem auto",
              boxShadow: "0 8px 16px -4px rgba(79, 70, 229, 0.4)",
              color: "#ffffff"
            }}>
              <Shield size={28} />
            </div>
            <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem" }}>
              Reset Password
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.5, maxWidth: "340px", margin: "0 auto" }}>
              Enter your registered email address and we'll send you a secure link to reset your account password.
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div style={{
              padding: "1.5rem",
              borderRadius: "16px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              textAlign: "center"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem auto"
              }}>
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#166534", marginBottom: "0.5rem" }}>
                Reset Link Sent
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#15803d", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                If an account exists for <strong>{email}</strong>, a password reset link has been dispatched. Please check your inbox and spam folder.
              </p>
              <div style={{ fontSize: "0.8rem", color: "#4b5563", marginBottom: "1.5rem", backgroundColor: "#ffffff", padding: "0.75rem", borderRadius: "8px", border: "1px dashed #86efac" }}>
                ⏱️ Link expires in <strong>15 minutes</strong> and can only be used once.
              </div>
              <Link
                to="/login"
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.75rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              >
                <ArrowLeft size={16} />
                Return to Login
              </Link>
            </div>
          ) : (
            <>
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
              <form onSubmit={handleSubmit} id="forgot-password-form">
                <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                  <label className="form-label" htmlFor="forgot-email" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                    Registered Email Address
                  </label>
                  <div className="form-input-wrapper" style={{ position: "relative" }}>
                    <span className="form-input-icon" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      <Mail size={18} />
                    </span>
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@smartlearn.io"
                      required
                      className="form-input has-left-icon"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem 0.75rem 2.6rem",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.95rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="forgot-submit-btn"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.8rem 1rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? (
                    <span>Sending Reset Link...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Password Reset Link</span>
                    </>
                  )}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <Link
                  to="/login"
                  style={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
