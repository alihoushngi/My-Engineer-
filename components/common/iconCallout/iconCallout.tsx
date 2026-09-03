import { type ReactNode } from "react";
import { Card } from "@/components/ui/card/card";

type IconCalloutProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function IconCallout({ icon, title, description }: IconCalloutProps) {
  return (
    <Card className="h-full flex-row items-start gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        {icon}
      </span>
      <div className="min-w-0 space-y-1">
        <h3 className="break-words type-h4 text-card-foreground">{title}</h3>
        <p className="type-body-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
