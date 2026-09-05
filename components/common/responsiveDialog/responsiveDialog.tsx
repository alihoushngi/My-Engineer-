"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet/sheet";
import { type ResponsiveDialogProps } from "@/components/common/responsiveDialog/type/responsiveDialog.types";
import { useIsDesktop } from "@/hooks/use-is-desktop/use-is-desktop";
import { resolveResponsiveDialogSurface } from "@/lib/ui/responsive-dialog/responsive-dialog";
import { cn } from "@/lib/utils/cn/cn";

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  headerHidden = false,
  children,
  footer,
  trigger,
  id,
  contentClassName,
  bodyClassName,
  desktopVariant = "dialog",
  sheetSide = "start",
}: ResponsiveDialogProps) {
  const surface = resolveResponsiveDialogSurface(
    useIsDesktop(),
    desktopVariant,
  );
  const descriptionText = description ?? title;
  const headerClassName = headerHidden ? "sr-only" : undefined;
  const descriptionId = id ? `${id}-description` : undefined;

  if (surface === "dialog") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
        <DialogContent id={id} className={contentClassName}>
          <DialogHeader className={headerClassName}>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription id={descriptionId}>
              {descriptionText}
            </DialogDescription>
          </DialogHeader>
          {children}
          {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        </DialogContent>
      </Dialog>
    );
  }

  if (surface === "sheet") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
        <SheetContent
          id={id}
          side={sheetSide}
          className={cn("w-full overflow-hidden sm:max-w-md", contentClassName)}
        >
          <SheetHeader className={headerClassName}>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription id={descriptionId}>
              {descriptionText}
            </SheetDescription>
          </SheetHeader>
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto px-5 pb-4",
              bodyClassName,
            )}
          >
            {children}
          </div>
          {footer ? <SheetFooter>{footer}</SheetFooter> : null}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} handleOnly>
      {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}
      <DrawerContent id={id} className={contentClassName}>
        <DrawerHeader className={headerClassName}>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription id={descriptionId}>
            {descriptionText}
          </DrawerDescription>
        </DrawerHeader>
        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5",
            footer ? "pb-2" : "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            bodyClassName,
          )}
        >
          {children}
        </div>
        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
}
