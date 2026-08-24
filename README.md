# licensehead

<img src="docs/logo.svg" alt="licensehead mark" width="88" height="88">

**Scan .js/.ts files for SPDX-License-Identifier and list the ones that are missing it.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/licensehead?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

License provenance in source files matters for reuse. licensehead makes missing SPDX headers a CI failure instead of a hunt.

## Who it is for

Maintainers of Node and TypeScript trees who want SPDX on every compilable file.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/licensehead.git --help
node src/cli.js --help
```

## Quick start

```bash
licensehead ./src
```

## CLI reference

Synopsis:

```text
licensehead [options] [dir]
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `[dir]` | Root to walk. Default: cwd. Skips node_modules, .git, dist, coverage. Extensions: .js .ts .mjs .cjs |

Print the same text locally:

```bash
licensehead --help
licensehead --version
```

Expected version output:

```text
1.0.0
```

## Configuration

A file passes if it matches /SPDX-License-Identifier:\s*\S+/. Placement in a comment is up to you; the scanner does not parse JS.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Every scanned file has an SPDX identifier. |
| `1` | One or more files are missing SPDX. |

## Examples

### Success path

All files include a header.

```bash
licensehead ./src
```

```json
{"ok":true,"scanned":4,"missing":0}
```

### Failure path

```bash
licensehead ./src
```

```text
missing src/legacy.ts
{"ok":false,"scanned":5,"missing":1}
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
