# licensehead

<img src="docs/logo.svg" alt="licensehead mark" width="96" height="96">

**Scan JavaScript and TypeScript trees for SPDX license headers and optionally repair missing headers.**

[![JSR](https://jsr.io/badges/@theworker02/licensehead)](https://jsr.io/@theworker02/licensehead)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/licensehead`](https://jsr.io/@theworker02/licensehead) · **Site:** [GitHub Pages](https://theworker02.github.io/licensehead/) · **Source:** [`theworker02/licensehead`](https://github.com/theworker02/licensehead)

## Add from JSR

```bash
deno add jsr:@theworker02/licensehead
```

```ts
import { hasSpdx, scan, SPDX_LINE } from "@theworker02/licensehead";

console.log(hasSpdx("// SPDX-License-Identifier: MIT\nconst x = 1;"));
console.log(scan("./src"));
console.log(SPDX_LINE);
```

## Public API

- `scan(root, options)` — find source files missing SPDX identifiers.
- `fix(root, options)` — prepend the canonical MIT SPDX line.
- `hasSpdx(text)` — inspect source text.
- `walk(dir)` — enumerate supported source files.
- `matchGlob(path, pattern)` — include/exclude matching.
- `SPDX_LINE`, `SOURCE_EXTENSIONS`, `SKIP_DIRS`, `PACKAGE` — documented metadata.
- `ScanOptions`, `ScanResult`, `FixResult` — TypeScript interfaces.

## CLI from source

```bash
git clone https://github.com/theworker02/licensehead.git
cd licensehead
node src/cli.js ./src
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/licensehead`, published through GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
