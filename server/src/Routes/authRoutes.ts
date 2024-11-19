import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import pool from "../db";
import authenticateJWT from "../middleware/authenticateJWT";

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
// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.put("/logout", authenticateJWT, authController.logout);

// DELETE

export default router;