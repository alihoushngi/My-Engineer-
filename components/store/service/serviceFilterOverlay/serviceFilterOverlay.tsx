"use client";

import { ServiceFilterFields } from "@/components/store/service/serviceFilterFields/serviceFilterFields";
import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import {
  serviceFilterCopy,
  type ServiceFilterDefinition,
} from "@/config/service-filters.config/service-filters.config";
import { useIsDesktop } from "@/hooks/use-is-desktop/use-is-desktop";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  type FilterKey,
  type ServiceFilterValues,
} from "@/lib/service/filter-experts/filter-experts";

type ServiceFilterOverlayProps = {
  open: boolean;
  definition: ServiceFilterDefinition;
  values: ServiceFilterValues;
  overlayKeys: readonly FilterKey[];
  draftCount: number;
  onOpenChange: (open: boolean) => void;
  onChange: (key: FilterKey, value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export function ServiceFilterOverlay({
  open,
  definition,
  values,
  overlayKeys,
  draftCount,
  onOpenChange,
  onChange,
  onApply,
  onReset,
}: ServiceFilterOverlayProps) {
  const isDesktop = useIsDesktop();
  const fields = (
    <ServiceFilterFields
      definition={definition}
      values={values}
      overlayKeys={overlayKeys}
      onChange={onChange}
    />
  );
  const actions = (
    <>
      <Button className="w-full" onClick={onApply}>
        {serviceFilterCopy.applyLabel} ({formatFaNumber(draftCount)})
      </Button>
      <Button variant="ghost" className="w-full" onClick={onReset}>
        {serviceFilterCopy.resetLabel}
      </Button>
    </>
  );

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="start"
          className="w-full overflow-y-auto sm:max-w-md"
        >
          <SheetHeader>
            <SheetTitle>{serviceFilterCopy.overlayTitle}</SheetTitle>
            <SheetDescription>
              {serviceFilterCopy.overlayDescription}
            </SheetDescription>
          </SheetHeader>
          <div className="px-5 pb-4">{fields}</div>
          <SheetFooter>{actions}</SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{serviceFilterCopy.overlayTitle}</DrawerTitle>
          <DrawerDescription>
            {serviceFilterCopy.overlayDescription}
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-5 pb-2">{fields}</div>
        <DrawerFooter>{actions}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
