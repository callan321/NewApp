import request from "supertest";
import app from "../src/app";

describe("User Routes", () => {
  let createdUserId: number;

  it("should return an empty array initially", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ user_name: "testuser", email: "test@example.com", password: "secret" });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe(true);

    // Optionally fetch users again to confirm creation
    const allUsers = await request(app).get("/api/users");
    const createdUser = allUsers.body.data.find((u: any) => u.email === "test@example.com");
    expect(createdUser).toBeDefined();
    createdUserId = createdUser.id;
  });

  it("should fetch the user by ID", async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data.id).toEqual(createdUserId);
    expect(res.body.data.user_name).toBe("testuser");
  });

  it("should update the user's name", async () => {
    const res = await request(app)
      .post(`/api/users/${createdUserId}`)
      .send({ user_name: "updatedUser" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);

    const updated = await request(app).get(`/api/users/${createdUserId}`);
    expect(updated.body.data.user_name).toBe("updatedUser");
  });

  it("should delete the user", async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);

    const check = await request(app).get(`/api/users/${createdUserId}`);
    expect(check.status).toBe(404);
    expect(check.body.status).toBe(false);
  });
});
