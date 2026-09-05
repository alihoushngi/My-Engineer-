import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { siteConfig } from "@/config/site.config/site.config";

export function StoreNotFound() {
  return (
    <div className="container-narrow flex flex-col min-h-[55dvh] items-center justify-center gap-5 text-center py-section">
      <p className="type-display text-primary">
        <span className="ltr-data">404</span>
      </p>
      <h1 className="type-h1 text-foreground">صفحه پیدا نشد</h1>
      <p className="max-w-md type-body text-muted-foreground">
        این صفحه وجود ندارد یا جابه‌جا شده است. می‌توانید به صفحه اصلی برگردید.
      </p>
      <Button asChild>
        <Link href={siteConfig.homeHref}>بازگشت به خانه</Link>
      </Button>
    </div>
  );
}
