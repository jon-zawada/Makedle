import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import pool from "../db";
import authenticateJWT from "../middleware/authenticateJWT";

const userController = new UserController(pool);
const router = Router();

//GET
// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.get("/users", authenticateJWT, userController.getUsers);
// @ts-expect-error TODO GET RID OF THIS I HATE TYPESCRIPT
router.get("/users/:id", authenticateJWT, userController.getUserById);

//POST
router.post("/users", userController.createUser);

//PUT

//PATCH

//DELETE
router.delete("/users/:id", userController.deleteUserById);

export default router;
