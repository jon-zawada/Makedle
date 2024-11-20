import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import pool from "../db";

const authController = new AuthController(pool)
const router  = Router();

// GET
// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.get("/init", authController.init);

// POST
// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.post("/login", authController.login);

// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.post("/refresh-token", authController.refreshToken);

// PUT
router.put("/logout", authController.logout);

// DELETE

export default router;