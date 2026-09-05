"use client";

import { type ReactNode } from "react";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

type EngineerEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  pending: boolean;
  error: string | null;
  canSubmit: boolean;
  onSubmit: () => void;
  onRetry?: () => void;
};

export function EngineerEditDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  pending,
  error,
  canSubmit,
  onSubmit,
  onRetry,
}: EngineerEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {children}
          <EngineerActionError message={error} onRetry={onRetry} />
          <DialogFooter>
            <Button type="submit" loading={pending} disabled={!canSubmit}>
              {engineerPanelCopy.saveLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => onOpenChange(false)}
            >
              {engineerPanelCopy.cancelLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
