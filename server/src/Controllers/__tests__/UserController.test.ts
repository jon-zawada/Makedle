import request from "supertest";
import express from "express";
import { Pool } from "pg";
import { UserController } from "../UserController";
import { UserModel } from "../../models/User";

jest.mock("../../models/User");

const app = express();
app.use(express.json());

const mockPool = {} as Pool;
const userController = new UserController(mockPool);
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all users", async () => {
    const users = [{ id: 1, username: "john_doe", email: "john@example.com" }];
    (UserModel.prototype.getUsers as jest.Mock).mockResolvedValue(users);

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });

  it("should get a user by ID", async () => {
    const user = { id: 1, username: "john_doe", email: "john@example.com" };
    (UserModel.prototype.getUserById as jest.Mock).mockResolvedValue(user);

    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("should create a user", async () => {
    const newUser = { id: 2, username: "jane_doe", email: "jane@example.com" };
    (UserModel.prototype.createUser as jest.Mock).mockResolvedValue(newUser);

    const response = await request(app).post("/users").send({
      username: "jane_doe",
      email: "jane@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newUser);
  });

  it("should handle errors when getting users", async () => {
    (UserModel.prototype.getUsers as jest.Mock).mockRejectedValue(
      new Error("DB Error")
    );

    const response = await request(app).get("/users");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error retrieving users",
      error: {},
    });
  });

  it("should handle errors when getting a user by ID", async () => {
    (UserModel.prototype.getUserById as jest.Mock).mockRejectedValue(
      new Error("DB Error")
    );

    const response = await request(app).get("/users/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error retrieving user",
      error: {},
    });
  });

  it("should handle errors when creating a user", async () => {
    (UserModel.prototype.createUser as jest.Mock).mockRejectedValue(
      new Error("DB Error")
    );

    const response = await request(app).post("/users").send({
      username: "jane_doe",
      email: "jane@example.com",
      password: "password123",
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Error creating user",
      error: {},
    });
  });
});
