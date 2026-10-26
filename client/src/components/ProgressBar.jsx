import React from "react";

export default function ProgressBar({ value = 0, max = 100, showLabel = true, height = 8, color = null }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: "100%" }}>
      {showLabel && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.35rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#475569"
        }}>
          <span>Progress</span>
          <span style={{ color: percentage === 100 ? "#059669" : "#4f46e5", fontWeight: 700 }}>
            {percentage}%
          </span>
        </div>
      )}
      <div style={{
        width: "100%",
        height: `${height}px`,
        backgroundColor: "#e2e8f0",
        borderRadius: "9999px",
        overflow: "hidden",
        position: "relative"
      }}>
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: color || (percentage === 100
              ? "linear-gradient(90deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)"),
            borderRadius: "9999px",
            transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        />
      </div>
    </div>
  );
}
