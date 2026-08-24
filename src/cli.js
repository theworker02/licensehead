#!/usr/bin/env node
const { scan } = require("./index.js");

const root = process.argv[2] || process.cwd();
const result = scan(root);
if (result.missing.length) {
  process.stdout.write(`${result.missing.map((file) => `missing ${file}`).join("\n")}\n`);
}
process.stdout.write(`${JSON.stringify({ ok: result.ok, scanned: result.scanned, missing: result.missing.length })}\n`);
process.exit(result.ok ? 0 : 1);
