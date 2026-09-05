"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { MobileNavigation } from "@/components/layout/mobileNavigation/mobileNavigation";
import { Button } from "@/components/ui/button/button";

type HeaderMenuButtonProps = {
  isAuthenticated?: boolean;
};

export function HeaderMenuButton({
  isAuthenticated = false,
}: HeaderMenuButtonProps) {
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
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
