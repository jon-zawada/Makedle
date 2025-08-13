import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../Models/User";

const authenticateJWT: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set");
  }

  if (!token) {
    res.status(401).json({ error: "Missing authentication token" });
    return;
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET) as User;
    req.user = decodedUser;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};

export default authenticateJWT;
