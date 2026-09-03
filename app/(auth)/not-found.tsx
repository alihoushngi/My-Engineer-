import { StoreNotFound } from "@/components/layout/storeNotFound/storeNotFound";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";

export const metadata = notFoundMetadata;

export default function AuthNotFound() {
  return <StoreNotFound />;
}
