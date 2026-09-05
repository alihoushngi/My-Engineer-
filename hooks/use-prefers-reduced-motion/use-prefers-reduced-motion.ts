"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncPreference() {
      setPrefersReducedMotion(media.matches);
    }

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => {
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  return prefersReducedMotion;
}
