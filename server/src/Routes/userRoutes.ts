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
router.post("/users/login"); //returns JWT
router.post("/users/logout"); //invalidates token

//PUT
router.put("/users/:id");

//DELETE
router.delete("/users/:id", userController.deleteUserById);

export default router;
