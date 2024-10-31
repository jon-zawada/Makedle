import { Request, Response } from "express";
import { UserModel } from "../Models/User";
import { Pool } from "pg";

export class UserController {
  private userModel: UserModel;

  constructor(pool: Pool) {
    this.userModel = new UserModel(pool);
  }

  getUsers = (req: Request, res: Response): void => {
    this.userModel
      .getUsers()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error retrieving users" });
      });
  };
}
