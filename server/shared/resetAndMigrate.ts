import fs from "fs";
import path from "path";
import DB from "./db";
import { logger } from "./logger";

export default async function resetAndMigrate() {
  const db = DB.getInstance();
  const migrationsDir = path.resolve("src/migrations");

  // Drop all existing tables
  const existingTables: any[] = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    .all();

  for (const { name } of existingTables) {
    db.prepare(`DROP TABLE IF EXISTS ${name}`).run();
    console.log(`🗑 Dropped table: ${name}`);
  }

  /* Ensure migrations directory exists */
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    logger.warn("Created missing migrations folder at:", migrationsDir);
  }

  /* Get all .sql files, sorted alphabetically */
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (migrationFiles.length === 0) {
    logger.warn(
      "Migrations folder is empty. Add .sql files to run migrations.\n"
    );
    db.close();
    process.exit(0);
  }

  console.log(`Starting migrations: ${migrationFiles.length} file(s) found.\n`);

  /* Execute each migration in order */
  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    try {
      db.exec(sql);
      logger.success(file);
    } catch (err: any) {
      logger.error("Failed in", file, err.message);
      db.close();
      process.exit(1);
    }
  }

  /* Log final table info */
  const tables = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    .all();

  console.log("\nDatabase structure:");

  for (const table of tables as any[]) {
    const name = table.name;
    const columns = db
      .prepare(`PRAGMA table_info(${name})`)
      .all()
      .map((col: any) => col.name)
      .join(", ");
    const rowInfo = db
      .prepare(`SELECT COUNT(*) as count FROM ${name}`)
      .get() as any;
    const rowCount = rowInfo.count;

    console.log(`  - ${name}: ${columns} | ${rowCount} rows`);
  }

  /* Close DB and finish */
  db.close();
  console.log("\nAll migrations complete.\n");
}
