import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import express from "express";
import { z } from "zod";
import validateRequest from "../middleware/validateRequest.js";
import errorHandler from "../middleware/errorHandler.js";

describe("Request Validation Middleware (Zod)", () => {
  const schema = {
    body: z.object({
      email: z.string().email("Invalid email format"),
      age: z.number().int().min(18, "Must be at least 18")
    })
  };

  const testApp = express();
  testApp.use(express.json());
  testApp.post("/validate-test", validateRequest(schema), (req, res) => {
    res.json({ success: true, data: req.body });
  });
  testApp.use(errorHandler);

  it("Should return 400 when validation fails", async () => {
    const res = await request(testApp)
      .post("/validate-test")
      .send({ email: "not-an-email", age: 15 });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Validation failed");
    assert.ok(Array.isArray(res.body.errors));
    assert.equal(res.body.errors.length, 2);
  });

  it("Should pass when validation succeeds", async () => {
    const res = await request(testApp)
      .post("/validate-test")
      .send({ email: "student@smartlearn.org", age: 20 });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.email, "student@smartlearn.org");
    assert.equal(res.body.data.age, 20);
  });
});
