import { Request, Response } from "express";
import { UserModel } from "../Models/User";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/passwordUtils";
import { parseTokenTime } from "../utils/parseTokenTime";

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

        const token = jwt.sign(user, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const refreshToken = jwt.sign(
          { id: user.id },
          process.env.JWT_REFRESH_SECRET!,
          { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        await this.userModel.updateRefreshToken(user.id, refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict", //prevents CSRF attacks,
          maxAge: parseTokenTime(process.env.JWT_REFRESH_EXPIRES_IN!), // Cookie expiration in milliseconds
          path: "/",
        });

        res.status(201).json({ token });
      });
    } catch (error) {
      const message = "Cannot login internal server error";
      return res.status(500).json({ message, error });
    }
  };

  refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;

    this.userModel
      .getUserById(decoded.id)
      .then(async (user) => {
        if (!user || user.refresh_token !== refreshToken) {
          return res.sendStatus(403);
        }

        const newAccessToken = jwt.sign(user, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const newRefreshToken = jwt.sign(
          { id: user.id },
          process.env.JWT_REFRESH_SECRET!,
          { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        );

        await this.userModel.updateRefreshToken(user.id, newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict", //prevents CSRF attacks,
          maxAge: parseTokenTime(process.env.JWT_REFRESH_EXPIRES_IN!), // Cookie expiration in milliseconds
          path: "/",
        });

        res.status(201).json({ accessToken: newAccessToken });
      })
      .catch(() => {
        return res.sendStatus(403);
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

  logout = (req: Request, res: Response) => {
    const refreshToken = req.header("x-refresh-token");

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    this.userModel
      .updateRefreshToken(req.user?.id!, null) //really bad typescript practice
      .then(() => {
        res.status(200).json({ message: "Logged out successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal server error", error });
      });
  };
}
