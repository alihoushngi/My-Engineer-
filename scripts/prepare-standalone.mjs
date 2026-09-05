import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const standaloneRoot = resolve(projectRoot, ".next/standalone");

if (!existsSync(standaloneRoot)) {
  throw new Error(
    "Standalone output was not found. Run `pnpm build` with output: standalone first.",
  );
}

const copies = [
  [resolve(projectRoot, "public"), resolve(standaloneRoot, "public")],
  [
    resolve(projectRoot, ".next/static"),
    resolve(standaloneRoot, ".next/static"),
  ],
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) {
    throw new Error(
      `Required standalone asset directory is missing: ${source}`,
    );
  }

  mkdirSync(destination, { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
}

console.log("Copied public/ and .next/static/ into .next/standalone/.");
