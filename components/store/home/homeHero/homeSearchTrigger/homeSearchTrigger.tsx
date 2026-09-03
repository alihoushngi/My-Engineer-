"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchSurface } from "@/components/layout/searchSurface/searchSurface";
import { Button } from "@/components/ui/button/button";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { cn } from "@/lib/utils/cn/cn";

type HomeSearchTriggerProps = {
  className?: string;
};

export function HomeSearchTrigger({ className }: HomeSearchTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-12 w-full justify-start gap-3 bg-background px-4 text-muted-foreground",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="home-search-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <SearchIcon aria-hidden="true" />
        {homeHeroCopy.searchLabel}
      </Button>
      <SearchSurface
        id="home-search-surface"
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
