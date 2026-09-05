import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config/site.config";
import { cn } from "@/lib/utils/cn/cn";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href={siteConfig.homeHref}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md px-1 type-h4 text-foreground outline-none",
        "transition-opacity hover:opacity-80",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <HouseIcon
        aria-hidden="true"
        className="size-7 shrink-0 text-primary"
        strokeWidth={1.5}
      />
      <span className="whitespace-nowrap font-bold">{siteConfig.name}</span>
    </Link>
  );
}
