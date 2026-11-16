// Unit tests for the product menu's pure logic. No dependencies: Node's own
// test runner with built-in TypeScript type stripping (Node >= 22.18).
//   npm test
import { test } from "node:test"
import assert from "node:assert/strict"

import { productMenuEntries, safeHref } from "../src/product-menu-entries.ts"

test("safeHref accepts http(s) URLs and single-slash paths", () => {
  for (const ok of [
    "https://auth.hedgequarter.com/hub",
    "http://localhost:3000",
    "/auth/launch?prompt=select_account",
    "/",
  ]) {
    assert.equal(safeHref(ok), ok, ok)
  }
  assert.equal(safeHref("  /auth/launch  "), "/auth/launch")
})

test("safeHref rejects other schemes, protocol-relative and odd input", () => {
  for (const bad of [
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    " javascript:alert(1)",
    "java\nscript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "mailto:a@b.c",
    "//evil.example/hub",
    "/\\evil.example",
    "/\t/evil.example",
    "auth/launch",
    "evil.example",
    "",
    "   ",
  ]) {
    assert.equal(safeHref(bad), null, JSON.stringify(bad))
  }
  assert.equal(safeHref(undefined), null)
  assert.equal(safeHref(42), null)
})

test("entries: allowed products minus current, launcher order, Admin only for superadmin", () => {
  const list = productMenuEntries({ current: "sentinel", products: ["ledger", "grid", "sentinel", "hq_admin", "nope"] })
  assert.deepEqual(list.map((e) => e.product), ["grid", "ledger"])
  assert.equal(list[1].href, "https://ledger.hedgequarter.com/auth/launch")

  const su = productMenuEntries({ current: "ledger", products: [], isSuperadmin: true })
  assert.deepEqual(su, [{ product: "admin", name: "Admin", href: "https://admin.hedgequarter.com/auth/launch" }])
})

test("entries: an origin that is not an http(s) URL drops that product", () => {
  const list = productMenuEntries({
    current: "sentinel",
    products: ["trace", "grid", "ledger"],
    origins: {
      trace: "javascript:alert(1)//",
      grid: "/grid",
      ledger: "http://localhost:3002/",
    },
  })
  assert.deepEqual(list, [{ product: "ledger", name: "Ledger", href: "http://localhost:3002/auth/launch" }])
})
