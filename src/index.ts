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

// Icons — explicit re-exports (export * breaks Next.js 14 SWC with mixed const + re-exports)
export { ICON_DEFAULTS } from "./icons"
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
  WarningIcon,
  PendingIcon,
  SendIcon,
  BanknoteIcon,
} from "./icons"
