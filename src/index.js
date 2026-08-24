const fs = require("node:fs");
const path = require("node:path");

const SKIP = new Set(["node_modules", ".git", "dist", "coverage"]);
const EXT = new Set([".js", ".ts", ".mjs", ".cjs"]);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(name))) files.push(full);
  }
  return files;
}

function hasSpdx(text) {
  return /SPDX-License-Identifier:\s*\S+/.test(text);
}

function scan(root = process.cwd()) {
  const files = walk(path.resolve(root));
  const missing = files.filter((file) => !hasSpdx(fs.readFileSync(file, "utf8")));
  return {
    ok: missing.length === 0,
    scanned: files.length,
    missing: missing.map((file) => path.relative(root, file).replaceAll("\\", "/")),
  };
}

module.exports = { walk, hasSpdx, scan };
