import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./Routes/userRoutes";
import gameRoutes from "./Routes/gameRoutes";

const CLIENT_DIR = path.join(__dirname, "..", "..", "client", "dist");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(CLIENT_DIR));

app.use("/api", userRoutes);
app.use("/api", gameRoutes);

//must be last route
app.get("*", (req, res) => {
  res.sendFile(CLIENT_DIR);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
