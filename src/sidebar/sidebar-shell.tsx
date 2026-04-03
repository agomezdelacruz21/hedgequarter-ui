"use client"

import * as React from "react"

import { cn } from "../utils"

function SidebarShell({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar-shell"
      className={cn(
        "flex h-screen w-56 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex items-center gap-2 px-4 py-4", className)}
      {...props}
    />
  )
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-y-auto px-2 py-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "border-t border-sidebar-border px-4 py-3",
        className
      )}
      {...props}
    />
  )
}

function SidebarSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-section"
      className={cn("mb-4", className)}
      {...props}
    />
  )
}

function SidebarSectionLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-section-label"
      className={cn(
        "px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-sidebar-muted",
        className
      )}
      {...props}
    />
  )
}

export {
  SidebarShell,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarSectionLabel,
}
