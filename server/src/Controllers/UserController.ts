import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  loginUser = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      this.userModel.loginUser(email).then(async (user) => {
        if (!user) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashed_password
        );

        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ token });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Cannot login internal server error", error });
    }
  };

  createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
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
          return Promise.reject(new Error("User id not found"));
        }
        const message = "User successfully deleted";
        res.status(200).json({ message, deletedUserId });
      })
      .catch((error) => {
        res.status(404).json({ message: "User id not found", error });
      });
  };
}
