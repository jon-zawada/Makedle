import { Request, Response } from "express";
import { GameModel } from "../Models/Game";
import { Pool } from "pg";
import { HeaderModel } from "../Models/Header";
import { WordModel } from "../Models/Word";
import { processGameCSV } from "../utils/csvReader";

export class GameController {
  private gameModel: GameModel;
  private headerModel: HeaderModel;
  private wordModel: WordModel;

  constructor(pool: Pool) {
    this.gameModel = new GameModel(pool);
    this.headerModel = new HeaderModel(pool);
    this.wordModel = new WordModel(pool);
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

  createGame = async (req: Request, res: Response) => {
    const { userId, gameName, primary_color, secondary_color, tertiary_color } =
      req.body;
      const csvFilePath = req.file?.path!;
    try {
      const game = await this.gameModel.createGame(userId, gameName, primary_color, secondary_color, tertiary_color);
      await processGameCSV(csvFilePath, game.id, this.headerModel.createHeader, this.wordModel.createWord);
      res.status(201).json(game);
    } catch(error) {
      res.status(500).json({ message: "An error occurred while creating a game", error });
    }
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
        res.status(500).json({ message: "Error deleting game", error });
      });
  };
}
