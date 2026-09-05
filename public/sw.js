/* Mohandes Man service worker — public, non-sensitive resources only. */
const CACHE_VERSION = "v2";
const CACHE_PREFIX = "mohandes-man";
const STATIC_CACHE = `${CACHE_PREFIX}-static-${CACHE_VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}-pages-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-192.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
];

const PUBLIC_PAGE_PATHS = new Set([
  "/",
  "/about",
  "/articles",
  "/faq",
  "/install/iphone",
  "/knowledge",
  OFFLINE_URL,
  "/privacy-policy",
  "/terms",
]);

const PUBLIC_PAGE_PREFIXES = [
  "/articles/",
  "/experts/",
  "/faq/",
  "/knowledge/",
  "/services/",
];

const SENSITIVE_PATH_PREFIXES = ["/expert-registration", "/engineer"];

function isSensitivePath(pathname) {
  return SENSITIVE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isPublicPage(pathname) {
  return (
    PUBLIC_PAGE_PATHS.has(pathname) ||
    PUBLIC_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function isCacheableDocument(response) {
  const cacheControl = response.headers.get("cache-control") || "";
  const contentType = response.headers.get("content-type") || "";

  return (
    response.ok &&
    response.type === "basic" &&
    contentType.includes("text/html") &&
    !response.headers.has("set-cookie") &&
    !/(private|no-store)/i.test(cacheControl)
  );
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);

  try {
    const response = await fetch(request);
    if (isCacheableDocument(response)) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await cache.match(request)) || (await caches.match(OFFLINE_URL));
  }
}

async function cacheFirstStatic(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && response.type === "basic") {
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((names) =>
          Promise.all(
            names
              .filter(
                (name) =>
                  name.startsWith(`${CACHE_PREFIX}-`) &&
                  name !== STATIC_CACHE &&
                  name !== PAGE_CACHE,
              )
              .map((name) => caches.delete(name)),
          ),
        ),
      self.registration.navigationPreload?.enable(),
    ]).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (
    request.method !== "GET" ||
    request.headers.has("authorization") ||
    request.headers.has("range")
  ) {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    if (isSensitivePath(url.pathname)) {
      event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
      return;
    }

    if (url.search === "" && isPublicPage(url.pathname)) {
      event.respondWith(networkFirstPage(request));
    }
    return;
  }

  const isNextStatic = url.pathname.startsWith("/_next/static/");
  const isPublicAsset =
    url.pathname.startsWith("/icons/") || url.pathname.startsWith("/images/");

  if (url.search === "" && (isNextStatic || isPublicAsset)) {
    event.respondWith(cacheFirstStatic(request));
  }
});
