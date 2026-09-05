export function parsePageParam(
  value: string | string[] | undefined | null,
): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw ?? "", 10);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

export function buildPageHref(
  pathname: string,
  page: number,
  currentParams?: URLSearchParams | string,
): string {
  const params = new URLSearchParams(
    typeof currentParams === "string"
      ? currentParams
      : (currentParams?.toString() ?? ""),
  );

  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const serialized = params.toString();

  return serialized === "" ? pathname : `${pathname}?${serialized}`;
}

export function resetPageParams(
  currentParams?: URLSearchParams | string,
): URLSearchParams {
  const params = new URLSearchParams(
    typeof currentParams === "string"
      ? currentParams
      : (currentParams?.toString() ?? ""),
  );
  params.delete("page");
  return params;
}
