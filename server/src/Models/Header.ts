import { Pool } from "pg";

export interface Header {
  id: number;
  game_id: number;
  header_name: string;
  created_at: Date;
}

export class HeaderModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  createHeader = async (
    gameId: number,
    orderIndex: number,
    header: string
  ): Promise<Header> => {
    const query =
      "INSERT INTO headers (game_id, order_index, header_name) VALUES ($1, $2, $3) RETURNING id";
    const result = await this.pool.query(query, [gameId, orderIndex, header]);
    return result.rows[0] || null;
  };
}
