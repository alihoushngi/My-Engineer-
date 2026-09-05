import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { HeaderCityButton } from "@/components/layout/storeHeader/headerCityButton/headerCityButton";
import { HeaderMenuButton } from "@/components/layout/storeHeader/headerMenuButton/headerMenuButton";
import { HeaderNavigation } from "@/components/layout/storeHeader/headerNavigation/headerNavigation";
import { HeaderSearchButton } from "@/components/layout/storeHeader/headerSearchButton/headerSearchButton";
import { type StoreHeaderProps } from "@/components/layout/storeHeader/type/storeHeader.types";

export function StoreHeader({ selectedCityLabel }: StoreHeaderProps) {
  return (
    <header className="bg-surface sticky top-0 z-40 border-b border-border">
      <div className="container-app flex min-w-0 items-center gap-2 py-3 sm:gap-3 lg:gap-6 lg:py-3">
        <BrandLogo className="min-w-0 max-w-[9.5rem] truncate sm:max-w-none" />
        <HeaderNavigation />
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <HeaderSearchButton />
          <HeaderCityButton selectedCityLabel={selectedCityLabel} />
          <JoinLink variant="outline" className="hidden lg:inline-flex" />
          <HeaderMenuButton />
        </div>
      </div>
    </header>
  );
}
