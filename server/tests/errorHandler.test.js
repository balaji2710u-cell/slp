import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import express from "express";
import app from "../app.js";
import errorHandler from "../middleware/errorHandler.js";

describe("Centralized Error Handler", () => {
  it("Should return 400 for malformed JSON request bodies", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send("{ invalid json");

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Malformed JSON payload in request body");
  });

  it("Should handle custom error objects and default to 500 without leaking stack in production", async () => {
    const testApp = express();
    testApp.get("/error-test", (req, res, next) => {
      const err = new Error("Database query crashed unexpectedly");
      next(err);
    });
    testApp.use(errorHandler);

    const res = await request(testApp).get("/error-test");
    assert.equal(res.status, 500);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Database query crashed unexpectedly");
  });
});
