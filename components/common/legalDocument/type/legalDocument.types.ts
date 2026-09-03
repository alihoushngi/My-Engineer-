export type LegalListItem = {
  term?: string;
  text: string;
};

export type LegalSection = {
  id: string;
  title: string;
  intro?: string;
  items?: readonly LegalListItem[];
  paragraphs?: readonly string[];
};

export type LegalContactItem = {
  label: string;
  value: string;
  href?: string;
  ltr?: boolean;
};

export type LegalDocumentContent = {
  sections: readonly LegalSection[];
  contact?: {
    heading: string;
    items: readonly LegalContactItem[];
  };
};

export type LegalDocumentProps = {
  document: LegalDocumentContent;
};
