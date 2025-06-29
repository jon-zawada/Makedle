import { Pool } from "pg";
import { UserModel } from "../User";

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    end: jest.fn(),
  };
  const mPool = jest.fn(() => mClient);
  return { Pool: mPool };
});

describe("UserModel", () => {
  let userModel: UserModel;
  let mockPool: jest.Mocked<Pool>;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockPool = new Pool() as jest.Mocked<Pool>;
    mockQuery = mockPool.query as jest.Mock;
    userModel = new UserModel(mockPool);
    jest.clearAllMocks();
  });

  it("should return a list of users from getUsers", async () => {
    const mockUsers = [
      {
        id: 1,
        username: "user1",
        email: "user1@example.com",
        created_at: new Date(),
      },
      {
        id: 2,
        username: "user2",
        email: "user2@example.com",
        created_at: new Date(),
      },
    ];
    mockQuery.mockResolvedValue({ rows: mockUsers });

    const result = await userModel.getUsers();

    expect(result).toEqual(mockUsers);
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT id, username, email, created_at FROM users",
    );
  });

  it("should return a user by ID from getUserById", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      created_at: new Date(),
    };
    mockQuery.mockResolvedValue({ rows: [mockUser] });

    const result = await userModel.getUserById("1");

    expect(result).toEqual(mockUser);
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id = $1",
      ["1"],
    );
  });

  it("should create a new user and return it", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      hashed_password: "hashed",
      created_at: new Date(),
    };
    mockQuery.mockResolvedValue({ rows: [mockUser] });

    const result = await userModel.createUser(
      "user1",
      "user1@example.com",
      "hashed",
    );

    expect(result).toEqual(mockUser);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
      ["user1", "user1@example.com", "hashed"],
    );
  });

  it("should return a user by email from loginUser", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      hashed_password: "hashed",
      created_at: new Date(),
    };
    mockQuery.mockResolvedValue({ rows: [mockUser] });

    const result = await userModel.loginUser("user1@example.com");

    expect(result).toEqual(mockUser);
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE email=$1",
      ["user1@example.com"],
    );
  });

  it("should update the refresh token for a user", async () => {
    mockQuery.mockResolvedValue({ rowCount: 1 });

    await userModel.updateRefreshToken(1, "new-refresh-token");

    expect(mockQuery).toHaveBeenCalledWith(
      "UPDATE users SET refresh_token = $1 WHERE id = $2",
      ["new-refresh-token", 1],
    );
  });

  it("should delete a user by ID and return it", async () => {
    const mockDeletedUser = { id: 1 };
    mockQuery.mockResolvedValue({ rows: [mockDeletedUser] });

    const result = await userModel.deleteUserById("1");

    expect(result).toEqual(mockDeletedUser);
    expect(mockQuery).toHaveBeenCalledWith(
      "DELETE FROM users WHERE id=$1 RETURNING id",
      ["1"],
    );
  });

  it("should return null if no user is found in getUserById", async () => {
    mockQuery.mockResolvedValue({ rows: [] });

    const result = await userModel.getUserById("999");

    expect(result).toBeNull();
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id = $1",
      ["999"],
    );
  });
});
