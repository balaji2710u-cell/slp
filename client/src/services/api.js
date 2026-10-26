/**
 * Unified API Client for SmartLearn Platform.
 * Connects React client to Express backend with JWT token handling,
 * detailed error normalization, and database connectivity status tracking.
 */

const API_BASE = "/api";

export function getAuthToken() {
  try {
    const userJson = localStorage.getItem("smartlearn_auth_user");
    if (userJson) {
      const user = JSON.parse(userJson);
      return user?.token || null;
    }
  } catch {
    return null;
  }
  return null;
}

export async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const contentType = res.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = { message: await res.text() };
    }

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
      const netErr = new Error("Unable to connect to SmartLearn backend server. Please verify backend is running on port 5000.");
      netErr.isNetworkError = true;
      throw netErr;
    }
    throw err;
  }
}

// Authentication Service
export const authApi = {
  login: (email, password) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
  register: (name, email, password) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    }),
  forgotPassword: (email) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email })
    }),
  resetPassword: (token, password) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password })
    }),
  getMe: () => apiRequest("/auth/me"),
  sendHeartbeat: () =>
    apiRequest("/auth/heartbeat", {
      method: "POST"
    })
};

// Course Management Service
export const coursesApi = {
  getAll: (query = "") => apiRequest(`/courses${query ? `?${query}` : ""}`),
  getById: (id) => apiRequest(`/courses/${id}`),
  create: (data) =>
    apiRequest("/courses", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id, data) =>
    apiRequest(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  delete: (id) =>
    apiRequest(`/courses/${id}`, {
      method: "DELETE"
    }),
  getLessons: (courseId) => apiRequest(`/courses/${courseId}/lessons`),
  createLesson: (courseId, data) =>
    apiRequest(`/courses/${courseId}/lessons`, {
      method: "POST",
      body: JSON.stringify(data)
    }),
  updateLesson: (courseId, lessonId, data) =>
    apiRequest(`/courses/${courseId}/lessons/${lessonId}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  deleteLesson: (courseId, lessonId) =>
    apiRequest(`/courses/${courseId}/lessons/${lessonId}`, {
      method: "DELETE"
    }),
  reorderLessons: (courseId, lessonIds) =>
    apiRequest(`/courses/${courseId}/lessons/reorder`, {
      method: "PATCH",
      body: JSON.stringify({ lessonIds })
    }),
  validateVideo: (videoUrl) =>
    apiRequest("/courses/validate-video", {
      method: "POST",
      body: JSON.stringify({ videoUrl })
    })
};

// Quiz & Assessment Service
export const quizApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/quizzes${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => apiRequest(`/quizzes/${id}`),
  create: (data) =>
    apiRequest("/quizzes", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  update: (id, data) =>
    apiRequest(`/quizzes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  delete: (id) =>
    apiRequest(`/quizzes/${id}`, {
      method: "DELETE"
    }),
  submit: (id, answers) =>
    apiRequest(`/quizzes/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers })
    }),
  getAttempts: (id) => apiRequest(`/quizzes/${id}/attempts`)
};

// Student Progress Service
export const progressApi = {
  getAll: () => apiRequest("/progress"),
  getCourseProgress: (courseId) => apiRequest(`/progress/${courseId}`),
  getSummary: () => apiRequest("/progress/summary"),
  updateGoal: (weeklyGoalMinutes) =>
    apiRequest("/progress/goal", {
      method: "PUT",
      body: JSON.stringify({ weeklyGoalMinutes })
    }),
  enroll: (courseId) =>
    apiRequest("/progress/enroll", {
      method: "POST",
      body: JSON.stringify({ courseId })
    }),
  completeLesson: (courseId, lessonId) =>
    apiRequest(`/progress/${courseId}/complete-lesson`, {
      method: "POST",
      body: JSON.stringify({ lessonId })
    }),
  getStudentProgress: (studentId) => apiRequest(`/progress/student/${studentId}`)
};

// Admin Analytics Service
export const adminApi = {
  getStats: () => apiRequest("/admin/stats"),
  getStudents: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/admin/students${qs ? `?${qs}` : ""}`);
  },
  getStudentDetails: (studentId) => apiRequest(`/admin/students/${studentId}`),
  getQuizPerformance: () => apiRequest("/admin/quizzes/performance")
};

// System Health Service
export const healthApi = {
  checkHealth: () => apiRequest("/health")
};

// Certificate Service
export const certificateApi = {
  getMyCertificates: () => apiRequest("/certificates/my"),
  getCourseCertificate: (courseId) => apiRequest(`/certificates/course/${courseId}`),
  issueCertificate: (courseId, payload = {}) =>
    apiRequest("/certificates/issue", {
      method: "POST",
      body: JSON.stringify({ courseId, ...payload })
    }),
  verifyCertificate: (certificateId) => apiRequest(`/certificates/verify/${certificateId}`)
};

