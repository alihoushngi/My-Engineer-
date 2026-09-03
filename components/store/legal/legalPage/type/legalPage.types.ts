import { type LegalDocumentContent } from "@/components/common/legalDocument/type/legalDocument.types";

export type LegalPageProps = {
  title: string;
  intro: string;
  breadcrumbLabel: string;
  document: LegalDocumentContent;
  relatedHref: string;
  relatedLabel: string;
};
