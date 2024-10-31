import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import pool from "../db";

const userController = new UserController(pool);
const router = Router();

router.get("/users", userController.getUsers);

export default router;
