"use client";

import { useState, type ReactNode } from "react";
import { ExpertResponsiveOverlay } from "@/components/store/expert/expertResponsiveOverlay/expertResponsiveOverlay";
import { Button } from "@/components/ui/button/button";

type ExpertLegacyFeatureProps = {
  label: string;
  title: string;
  description: string;
  variant?: "outline" | "ghost" | "primary";
  icon?: ReactNode;
  className?: string;
};

export function ExpertLegacyFeature({
  label,
  title,
  description,
  variant = "outline",
  icon,
  className,
}: ExpertLegacyFeatureProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={() => {
          setOpen(true);
        }}
      >
        {icon}
        {label}
      </Button>
      <ExpertResponsiveOverlay
        open={open}
        title={title}
        description={description}
        onOpenChange={setOpen}
      >
        <p className="type-body leading-loose text-foreground">{description}</p>
      </ExpertResponsiveOverlay>
    </>
  );
}
