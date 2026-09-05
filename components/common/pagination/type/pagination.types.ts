export type PaginationProps = {
  page: number;
  pageCount: number;
  ariaLabel: string;
  pathname?: string;
  query?: string;
  hash?: string;
  onPageChange?: (page: number) => void;
};
