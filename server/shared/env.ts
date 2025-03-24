import dotenv from "dotenv";
import { logger } from "./logger";
dotenv.config();

/* Simple validator type */
type EnvValidator = (value: string) => boolean;

/* Safely get an env var, with optional fallback and validation. */
function getEnv(
  name: string,
  fallback?: string,
  validate?: EnvValidator
): string {
  const value = process.env[name] ?? fallback;

  if (value === undefined) {
    logger.error("Missing environment variable:");
    throw new Error(`Missing environment variable: ${name}`);
  }

  if (validate && !validate(value)) {
    logger.error("0m Invalid value for", name, ":", value);
    throw new Error(`Invalid value for ${name}: "${value}"`);
  }

  return value;
}

/* Validation helpers */
const isValidPort = (val: string) => /^\d{4,5}$/.test(val);
const isSqlitePath = (val: string) => val.endsWith(".sqlite");

/* Export validated env vars */
export const PORT: number = Number(getEnv("PORT", "3000", isValidPort));
export const DB_PATH: string = getEnv(
  "DB_PATH",
  "./db/data.sqlite",
  isSqlitePath
);
