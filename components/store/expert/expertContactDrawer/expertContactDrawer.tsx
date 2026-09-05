"use client";

import { type ReactNode } from "react";
import { MessageSquareIcon, PhoneIcon } from "lucide-react";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ExpertContactDrawerProps = {
  expertName: string;
  phone?: string;
  sms?: string;
  trigger: ReactNode;
};

export function ExpertContactDrawer({
  expertName,
  phone,
  sms,
  trigger,
}: ExpertContactDrawerProps) {
  const hasPhone = Boolean(phone);
  const hasSms = Boolean(sms);

  if (!hasPhone && !hasSms) {
    return null;
  }

  return (
    <ResponsiveDialog
      trigger={trigger}
      title={expertProfileCopy.contactTitle}
      description={`${expertProfileCopy.contactDescription} ${expertName}`}
      footer={
        <>
          {hasPhone ? (
            <Button asChild>
              <a href={`tel:${phone}`} className="ltr-data">
                <PhoneIcon aria-hidden="true" />
                {expertProfileCopy.callLabel}
                <span className="ltr-data type-body-sm">{phone}</span>
              </a>
            </Button>
          ) : null}
          {hasSms ? (
            <Button asChild variant="outline">
              <a href={`sms:${sms}`} className="ltr-data">
                <MessageSquareIcon aria-hidden="true" />
                {expertProfileCopy.smsLabel}
                <span className="ltr-data type-body-sm">{sms}</span>
              </a>
            </Button>
          ) : null}
          <p className="text-center type-caption text-muted-foreground">
            {expertProfileCopy.contactPlatformNote}
          </p>
        </>
      }
    >
      <p className="type-body-sm leading-loose text-muted-foreground">
        {expertProfileCopy.contactCaution}
      </p>
    </ResponsiveDialog>
  );
}
