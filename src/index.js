/* index.js — one import surface for the whole system:
   import { Button, DataTable, StatCard, ... } from '@/components' */
export { Button } from "./components/ui/Button";
export { StatusBadge } from "./components/ui/StatusBadge";
export {
  Avatar,
  CategoryTag,
  Skeleton,
  SkeletonStatCard,
  SkeletonTableRows,
  EmptyState,
  Badge,
} from "./components/ui/primitives";
export {
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  SearchInput,
  DateField,
} from "./components/ui/form";
export {
  Modal,
  Drawer,
  Tooltip,
  ActionsMenu,
  ToastProvider,
  useToast,
  ConfirmDialog,
} from "./components/ui/overlays";
export {
  DataTable,
  Pagination,
  BulkActionsBar,
} from "./components/ui/DataTable";
export {
  StatCard,
  FilterBar,
  Tabs,
  TabPanel,
  PageHeader,
  Breadcrumb,
} from "./components/ui/spine";
export {
  ProgressBar,
  Switch,
  RadioGroup,
  Alert,
  Banner,
  DateRangeField,
} from "./components/ui/extras";
export {
  Stack,
  Inline,
  Box,
  Spinner,
  DescriptionList,
} from "./components/ui/layout";
export { Combobox, MultiSelect } from "./components/ui/combobox";
export { FileUpload } from "./components/ui/upload";
export { Stepper } from "./components/ui/stepper";
export {
  NotificationBell,
  NotificationList,
} from "./components/ui/notifications";
export {
  RichTextEditor,
  RichTextContent,
} from "./components/ui/richtext";
export { AppShell } from "./components/ui/AppShell";
export { can, ROLE_LABELS } from "./lib/permissions";
export {
  inr,
  inrPrecise,
  formatDate,
  formatDateLong,
  formatRelativeDays,
  formatRelativeTime,
} from "./lib/format";
export { cn } from "./lib/cn";
export { ThemeProvider, useTheme, ThemeToggle } from "./lib/theme";
export { TrendLine, MoneyBars, Donut } from "./components/charts/Charts";
export * as chartTheme from "./charts/theme";
