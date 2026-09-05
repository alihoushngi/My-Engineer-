import { type ReactNode } from "react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { type StoreBreadcrumbItem } from "@/components/common/storeBreadcrumb/type/storeBreadcrumb.types";

type EngineerPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: readonly StoreBreadcrumbItem[];
};

export function EngineerPageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: EngineerPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <StoreBreadcrumb items={breadcrumbs} />
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
      </div>
    </header>
  );
}
