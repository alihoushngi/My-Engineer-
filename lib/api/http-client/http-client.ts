import { env } from "@/lib/env/env";
import { ApiError, apiErrorFromResponse } from "@/lib/api/api-error/api-error";

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type NextFetchOptions = {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type HttpRequestOptions<TBody = unknown> = {
  headers?: HeadersInit;
  body?: TBody;
  query?: QueryParams;
  signal?: AbortSignal;
} & NextFetchOptions;

export async function httpGet<TResponse>(
  path: string,
  options?: Omit<HttpRequestOptions, "body">,
): Promise<TResponse> {
  return httpRequest<TResponse>("GET", path, options);
}

export async function httpPost<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("POST", path, options);
}

export async function httpPut<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("PUT", path, options);
}

export async function httpPatch<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("PATCH", path, options);
}

export async function httpDelete<TResponse>(
  path: string,
  options?: Omit<HttpRequestOptions, "body">,
): Promise<TResponse> {
  return httpRequest<TResponse>("DELETE", path, options);
}

export async function httpRequest<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: HttpRequestOptions<TBody> = {},
): Promise<TResponse> {
  const url = buildRequestUrl(path, options.query);
  const headers = new Headers(options.headers);
  const body = serializeBody(method, options.body, headers);

  const response = await fetch(url, {
    method,
    headers,
    body,
    signal: options.signal,
    cache: options.cache,
    next: options.next,
  });

  if (!response.ok) {
    throw await apiErrorFromResponse(response);
  }

  return parseSuccessBody<TResponse>(response);
}

function buildRequestUrl(path: string, query?: QueryParams): string {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, "");

  if (baseUrl === "") {
    throw new ApiError({
      status: 0,
      message: "NEXT_PUBLIC_API_BASE_URL is not configured",
    });
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  if (query) {
    appendQueryParams(url, query);
  }

  return url.toString();
}

function appendQueryParams(url: URL, query: QueryParams): void {
  for (const [key, value] of Object.entries(query)) {
    const values = Array.isArray(value) ? value : [value];

    for (const entry of values) {
      if (entry === null || entry === undefined) {
        continue;
      }

      url.searchParams.append(key, String(entry));
    }
  }
}

function serializeBody<TBody>(
  method: HttpMethod,
  body: TBody | undefined,
  headers: Headers,
): string | undefined {
  if (body === undefined || method === "GET" || method === "DELETE") {
    return undefined;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseSuccessBody<TResponse>(
  response: Response,
): Promise<TResponse> {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();

  if (text.trim() === "") {
    return undefined as TResponse;
  }

  return JSON.parse(text) as TResponse;
}
