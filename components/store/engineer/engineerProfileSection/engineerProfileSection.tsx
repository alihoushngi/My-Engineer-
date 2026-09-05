import { type ReactNode } from "react";

type EngineerProfileSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
};

export function EngineerProfileSection({
  title,
  description,
  children,
  action,
}: EngineerProfileSectionProps) {
  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h2 className="type-h4 text-foreground">{title}</h2>
          {description ? (
            <p className="type-caption text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
