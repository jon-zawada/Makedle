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

  async getUsers(): Promise<User[]> {
    const result = await this.pool.query("SELECT * FROM users");
    return result.rows;
  }
}
