"use client";

import { type ReactNode } from "react";
import { MessageSquareIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer/drawer";
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
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{expertProfileCopy.contactTitle}</DrawerTitle>
          <DrawerDescription>
            {expertProfileCopy.contactDescription} {expertName}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {hasPhone ? (
            <Button asChild>
              <a href={`tel:${phone}`} className="ltr-data">
                <PhoneIcon aria-hidden="true" />
                {expertProfileCopy.callLabel}
              </a>
            </Button>
          ) : null}
          {hasSms ? (
            <Button asChild variant="outline">
              <a href={`sms:${sms}`} className="ltr-data">
                <MessageSquareIcon aria-hidden="true" />
                {expertProfileCopy.smsLabel}
              </a>
            </Button>
          ) : null}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
