import { Pool } from "pg";

export interface Result {
  id: string;
  user_id: string;
  game_id: string;
  result: boolean; //rename this
}

export class ResultModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getResultsByGameAndUserId = async (gameId: number, userId: number) => {
    const query = "SELECT * FROM results WHERE game_id = $1 AND user_id = $2";
    const result = await this.pool.query(query, [gameId, userId]);
    return result.rows;
  };

  postResult = async (gameId: number, userId: number, wonGame: boolean) => {
    const query =
      "INSERT INTO results (user_id, game_id, result) VALUES ($1, $2, $3)";
    const result = await this.pool.query(query, [userId, gameId, wonGame]);
    return result.rows[0] || null;
  };
}
