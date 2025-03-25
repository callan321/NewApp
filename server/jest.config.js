module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./shared/resetAndMigrate.ts",
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/tests/**/*.test.ts"],

  verbose: false,
  silent: false,  
};
  