/**
 * The pure part of the product menu: which products it links to and where.
 * No imports, no JSX — so it can be unit-tested with plain `node --test`
 * (see `test/`), and imported anywhere.
 */

export type HqProduct = "sentinel" | "trace" | "grid" | "ledger" | "admin"

/** Display order — the same as HQ Auth's launcher, Admin last. */
export const HQ_PRODUCT_ORDER: readonly HqProduct[] = ["sentinel", "trace", "grid", "ledger", "admin"]

export const DEFAULT_PRODUCT_ORIGINS: Readonly<Record<HqProduct, string>> = {
  sentinel: "https://sentinel.hedgequarter.com",
  trace: "https://trace.hedgequarter.com",
  grid: "https://grid.hedgequarter.com",
  ledger: "https://ledger.hedgequarter.com",
  admin: "https://admin.hedgequarter.com",
}

export const DEFAULT_HUB_URL = "https://auth.hedgequarter.com/hub"

const PRODUCT_NAMES: Record<HqProduct, string> = {
  sentinel: "Sentinel",
  trace: "Trace",
  grid: "Grid",
  ledger: "Ledger",
  admin: "Admin",
}

export interface ProductMenuLabels {
  /** Section heading (hidden when collapsed). */
  title: string
  /** Prefix of each product link's accessible name: "Open" → "Open Ledger". */
  open: string
  allProducts: string
  switchFund: string
}

export const PRODUCT_MENU_LABELS: Record<"es" | "en", ProductMenuLabels> = {
  es: { title: "Ecosistema", open: "Abrir", allProducts: "Todos los productos", switchFund: "Cambiar de fondo" },
  en: { title: "Ecosystem", open: "Open", allProducts: "All products", switchFund: "Switch fund" },
}

/**
 * The only `href` values the menu renders: an absolute `https:`/`http:` URL,
 * or a same-site path starting with a single `/`. Anything else — another
 * scheme (`javascript:`, `data:` …), a protocol-relative `//host`, `/\host`
 * (browsers read it as `//host`), whitespace or control characters inside —
 * gives null, and the caller drops the entry.
 */
export function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null
  const v = value.trim()
  if (!v || /[\u0000- \u007f]/.test(v)) return null
  if (v.startsWith("/")) return /^\/(?![/\\])/.test(v) ? v : null
  try {
    const { protocol } = new URL(v)
    return protocol === "https:" || protocol === "http:" ? v : null
  } catch {
    return null
  }
}

/** An origin override must be an absolute `https:`/`http:` URL. */
function safeOrigin(value: string): string | null {
  const v = value.trim().replace(/\/+$/, "")
  return safeHref(v) && !v.startsWith("/") ? v : null
}

/** HQ Auth calls Admin's client product `hq_admin`; accept both spellings. */
function toProduct(slug: string): HqProduct | null {
  const s = slug.trim().toLowerCase()
  if (s === "hq_admin") return "admin"
  return (HQ_PRODUCT_ORDER as readonly string[]).includes(s) ? (s as HqProduct) : null
}

export interface ProductMenuEntry {
  product: HqProduct
  name: string
  href: string
}

/**
 * Which products the menu links to, in order: the allowed ones minus the
 * current one, Admin only for a superadmin, unknown slugs ignored, and any
 * product whose origin is not a valid http(s) URL dropped. Exported so hosts
 * and tests can reason about the list without rendering.
 */
export function productMenuEntries({
  current,
  products,
  isSuperadmin = false,
  origins,
  productNames,
}: {
  current: HqProduct
  products: readonly string[] | null | undefined
  isSuperadmin?: boolean
  origins?: Partial<Record<HqProduct, string>>
  productNames?: Partial<Record<HqProduct, string>>
}): ProductMenuEntry[] {
  const allowed = new Set<HqProduct>()
  for (const slug of products ?? []) {
    const p = typeof slug === "string" ? toProduct(slug) : null
    if (p && p !== "admin") allowed.add(p)
  }
  if (isSuperadmin) allowed.add("admin")
  allowed.delete(current)

  const entries: ProductMenuEntry[] = []
  for (const product of HQ_PRODUCT_ORDER) {
    if (!allowed.has(product)) continue
    const origin = safeOrigin(origins?.[product] ?? DEFAULT_PRODUCT_ORIGINS[product])
    if (!origin) continue
    entries.push({ product, name: productNames?.[product] ?? PRODUCT_NAMES[product], href: `${origin}/auth/launch` })
  }
  return entries
}
