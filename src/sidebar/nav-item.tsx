"use client"

import * as React from "react"

import { cn } from "../utils"

function NavItem({
  className,
  active = false,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  active?: boolean
}) {
  return (
    <a
      data-slot="nav-item"
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
        active &&
          "bg-sidebar-active text-sidebar-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

function NavItemIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="nav-item-icon"
      className={cn(
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function NavItemBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="nav-item-badge"
      className={cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary/10 px-1.5 text-[10px] font-medium text-sidebar-primary",
        className
      )}
      {...props}
    />
  )
}

export { NavItem, NavItemIcon, NavItemBadge }
