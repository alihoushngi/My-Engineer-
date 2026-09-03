import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl min-w-0 space-y-2">
        {eyebrow ? (
          <p className="type-caption text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h2 id={titleId} className="type-h2 text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="type-body text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
