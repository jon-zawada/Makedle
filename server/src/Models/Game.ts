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

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
  POPULARITY = "POPULARITY",
}

export class GameModel {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  getGames = async (
    page: number,
    limit: number,
    categories: string[],
    sort: SortOrder,
  ): Promise<{ rows: Game[]; totalCount: number }> => {
    const offset = (page - 1) * limit;
    const totalCountResult = await this.pool.query(
      "SELECT COUNT(*) FROM games",
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    let query = "";
    const params: (string | number | string[])[] = [limit, offset];

    let baseQuery = `
      SELECT g.*, COUNT(r.id) AS popularity
      FROM games g
      LEFT JOIN results r ON g.id = r.game_id
    `;

    if (categories && categories.length > 0) {
      baseQuery += " WHERE g.category = ANY($3)";
      params.push(categories);
    }

    if (sort === "POPULARITY") {
      query = `${baseQuery}
        GROUP BY g.id
        ORDER BY popularity DESC
        LIMIT $1 OFFSET $2
      `;
    } else {
      query = `${baseQuery}
        GROUP BY g.id
        ORDER BY created_at ${sort === "ASC" ? "ASC" : "DESC"}
        LIMIT $1 OFFSET $2
      `;
    }

    const result = await this.pool.query(query, params);
    return { rows: result.rows, totalCount };
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
    image: Buffer | string,
    category: string,
    isPrivate: boolean,
  ): Promise<Game> => {
    const query =
      "INSERT INTO games (user_id, name, primary_color, secondary_color, tertiary_color, image, category, isPrivate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, user_id, name, primary_color, secondary_color, tertiary_color, category, isPrivate, created_at, updated_at;";
    const result = await this.pool.query(query, [
      userId,
      gameName,
      primary_color,
      secondary_color,
      tertiary_color,
      image,
      category,
      isPrivate,
    ]);
    return result.rows[0] || null;
  };

  deleteGameById = async (id: string): Promise<Game> => {
    const query = "DELETE FROM games WHERE id=$1 RETURNING id";
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  };
}
