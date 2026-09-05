"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { MobileNavigation } from "@/components/layout/mobileNavigation/mobileNavigation";
import { Button } from "@/components/ui/button/button";
import { type StoreAuthChrome } from "@/types/store/auth.types";

type HeaderMenuButtonProps = {
  authChrome: StoreAuthChrome;
};

export function HeaderMenuButton({ authChrome }: HeaderMenuButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="xl:hidden"
        aria-label="منو"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon aria-hidden="true" />
      </Button>
      <MobileNavigation
        open={open}
        onOpenChange={setOpen}
        authChrome={authChrome}
      />
    </>
  );
}
