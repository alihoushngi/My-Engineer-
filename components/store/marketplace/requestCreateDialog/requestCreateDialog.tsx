"use client";

import { useState, type ReactNode } from "react";
import { AuthRequiredAction } from "@/components/store/auth/authRequiredAction/authRequiredAction";
import { RequestCreateForm } from "@/components/store/marketplace/requestCreateForm/requestCreateForm";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { type ServiceSlug } from "@/config/services.config/services.config";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type RequestCreateDialogProps = {
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
  isUserAuthenticated: boolean;
  nextPath: string;
  lockedExpertId?: string;
  lockedServiceSlug?: ServiceSlug;
  defaultCityId?: string;
  triggerLabel?: string;
  triggerVariant?: "primary" | "outline";
  triggerSize?: "sm" | "md";
  triggerClassName?: string;
  triggerIcon?: ReactNode;
};

export function RequestCreateDialog({
  experts,
  cities,
  isUserAuthenticated,
  nextPath,
  lockedExpertId,
  lockedServiceSlug,
  defaultCityId,
  triggerLabel = marketplaceCopy.createRequestLabel,
  triggerVariant = "primary",
  triggerSize = "md",
  triggerClassName,
  triggerIcon,
}: RequestCreateDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AuthRequiredAction
        isAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        label={triggerLabel}
        variant={triggerVariant}
        size={triggerSize}
        className={triggerClassName}
        icon={triggerIcon}
        onAuthenticatedClick={() => {
          setOpen(true);
        }}
      />
      <ResponsiveDialog
        open={open}
        title={marketplaceCopy.createRequestTitle}
        description={marketplaceCopy.createRequestDescription}
        onOpenChange={setOpen}
      >
        <RequestCreateForm
          experts={experts}
          cities={cities}
          lockedExpertId={lockedExpertId}
          lockedServiceSlug={lockedServiceSlug}
          defaultCityId={defaultCityId}
          onSuccess={() => {
            setOpen(false);
          }}
        />
      </ResponsiveDialog>
    </>
  );
}
