const HELP = `licensehead 1.00 (1.0.0)

Usage:
  licensehead [scan] [options] [dir]
  licensehead fix [options] [dir]

Walk .js / .ts / .mjs / .cjs files and require:
  SPDX-License-Identifier: <id>

Subcommands:
  scan               List files missing an SPDX header (default)
  fix                Prepend a standard MIT SPDX line to missing files

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             JSON {ok, scanned, missing|fixed}
  --include <glob>   Only files matching this glob (repeatable)
  --exclude <glob>   Skip files matching this glob (repeatable)
  --fix              Same as the fix subcommand

The inserted header is:
  // SPDX-License-Identifier: MIT

Exit codes:
  0  every scanned file has SPDX (or fix succeeded)
  1  one or more files missing SPDX (scan), or bad input

Examples:
  licensehead
  licensehead ./src
  licensehead --include "src/**/*.js" --exclude "**/*.test.js"
  licensehead fix --json
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
