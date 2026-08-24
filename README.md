# licensehead

<img src="docs/logo.svg" alt="licensehead mark" width="96" height="96">

**Scan .js/.ts files for SPDX-License-Identifier and list the ones that are missing it.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/licensehead?display_name=release)
[![npm](https://img.shields.io/npm/v/%40magnexis/licensehead.svg)](https://www.npmjs.com/package/%40magnexis/licensehead)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/licensehead/) · **Source:** [`theworker02/licensehead`](https://github.com/theworker02/licensehead) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/licensehead/releases/tag/v1.0.0) · **npm:** [`@magnexis/licensehead`](https://www.npmjs.com/package/%40magnexis/licensehead)

## Why it exists

License provenance in source files matters for reuse. licensehead makes missing SPDX headers a CI failure instead of a hunt.

## Who it is for

Maintainers of Node and TypeScript trees who want SPDX on every compilable file.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm i -g @magnexis/licensehead
licensehead --help
```

Package page: https://www.npmjs.com/package/%40magnexis/licensehead

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/licensehead.git
licensehead --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/licensehead.git
cd licensehead
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/licensehead --help
node src/cli.js --help
```

## Quick start

```bash
licensehead ./src
```

## CLI reference

```text
licensehead 1.00 (1.0.0)

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
```

Print the same text locally:

```bash
licensehead --help
licensehead -h
licensehead --version
licensehead -V
```

Expected version output:

```text
1.0.0
```

## Configuration

Walks `.js`, `.ts`, `.mjs`, `.cjs`. `--fix` prepends `// SPDX-License-Identifier: MIT`.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Every scanned file has SPDX, or fix succeeded. |
| `1` | One or more files missing SPDX (scan), or bad input. |

## Examples

### Success path

Every scanned JS/TS file has an SPDX header.

```bash
licensehead --json ./src
```

```text
{"ok":true,"scanned":3,"missing":[]}
```

### Failure path

Files without SPDX are listed and exit 1.

```bash
licensehead ./src
```

```text
missing bad.ts
scanned 2, missing 1
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/licensehead/](https://theworker02.github.io/licensehead/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
