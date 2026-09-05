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
      <svg
        aria-hidden="true"
        viewBox="0 0 36 36"
        className="size-8 shrink-0 text-primary"
      >
        <path
          fill="currentColor"
          d="M4 27V10l7-4 7 4 7-4 7 4v17h-6V14l-8 4-8-4v13H4Z"
        />
        <path fill="currentColor" d="M13 19h10v8H13z" opacity=".55" />
      </svg>
      <span className="whitespace-nowrap font-bold">{siteConfig.name}</span>
    </Link>
  );
}
