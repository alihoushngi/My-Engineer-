"use client";

import { MapPinIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent id={id}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Empty
          icon={<MapPinIcon aria-hidden="true" />}
          title={title}
          description={description}
          className="pe-10"
        />
      </DialogContent>
    </Dialog>
  );
}
