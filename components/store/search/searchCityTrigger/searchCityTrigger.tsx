"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CityUnavailableDialog } from "@/components/common/cityUnavailableDialog/cityUnavailableDialog";
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
      <CityUnavailableDialog
        id="search-city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={searchCopy.cityLabel}
        description={searchCopy.cityDialogDescription}
      />
    </>
  );
}
