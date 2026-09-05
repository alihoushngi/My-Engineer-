"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { expertProfileCopy } from "@/config/experts.config/experts.config";

type ExpertAvatarPreviewProps = {
  name: string;
  initials: string;
  avatarSrc?: string;
};

export function ExpertAvatarPreview({
  name,
  initials,
  avatarSrc,
}: ExpertAvatarPreviewProps) {
  const [open, setOpen] = useState(false);
  const avatar = (
    <Avatar className="size-24 rounded-lg ring-4 ring-primary-foreground/10 sm:size-28">
      {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
      <AvatarFallback className="rounded-lg bg-primary-subtle type-h3 text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  if (!avatarSrc) {
    return avatar;
  }

  return (
    <>
      <button
        type="button"
        className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={expertProfileCopy.avatarPreviewLabel}
        onClick={() => {
          setOpen(true);
        }}
      >
        {avatar}
      </button>
      <ResponsiveDialog
        open={open}
        title={name}
        description={expertProfileCopy.avatarPreviewLabel}
        onOpenChange={setOpen}
      >
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            sizes="(min-width: 640px) 24rem, 100vw"
            className="object-cover"
          />
        </div>
      </ResponsiveDialog>
    </>
  );
}
