"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SearchSurface } from "@/components/layout/searchSurface/searchSurface";
import { Button } from "@/components/ui/button/button";

export function HeaderSearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="hidden justify-start gap-2 px-3 text-muted-foreground lg:inline-flex"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <SearchIcon aria-hidden="true" />
        جستجو
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="جستجو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="search-surface"
        onClick={() => {
          setOpen(true);
        }}
      >
        <SearchIcon aria-hidden="true" />
      </Button>
      <SearchSurface open={open} onOpenChange={setOpen} />
    </>
  );
}
