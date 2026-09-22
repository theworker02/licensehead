# Asset inventory â€” licensehead

## Repository surfaces

| Asset | Location / notes |
|-------|------------------|
| Source tree | Repository root / language packages |
| Tests | `test/`, `tests/`, CI workflows if present |
| Docs | `README.md`, `docs/` |
| Diligence room | `docs/acquisition/` |
| License / notices | `LICENSE`, transition notices if present |
| Funding | `.github/FUNDING.yml` |
| CI | `.github/workflows/` if present |
| Branding | logos/assets folders if present |

## Capability highlights

- `scan(root, options)` Ã¢â‚¬â€ find source files missing SPDX identifiers.
- `fix(root, options)` Ã¢â‚¬â€ prepend the canonical MIT SPDX line.
- `hasSpdx(text)` Ã¢â‚¬â€ inspect source text.
- `walk(dir)` Ã¢â‚¬â€ enumerate supported source files.
- `matchGlob(path, pattern)` Ã¢â‚¬â€ include/exclude matching.
- `SPDX_LINE`, `SOURCE_EXTENSIONS`, `SKIP_DIRS`, `PACKAGE` Ã¢â‚¬â€ documented metadata.
- `ScanOptions`, `ScanResult`, `FixResult` Ã¢â‚¬â€ TypeScript interfaces.

## Usually excluded

Seller personal accounts, unrelated repos, and unreissued registry tokens â€” unless listed in the definitive agreement.

*Updated: 2026-09-22*
