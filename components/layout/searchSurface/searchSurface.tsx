"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { type SearchSurfaceProps } from "@/components/layout/searchSurface/type/searchSurface.types";

export function SearchSurface({ open, onOpenChange }: SearchSurfaceProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="search-surface"
        className="sm:max-w-lg"
        aria-describedby="search-surface-description"
      >
        <DialogHeader>
          <DialogTitle>جستجو</DialogTitle>
          <DialogDescription id="search-surface-description">
            جستجو در خدمات و متخصصین به‌زودی فعال می‌شود.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
