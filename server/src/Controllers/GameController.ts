import { Request, Response } from "express";
import { GameModel } from "../models/Game";
import { Pool } from "pg";

export class GameController {
  private gameModel: GameModel;

  constructor(pool: Pool) {
    this.gameModel = new GameModel(pool);
  }

  getGames = (req: Request, res: Response) => {
    this.gameModel
      .getGames()
      .then((games) => {
        res.status(200).json(games);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving games", error });
      });
  };

  getGameById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.gameModel
      .getGameById(id)
      .then((game) => {
        if (!game) {
          return res.sendStatus(404);
        }
        res.status(200).json(game);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving game", error });
      });
  };

  createGame = (req: Request, res: Response) => {
    const { userId, gameName, primary_color, secondary_color, tertiary_color } =
      req.body;
    this.gameModel
      .createGame(
        userId,
        gameName,
        primary_color,
        secondary_color,
        tertiary_color
      )
      .then((game) => {
        res.status(201).json(game);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error creating user", error });
      });
  };

  deleteGameById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.gameModel
      .deleteGameById(id)
      .then((game) => {
        if (!game) {
          return res.sendStatus(404);
        }
        res.status(200).json(game);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting game" });
      });
  };
}
