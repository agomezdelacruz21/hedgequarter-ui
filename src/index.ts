// Utilities
export { cn } from "./utils"

// Base components
export { Button, buttonVariants } from "./button"
export { Input } from "./input"
export { Textarea } from "./textarea"
export { Badge, badgeVariants } from "./badge"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card"
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"
export { Separator } from "./separator"
export { Spinner } from "./spinner"
export { PageHeader, PageHeaderTitle, PageHeaderDescription } from "./page-header"

// Radix components
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants } from "./tabs"
export { Checkbox } from "./checkbox"
export { Switch } from "./switch"

// Sidebar
export {
  SidebarShell,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarSectionLabel,
  NavItem,
  NavItemIcon,
  NavItemBadge,
} from "./sidebar"

// Product menu — the sidebar's "ecosystem" section (login unificado, fase 7)
export {
  ProductMenu,
  productMenuEntries,
  PRODUCT_MENU_LABELS,
  HQ_PRODUCT_ORDER,
} from "./product-menu"
export type {
  HqProduct,
  ProductMenuProps,
  ProductMenuLabels,
  ProductMenuEntry,
} from "./product-menu"

// Icon defaults — isolated in own module for Next.js 14 SWC compatibility
export { ICON_DEFAULTS } from "./icon-defaults"
// Icon components — explicit re-exports (export * breaks Next.js 14 SWC)
export {
  DashboardIcon,
  UsersIcon,
  DocumentIcon,
  TransactionsIcon,
  MessagesIcon,
  LedgerIcon,
  OrganizationIcon,
  AuditIcon,
  AnalysisIcon,
  InvestigationsIcon,
  ExpensesIcon,
  PaymentsIcon,
  ComplianceIcon,
  ChecklistIcon,
  ProfileIcon,
  ChartIcon,
  KeyIcon,
  LockIcon,
  InvitationsIcon,
  LanguageIcon,
  LightModeIcon,
  DarkModeIcon,
  SettingsIcon,
  SignOutIcon,
  CollapseIcon,
  ExpandIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  AllProductsIcon,
  SwitchFundIcon,
  WarningIcon,
  PendingIcon,
  SendIcon,
  BanknoteIcon,
} from "./icons"
