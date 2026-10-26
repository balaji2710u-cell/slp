import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("Health and Root Endpoints", () => {
  it("GET / should return 200 with platform welcome string", async () => {
    const res = await request(app).get("/");
    assert.equal(res.status, 200);
    assert.equal(res.text, "Smart Learning Platform API is running!");
  });

  it("GET /api/health should return 200 with JSON status and database details", async () => {
    const res = await request(app).get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.message, "API is running");
    assert.ok(["healthy", "degraded"].includes(res.body.status));
    assert.ok(res.body.database);
    assert.equal(typeof res.body.database.connected, "boolean");
    assert.equal(typeof res.body.database.status, "string");
    assert.equal(typeof res.body.uptime, "number");
    assert.ok(res.body.timestamp);
  });
});
