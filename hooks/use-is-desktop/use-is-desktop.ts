"use client";

import { useEffect, useState } from "react";
import { RESPONSIVE_DIALOG_DESKTOP_QUERY } from "@/lib/ui/responsive-dialog/responsive-dialog";

export function useIsDesktop(query = RESPONSIVE_DIALOG_DESKTOP_QUERY): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    function sync() {
      setIsDesktop(media.matches);
    }

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, [query]);

  return isDesktop;
}
