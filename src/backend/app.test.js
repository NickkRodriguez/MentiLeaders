const supertest = require("supertest");
const { app } = require("./server");
const request = supertest(app);
const { connectDB, disconnectDB } = require("./database");

describe("API test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    disconnectDB();
  });

  describe("POST /api/v1/mentileaders/test", () => {
    it("example POST request using a mocked database instance", async () => {
      const newUser = {
        username: "Test",
        score: 2,
      };
      const res = await request.post("/api/v1/mentileaders/test").send(newUser);

      await expect(res.status).toBe(201);
    });
  });
});
