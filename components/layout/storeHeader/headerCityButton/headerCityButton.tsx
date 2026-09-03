"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CityUnavailableDialog } from "@/components/common/cityUnavailableDialog/cityUnavailableDialog";
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
        <MapPinIcon aria-hidden="true" />
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
        <MapPinIcon aria-hidden="true" />
      </Button>
      <CityUnavailableDialog
        id="city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={defaultCityLabel}
        description="انتخاب شهر برای مشاهده متخصصان به‌زودی فعال می‌شود."
      />
    </>
  );
}
