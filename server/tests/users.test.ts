import request from "supertest";
import app from "../src/app";

describe("User Routes", () => {
  const testUser = {
    user_name: "testuser",
    email: "testuser@example.com",
    password: "secure123",
  };

  let userId: number;

  // Create a user; note that the response only returns a success message.
  it("POST /api/users - create user", async () => {
    const res = await request(app).post("/api/users").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    // The created user id is not returned here.
  });

  // Fetch all users and extract the one we just created.
  it("GET /api/users - fetch all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    // Adjust based on your API response structure.
    // If your GET route returns { data: [...] }:
    expect(res.body).toHaveProperty("data");
    const users = res.body.data;
    // If it returns an array directly, simply use:
    // const users = res.body;
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);

    // Find the user by email.
    const createdUser = users.find(
      (user: any) => user.email === testUser.email
    );
    expect(createdUser).toBeDefined();
    userId = createdUser.id;
  });

  it("GET /api/users/:id - fetch user by ID", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("id", userId);
  });

  it("POST /api/users/:id - update user", async () => {
    const res = await request(app)
      .post(`/api/users/${userId}`)
      .send({ user_name: "updatedUser" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /api/users/:id - delete user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
