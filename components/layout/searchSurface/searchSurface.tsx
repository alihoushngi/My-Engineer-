"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { type SearchSurfaceProps } from "@/components/layout/searchSurface/type/searchSurface.types";

export function SearchSurface({
  open,
  onOpenChange,
  id = "search-surface",
}: SearchSurfaceProps) {
  const descriptionId = `${id}-description`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id={id}
        className="sm:max-w-lg"
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle>جستجو</DialogTitle>
          <DialogDescription id={descriptionId}>
            جستجو در خدمات و متخصصین به‌زودی فعال می‌شود.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
