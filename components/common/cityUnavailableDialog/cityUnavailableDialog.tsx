"use client";

import { MapPinIcon } from "lucide-react";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Empty } from "@/components/ui/empty/empty";

type CityUnavailableDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title: string;
  description: string;
};

export function CityUnavailableDialog({
  open,
  onOpenChange,
  id,
  title,
  description,
}: CityUnavailableDialogProps) {
  return (
    <ResponsiveDialog
      id={id}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      headerHidden
    >
      <Empty
        icon={<MapPinIcon aria-hidden="true" />}
        title={title}
        description={description}
        className="pe-10"
      />
    </ResponsiveDialog>
  );
}
