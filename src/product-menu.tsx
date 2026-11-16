"use client"

import * as React from "react"

import { cn } from "./utils"
import { ICON_DEFAULTS } from "./icon-defaults"
import { AllProductsIcon, SwitchFundIcon } from "./icons"
import {
  DEFAULT_HUB_URL,
  PRODUCT_MENU_LABELS,
  productMenuEntries,
  safeHref,
  type HqProduct,
  type ProductMenuLabels,
} from "./product-menu-entries"

/**
 * The sidebar's "ecosystem" section: jump to another hedgequarter product.
 *
 * Purely presentational — no tokens, no fetches. The host app passes the
 * `products` claim of the person's HQ Auth access token (under the
 * production access rule, exactly the products they can open in this
 * fund) and whether they are a superadmin (only they may open Admin).
 *
 * Every product link goes to that product's `/auth/launch`, which starts a
 * fresh sign-in with HQ Auth, so the fund is always resolved by HQ Auth and
 * never carried over from here. Products the person may not open are not
 * shown at all.
 *
 * Every `href` goes through `safeHref`: only http(s) URLs or paths starting
 * with a single `/`; an entry with anything else is dropped.
 */

export {
  HQ_PRODUCT_ORDER,
  PRODUCT_MENU_LABELS,
  productMenuEntries,
} from "./product-menu-entries"
export type { HqProduct, ProductMenuEntry, ProductMenuLabels } from "./product-menu-entries"

export interface ProductMenuProps {
  /** The product this sidebar belongs to; never listed. */
  current: HqProduct
  /** The `products` claim of the person's HQ Auth access token. */
  products: readonly string[] | null | undefined
  /** `global_role === "superadmin"`: adds Admin. */
  isSuperadmin?: boolean
  /** Sidebar collapsed (`w-14`): icons/monograms only, names in tooltips. */
  collapsed?: boolean
  /** Built-in strings; default "es". */
  locale?: "es" | "en"
  /** Overrides for any built-in string. */
  labels?: Partial<ProductMenuLabels>
  productNames?: Partial<Record<HqProduct, string>>
  /** Per-product origin (no path), e.g. for local development.
   *  Default `https://<product>.hedgequarter.com`. */
  origins?: Partial<Record<HqProduct, string>>
  /** HQ Auth's launcher. Default `https://auth.hedgequarter.com/hub`. */
  hubUrl?: string
  /** Where "Switch fund" goes: the host's own sign-in start with
   *  `prompt=select_account`. Shown only when this (a valid URL/path) or
   *  `onSwitchFund` is set. Pass it only to people with a choice — HQ Auth
   *  shows its picker even with a single fund (claim `eligible_tenant_count`
   *  of 2 or more). */
  switchFundHref?: string
  onSwitchFund?: () => void
  className?: string
}

const itemClass = (collapsed: boolean) =>
  cn(
    "flex w-full items-center rounded-md text-xs font-medium text-sidebar-muted transition-colors",
    "hover:bg-sidebar-accent hover:text-sidebar-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
    collapsed ? "justify-center p-2" : "gap-2.5 px-2.5 py-2"
  )

function Monogram({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-[9px] font-semibold leading-none"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function ProductMenu({
  current,
  products,
  isSuperadmin = false,
  collapsed = false,
  locale = "es",
  labels,
  productNames,
  origins,
  hubUrl = DEFAULT_HUB_URL,
  switchFundHref,
  onSwitchFund,
  className,
}: ProductMenuProps) {
  const text = { ...PRODUCT_MENU_LABELS[locale], ...labels }
  const entries = productMenuEntries({ current, products, isSuperadmin, origins, productNames })
  const hubHref = safeHref(hubUrl)
  const switchHref = safeHref(switchFundHref)
  const hasSwitchFund = Boolean(switchHref || onSwitchFund)

  const label = (visible: string, accessible = visible) =>
    collapsed ? { "aria-label": accessible, title: accessible } : { title: accessible === visible ? undefined : accessible }

  return (
    <nav
      data-slot="product-menu"
      data-collapsed={collapsed || undefined}
      aria-label={text.title}
      className={cn("border-t border-sidebar-border", collapsed ? "px-2 py-2" : "px-2 py-3", className)}
    >
      {!collapsed && (
        <p
          aria-hidden="true"
          className="px-2.5 pb-1.5 text-[10px] font-medium uppercase tracking-widest text-sidebar-muted"
        >
          {text.title}
        </p>
      )}
      <ul className="space-y-0.5">
        {entries.map((e) => {
          const accessible = `${text.open} ${e.name}`
          return (
            <li key={e.product}>
              <a href={e.href} data-product={e.product} className={itemClass(collapsed)} {...label(e.name, accessible)}>
                <Monogram name={e.name} />
                {!collapsed && <span className="flex-1 truncate">{e.name}</span>}
              </a>
            </li>
          )
        })}
        {hubHref && (
          <li>
            <a href={hubHref} data-entry="all-products" className={itemClass(collapsed)} {...label(text.allProducts)}>
              <AllProductsIcon {...ICON_DEFAULTS} aria-hidden="true" />
              {!collapsed && <span className="flex-1 truncate">{text.allProducts}</span>}
            </a>
          </li>
        )}
        {hasSwitchFund && (
          <li>
            {switchHref ? (
              <a href={switchHref} data-entry="switch-fund" className={itemClass(collapsed)} {...label(text.switchFund)}>
                <SwitchFundIcon {...ICON_DEFAULTS} aria-hidden="true" />
                {!collapsed && <span className="flex-1 truncate">{text.switchFund}</span>}
              </a>
            ) : (
              <button
                type="button"
                onClick={onSwitchFund}
                data-entry="switch-fund"
                className={cn(itemClass(collapsed), "cursor-pointer text-left")}
                {...label(text.switchFund)}
              >
                <SwitchFundIcon {...ICON_DEFAULTS} aria-hidden="true" />
                {!collapsed && <span className="flex-1 truncate">{text.switchFund}</span>}
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  )
}

export { ProductMenu }
