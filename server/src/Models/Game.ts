import { Pool } from "pg";

export interface Game {
  id: number;
  user_id: number | null;
  name: string;
  created_at: Date;
  updated_at: Date;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  image: Buffer | string;
}

export class GameModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getGames = async (): Promise<Game[]> => {
    const query = "SELECT * FROM games";
    const result = await this.pool.query(query);
    return result.rows;
  };

  getGameById = async (id: string): Promise<Game> => {
    const query = "SELECT * FROM games WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  };

  createGame = async (
    userId: number,
    gameName: string,
    primary_color: string,
    secondary_color: string,
    tertiary_color: string,
    image: Buffer | string
  ): Promise<Game> => {
    const query =
      "INSERT INTO games (user_id, name, primary_color, secondary_color, tertiary_color, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, name, primary_color, secondary_color, tertiary_color, created_at, updated_at;";
    const result = await this.pool.query(query, [
      userId,
      gameName,
      primary_color,
      secondary_color,
      tertiary_color,
      image,
    ]);
    return result.rows[0] || null;
  };

  deleteGameById = async (id: string): Promise<Game> => {
    const query = "DELETE FROM games WHERE id=$1 RETURNING id";
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  };
}
