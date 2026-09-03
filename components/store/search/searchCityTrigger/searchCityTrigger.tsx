"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { searchCopy } from "@/config/search.config/search.config";
import { cn } from "@/lib/utils/cn/cn";

type SearchCityTriggerProps = {
  className?: string;
};

export function SearchCityTrigger({ className }: SearchCityTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-11 w-full justify-start gap-2 text-muted-foreground sm:w-auto",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-city-selector-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MapPinIcon aria-hidden="true" />
        {searchCopy.cityLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent id="search-city-selector-surface">
          <DialogHeader>
            <DialogTitle>{searchCopy.cityLabel}</DialogTitle>
            <DialogDescription>
              {searchCopy.cityDialogDescription}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
