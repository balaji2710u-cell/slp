import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";

let server;

export async function startServer() {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.warn(
        "Notice: Initial MongoDB connection could not be established:",
        dbError.message
      );
      console.warn(
        "Server is running in degraded mode (API is accessible, but DB queries will fail until connectivity is restored)."
      );
    }

    server = app.listen(env.PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode at http://localhost:${env.PORT}`);
    });

    return server;
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log("HTTP server closed.");
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Only start the server automatically if executed directly
if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  startServer();
}

export default server;