/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov"],
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/**/*.test.{js,ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
