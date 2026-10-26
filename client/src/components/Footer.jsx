import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, CheckCircle2, Github, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer style={{
      backgroundColor: "#0f172a",
      color: "#94a3b8",
      borderTop: "1px solid #1e293b",
      paddingTop: "4rem",
      paddingBottom: "2.5rem",
      marginTop: "auto"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3.5rem"
        }}>
          {/* Brand info */}
          <div style={{ maxWidth: "320px" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff"
              }}>
                <GraduationCap size={22} />
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Smart<span style={{ color: "#818cf8" }}>Learn</span>
              </span>
            </Link>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              The future-ready learning platform designed for ambitious developers and designers. Master technical skills with gated video lessons and real-time assessments.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{
                width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1e293b",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", transition: "all 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#4f46e5"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1e293b"}>
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{
                width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1e293b",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", transition: "all 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0284c7"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1e293b"}>
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{
                width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1e293b",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", transition: "all 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2563eb"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1e293b"}>
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{
                width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1e293b",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", transition: "all 0.2s"
              }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ef4444"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1e293b"}>
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Platform</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li><Link to="/" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>Home Overview</Link></li>
              <li><a href="/#courses" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>Explore All Courses</a></li>
              <li><a href="/#benefits" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>Platform Features</a></li>
              <li><Link to="/dashboard" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>Student Dashboard</Link></li>
              <li><Link to="/admin" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ffffff"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>Admin Management</Link></li>
            </ul>
          </div>

          {/* Top Disciplines */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Curriculums</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem" }}>
              <li><a href="/#courses" style={{ color: "#94a3b8" }}>Fullstack Web Development</a></li>
              <li><a href="/#courses" style={{ color: "#94a3b8" }}>Machine Learning & AI</a></li>
              <li><a href="/#courses" style={{ color: "#94a3b8" }}>UI/UX Design Systems</a></li>
              <li><a href="/#courses" style={{ color: "#94a3b8" }}>Cloud & Kubernetes DevOps</a></li>
              <li><a href="/#courses" style={{ color: "#94a3b8" }}>React Native Mobile Apps</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Stay Updated</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "1rem" }}>
              Subscribe to get notified about new courses, engineering tips, and platform updates.
            </p>
            {subscribed ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                fontSize: "0.85rem"
              }}>
                <CheckCircle2 size={18} />
                <span>Thanks for subscribing! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: "100%",
                      padding: "0.65rem 1rem 0.65rem 2.4rem",
                      borderRadius: "8px",
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      outline: "none"
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                  Join 45,000+ Students
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: "1px solid #1e293b",
          paddingTop: "1.75rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: "0.85rem"
        }}>
          <div>
            &copy; {new Date().getFullYear()} SmartLearn Platform Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
