/** Scan JavaScript and TypeScript source trees for SPDX license headers and optionally fix missing headers. @module */
export interface ScanOptions { include?: string | string[]; exclude?: string | string[]; }
export interface ScanResult { ok: boolean; scanned: number; missing: string[]; files: string[]; }
export interface FixResult { ok: true; scanned: number; fixed: string[]; missing: string[]; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/licensehead"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** SPDX line inserted by {@link fix}. */
export const SPDX_LINE: "// SPDX-License-Identifier: MIT\n";
/** Source file extensions scanned by default. */
export const SOURCE_EXTENSIONS: readonly string[];
/** Directory names skipped while scanning. */
export const SKIP_DIRS: readonly string[];
/** Match a repository-relative path against a compact glob. */
export function matchGlob(rel: string, pattern: string): boolean;
/** Recursively enumerate JavaScript/TypeScript source files. */
export function walk(dir: string, files?: string[]): string[];
/** Return whether source text contains an SPDX identifier. */
export function hasSpdx(text: string): boolean;
/** Scan a source tree for missing SPDX headers. */
export function scan(root?: string, options?: ScanOptions): ScanResult;
/** Prepend the standard MIT SPDX line to missing files. */
export function fix(root?: string, options?: ScanOptions): FixResult;
