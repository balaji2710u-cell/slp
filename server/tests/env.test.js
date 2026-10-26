import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateEnv } from "../config/env.js";

describe("Environment Configuration Validation", () => {
  it("Should throw safe error when required MONGO_URI is missing", () => {
    const invalidEnv = {
      NODE_ENV: "production",
      PORT: "5000",
      JWT_SECRET: "strongsecretwithmorethan8chars"
      // MONGO_URI is intentionally omitted
    };

    assert.throws(
      () => validateEnv(invalidEnv),
      (err) => {
        assert.ok(err.message.includes("MONGO_URI"));
        assert.ok(!err.message.includes("strongsecretwithmorethan8chars")); // Secret not leaked
        return true;
      }
    );
  });

  it("Should throw safe error when JWT_SECRET is too short", () => {
    const invalidEnv = {
      NODE_ENV: "production",
      PORT: "5000",
      MONGO_URI: "mongodb+srv://user:pass@cluster.mongodb.net",
      JWT_SECRET: "short"
    };

    assert.throws(
      () => validateEnv(invalidEnv),
      (err) => {
        assert.ok(err.message.includes("JWT_SECRET"));
        assert.ok(!err.message.includes("short")); // Secret not leaked
        return true;
      }
    );
  });

  it("Should pass when all required variables are valid", () => {
    const validEnv = {
      NODE_ENV: "production",
      PORT: "8080",
      MONGO_URI: "mongodb+srv://user:pass@cluster.mongodb.net/smartlearn",
      JWT_SECRET: "super_secure_jwt_token_secret_value",
      CORS_ORIGIN: "https://smartlearn.org"
    };

    const result = validateEnv(validEnv);
    assert.equal(result.PORT, 8080);
    assert.equal(result.NODE_ENV, "production");
    assert.equal(result.CORS_ORIGIN, "https://smartlearn.org");
  });
});
