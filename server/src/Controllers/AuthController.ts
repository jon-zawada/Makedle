import { Request, Response, CookieOptions } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/User";
import jwt from "jsonwebtoken";
import { parseTokenTime } from "../utils/parseTokenTime";
import { User } from "../Models/User";

export class AuthController {
  private userModel: UserModel;

  constructor(pool: Pool) {
    this.userModel = new UserModel(pool);
  }

  public login = (req: Request, res: Response) => {
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

        const token = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        await this.userModel.updateRefreshToken(user.id, refreshToken);

        res.cookie("refreshToken", refreshToken, this.getRefCookieOptions());

        res.status(201).json({ token, user }); // REFER TO USER MODEL TO REMEMBER TO OMIT PASSWORD AND REFRESH TOKEN
      });
    } catch (error) {
      const message = "Cannot login internal server error";
      return res.status(500).json({ message, error });
    }
  };

  public refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded.id) {
      return res.sendStatus(401);
    }

    this.userModel
      .getUserById(decoded.id)
      .then(async (user) => {
        if (!user || user.refresh_token !== refreshToken) {
          return res.sendStatus(403);
        }

        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);

        await this.userModel.updateRefreshToken(user.id, newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, this.getRefCookieOptions());

        res.status(201).json({ accessToken: newAccessToken, user });
      })
      .catch(() => {
        return res.sendStatus(403);
      });
  };

  public logout = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await this.userModel.updateRefreshToken(userId, null);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };

  private generateAccessToken(user: User): string {
    return jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  private generateRefreshToken(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
  }

  private getRefCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //prevents CSRF attacks,
      maxAge: parseTokenTime(process.env.JWT_REFRESH_EXPIRES_IN!), // Cookie expiration in milliseconds
      path: "/",
    };
  }
}
