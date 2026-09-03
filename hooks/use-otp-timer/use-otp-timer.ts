"use client";

import { useEffect, useRef, useState } from "react";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/config/registration.config/registration.config";

/**
 * OTP resend countdown timer.
 * Returns seconds remaining. When 0, resend is allowed.
 */
export function useOtpTimer(initialSeconds = OTP_RESEND_COOLDOWN_SECONDS): {
  secondsLeft: number;
  canResend: boolean;
  restartTimer: () => void;
} {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function restartTimer() {
    setSecondsLeft(OTP_RESEND_COOLDOWN_SECONDS);
  }

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [secondsLeft]);

  return { secondsLeft, canResend: secondsLeft === 0, restartTimer };
}
