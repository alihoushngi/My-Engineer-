import { StoreNotFound } from "@/components/layout/storeNotFound/storeNotFound";
import { StoreShell } from "@/components/layout/storeShell/storeShell";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";

export const metadata = notFoundMetadata;

export default function NotFound() {
  return (
    <StoreShell>
      <StoreNotFound />
    </StoreShell>
  );
}
