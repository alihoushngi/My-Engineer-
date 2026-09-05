export type ReviewHighlightKind = "positive" | "negative";

export type ReviewHighlight = {
  kind: ReviewHighlightKind;
  label: string;
};

export type ExpertReview = {
  id: string;
  text: string;
  authorName?: string;
  authorRole?: string;
  dateLabel?: string;
  rating?: number;
  highlights?: readonly ReviewHighlight[];
  replyText?: string;
};
