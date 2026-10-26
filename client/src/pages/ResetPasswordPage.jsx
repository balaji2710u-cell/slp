import React, { useState } from "react";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";
import { authApi } from "../services/api";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const routeParams = useParams();
  const navigate = useNavigate();

  // Support both /reset-password?token=XYZ and /reset-password/:token
  const token = searchParams.get("token") || routeParams.token || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Password reset token is missing or malformed. Please use the link provided in your email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword(token, password);
      if (res && res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(err.message || "Password reset token is invalid, expired, or has already been used.");
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
        right: "15%",
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
        left: "15%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
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
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem auto",
              boxShadow: "0 8px 16px -4px rgba(16, 185, 129, 0.4)",
              color: "#ffffff"
            }}>
              <KeyRound size={28} />
            </div>
            <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem" }}>
              Set New Password
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.5, maxWidth: "340px", margin: "0 auto" }}>
              Please enter a strong new password with at least 8 characters.
            </p>
          </div>

          {/* Missing Token Warning */}
          {!token && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fef3c7",
              color: "#b45309",
              fontSize: "0.85rem",
              marginBottom: "1.25rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>Missing reset token in URL. Please click the full link sent to your email.</span>
            </div>
          )}

          {/* Success State */}
          {success ? (
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
                Password Reset Successfully
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#15803d", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                Your account password has been updated. You can now sign in with your new credentials.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.75rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
              >
                Go to Sign In
              </button>
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
              <form onSubmit={handleSubmit} id="reset-password-form">
                {/* New Password */}
                <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                  <label className="form-label" htmlFor="new-password" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                    New Password (min 8 characters)
                  </label>
                  <div className="form-input-wrapper" style={{ position: "relative" }}>
                    <span className="form-input-icon" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      <Lock size={18} />
                    </span>
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      required
                      minLength={8}
                      className="form-input has-left-icon has-right-icon"
                      style={{
                        width: "100%",
                        padding: "0.75rem 2.8rem 0.75rem 2.6rem",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.95rem",
                        outline: "none"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                  <label className="form-label" htmlFor="confirm-password" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", marginBottom: "0.4rem", display: "block" }}>
                    Confirm New Password
                  </label>
                  <div className="form-input-wrapper" style={{ position: "relative" }}>
                    <span className="form-input-icon" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      <Lock size={18} />
                    </span>
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      required
                      minLength={8}
                      className="form-input has-left-icon has-right-icon"
                      style={{
                        width: "100%",
                        padding: "0.75rem 2.8rem 0.75rem 2.6rem",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.95rem",
                        outline: "none"
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="reset-submit-btn"
                  disabled={loading || !token}
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
                    cursor: loading || !token ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? "Updating Password..." : "Update Password"}
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
                  Return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
