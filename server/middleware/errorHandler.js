import { ZodError } from "zod";
import { env } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error";
  let errors = undefined;

  // Handle malformed JSON body from express.json()
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Malformed JSON payload in request body";
  }

  // Handle Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));
  }

  // Handle MongoDB duplicate key error (code 11000)
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || "record";
    message = `A ${field} with that value already exists`;
  }

  // Handle Mongoose CastError (e.g. malformed ObjectId)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid format for field '${err.path}'`;
  }

  // Handle Mongoose validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed";
    errors = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message
    }));
  }

  // Handle Mongoose connection / buffering timeout
  else if (
    err.name === "MongooseServerSelectionError" ||
    (err.name === "MongooseError" && err.message?.includes("buffering timed out"))
  ) {
    statusCode = 503;
    message = "Database service is temporarily unavailable. Connection to MongoDB cluster failed.";
  }

  const responsePayload = {
    success: false,
    message,
    ...(errors ? { errors } : {})
  };

  // Stack traces and internal debug details are never exposed in production
  if (env.NODE_ENV === "development" && statusCode >= 500) {
    responsePayload.stack = err.stack;
  }

  res.status(statusCode).json(responsePayload);
};

export default errorHandler;
