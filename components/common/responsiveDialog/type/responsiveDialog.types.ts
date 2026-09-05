import { type ReactNode } from "react";
import { type ResponsiveDialogDesktopVariant } from "@/lib/ui/responsive-dialog/responsive-dialog";

export type ResponsiveDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  headerHidden?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  trigger?: ReactNode;
  id?: string;
  contentClassName?: string;
  bodyClassName?: string;
  desktopVariant?: ResponsiveDialogDesktopVariant;
  sheetSide?: "start" | "end";
};
