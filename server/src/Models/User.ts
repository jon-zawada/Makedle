import { Pool } from "pg";

export interface User {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  created_at: Date;
  refresh_token: string | null;
}

export class UserModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getUsers = async (): Promise<User[]> => {
    const query = "SELECT * FROM users";
    const result = await this.pool.query(query);
    return result.rows;
  };

  getUserById = async (id: string): Promise<User> => {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  };

  createUser = async (
    username: string,
    email: string,
    hashed_password: string
  ): Promise<User> => {
    //TODO logic to actually hash password
    //TODO validate request fields above and
    //TODO empty fields/null checks
    //TODO check if unique email
    const query =
      "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *";
    const result = await this.pool.query(query, [
      username,
      email,
      hashed_password,
    ]);
    return result.rows[0] || null; //remove hashed password from this
  };

  loginUser = async (email: string): Promise<User> => {
    const query = "SELECT * FROM users WHERE email=$1";
    const result = await this.pool.query(query, [email]);
    return result.rows[0] || null;
  };

  updateRefreshToken = async (
    id: number,
    refreshToken: string | null
  ): Promise<void> => {
    const query = "UPDATE users SET refresh_token = $1 WHERE id = $2";
    await this.pool.query(query, [refreshToken, id]);
  };

  deleteUserById = async (id: string): Promise<User> => {
    const query = "DELETE FROM users WHERE id=$1 RETURNING id";
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  };
}
