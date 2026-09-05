export const DEFAULT_PAGE_SIZE = 9;

export const paginationCopy = {
  previousLabel: "قبلی",
  nextLabel: "بعدی",
  ellipsisLabel: "صفحات بیشتر",
  pageNumberLabel: "صفحه",
  pageStatus: (page: string, pageCount: string) =>
    `صفحه ${page} از ${pageCount}`,
} as const;
