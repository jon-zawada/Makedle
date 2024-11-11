// New Relic currently doesn’t have an ES6-compatible export
// eslint-disable-next-line @typescript-eslint/no-require-imports
const newrelic = require("newrelic");
import {Request, Response, NextFunction} from "express";

export const newRelicLogging = (req: Request, res: Response, next: NextFunction) => {
  newrelic.addCustomAttributes({
    endpoint: req.originalUrl,
    method: req.method,
  });

  res.on("finish", () => {
    newrelic.addCustomAttributes({
      statusCode: res.statusCode,
      responseTime: Date.now() - req.startTime!,
    });
  });

  req.startTime = Date.now();
  next();
}