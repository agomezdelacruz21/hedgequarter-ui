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

