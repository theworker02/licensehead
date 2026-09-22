# Buyer evaluation â€” licensehead

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```bash
deno add jsr:@theworker02/licensehead
```
```ts
import { hasSpdx, scan, SPDX_LINE } from "@theworker02/licensehead";

console.log(hasSpdx("// SPDX-License-Identifier: MIT\nconst x = 1;"));
console.log(scan("./src"));
console.log(SPDX_LINE);
```
```bash
git clone https://github.com/theworker02/licensehead.git
cd licensehead
node src/cli.js ./src
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
