import { type ReactNode } from "react";

type IconCalloutProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function IconCallout({ icon, title, description }: IconCalloutProps) {
  return (
    <div className="flex h-full items-start gap-4 py-4">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
        {icon}
      </span>
      <div className="min-w-0 space-y-2">
        <h3 className="break-words type-h4 text-card-foreground">{title}</h3>
        <p className="type-body-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
