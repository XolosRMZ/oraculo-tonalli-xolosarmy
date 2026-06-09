import { cpSync, rmSync } from "node:fs";

rmSync("dist/public", { force: true, recursive: true });
cpSync("src/public", "dist/public", { recursive: true });
