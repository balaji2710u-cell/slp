import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import express from "express";
import { createRateLimiter } from "../middleware/rateLimiter.js";

describe("Rate Limiting Middleware", () => {
  // 16. Rate-limiting behavior
  it("Feature 16: Should return HTTP 429 when rate limit is exceeded", async () => {
    const testApp = express();
    // Limiter configured for max 2 requests per window for fast deterministic testing
    const testLimiter = createRateLimiter({
      windowMs: 60 * 1000,
      max: 2
    });

    testApp.use("/limited-endpoint", testLimiter, (req, res) => {
      res.json({ success: true, count: "ok" });
    });

    // Request 1: Allowed
    const res1 = await request(testApp).get("/limited-endpoint");
    assert.equal(res1.status, 200);
    assert.equal(res1.body.success, true);

    // Request 2: Allowed
    const res2 = await request(testApp).get("/limited-endpoint");
    assert.equal(res2.status, 200);
    assert.equal(res2.body.success, true);

    // Request 3: Blocked with HTTP 429
    const res3 = await request(testApp).get("/limited-endpoint");
    assert.equal(res3.status, 429);
    assert.equal(res3.body.success, false);
    assert.equal(res3.body.message, "Too many requests, please try again later");
    assert.ok(res3.headers["retry-after"]);
  });
});
