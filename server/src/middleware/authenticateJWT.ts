import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

export default authenticateJWT;
