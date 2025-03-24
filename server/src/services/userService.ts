import { User } from "../models/userModel";
import DB from "../../shared/db";

export const findAllUsers = async (): Promise<User[]> => {
  const db = DB.getInstance();
  const stmt = db.prepare("SELECT * FROM users");
  const users = stmt.all() as User[];
  return users;
};

export const findUserById = async (id: number): Promise<User | undefined> => {
  const db = DB.getInstance();
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(id) as User;
  return user;
};

export const createUser = async (
  user: Pick<User, "user_name" | "email" | "password">
): Promise<boolean> => {
  const db = DB.getInstance();
  const stmt = db.prepare(
    "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)"
  );
  const result = stmt.run(user.user_name, user.email, user.password);
  return result.changes > 0;
};

export const updateUser = async (
  id: number,
  user: Partial<Pick<User, "user_name" | "email" | "password">>
): Promise<boolean> => {
  const db = DB.getInstance();

  const userName = user.user_name !== undefined ? user.user_name : null;
  const email = user.email !== undefined ? user.email : null;
  const password = user.password !== undefined ? user.password : null;

  const stmt = db.prepare(
    "UPDATE users SET user_name = COALESCE(?, user_name), email = COALESCE(?, email), password = COALESCE(?, password) WHERE id = ?"
  );
  const result = stmt.run(userName, email, password, id);
  return result.changes > 0;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const db = DB.getInstance();
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
};

export const userService = {
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
