import { type ReactNode } from "react";
import { StoreShell } from "@/components/layout/storeShell/storeShell";

type ShopLayoutProps = {
  children: ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps) {
  return <StoreShell>{children}</StoreShell>;
}
