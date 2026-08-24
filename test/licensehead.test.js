const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { hasSpdx, scan, fix } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("licensehead", () => {
  it("detects SPDX headers", () => {
    assert.equal(hasSpdx("// SPDX-License-Identifier: MIT\n"), true);
    assert.equal(hasSpdx("module.exports = 1;\n"), false);
  });

  it("reports files missing SPDX", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "licensehead-"));
    fs.writeFileSync(path.join(dir, "ok.js"), "// SPDX-License-Identifier: MIT\nexport {}\n");
    fs.writeFileSync(path.join(dir, "bad.ts"), "export const x = 1;\n");
    const result = scan(dir);
    assert.equal(result.ok, false);
    assert.deepEqual(result.missing, ["bad.ts"]);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("excludes globs and --fix prepends MIT SPDX", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "licensehead-"));
    fs.writeFileSync(path.join(dir, "keep.js"), "export const a = 1;\n");
    fs.writeFileSync(path.join(dir, "skip.test.js"), "export const b = 1;\n");
    const scanned = scan(dir, { exclude: ["**/*.test.js"] });
    assert.deepEqual(scanned.missing, ["keep.js"]);
    const fixed = fix(dir, { exclude: ["**/*.test.js"] });
    assert.deepEqual(fixed.fixed, ["keep.js"]);
    assert.match(fs.readFileSync(path.join(dir, "keep.js"), "utf8"), /SPDX-License-Identifier: MIT/);
    assert.equal(hasSpdx(fs.readFileSync(path.join(dir, "skip.test.js"), "utf8")), false);
    const cliRun = spawnSync(process.execPath, [cli, "--json", dir], { encoding: "utf8" });
    assert.equal(cliRun.status, 1);
    assert.ok(JSON.parse(cliRun.stdout).missing.includes("skip.test.js"));
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
