export type PaginationProps = {
  page: number;
  pageCount: number;
  ariaLabel: string;
  buildHref?: (page: number) => string;
  onPageChange?: (page: number) => void;
};
