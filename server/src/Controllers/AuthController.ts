import { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/User";
import jwt from "jsonwebtoken";
import { parseTokenTime } from "../utils/parseTokenTime";

export class AuthController {
  // private authModel: AuthModel;
  private userModel: UserModel;

  constructor(pool: Pool) {
    // this.authModel = new AuthModel(pool);
    this.userModel = new UserModel(pool);
  }

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

        res.status(201).json({ token, user }); // REFER TO USER MODEL TO REMEMBER TO OMIT PASSWORD AND REFRESH TOKEN
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

    if (!decoded.id) {
      return res.sendStatus(401);
    }

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

        res.status(201).json({ accessToken: newAccessToken, user });
      })
      .catch(() => {
        return res.sendStatus(403);
      });
  };

  logout = (req: Request, res: Response) => {
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
