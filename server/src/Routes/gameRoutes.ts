import { Router } from "express";
import { GameController } from "../controllers/GameController";
import pool from "../db";
import authenticateJWT from "../middleware/authenticateJWT";

const gameController = new GameController(pool);
const router = Router();

//GET
router.get("/games", gameController.getGames); //add query params for pagination and search
router.get("/games/:id", gameController.getGameById);

//POST
router.post("/games", gameController.createGame);

// //PUT
// router.put("/games/:id" );

// //PATCH
// router.patch("games/:id");

//DELETE
router.delete("/games/:id", gameController.deleteGameById);

export default router;