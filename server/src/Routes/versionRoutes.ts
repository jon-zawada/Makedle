import { Router } from "express";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const router = Router();

const dirName = path.join(__dirname, "..", "..", "package.json")
const packageJson = JSON.parse(fs.readFileSync(dirName, "utf8"));
const appVersion = packageJson.version || "unknown";

let gitSha = "unknown";
try {
  gitSha = execSync("git rev-parse HEAD").toString().trim();
} catch {
  console.log("Not in a git repo or git not available");
}

const buildTime = new Date().toISOString();

router.get("/", (req, res) => {
  res.json({
    version: appVersion,
    gitSha,
    environment: process.env.NODE_ENV || "development",
    buildTime,
    uptimeSeconds: process.uptime(),
  });
});

export default router;
