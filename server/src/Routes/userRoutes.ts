import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import pool from "../db";
import authenticateJWT from "../middleware/authenticateJWT";

const userController = new UserController(pool);
const router = Router();

//GET
router.get("/users", authenticateJWT, userController.getUsers);
router.get("/users/:id", authenticateJWT, userController.getUserById);

//POST
router.post("/users", authenticateJWT, userController.createUser);

//PUT

//PATCH

//DELETE
router.delete("/users/:id", authenticateJWT, userController.deleteUserById);

export default router;
