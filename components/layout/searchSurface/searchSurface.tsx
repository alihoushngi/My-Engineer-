"use client";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { searchCopy } from "@/config/search.config/search.config";
import { type SearchSurfaceProps } from "@/components/layout/searchSurface/type/searchSurface.types";

export function SearchSurface({
  open,
  onOpenChange,
  id = "search-surface",
}: SearchSurfaceProps) {
  function closeSurface() {
    onOpenChange(false);
  }

  return (
    <ResponsiveDialog
      id={id}
      open={open}
      onOpenChange={onOpenChange}
      title={searchCopy.overlayTitle}
      description={searchCopy.overlayDescription}
      contentClassName="sm:max-w-2xl"
    >
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
    </ResponsiveDialog>
  );
}
