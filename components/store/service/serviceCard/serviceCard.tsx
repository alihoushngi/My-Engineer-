import { type MouseEventHandler, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
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
      onClick={onClick}
      className={cn(
        "group flex h-full min-w-0 items-start gap-4 rounded-md border-b border-border px-3 py-6 outline-none transition-colors hover:bg-primary-subtle focus-visible:ring-2 focus-visible:ring-ring sm:px-5",
        className,
      )}
    >
      {icon ? (
        <span className="mt-1 shrink-0 text-primary [&_svg]:size-6 [&_svg]:stroke-[1.5]">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1 space-y-2">
        <h3 className="type-h4 text-foreground">{title}</h3>
        {description ? (
          <p className="type-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <ArrowLeftIcon
        aria-hidden="true"
        className="mt-1.5 size-4 shrink-0 text-primary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none ltr:rotate-180"
      />
    </Link>
  );
}
