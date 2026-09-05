import { type ReactNode } from "react";

type AccountPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AccountPageHeader({
  title,
  description,
  actions,
}: AccountPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-2">
        <h1 className="type-h1 text-foreground">{title}</h1>
        {description ? (
          <p className="max-w-2xl type-body text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
