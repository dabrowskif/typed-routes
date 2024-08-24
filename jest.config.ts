import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts$": "@swc/jest",
  },
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["./node_modules/", "./lib/index.ts", "./dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
