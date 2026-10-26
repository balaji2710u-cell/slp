import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, healthApi } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Start with unauthenticated state - never mock a logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState({
    status: "checking",
    database: { connected: false, status: "checking" }
  });

  // Verify and restore authenticated session on initial load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const saved = localStorage.getItem("smartlearn_auth_user");
        if (saved) {
          const user = JSON.parse(saved);
          if (user?.token) {
            try {
              const res = await authApi.getMe();
              if (res && res.success && res.student) {
                const verifiedUser = {
                  id: res.student.id || res.student._id,
                  _id: res.student._id || res.student.id,
                  name: res.student.name,
                  email: res.student.email,
                  role: res.student.role,
                  token: user.token,
                  createdAt: res.student.createdAt
                };
                setCurrentUser(verifiedUser);
                localStorage.setItem("smartlearn_auth_user", JSON.stringify(verifiedUser));
              } else {
                localStorage.removeItem("smartlearn_auth_user");
                setCurrentUser(null);
              }
            } catch (err) {
              if (err.status === 401 || err.status === 404) {
                // Invalid or expired token - clear session
                localStorage.removeItem("smartlearn_auth_user");
                setCurrentUser(null);
              } else {
                // Transient network / database issue - keep cached session
                setCurrentUser(user);
              }
            }
          } else {
            localStorage.removeItem("smartlearn_auth_user");
            setCurrentUser(null);
          }
        }
      } catch (e) {
        console.error("Auth session restoration error:", e);
        localStorage.removeItem("smartlearn_auth_user");
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  // Check backend health & database connectivity
  useEffect(() => {
    healthApi
      .checkHealth()
      .then((data) => setSystemHealth(data))
      .catch((err) => {
        setSystemHealth({
          status: "offline",
          database: { connected: false, status: "unreachable" },
          error: err.message
        });
      });
  }, []);

  // Heartbeat presence tracker: sends periodic heartbeat while student is active
  useEffect(() => {
    if (!currentUser?.token) return;

    // Ping once upon active session start
    authApi.sendHeartbeat().catch(() => {});

    // Periodic heartbeat every 3 minutes
    const interval = setInterval(() => {
      authApi.sendHeartbeat().catch(() => {});
    }, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentUser?.token]);

  // Secure login - authenticates via Express backend and bcrypt
  const login = async (email, password, requiredRole = "student") => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const res = await authApi.login(cleanEmail, password);
      if (res && res.success && res.token && res.student) {
        // Enforce role authorization
        if (requiredRole === "admin" && res.student.role !== "admin") {
          return {
            success: false,
            message: "Access denied. This account does not possess administrator privileges."
          };
        }

        const userObj = {
          id: res.student.id || res.student._id,
          _id: res.student._id || res.student.id,
          name: res.student.name,
          email: res.student.email,
          role: res.student.role,
          token: res.token
        };

        setCurrentUser(userObj);
        localStorage.setItem("smartlearn_auth_user", JSON.stringify(userObj));
        return { success: true, user: userObj };
      }

      return {
        success: false,
        message: res?.message || "Invalid credentials."
      };
    } catch (err) {
      const msg = err.data?.message || err.message || "Login failed. Please verify credentials.";
      return { success: false, message: msg };
    }
  };

  // Secure registration - registers through Express backend
  const signup = async (name, email, password) => {
    try {
      const res = await authApi.register(name.trim(), email.trim().toLowerCase(), password);
      if (res && res.success && res.student) {
        return {
          success: true,
          message: "Registration successful! You may now sign in.",
          student: res.student
        };
      }
      return { success: false, message: res?.message || "Registration failed." };
    } catch (err) {
      const msg = err.data?.message || err.message || "Registration failed.";
      return { success: false, message: msg };
    }
  };

  // Secure logout
  const logout = () => {
    localStorage.removeItem("smartlearn_auth_user");
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.role === "admin";
  const isStudent = currentUser?.role === "student";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        login,
        signup,
        logout,
        isAdmin,
        isStudent,
        systemHealth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
