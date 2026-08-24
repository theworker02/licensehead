#!/usr/bin/env node
const { scan } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const root = args.find((a) => !a.startsWith("-")) || process.cwd();
const result = scan(root);
if (result.missing.length) {
  process.stdout.write(`${result.missing.map((file) => `missing ${file}`).join("\n")}\n`);
}
process.stdout.write(`${JSON.stringify({ ok: result.ok, scanned: result.scanned, missing: result.missing.length })}\n`);
process.exit(result.ok ? 0 : 1);
