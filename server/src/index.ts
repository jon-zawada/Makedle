import "newrelic";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes";
import userRoutes from "./Routes/userRoutes";
import gameRoutes from "./Routes/gameRoutes";
import noCache from "./middleware/noCache";

const CLIENT_DIR = path.join(__dirname, "..", "..", "client", "dist");
const MISSING_CLIENT_HTML = path.join(__dirname, "errors", "noclient.html");

dotenv.config();

const app = express();
const PORT =  Number(process.env.PORT) || 3000;
console.log("HELLO WORLD PORT: ", PORT);
console.log("HELLO WORLD PROCESS PORT: ", process.env.PORT);

//MIDDLEWARE
app.use(noCache);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

//MUST BE LAST ROUTE
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
