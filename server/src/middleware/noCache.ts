import { Request, Response, NextFunction } from "express";

function noCache(req: Request, res: Response, next: NextFunction) {
  // Disable caching in browsers
  res.set("Cache-Control", "no-store"); // Prevent caching
  res.set("Pragma", "no-cache"); // Legacy header for HTTP/1.0 caches
  res.set("Expires", "0"); // Ensure the content is considered expired immediately
  next();
}

export default noCache;