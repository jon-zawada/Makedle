import { Request, Response, CookieOptions } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/User";
import jwt from "jsonwebtoken";
import { parseTokenTime } from "../utils/parseTokenTime";
import { User } from "../Models/User";

export class AuthController {
  private userModel: UserModel;
  private readonly refCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: parseTokenTime(process.env.JWT_REFRESH_EXPIRES_IN!), // Cookie expiration in milliseconds
    path: "/",
  };

  constructor(pool: Pool) {
    this.userModel = new UserModel(pool);
  }

  public init = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        res
          .status(204)
          .json({ message: "No refresh token found, please log in" });
        return;
      }

      const decoded = this.verifyRefreshToken(refreshToken);
      const user = await this.userModel.getUserById(decoded.id);
      //TODO check if user has the same refresh token as the one we grabbed from cookies
      const token = this.generateAccessToken(user);
      res.status(200).json({ user, token });
    } catch (error) {
      const message = "Internal server error. Please try again later.";
      res.status(500).json({ message, error });
      return;
    }
  };

  public login = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      this.userModel.loginUser(email).then(async (user) => {
        if (!user) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashed_password,
        );

        if (!passwordMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
        }

        const token = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        await this.userModel.updateRefreshToken(user.id, refreshToken);

        res.cookie("refreshToken", refreshToken, this.refCookieOptions);

        res.status(201).json({ token, user }); // REFER TO USER MODEL TO REMEMBER TO OMIT PASSWORD AND REFRESH TOKEN
      });
    } catch (error) {
      const message = "Cannot login internal server error";
      res.status(500).json({ message, error });
      return;
    }
  };

  public refreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.sendStatus(401).json({ message: "No cookie found" });
      return;
    }

    const decoded = this.verifyRefreshToken(refreshToken);

    if (!decoded.id) {
      res.sendStatus(401);
      return;
    }

    this.userModel
      .getUserById(decoded.id)
      .then(async (user) => {
        if (!user || user.refresh_token !== refreshToken) {
          res.sendStatus(403);
          return;
        }

        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);

        await this.userModel.updateRefreshToken(user.id, newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, this.refCookieOptions);

        res.status(201).json({ accessToken: newAccessToken, user });
      })
      .catch(() => {
        res.sendStatus(403);
        return;
      });
  };

  public logout = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
        const decoded = this.verifyRefreshToken(refreshToken);
        if (decoded.id) {
          await this.userModel.updateRefreshToken(decoded.id, null);
        }
      }

      res.cookie("refreshToken", "", {
        ...this.refCookieOptions,
        expires: new Date(0),
        maxAge: 0,
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
      return;
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

  private verifyRefreshToken(refreshToken: string) {
    return jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as jwt.JwtPayload;
  }
}
