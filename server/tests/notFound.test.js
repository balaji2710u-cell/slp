import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

describe("Not Found (404) Handler", () => {
  it("GET /api/nonexistent-route should return 404 with standard message", async () => {
    const res = await request(app).get("/api/nonexistent-route");
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "API route not found");
  });

  it("POST /api/another/missing should return 404 with standard message", async () => {
    const res = await request(app).post("/api/another/missing").send({ foo: "bar" });
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "API route not found");
  });
});
