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
import { homeHeroCopy } from "@/config/home.config/home.config";
import { cn } from "@/lib/utils/cn/cn";

type HomeCityTriggerProps = {
  className?: string;
};

export function HomeCityTrigger({ className }: HomeCityTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-12 w-full justify-start gap-3 bg-background px-4 text-muted-foreground sm:w-auto",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="home-city-selector-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MapPinIcon aria-hidden="true" />
        {homeHeroCopy.cityLabel}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent id="home-city-selector-surface">
          <DialogHeader>
            <DialogTitle>{homeHeroCopy.cityLabel}</DialogTitle>
            <DialogDescription>
              انتخاب شهر برای مشاهده متخصصان به‌زودی فعال می‌شود.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
