import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn/cn";

type EmptyProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function Empty({
  icon,
  title,
  description,
  action,
  className,
}: EmptyProps) {
  return (
    <div
      data-slot="empty"
      role="status"
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? (
        <div
          data-slot="empty-icon"
          className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-6"
        >
          {icon}
        </div>
      ) : null}
      <div className="flex max-w-sm flex-col items-center gap-1.5">
        <h2 className="type-h4 font-medium text-foreground">{title}</h2>
        {description ? (
          <p className="type-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
