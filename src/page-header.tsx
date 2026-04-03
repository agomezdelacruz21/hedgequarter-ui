import * as React from "react"

import { cn } from "./utils"

function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  )
}

function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn(
        "text-lg font-semibold text-foreground",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-header-description"
      className={cn("text-xs text-muted-foreground mt-1", className)}
      {...props}
    />
  )
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription }
