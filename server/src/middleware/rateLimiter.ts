import rateLimit from "express-rate-limit";

const RATE_LIMIT_MAX_REQUESTS = 200;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins

export const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      message:
        "You have exceeded the limit of 1000 requests in 15 minutes. Please wait and try again",
    });
  },
});
