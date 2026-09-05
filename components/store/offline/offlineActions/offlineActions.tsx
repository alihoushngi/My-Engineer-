"use client";

import { HouseIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";

export function OfflineActions() {
  return (
    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <Button
        icon={<RotateCwIcon aria-hidden="true" />}
        onClick={() => location.reload()}
      >
        تلاش دوباره
      </Button>
      <Button
        variant="outline"
        icon={<HouseIcon aria-hidden="true" />}
        onClick={() =>
          location.assign(new URL("/", window.location.origin).toString())
        }
      >
        صفحه اصلی
      </Button>
    </div>
  );
}
