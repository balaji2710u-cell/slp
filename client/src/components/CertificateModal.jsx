import React from "react";
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, Sparkles } from "lucide-react";

export default function CertificateModal({ studentName, courseTitle, learningGroup, completionDate, certificateId, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000, padding: "1rem" }}>
      <div
        className="modal-content certificate-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: 0,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          border: "2px solid #e2e8f0"
        }}
      >
        {/* Certificate Action Bar (Top) */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.85rem 1.5rem",
          backgroundColor: "#0f172a",
          color: "#ffffff"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
            <Award size={18} color="#f59e0b" />
            <span>SmartLearn Verified Academic Credential</span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handlePrint}
              className="btn btn-sm"
              style={{
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.8rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              <Printer size={14} />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Frame (Parchment Aesthetic) */}
        <div
          id="printable-certificate"
          style={{
            padding: "3.5rem 3rem",
            backgroundColor: "#ffffff",
            backgroundImage: "radial-gradient(#f1f5f9 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            position: "relative",
            textAlign: "center"
          }}
        >
          {/* Decorative Gold Border */}
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            bottom: "16px",
            border: "2px solid #d97706",
            borderRadius: "12px",
            pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute",
            top: "22px",
            left: "22px",
            right: "22px",
            bottom: "22px",
            border: "1px dashed #f59e0b",
            borderRadius: "8px",
            pointerEvents: "none"
          }} />

          {/* Seal / Emblem */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#fffbeb",
            border: "2px solid #f59e0b",
            color: "#d97706",
            marginBottom: "1rem",
            boxShadow: "0 4px 15px rgba(245, 158, 11, 0.25)"
          }}>
            <Award size={36} />
          </div>

          <div style={{
            fontSize: "0.85rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#d97706",
            marginBottom: "0.25rem"
          }}>
            SmartLearn Educational Foundation
          </div>

          <h1 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
            fontWeight: 900,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
            textTransform: "uppercase"
          }}>
            Certificate of Completion
          </h1>

          <p style={{ fontSize: "0.95rem", color: "#64748b", maxWidth: "560px", margin: "0 auto 1.5rem auto", lineHeight: 1.5 }}>
            This officially certifies that the student named below has successfully satisfied all curriculum standards, completed all practical exercises, and passed the final comprehensive examination.
          </p>

          {/* Student Name */}
          <div style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            fontWeight: 800,
            color: "#4f46e5",
            borderBottom: "2px solid #c7d2fe",
            paddingBottom: "0.4rem",
            maxWidth: "460px",
            margin: "0 auto 1.5rem auto"
          }}>
            {studentName || "Dedicated Student"}
          </div>

          {/* Course Details */}
          <p style={{ fontSize: "0.95rem", color: "#475569", marginBottom: "0.25rem" }}>
            has demonstrated academic mastery in
          </p>

          <h2 style={{
            fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "0.5rem"
          }}>
            {courseTitle}
          </h2>

          <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "2rem" }}>
            <span style={{
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: "#eef2ff",
              color: "#4338ca",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "1px solid #c7d2fe"
            }}>
              {learningGroup || "Core Curriculum"}
            </span>
            <span style={{
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              backgroundColor: "#ecfdf5",
              color: "#065f46",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "1px solid #a7f3d0"
            }}>
              Grade: Certified Master
            </span>
          </div>

          {/* Signatures & Verification Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1.5rem",
            alignItems: "flex-end",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e2e8f0",
            maxWidth: "640px",
            margin: "0 auto"
          }}>
            <div>
              <div style={{
                fontFamily: "serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#1e1b4b",
                marginBottom: "0.25rem"
              }}>
                Dr. R. Sundaram
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Academic Director
              </div>
            </div>

            {/* Official Badge */}
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "#334155"
              }}>
                <ShieldCheck size={14} color="#10b981" />
                Verified
              </div>
              <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "0.3rem" }}>
                Issued: {completionDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: "serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "#1e1b4b",
                marginBottom: "0.25rem"
              }}>
                Prof. M. Balaji
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Curriculum Lead
              </div>
            </div>
          </div>

          {/* Certificate Verification Serial */}
          <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "1.5rem" }}>
            Credential ID: <code>{certificateId || `SL-CERT-2026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`}</code> • Authenticated on SmartLearn Core
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-shadow: none;
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
