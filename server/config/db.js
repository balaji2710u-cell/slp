import mongoose from "mongoose";
import { env } from "./env.js";

const connectionStates = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

/**
 * Return current connection status synchronously for health check endpoint.
 */
export const getDbStatus = () => {
  const readyState = mongoose.connection.readyState;
  return {
    readyState,
    status: connectionStates[readyState] || "unknown",
    connected: readyState === 1
  };
};

/**
 * Mask credentials in MongoDB connection URI for safe error logging.
 * Never outputs usernames or passwords.
 *
 * @param {string} uri
 * @returns {string} Sanitized URI
 */
export function sanitizeMongoUri(uri) {
  if (!uri || typeof uri !== "string") return "[undefined]";
  try {
    const atIndex = uri.indexOf("@");
    if (atIndex === -1) return uri;
    const protoIndex = uri.indexOf("://");
    if (protoIndex === -1) return uri;
    const protocol = uri.slice(0, protoIndex + 3);
    const hostAndRest = uri.slice(atIndex + 1);
    return `${protocol}***:***@${hostAndRest}`;
  } catch {
    return "[redacted_uri]";
  }
}

/**
 * Redact any credentials matching URI patterns from error messages or strings.
 *
 * @param {string} text
 * @returns {string}
 */
export function redactCredentials(text) {
  if (typeof text !== "string") return text;
  return text.replace(/mongodb(\+srv)?:\/\/[^@\s]+@/g, "mongodb$1://***:***@");
}

/**
 * Analyze MongoDB connection errors and generate sanitized, actionable diagnostic advice.
 * Specifically handles TLS alert 80, IP access list restrictions, DNS, and timeouts.
 * Never reveals secrets, passwords, or connection strings.
 *
 * @param {Error} error
 * @returns {Object} Sanitized diagnostic summary
 */
export function diagnoseConnectionError(error) {
  const sanitized = {
    name: error?.name || "DatabaseConnectionError",
    code: error?.code || null,
    message: redactCredentials(error?.message || "Unknown database error"),
    category: "unknown",
    advice: ""
  };

  const serverDetails = [];
  if (error?.reason?.servers && typeof error.reason.servers[Symbol.iterator] === "function") {
    for (const [host, desc] of error.reason.servers) {
      serverDetails.push({
        host,
        type: desc.type || "Unknown",
        error: redactCredentials(desc.error?.message || null)
      });
    }
  }

  const serverErrorText = serverDetails.map((s) => `${s.host}: ${s.error || ""}`).join(" ");
  const combinedError = `${sanitized.name} ${sanitized.message} ${serverErrorText}`;

  // Check for TLS Alert 80 / ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR
  if (
    combinedError.includes("SSL alert number 80") ||
    combinedError.includes("ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR") ||
    combinedError.includes("tlsv1 alert internal error")
  ) {
    sanitized.category = "tls_alert_80_ip_restriction";
    sanitized.advice =
      "Atlas cluster terminated TLS handshake with SSL alert number 80 (Internal Error). In MongoDB Atlas, this occurs when the incoming connection's client IP is not in the Atlas Network Access IP Access List. Verify that your current public IP address is active in MongoDB Atlas > Security > Network Access (or allow 0.0.0.0/0 temporarily for development).";
  } else if (
    error?.name === "MongooseServerSelectionError" &&
    combinedError.includes("IP that isn't whitelisted")
  ) {
    sanitized.category = "ip_access_list";
    sanitized.advice =
      "MongoDB Atlas server selection failed due to IP access control. Add your machine's current public IP in Atlas Network Access.";
  } else if (combinedError.includes("ENOTFOUND") || combinedError.includes("querySrv ENOTFOUND")) {
    sanitized.category = "dns_resolution";
    sanitized.advice =
      "DNS resolution failed for the Atlas cluster hostname. Check internet connectivity and DNS configuration.";
  } else if (combinedError.includes("AuthenticationFailed") || combinedError.includes("auth failed")) {
    sanitized.category = "authentication";
    sanitized.advice =
      "Database user authentication failed. Verify the database user credentials in MONGO_URI in .env.";
  } else if (combinedError.includes("ETIMEDOUT") || combinedError.includes("timed out")) {
    sanitized.category = "timeout";
    sanitized.advice =
      "Connection timed out. Check if port 27017 outbound traffic is blocked by a local firewall, VPN, or ISP.";
  }

  if (serverDetails.length > 0) {
    sanitized.servers = serverDetails;
  }

  return sanitized;
}

/**
 * Connect to MongoDB Atlas using Mongoose with safe diagnostic reporting.
 *
 * @param {string} mongoUri
 * @returns {Promise<mongoose.Connection>}
 */
export const connectDB = async (mongoUri = env.MONGO_URI) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected successfully!");
    return conn;
  } catch (error) {
    const diag = diagnoseConnectionError(error);
    console.error("MongoDB connection failed:", diag.message);
    if (diag.advice) {
      console.error("Diagnosis & Action:", diag.advice);
    }
    throw error;
  }
};

/**
 * Disconnect from MongoDB gracefully.
 */
export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully.");
  }
};

export default connectDB;