import { StoreNotFound } from "@/components/layout/storeNotFound/storeNotFound";
import { StoreShell } from "@/components/layout/storeShell/storeShell";

export default function NotFound() {
  return (
    <StoreShell>
      <StoreNotFound />
    </StoreShell>
  );
}
