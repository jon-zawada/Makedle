import { Pool } from "pg";

export interface Word {
  id: number;
  game_id: number;
  header_id: number;
  word: string;
  created_at: Date;
}

export class WordModel {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  createWord = async (
    gameId: number,
    headerId: string,
    word: string
  ): Promise<Word> => {
    const query =
      "INSERT INTO words (game_id, header_id, word) VALUES ($1, $2, $3)";
    const result = await this.pool.query(query, [gameId, headerId, word]);
    return result.rows[0] || null;
  };
}
