import { Pool } from "pg";

export interface User {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  created_at: Date;
}

export class UserModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getUsers = async (): Promise<User[]> => {
    const result = await this.pool.query("SELECT * FROM users");
    return result.rows;
  };

  getUserById = async (id: string): Promise<User> => {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
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
    const result = await this.pool.query(
      "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashed_password]
    );
    return result.rows[0] || null;
  };

  deleteUserById = async (id: string): Promise<User> => {
    const result = await this.pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [id]);
    return result.rows[0] || null;
  };
}
