import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes";
import userRoutes from "./Routes/userRoutes";
import gameRoutes from "./Routes/gameRoutes";
import resultRoutes from "./Routes/resultRoutes";
import noCache from "./middleware/noCache";

const CLIENT_DIR = path.join(__dirname, "..", "..", "client", "dist");
const MISSING_CLIENT_HTML = path.join(__dirname, "errors", "noclient.html");
const RATE_LIMIT_MAX_REQUESTS = 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; //15 mins

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(noCache);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "blob:", "https://placehold.co"],
      },
    },
  }),
);

const apiLimiter = rateLimit({
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

app.use("/api", apiLimiter);

if (fs.existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR));
} else {
  app.get("*", (req, res) => {
    res.sendFile(MISSING_CLIENT_HTML);
  });
}

//ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", gameRoutes);
app.use("/api", resultRoutes);

//MUST BE LAST ROUTE
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
