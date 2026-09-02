import { type ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider/query-provider";
import { DirectionProvider } from "@/providers/direction-provider/direction-provider";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <DirectionProvider dir="rtl">
      <TooltipProvider delayDuration={300}>
        <QueryProvider>{children}</QueryProvider>
      </TooltipProvider>
    </DirectionProvider>
  );
}
