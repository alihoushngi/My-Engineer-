"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CityUnavailableDialog } from "@/components/common/cityUnavailableDialog/cityUnavailableDialog";
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
      <CityUnavailableDialog
        id="home-city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={homeHeroCopy.cityLabel}
        description="انتخاب شهر برای مشاهده متخصصان به‌زودی فعال می‌شود."
      />
    </>
  );
}
