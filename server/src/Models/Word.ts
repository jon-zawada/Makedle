import { Pool } from "pg";

export interface Word {
  id: number;
  game_id: number;
  header_id: number;
  word_id: number;
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
    wordId: number,
    word: string
  ): Promise<Word> => {
    const query =
      "INSERT INTO words (game_id, header_id, word_id, word) VALUES ($1, $2, $3, $4)";
    const result = await this.pool.query(query, [
      gameId,
      headerId,
      wordId,
      word,
    ]);
    return result.rows[0] || null;
  };

  getWordsByGameId = async (gameId: string) => {
    const query = `
      SELECT
        w.word_id,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'header_name', h.header_name,
                'value', w.word
            )
        ) AS word_data
      FROM
        words w
      JOIN
        headers h ON w.header_id = h.id
      WHERE
        w.game_id = $1
      GROUP BY
        w.word_id;
    `;
    const result = await this.pool.query(query, [gameId]);
    return result.rows;
  };
}
