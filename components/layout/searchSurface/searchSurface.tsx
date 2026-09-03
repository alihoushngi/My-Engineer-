"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { searchCopy } from "@/config/search.config/search.config";
import { type SearchSurfaceProps } from "@/components/layout/searchSurface/type/searchSurface.types";

export function SearchSurface({
  open,
  onOpenChange,
  id = "search-surface",
}: SearchSurfaceProps) {
  const descriptionId = `${id}-description`;

  function closeSurface() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id={id}
        className="max-h-[min(90vh,40rem)] overflow-y-auto sm:max-w-2xl"
        aria-describedby={descriptionId}
      >
        <DialogHeader>
          <DialogTitle>{searchCopy.overlayTitle}</DialogTitle>
          <DialogDescription id={descriptionId}>
            {searchCopy.overlayDescription}
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <SearchInput
            id={`${id}-query`}
            initialQuery=""
            requireQuery
            navigateOnClear={false}
            autoFocus
            labelHidden
            onSubmitted={closeSurface}
          />
        ) : null}
        <section className="space-y-3" aria-labelledby={`${id}-services`}>
          <h3 id={`${id}-services`} className="type-h4 text-foreground">
            {searchCopy.overlayServices}
          </h3>
          <ServiceCategoryGrid onServiceSelect={closeSurface} />
        </section>
      </DialogContent>
    </Dialog>
  );
}
