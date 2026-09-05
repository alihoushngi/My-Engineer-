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
        "flex w-full flex-col items-center justify-center gap-5 rounded-lg bg-surface-subtle px-5 py-12 sm:py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <div
          data-slot="empty-icon"
          className="flex size-14 items-center justify-center rounded-full bg-surface text-primary [&_svg]:size-6"
        >
          {icon}
        </div>
      ) : null}
      <div className="flex max-w-md flex-col items-center gap-3">
        <h2 className="type-h3 font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="type-body-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
