import Link from "next/link";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import { footerNavigation } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-subtle">
      <div className="container-app flex flex-col gap-8 py-section">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xs space-y-3">
            <BrandLogo />
            <p className="type-body-sm text-muted-foreground">
              پلتفرم اتصال به متخصصان ساختمان.
            </p>
            <JoinLink size="sm" variant="outline" />
          </div>
          <nav aria-label="پیوندهای پاورقی">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {footerNavigation.map((group) => (
                <div key={group.id} className="min-w-0 space-y-3">
                  <h2 className="type-label text-foreground">{group.label}</h2>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="inline-flex min-h-11 items-center break-words type-body-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
        <p className="border-t border-border pt-5 type-caption text-muted-foreground">
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
