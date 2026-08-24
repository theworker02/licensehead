const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { hasSpdx, scan } = require("../src/index.js");

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
});
