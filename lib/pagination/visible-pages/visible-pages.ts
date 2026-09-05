export type PaginationToken =
  { type: "page"; page: number } | { type: "ellipsis"; key: "start" | "end" };

export function getVisiblePages(
  page: number,
  pageCount: number,
): PaginationToken[] {
  const count = Math.max(1, pageCount);
  const current = Math.min(Math.max(1, page), count);

  if (count <= 7) {
    return Array.from({ length: count }, (_, index) => ({
      type: "page",
      page: index + 1,
    }));
  }

  const tokens: PaginationToken[] = [{ type: "page", page: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(count - 1, current + 1);

  if (start > 2) {
    tokens.push({ type: "ellipsis", key: "start" });
  } else {
    for (let item = 2; item < start; item += 1) {
      tokens.push({ type: "page", page: item });
    }
  }

  for (let item = start; item <= end; item += 1) {
    tokens.push({ type: "page", page: item });
  }

  if (end < count - 1) {
    tokens.push({ type: "ellipsis", key: "end" });
  } else {
    for (let item = end + 1; item < count; item += 1) {
      tokens.push({ type: "page", page: item });
    }
  }

  tokens.push({ type: "page", page: count });

  return tokens;
}
