# Progressive Web App

Mohandes Man uses the native Next.js App Router manifest and a small explicit
service worker. There is no PWA wrapper dependency. PWA features are progressive:
the application remains a normal SSR website when service workers are unavailable
or registration fails.

## Implementation map

| Concern                      | Location                                                |
| ---------------------------- | ------------------------------------------------------- |
| Web app manifest             | `app/manifest.ts`                                       |
| Service worker               | `public/sw.js`                                          |
| Registration client boundary | `components/common/pwaRegistration/pwaRegistration.tsx` |
| Root metadata                | `app/layout.tsx`                                        |
| Offline route                | `app/(shop)/offline/page.tsx`                           |
| iPhone guide                 | `app/(shop)/install/iphone/page.tsx`                    |
| Icons                        | `public/icons/`                                         |
| Standalone asset copy        | `scripts/prepare-standalone.mjs`                        |

The root layout remains a Server Component. The registration component returns no
UI and uses browser APIs only after hydration in production. Registration is
limited to secure contexts, with localhost permitted for production testing.

## Manifest and icons

Next.js serves `app/manifest.ts` at `/manifest.webmanifest`. It declares a root
scope and start URL, standalone display, Persian RTL direction, Task 17 brand
colors, and normal plus maskable icons.

The checked-in PNG icons are derived from the application’s existing brand mark.
Their editable SVG sources and replacement specifications are described in
[PWA-ASSET-PLAN.md](PWA-ASSET-PLAN.md).

## Cache strategy

The cache version is declared at the top of `public/sw.js`. Cache names use the
`mohandes-man-*-vN` format.

- `/_next/static/*`, local icons, and local public images use cache-first. These
  are build/static assets and are safe to reuse.
- A small allowlist of public document routes uses network-first. Only successful
  same-origin HTML responses without `private`, `no-store`, or `Set-Cookie` are
  persisted. URL query variants are not cached.
- Unknown pages and requests are network-only by default.
- `/api/*` is never intercepted or cached.
- Non-GET requests, range requests, requests with an Authorization header, and
  cross-origin requests are never intercepted or cached.
- `/expert-registration`, `/engineer`, and every descendant are network-only.
  If an offline document navigation fails, the worker may display `/offline`,
  but it never stores private panel, registration, or request responses.

OTP values, mobile numbers, national IDs, uploaded documents, request bodies,
tokens, and private responses are never persisted by the worker. Background Sync
is not used.

## Offline behavior

`/offline` is precached during service-worker installation. A failed allowlisted
public navigation first tries an exact previously cached page and otherwise uses
the offline page. Static resources already cached may remain available.

This is deliberately not full offline support. Search, APIs, new dynamic server
content, OTP, uploads, and registration submissions require a network connection.
Nothing is queued and no success state is fabricated.

## Updates and cache versions

The worker calls `skipWaiting()` after a successful precache, claims clients on
activation, and deletes obsolete Mohandes Man caches. It does not force-reload an
active form. The registration component checks for an update after registration
and whenever the document becomes visible.

When cache rules or precached content change, increment `CACHE_VERSION` in
`public/sw.js`. Test both a fresh install and an upgrade from the previous version.
Never reuse an old version name for different cache semantics.

## Standalone build and local production test

`pnpm build` creates the Next.js standalone server and then copies `public/` and
`.next/static/` into `.next/standalone/`. This is required when launching the
standalone server outside the Docker image.

```bash
pnpm build
HOSTNAME=127.0.0.1 PORT=3000 pnpm start
```

The Dockerfile already copies the standalone server, `public/`, and
`.next/static/` into the runtime image, so its deployment strategy remains valid.
Production deployments must use HTTPS for service-worker support.

## Chrome DevTools checklist

Use a production build on HTTPS or localhost.

1. In **Application → Manifest**, verify name, short name, root start URL and
   scope, standalone display, `fa`/RTL, theme/background colors, and all normal
   and maskable icons.
2. In **Application → Service Workers**, verify `/sw.js` is activated and controls
   `/`. Unregister it, reload, and confirm a fresh registration succeeds.
3. In **Application → Cache Storage**, verify versioned static/page caches. Confirm
   that no API, OTP, registration, upload, or authorization data exists.
4. Visit Home and another public page, enable **Network → Offline**, then test a
   visited page, an unvisited dynamic page, `/offline`, and a registration route.
5. Restore networking and verify server-rendered and dynamic routes still update.

## iPhone checklist

On a real iPhone, open the production site in Safari and follow
`/install/iphone`. Confirm Add to Home Screen is present, the name and icon are
correct, launch is standalone, RTL navigation is intact, the header/notch and
bottom/home-indicator areas are unobstructed, close/reopen works, and the offline
experience is honest. Confirm registration cannot submit, queue, or report
success while offline.

See [IPHONE-INSTALL-GUIDE-ASSETS.md](IPHONE-INSTALL-GUIDE-ASSETS.md) for optional
real-device screenshot specifications.

## Troubleshooting

- **Worker does not register:** use HTTPS or localhost, check `/sw.js` returns
  JavaScript with a root scope, then unregister old workers and reload.
- **Old UI remains:** increment `CACHE_VERSION`, deploy `sw.js` with its no-cache
  response header, close/reopen installed clients, and inspect Cache Storage.
- **Install option is absent on iPhone:** open the site in Safari, not an in-app
  browser; iOS does not expose Chromium’s automatic install prompt.
- **Standalone assets return 404:** run `pnpm build` (or
  `pnpm prepare:standalone`) before `pnpm start` and confirm both copied asset
  directories exist.
- **Precache install fails:** check every URL in `PRECACHE_URLS` returns `200` in
  the deployed build.
