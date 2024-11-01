import { Router } from "express";
import { UserController } from "../controllers/UserController";
import pool from "../db";

const userController = new UserController(pool);
const router = Router();

//GET
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);

//POST
router.post("/users", userController.createUser);

export default router;
