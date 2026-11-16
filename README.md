# @hedgequarter/ui

Shared UI component library for the Hedgequarter ecosystem.

Source-only TypeScript library — consumers process with their own bundler.

## Install

```bash
npm install github:agomezdelacruz21/hedgequarter-ui
```

## Usage

```tsx
import { Button, Card, cn } from "@hedgequarter/ui";
```

## Product menu (sidebar "ecosystem" section)

```tsx
import { ProductMenu } from "@hedgequarter/ui";

<ProductMenu
  current="sentinel"                      // this product; never listed
  products={session.user.products}        // `products` claim of the HQ Auth access token
  isSuperadmin={globalRole === "superadmin"} // adds Admin
  collapsed={isCollapsed}                 // w-14 sidebar: monograms/icons, names as tooltips
  locale="es"                             // "es" | "en"
  switchFundHref="/auth/launch?prompt=select_account" // optional; or onSwitchFund
/>
```

Each product links to its own `/auth/launch` (HQ Auth resolves the fund);
"All products" goes to `https://auth.hedgequarter.com/hub`. No tokens, no
fetches. `origins` and `hubUrl` override the production URLs for local
development; `labels` / `productNames` override the built-in strings.

- `products`: the `products` claim of the person's HQ Auth access token
  (`hq_admin` is read as Admin; unknown slugs are ignored). Products the
  person may not open are never shown.
- Admin appears only with `isSuperadmin` (`global_role === "superadmin"`).
- "Switch fund" appears only with `switchFundHref` or `onSwitchFund`. Pass it
  only when the access token's `eligible_tenant_count` is 2 or more (missing
  claim = 1): HQ Auth's picker shows even with a single fund.
- URL rule: every `href` (`origins`, `hubUrl`, `switchFundHref`) must be an
  `https:`/`http:` URL or a path starting with a single `/` (`origins`: an
  http(s) URL). Anything else drops that entry.

Tests for the pure logic (`src/product-menu-entries.ts`): `npm test`
(Node's built-in runner, Node >= 22.18, no dependencies).

