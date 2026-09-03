import Link from "next/link";
import { legalNavigation } from "@/config/navigation.config/navigation.config";

export function AuthFooter() {
  return (
    <footer className="border-t border-border">
      <nav
        aria-label="پیوندهای قانونی"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-page py-4"
      >
        {legalNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-h-11 inline-flex items-center type-body-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
