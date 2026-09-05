import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { siteConfig } from "@/config/site.config/site.config";

export function AuthHeader() {
  return (
    <header className="border-b border-primary-foreground/10 bg-primary-deep text-primary-foreground">
      <div className="container-app flex items-center justify-between gap-3 py-3 sm:gap-4">
        <BrandLogo className="min-w-0 shrink text-primary-foreground" />
        <Link
          href={siteConfig.homeHref}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2 type-body-sm text-primary-foreground/70 outline-none transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring sm:px-3"
        >
          <ChevronRightIcon aria-hidden="true" className="size-4 ltr:hidden" />
          <ChevronLeftIcon aria-hidden="true" className="size-4 rtl:hidden" />
          <span className="sm:hidden">فروشگاه</span>
          <span className="hidden sm:inline">بازگشت به فروشگاه</span>
        </Link>
      </div>
    </header>
  );
}
