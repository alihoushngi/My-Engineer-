"use client";

import { useEffect, useState } from "react";

export function useIsDesktop(query = "(min-width: 768px)"): boolean {
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
