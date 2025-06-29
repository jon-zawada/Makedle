/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov"],
  collectCoverageFrom: ["src/**/*.{js,ts}", "!src/**/*.test.{js,ts}"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
};
