# licensehead


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="licensehead mark" width="96" height="96">

**Scan JavaScript and TypeScript trees for SPDX license headers and optionally repair missing headers.**

[![JSR](https://jsr.io/badges/@theworker02/licensehead)](https://jsr.io/@theworker02/licensehead)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/licensehead`](https://jsr.io/@theworker02/licensehead)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/licensehead/)  ·  **Source:** [`theworker02/licensehead`](https://github.com/theworker02/licensehead)

## Purpose

Walk JavaScript and TypeScript source trees and report files missing an SPDX license header, or prepend a standard MIT SPDX line during fix runs. Helps keep small repos and packages consistent before release or acquisition review.

## Highlights

- Scans `.js`, `.ts`, `.mjs`, and `.cjs` with include/exclude globs.
- Detects existing `SPDX-License-Identifier` comments via `hasSpdx()`.
- Optional fix mode prepends a canonical one-line MIT SPDX header.
- Documented scan/fix result types for programmatic CI integration.


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

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/licensehead`, published through GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/licensehead.git
cd licensehead
node src/cli.js ./src
node src/cli.js --include "src/**/*.js" --exclude "**/*.test.js"
node src/cli.js fix --json
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Fix mode always inserts the MIT SPDX identifier; it does not infer license type from `package.json`.
- Only inspects supported extensions; markdown, JSON, and other assets are skipped.
- Glob matching is intentionally compact, not a full `.gitignore` engine.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/licensehead)
- [Project site](https://theworker02.github.io/licensehead/)
- [Source repository](https://github.com/theworker02/licensehead)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

licensehead is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

