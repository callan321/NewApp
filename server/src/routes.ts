import { Router } from "express";
import { userController } from "./controllers/userController";

export const router = Router();

// User routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.post("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
