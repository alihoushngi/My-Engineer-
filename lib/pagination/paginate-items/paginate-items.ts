export type PaginatedItems<T> = {
  items: readonly T[];
  page: number;
  pageCount: number;
  total: number;
  hasPagination: boolean;
};

export function paginateItems<T>(
  items: readonly T[],
  page: number,
  pageSize: number = 9,
): PaginatedItems<T> {
  const total = items.length;
  const safeSize = Math.max(1, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / safeSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * safeSize;

  return {
    items: items.slice(start, start + safeSize),
    page: safePage,
    pageCount,
    total,
    hasPagination: total > safeSize,
  };
}
