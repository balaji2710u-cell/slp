import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1rem",
      backgroundColor: "#f8fafc"
    }}>
      <div className="card" style={{ maxWidth: "480px", textAlign: "center", padding: "3rem 2rem", borderRadius: "20px" }}>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "16px",
          backgroundColor: "#eef2ff",
          color: "#4f46e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem auto"
        }}>
          <GraduationCap size={32} />
        </div>
        <div style={{ fontSize: "3.5rem", fontWeight: 800, color: "#4f46e5", lineHeight: 1, marginBottom: "0.5rem" }}>
          404
        </div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Page Not Found</h2>
        <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "2rem" }}>
          The page or curriculum you are looking for doesn't exist or has moved.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary" style={{ gap: "0.5rem" }}>
            <Home size={16} />
            Return to Home
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            Student Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
