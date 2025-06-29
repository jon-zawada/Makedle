import { Router } from "express";
import { ResultController } from "../Controllers/ResultController";
import pool from "../db";
import authenticateJWT from "../middleware/authenticateJWT";

const resultController = new ResultController(pool);
const router = Router();

//GET
router.get("/results/:gameId", authenticateJWT, resultController.getResults);

//POST
router.post("/results/:gameId", authenticateJWT, resultController.postResults);

export default router;
