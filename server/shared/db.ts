import { DB_PATH } from "./env";
import DatabaseConstructor, { type Database } from "better-sqlite3";
import fs from "fs";
import path from "path";

/* Singleton for one DB connection */
class DB {
  private static instance: Database;

  static getInstance(): Database {
    if (!DB.instance) {
      const dir = path.dirname(DB_PATH);

      // Create the DB folder if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created DB directory: ${dir}`);
      }

      DB.instance = new DatabaseConstructor(DB_PATH);
      console.log(`Opened SQLite database at: ${DB_PATH}`);
    }

    return DB.instance;
  }
}

export default DB;
