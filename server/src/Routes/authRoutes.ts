import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import pool from "../db";

const authController = new AuthController(pool);
const router = Router();

// GET
router.get("/init", authController.init);

// POST
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

// PUT
router.put("/logout", authController.logout);

// DELETE

export default router;
