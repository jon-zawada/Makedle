import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes";
import userRoutes from "./Routes/userRoutes";
import gameRoutes from "./Routes/gameRoutes";
import resultRoutes from "./Routes/resultRoutes";
import noCache from "./middleware/noCache";
import { requestLogger } from "./middleware/requestLogger";
import { apiLimiter } from "./middleware/rateLimiter";
import { helmetConfig } from "./middleware/helmet";

dotenv.config();

const CLIENT_DIR = path.join(__dirname, "..", "..", "client", "dist");
const MISSING_CLIENT_HTML = path.join(__dirname, "errors", "noclient.html");

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(noCache);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(helmetConfig);
app.use("/api", apiLimiter);

if (fs.existsSync(CLIENT_DIR)) {
  app.use(express.static(CLIENT_DIR));
} else {
  app.get("*", (req, res) => {
    res.sendFile(MISSING_CLIENT_HTML);
  });
}

// ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", gameRoutes);
app.use("/api", resultRoutes);

// MUST BE LAST ROUTE
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
