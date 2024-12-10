import { Request, Response } from "express";
import { GameModel } from "../Models/Game";
import { Pool } from "pg";
import { HeaderModel } from "../Models/Header";
import { WordModel } from "../Models/Word";
import { processGameCSV } from "../utils/csvReader";
import _isEmpty from "lodash/isEmpty";
import fs from "fs";

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
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    this.gameModel
      .getGames(pageNumber, limitNumber)
      .then(async ({ rows, totalCount }) => {
        const gamesWithBase64Images = await Promise.all(
          rows.map(async (game) => {
            if (game.image) {
              const base64Image = game.image.toString("base64");
              return { ...game, image: `data:image/png;base64,${base64Image}` };
            }
            return game;
          })
        );
        res.status(200).json({ games: gamesWithBase64Images, totalCount });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving games", error });
        return;
      });
  };

  getGameById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.gameModel
      .getGameById(id)
      .then((game) => {
        if (!game) {
          res.sendStatus(404);
          return;
        }
        if (game.image) {
          const base64Image = game.image.toString("base64");
          game.image = `data:image/png;base64,${base64Image}`;
        }
        res.status(200).json(game);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving game", error });
        return;
      });
  };

  getWordsByGameId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const words = await this.wordModel.getWordsByGameId(id);
      const headers = await this.headerModel.getHeaderByGameId(id);
      if (_isEmpty(words) || _isEmpty(headers)) {
        res.sendStatus(404);
        return;
      }
      res.send({ words, headers });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };

  createGame = async (req: Request, res: Response) => {
    const { name, primaryColor, secondaryColor, tertiaryColor } = req.body;
    const userId = req.user?.id!;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const csvFile = files?.["file"]?.[0];
    const imageFile = files?.["image"]?.[0];
    const imageBuffer = fs.readFileSync(imageFile.path);
    try {
      const game = await this.gameModel.createGame(
        userId,
        name,
        primaryColor,
        secondaryColor,
        tertiaryColor,
        imageBuffer
      );
      await processGameCSV(
        csvFile,
        game.id,
        this.headerModel.createHeader,
        this.wordModel.createWord
      );

      fs.unlinkSync(imageFile.path);
      res.status(201).json(game);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while creating a game", error });
      return;
    }
  };

  deleteGameById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.gameModel
      .deleteGameById(id)
      .then((game) => {
        if (!game) {
          res.sendStatus(404);
          return;
        }
        res.status(200).json(game);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting game", error });
        return;
      });
  };
}
