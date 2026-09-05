import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { HeaderAuthActions } from "@/components/layout/headerAuthActions/headerAuthActions";
import { HeaderCityButton } from "@/components/layout/storeHeader/headerCityButton/headerCityButton";
import { HeaderMenuButton } from "@/components/layout/storeHeader/headerMenuButton/headerMenuButton";
import { HeaderNavigation } from "@/components/layout/storeHeader/headerNavigation/headerNavigation";
import { HeaderSearchButton } from "@/components/layout/storeHeader/headerSearchButton/headerSearchButton";
import { type StoreHeaderProps } from "@/components/layout/storeHeader/type/storeHeader.types";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { toStoreAuthChrome } from "@/lib/auth/store-auth-chrome/store-auth-chrome";
import { getUserSession } from "@/lib/auth/user-session/user-session";

export async function StoreHeader({ selectedCityLabel }: StoreHeaderProps) {
  const [userSession, engineerSession] = await Promise.all([
    getUserSession(),
    getEngineerSession(),
  ]);
  const authChrome = toStoreAuthChrome({ userSession, engineerSession });

  return (
    <header className="sticky top-0 z-40 border-b border-primary-foreground/10 bg-primary-deep pt-[env(safe-area-inset-top)] text-primary-deep-foreground shadow-sm">
      <div className="container-app flex min-w-0 items-center gap-2 py-3 sm:gap-3 lg:gap-6 lg:py-3">
        <BrandLogo className="min-w-0 max-w-[8.5rem] truncate text-primary-deep-foreground sm:max-w-none" />
        <HeaderNavigation />
        <div className="ms-auto flex items-center gap-1 text-primary-deep-foreground sm:gap-2 [&>button]:text-primary-deep-foreground [&>button]:hover:bg-primary-foreground/10 [&>button]:hover:text-primary-deep-foreground sm:[&>a]:border-primary-foreground/40 sm:[&>a]:text-primary-deep-foreground">
          <HeaderSearchButton />
          <HeaderCityButton selectedCityLabel={selectedCityLabel} />
          <HeaderAuthActions chrome={authChrome} />
          <HeaderMenuButton authChrome={authChrome} />
        </div>
      </div>
    </header>
  );
}
