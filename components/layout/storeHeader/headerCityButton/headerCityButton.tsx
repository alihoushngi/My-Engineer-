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
import { type HeaderCityButtonProps } from "@/components/layout/storeHeader/headerCityButton/type/headerCityButton.types";

const defaultCityLabel = "انتخاب شهر";

export function HeaderCityButton({ selectedCityLabel }: HeaderCityButtonProps) {
  const [open, setOpen] = useState(false);
  const label = selectedCityLabel ?? defaultCityLabel;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="hidden max-w-44 text-muted-foreground md:inline-flex lg:max-w-none"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="city-selector-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MapPinIcon />
        <span className="truncate">{label}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="city-selector-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MapPinIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent id="city-selector-surface">
          <DialogHeader>
            <DialogTitle>{defaultCityLabel}</DialogTitle>
            <DialogDescription>
              انتخاب شهر برای مشاهده متخصصان به‌زودی فعال می‌شود.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
