const supertest = require("supertest");
const { app, server } = require("./server");
const request = supertest(app);
const { connectDB, disconnectDB } = require("./database");

describe("API test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    disconnectDB();
    server.close();
  });

  describe("POST /students/test", () => {
    it("example request using a mocked database instance", async () => {
      const newStudent = {
        username: "Test",
        score: 2,
      };
      const res = await request.post("/students/test");

      await expect(res.status).toBe(201);
    });
  });
});
