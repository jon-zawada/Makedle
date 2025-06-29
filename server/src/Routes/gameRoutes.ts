import { Router } from "express";
import { GameController } from "../Controllers/GameController";
import pool from "../db";
import multer from "multer";
import authenticateJWT from "../middleware/authenticateJWT";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const gameController = new GameController(pool);
const router = Router();

//GET
router.get("/games", gameController.getGames);
router.get("/games/:id", gameController.getGameById);
router.get("/games/:id/words", gameController.getWordsByGameId);

//POST
router.post(
  "/games",
  authenticateJWT,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  gameController.createGame,
);

//DELETE
router.delete("/games/:id", authenticateJWT, gameController.deleteGameById);

export default router;
