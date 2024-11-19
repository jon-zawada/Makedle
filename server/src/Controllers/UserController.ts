import { Request, Response } from "express";
import { UserModel } from "../Models/User";
import { Pool } from "pg";
import { hashPassword } from "../utils/passwordUtils";

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
        res.status(500).json({ message: "Error retrieving users", error });
      });
  };

  getUserById = (req: Request, res: Response) => {
    const id = req.params.id;
    this.userModel
      .getUserById(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error retrieving user", error });
      });
  };

  createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    //try/catch
    const hashedPassword: string = await hashPassword(password);
    this.userModel
      .createUser(username, email, hashedPassword)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(500).json({ message: "Error creating user", error });
      });
  };

  deleteUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.userModel
      .deleteUserById(id)
      .then((user) => {
        const deletedUserId = user?.id;
        if (!deletedUserId) {
          return res.sendStatus(404);
        }
        const message = "User successfully deleted";
        res.status(200).json({ message, deletedUserId });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting user", error });
      });
  };
}
