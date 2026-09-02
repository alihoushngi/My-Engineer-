"use client";

import { Direction } from "radix-ui";
import { type ReactNode } from "react";

type DirectionProviderProps = {
  children: ReactNode;
  dir?: "rtl" | "ltr";
};

export function DirectionProvider({
  children,
  dir = "rtl",
}: DirectionProviderProps) {
  return (
    <Direction.DirectionProvider dir={dir}>
      {children}
    </Direction.DirectionProvider>
  );
}
