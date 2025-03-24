type LogLevel = "info" | "warn" | "error" | "success";

const colors: Record<LogLevel, string> = {
  info: "\x1b[36m", // cyan
  warn: "\x1b[33m", // yellow
  error: "\x1b[31m", // red
  success: "\x1b[32m", // green
};

const reset = "\x1b[0m";
const bold = "\x1b[1m";

function log(level: LogLevel, label: string, ...args: any[]) {
  const color = colors[level];
  const prefix = `${bold}${color}${label.toUpperCase()}:${reset}`;
  console.log(prefix, ...args);
}

function error(level: LogLevel, label: string, ...args: any[]) {
  const color = colors[level];
  const prefix = `${bold}${color}${label.toUpperCase()}:${reset}`;
  console.error(prefix, ...args);
}

function warn(level: LogLevel, label: string, ...args: any[]) {
  const color = colors[level];
  const prefix = `${bold}${color}${label.toUpperCase()}:${reset}`;
  console.warn(prefix, ...args);
}

export const logger = {
  info: (...args: any[]) => log("info", "info", ...args),
  warn: (...args: any[]) => warn("warn", "warning", ...args),
  error: (...args: any[]) => error("error", "error", ...args),
  success: (...args: any[]) => log("success", "success", ...args),
};
