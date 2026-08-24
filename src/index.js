const fs = require("node:fs");
const path = require("node:path");

const SKIP = new Set(["node_modules", ".git", "dist", "coverage"]);
const EXT = new Set([".js", ".ts", ".mjs", ".cjs"]);
const SPDX_LINE = "// SPDX-License-Identifier: MIT\n";

function globToRegExp(glob) {
  const normalized = glob.replaceAll("\\", "/");
  let re = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (ch === "*" && normalized[i + 1] === "*") {
      re += ".*";
      i += 1;
      if (normalized[i + 1] === "/") i += 1;
    } else if (ch === "*") re += "[^/]*";
    else if (ch === "?") re += "[^/]";
    else re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`, "i");
}

function matchGlob(rel, pattern) {
  const target = rel.replaceAll("\\", "/");
  const pat = pattern.replaceAll("\\", "/");
  if (!pat) return true;
  return globToRegExp(pat).test(target) || globToRegExp(`**/${pat}`).test(target);
}

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

function filterFiles(files, root, { include, exclude } = {}) {
  const includes = include ? [].concat(include) : [];
  const excludes = exclude ? [].concat(exclude) : [];
  return files.filter((file) => {
    const rel = path.relative(root, file).replaceAll("\\", "/");
    if (includes.length && !includes.some((g) => matchGlob(rel, g))) return false;
    if (excludes.some((g) => matchGlob(rel, g))) return false;
    return true;
  });
}

function scan(root = process.cwd(), options = {}) {
  const base = path.resolve(root);
  const files = filterFiles(walk(base), base, options);
  const missing = files.filter((file) => !hasSpdx(fs.readFileSync(file, "utf8")));
  return {
    ok: missing.length === 0,
    scanned: files.length,
    missing: missing.map((file) => path.relative(base, file).replaceAll("\\", "/")),
    files: files.map((file) => path.relative(base, file).replaceAll("\\", "/")),
  };
}

function fix(root = process.cwd(), options = {}) {
  const base = path.resolve(root);
  const scanned = scan(base, options);
  const written = [];
  for (const rel of scanned.missing) {
    const full = path.join(base, rel);
    const body = fs.readFileSync(full, "utf8");
    fs.writeFileSync(full, SPDX_LINE + body);
    written.push(rel);
  }
  return {
    ok: true,
    scanned: scanned.scanned,
    fixed: written,
    missing: [],
  };
}

module.exports = { walk, hasSpdx, scan, fix, matchGlob, SPDX_LINE };
