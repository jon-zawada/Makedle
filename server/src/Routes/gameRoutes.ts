import { Router } from "express";
import { GameController } from "../controllers/GameController";
import pool from "../db";
import multer from "multer";

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
router.get("/games", gameController.getGames); //add query params for pagination and search
router.get("/games/:id", gameController.getGameById);

//POST
router.post("/games", upload.single("file"), gameController.createGame);

// //PUT
// router.put("/games/:id" );

// //PATCH
// router.patch("games/:id");

//DELETE
router.delete("/games/:id", gameController.deleteGameById);

export default router;
