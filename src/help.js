const HELP = "licensehead 1.00 (1.0.0)\n\nUsage:\n  licensehead [options] [dir]\n\nWalk .js / .ts / .mjs / .cjs files and require:\n  SPDX-License-Identifier: <id>\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nPrints one \"missing <path>\" line per failure, then a JSON summary.\n\nExamples:\n  licensehead\n  licensehead ./src\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
