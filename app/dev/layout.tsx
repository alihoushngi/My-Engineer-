import { notFound } from "next/navigation";
import { type ReactNode } from "react";

type DevLayoutProps = {
  children: ReactNode;
};

export default function DevLayout({ children }: DevLayoutProps) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return children;
}
