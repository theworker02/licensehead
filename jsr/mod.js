/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

export const PACKAGE = Object.freeze({ name: "@theworker02/licensehead", version: "1.1.0", runtime: "node", registry: "jsr" });
export const SPDX_LINE = "// SPDX-License-Identifier: MIT\n";
export const SOURCE_EXTENSIONS = Object.freeze([".js", ".ts", ".mjs", ".cjs"]);
export const SKIP_DIRS = Object.freeze(["node_modules", ".git", "dist", "coverage"]);

function globToRegExp(glob) {
  const normalized = glob.replaceAll("\\", "/");
  let re = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (ch === "*" && normalized[i + 1] === "*") { re += ".*"; i += 1; if (normalized[i + 1] === "/") i += 1; }
    else if (ch === "*") re += "[^/]*";
    else if (ch === "?") re += "[^/]";
    else re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`, "i");
}

export function matchGlob(rel, pattern) {
  const target = rel.replaceAll("\\", "/");
  const pat = pattern.replaceAll("\\", "/");
  if (!pat) return true;
  return globToRegExp(pat).test(target) || globToRegExp(`**/${pat}`).test(target);
}

export function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.includes(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (SOURCE_EXTENSIONS.includes(path.extname(name))) files.push(full);
  }
  return files;
}

export function hasSpdx(text) { return /SPDX-License-Identifier:\s*\S+/.test(String(text)); }

export function scan(root = process.cwd(), options = {}) {
  const base = path.resolve(root);
  const includes = options.include ? [].concat(options.include) : [];
  const excludes = options.exclude ? [].concat(options.exclude) : [];
  const files = walk(base).filter((file) => {
    const rel = path.relative(base, file).replaceAll("\\", "/");
    if (includes.length && !includes.some((g) => matchGlob(rel, g))) return false;
    return !excludes.some((g) => matchGlob(rel, g));
  });
  const missing = files.filter((file) => !hasSpdx(fs.readFileSync(file, "utf8")));
  return { ok: missing.length === 0, scanned: files.length, missing: missing.map((file) => path.relative(base, file).replaceAll("\\", "/")), files: files.map((file) => path.relative(base, file).replaceAll("\\", "/")) };
}

export function fix(root = process.cwd(), options = {}) {
  const base = path.resolve(root);
  const scanned = scan(base, options);
  const fixed = [];
  for (const rel of scanned.missing) {
    const full = path.join(base, rel);
    fs.writeFileSync(full, SPDX_LINE + fs.readFileSync(full, "utf8"));
    fixed.push(rel);
  }
  return { ok: true, scanned: scanned.scanned, fixed, missing: [] };
}
