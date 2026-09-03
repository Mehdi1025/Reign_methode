import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const outDir = join(root, "out");
const publicDir = join(root, "public");

if (!existsSync(outDir)) {
  console.error("Build output directory 'out/' not found.");
  process.exit(1);
}

const filesToCopy = [
  { src: join(publicDir, "index.html"), dest: join(outDir, "index.html") },
  { src: join(publicDir, "404.html"), dest: join(outDir, "404.html") },
];

for (const { src, dest } of filesToCopy) {
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

console.log("Static export complete — Framer site copied to out/");
