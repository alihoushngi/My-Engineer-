"use client";

import { useEffect } from "react";

export function PwaRegistration() {
  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator) ||
      (!window.isSecureContext && !isLocalhost)
    ) {
      return;
    }

    let registration: ServiceWorkerRegistration | undefined;

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
        await registration.update();
      } catch {
        // PWA support is progressive: registration failure must not break the app.
      }
    };

    void register();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void registration?.update();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return null;
}
