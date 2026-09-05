"use client";

import { useState, type ReactNode } from "react";
import { AuthRequiredAction } from "@/components/store/auth/authRequiredAction/authRequiredAction";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";

type ExpertLegacyFeatureProps = {
  label: string;
  title: string;
  description: string;
  variant?: "outline" | "ghost" | "primary";
  icon?: ReactNode;
  className?: string;
  auth?: {
    isAuthenticated: boolean;
    nextPath: string;
  };
};

export function ExpertLegacyFeature({
  label,
  title,
  description,
  variant = "outline",
  icon,
  className,
  auth,
}: ExpertLegacyFeatureProps) {
  const [open, setOpen] = useState(false);

  const trigger = auth ? (
    <AuthRequiredAction
      isAuthenticated={auth.isAuthenticated}
      nextPath={auth.nextPath}
      label={label}
      variant={variant}
      icon={icon}
      className={className}
      onAuthenticatedClick={() => {
        setOpen(true);
      }}
    />
  ) : (
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
  );

  return (
    <>
      {trigger}
      <ResponsiveDialog
        open={open}
        title={title}
        description={description}
        onOpenChange={setOpen}
      >
        <p className="type-body leading-loose text-foreground">{description}</p>
      </ResponsiveDialog>
    </>
  );
}
