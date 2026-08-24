#!/usr/bin/env node
const { scan, fix } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = { include: [], exclude: [] };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--fix") flags.doFix = true;
    else if (arg === "--include") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --include requires a glob");
      flags.include.push(next);
      i += 1;
    } else if (arg.startsWith("--include=")) flags.include.push(arg.slice("--include=".length));
    else if (arg === "--exclude") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --exclude requires a glob");
      flags.exclude.push(next);
      i += 1;
    } else if (arg.startsWith("--exclude=")) flags.exclude.push(arg.slice("--exclude=".length));
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  const rest = [...positional];
  let command = "scan";
  if (rest[0] === "scan" || rest[0] === "fix") command = rest.shift();
  if (flags.doFix) command = "fix";
  const root = rest[0] || process.cwd();
  const options = {
    include: flags.include.length ? flags.include : undefined,
    exclude: flags.exclude.length ? flags.exclude : undefined,
  };

  if (command === "fix") {
    const result = fix(root, options);
    if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    else {
      process.stdout.write(`fixed ${result.fixed.length} of ${result.scanned} file(s)\n`);
      for (const file of result.fixed) process.stdout.write(`  ${file}\n`);
    }
    process.exit(0);
  }

  const result = scan(root, options);
  if (flags.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  else {
    if (result.missing.length) {
      process.stdout.write(`${result.missing.map((file) => `missing ${file}`).join("\n")}\n`);
    }
    process.stdout.write(`scanned ${result.scanned}, missing ${result.missing.length}\n`);
  }
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  fail(err.message);
}
