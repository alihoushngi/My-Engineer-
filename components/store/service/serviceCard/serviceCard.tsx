import { type MouseEventHandler, type ReactNode } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card/card";
import { cn } from "@/lib/utils/cn/cn";

export type ServiceCardProps = {
  href: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ServiceCard({
  href,
  title,
  description,
  icon,
  className,
  onClick,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-lg outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      onClick={onClick}
    >
      <Card className="h-full p-4 transition-colors group-hover:border-border-strong group-hover:bg-accent/40 sm:p-5">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              {icon ? (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5">
                  {icon}
                </span>
              ) : null}
              <div className="min-w-0 space-y-1">
                <h3 className="type-h4 font-semibold text-card-foreground">
                  {title}
                </h3>
                {description ? (
                  <p className="hidden type-body-sm text-muted-foreground sm:block">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>
            <ChevronLeftIcon
              aria-hidden="true"
              className="mt-1 hidden size-4 shrink-0 text-muted-foreground sm:inline ltr:hidden"
            />
            <ChevronRightIcon
              aria-hidden="true"
              className="mt-1 hidden size-4 shrink-0 text-muted-foreground sm:inline rtl:hidden"
            />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
