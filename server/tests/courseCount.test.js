import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";
import Course from "../models/Course.js";

describe("Dynamic Course Catalogue Count & Pagination Integrity (Task 3 Tests)", () => {
  let originalFind;
  let originalCountDocuments;

  beforeEach(() => {
    originalFind = Course.find;
    originalCountDocuments = Course.countDocuments;
  });

  afterEach(() => {
    Course.find = originalFind;
    Course.countDocuments = originalCountDocuments;
  });

  it("1. GET /api/courses should return dynamic total matching published courses only", async () => {
    const publishedCoursesMock = [
      { _id: "c1", title: "Course 1", isPublished: true, lessons: [] },
      { _id: "c2", title: "Course 2", isPublished: true, lessons: [] },
      { _id: "c3", title: "Course 3", isPublished: true, lessons: [] }
    ];

    Course.find = (filter) => {
      // Must filter by isPublished: true
      assert.equal(filter.isPublished, true);
      return {
        sort: () => ({
          skip: () => ({
            limit: async () => publishedCoursesMock
          })
        })
      };
    };

    Course.countDocuments = async (filter) => {
      assert.equal(filter.isPublished, true);
      return 3;
    };

    const res = await request(app).get("/api/courses");

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.total, 3);
    assert.equal(res.body.count, 3);
    assert.equal(res.body.courses.length, 3);
  });

  it("2. GET /api/courses should preserve accurate total count when pagination is applied", async () => {
    const pagedCourses = [{ _id: "c1", title: "Course 1", isPublished: true, lessons: [] }];

    Course.find = (filter) => {
      assert.equal(filter.isPublished, true);
      return {
        sort: () => ({
          skip: (skip) => {
            assert.equal(skip, 0);
            return {
              limit: (limit) => {
                assert.equal(limit, 1);
                return Promise.resolve(pagedCourses);
              }
            };
          }
        })
      };
    };

    // Database contains 63 total published courses
    Course.countDocuments = async () => 63;

    const res = await request(app).get("/api/courses?page=1&limit=1");

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.count, 1);
    assert.equal(res.body.total, 63); // Total must not be capped to page size!
    assert.equal(res.body.page, 1);
    assert.equal(res.body.totalPages, 63);
  });

  it("3. GET /api/courses should exclude unpublished or draft courses for public users", async () => {
    let capturedFilter = null;
    Course.find = (filter) => {
      capturedFilter = filter;
      return {
        sort: () => ({
          skip: () => ({
            limit: async () => []
          })
        })
      };
    };
    Course.countDocuments = async (filter) => {
      assert.equal(filter.isPublished, true);
      return 0;
    };

    const res = await request(app).get("/api/courses");
    assert.equal(res.status, 200);
    assert.equal(capturedFilter.isPublished, true);
  });

  it("4. Dynamic count increases when a new published course exists", async () => {
    Course.find = () => ({
      sort: () => ({
        skip: () => ({
          limit: async () => new Array(64).fill({ title: "C", isPublished: true })
        })
      })
    });
    Course.countDocuments = async () => 64;

    const res = await request(app).get("/api/courses");
    assert.equal(res.status, 200);
    assert.equal(res.body.total, 64);
  });
});
