import DB from "../utils/db";

export type User = {
  id: number;
  user_name: string;
  email: string;
  password: string;
  created_at: string;
};

export class UserModel {
  static async findAllUsers(): Promise<User[]> {
    const db = DB.getInstance();
    const stmt = db.prepare("SELECT * FROM users");
    const users = stmt.all() as User[];
    return users;
  }

  static async findUserById(id: number): Promise<User | undefined> {
    const db = DB.getInstance();
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(id) as User;
    return user;
  }

  static async createUser(
    user: Pick<User, "user_name" | "email" | "password">
  ): Promise<boolean> {
    const db = DB.getInstance();
    const stmt = db.prepare(
      "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)"
    );
    const result = stmt.run(user.user_name, user.email, user.password);
    return result.changes > 0;
  }

  static async updateUser(
    id: number,
    user: Partial<Pick<User, "user_name" | "email" | "password">>
  ): Promise<boolean> {
    const db = DB.getInstance();
    const keys = Object.keys(user);
    if (keys.length === 0) return false;

    // Dynamically build the update query
    const updates = keys.map((key) => `${key} = ?`).join(", ");
    const values = keys.map((key) => (user as any)[key]);
    values.push(id); // for the WHERE clause

    const stmt = db.prepare(`UPDATE users SET ${updates} WHERE id = ?`);
    const result = stmt.run(...values);
    return result.changes > 0;
  }

  static async deleteUser(id: number): Promise<boolean> {
    const db = DB.getInstance();
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
