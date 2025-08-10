import { Request, Response, NextFunction } from "express";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

export async function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.originalUrl.startsWith("/api")) {
    return next();
  }
  const requestId = uuidv4();
  req.requestId = requestId;

  const start = process.hrtime();

  const loggedHeaders = { ...req.headers };
  if (loggedHeaders.authorization) loggedHeaders.authorization = "[REDACTED]";
  if (loggedHeaders.cookie) loggedHeaders.cookie = "[REDACTED]";
  res.on("finish", async () => {
    const diff = process.hrtime(start);
    const responseTimeMs = diff[0] * 1000 + diff[1] / 1e6;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level:
        res.statusCode >= 500
          ? "error"
          : res.statusCode >= 400
          ? "warn"
          : "info",
      message: `${req.method} to ${req.originalUrl} completed with ${res.statusCode}`,
      requestId,
      userId: req.user ? req.user.id : null,
      ip: req.ip || req.socket.remoteAddress || null,
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: responseTimeMs,
      headers: loggedHeaders,
      query: req.query,
    };

    try {
      /* TODO we should batch these so we dont overload psql */
      await pool.query(
        `INSERT INTO logs (
          timestamp, level, message, request_id, user_id, ip, endpoint, method, status_code, response_time, headers, query
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          logEntry.timestamp,
          logEntry.level,
          logEntry.message,
          logEntry.requestId,
          logEntry.userId,
          logEntry.ip,
          logEntry.endpoint,
          logEntry.method,
          logEntry.statusCode,
          logEntry.responseTime,
          JSON.stringify(logEntry.headers),
          JSON.stringify(logEntry.query),
        ]
      );
    } catch (error) {
      console.error("Failed to log request:", error);
    }
  });

  next();
}
