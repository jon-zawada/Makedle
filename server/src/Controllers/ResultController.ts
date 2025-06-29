import { Request, Response } from "express";
import { ResultModel } from "../Models/Result";
import { Pool } from "pg";

export class ResultController {
  private resultModel: ResultModel;
  constructor(pool: Pool) {
    this.resultModel = new ResultModel(pool);
  }

  getResults = async (req: Request, res: Response) => {
    try {
      const { gameId } = req.params;
      const result = await this.resultModel.getResultsByGameAndUserId(
        parseInt(gameId),
        req.user?.id!,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving game results", error });
    }
  };

  postResults = async (req: Request, res: Response) => {
    try {
      const { gameId } = req.params;
      const { gameWon } = req.body;
      await this.resultModel.postResult(
        parseInt(gameId),
        req.user?.id!,
        gameWon,
      );
      const message = "Result successfully sent";
      res.status(201).json({ message });
    } catch (error) {
      res.status(500).json({ message: "Error posting game results", error });
    }
  };
}
