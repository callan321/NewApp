import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { userService } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.findAllUsers();
  res.status(200).json({ status: true, data: users });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.findUserById(Number(id));
  if (!user) {
    res.status(404).json({ status: false, message: "User not found" });
    return;
  }
  res.status(200).json({ status: true, data: user });
};

export const createUser = async (req: Request, res: Response) => {
  const { user_name, email, password } = req.body;
  const success = await userService.createUser({ user_name, email, password });
  if (success) {
    res.status(201).json({ status: true, message: "User created successfully" });
  } else {
    res.status(400).json({ status: false, message: "User creation failed" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_name, email, password } = req.body;
  const updated = await userService.updateUser(Number(id), {
    user_name,
    email,
    password,
  });
  if (updated) {
    res.status(200).json({ status: true, message: "User updated successfully" });
  } else {
    res.status(404).json({ status: false, message: "User not found or update failed" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await userService.deleteUser(Number(id));
  if (deleted) {
    res.status(200).json({ status: true, message: "User deleted successfully" });
  } else {
    res.status(404).json({ status: false, message: "User not found or deletion failed" });
  }
};

// Export wrapped handlers to use in the router.
export const userController = {
  getAllUsers: asyncHandler(getAllUsers),
  getUserById: asyncHandler(getUserById),
  createUser: asyncHandler(createUser),
  updateUser: asyncHandler(updateUser),
  deleteUser: asyncHandler(deleteUser),
};
