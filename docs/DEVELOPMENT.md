# Development Guide

Practical setup and contribution guide for the Mohandes Man frontend.

## Requirements

- Node.js 22 or later (see `.nvmrc`)
- pnpm 11 or later

This repository uses pnpm only. Do not use npm or yarn to install or run scripts.

pnpm 11 reads project settings from `pnpm-workspace.yaml`. This repository sets `verifyDepsBeforeRun: false` so `pnpm dev`, `pnpm lint`, and other scripts do not auto-run install. After pulling lockfile or `package.json` changes, run `pnpm install` yourself.

Confirm versions:

```bash
node -v
pnpm -v
```

## Installation

```bash
pnpm install
```

## Environment setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

### `NEXT_PUBLIC_API_BASE_URL`

Public API origin used by the application. Set an origin only, with no trailing slash.

Examples:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Leave it empty until the API environment is available. Do not hardcode production or test URLs in source code. Read the value through `lib/env/env.ts`. The HTTP client in `lib/api/http-client/http-client.ts` uses this origin.

`.env.local` is gitignored. `.env.example` is tracked and must not contain secrets.

Development mock engineer login/registration is documented in
[MOCK-AUTH.md](MOCK-AUTH.md). Do not enable it in production.

## Development

```bash
pnpm dev
```

The App Router application starts in development mode.

A development-only design system preview is available at `/dev/design-system`. It is not linked in product navigation and returns 404 in production builds. Visual rules are documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Production build

```bash
pnpm build
HOSTNAME=127.0.0.1 PORT=3000 pnpm start
```

`pnpm build` creates the standalone production server and copies `public/` and
`.next/static/` into `.next/standalone/`. `pnpm start` launches that standalone
server; it does not use `next start`. See [PWA.md](PWA.md) for service-worker and
offline validation.

## Lint

```bash
pnpm lint
```

ESLint uses `eslint-config-next` plus `eslint-config-prettier` so formatting rules do not conflict with Prettier.

## TypeScript check

```bash
pnpm typecheck
```

This runs `tsc --noEmit` with strict TypeScript.

## Formatting

Format the repository:

```bash
pnpm format
```

Check formatting without writing files:

```bash
pnpm format:check
```

## Installing dependencies

Add a runtime dependency:

```bash
pnpm add <package>
```

Add a development dependency:

```bash
pnpm add -D <package>
```

Remove a package:

```bash
pnpm remove <package>
```

Update dependencies:

```bash
pnpm update
```

### Lockfile

`pnpm-lock.yaml` is the source of truth for installed versions. Commit it. Do not delete it to “fix” install issues unless you are intentionally regenerating the lockfile.

## Clean/reinstall dependencies

Safe commands for a fresh install:

```bash
rm -rf node_modules .next
pnpm install
```

If the lockfile is intact, this restores the same dependency tree. Do not delete `pnpm-lock.yaml` unless you intend to regenerate it.

## Project structure

| Location             | What belongs here                                                    |
| -------------------- | -------------------------------------------------------------------- |
| `app/`               | Routes, layouts, loading/error boundaries, and thin page composition |
| `app/(auth)/`        | Auth route group                                                     |
| `app/(shop)/`        | Shop route group                                                     |
| `app/api/`           | Next.js Route Handlers                                               |
| `components/ui/`     | Design-system primitives only                                        |
| `components/layout/` | Header, footer, navigation, search shell, and other chrome           |
| `components/common/` | Reusable UI that is not a primitive and not domain-specific          |
| `components/store/`  | Store/domain feature UI                                              |
| `hooks/`             | Reusable React hooks                                                 |
| `lib/`               | Pure utilities, helpers, and API infrastructure                      |
| `services/`          | Domain API access and external integrations                          |
| `types/store/`       | Shared store/domain types                                            |
| `config/`            | Static application configuration                                     |
| `providers/`         | React providers                                                      |
| `css/`               | Global styles only                                                   |
| `i18n/`              | Localization files (not implemented in this phase)                   |
| `public/`            | Static assets                                                        |
| `docs/`              | Project documentation                                                |

There is no `src/` directory. Do not create one.

## Naming conventions

### Components

Folders and files under `components/` use camelCase.

```text
components/store/cartDrawer/cartDrawer.tsx
components/store/cartDrawer/type/cartDrawer.types.ts
components/store/cartDrawer/test/cartDrawer.test.tsx
components/layout/storeHeader/storeHeader.tsx
components/ui/button/button.tsx
```

Exports use PascalCase:

```tsx
export function CartDrawer() {}
export function StoreHeader() {}
export function Button() {}
```

Do not use kebab-case component filenames. Do not create `index.ts` files for components.

### Hooks

Each hook gets its own kebab-case folder. Do not place hook files directly in `hooks/`.

```text
hooks/use-cart/use-cart.ts
hooks/use-auth/use-auth.ts
```

### Lib

Each lib module gets its own kebab-case folder.

```text
lib/api/http-client/http-client.ts
lib/utils/cn/cn.ts
lib/utils/to-latin-digits/to-latin-digits.ts
```

### Providers

```text
providers/query-provider/query-provider.tsx
providers/app-provider/app-provider.tsx
```

### Config

```text
config/site.config/site.config.ts
config/menu.config/menu.config.ts
```

### Services

```text
services/auth-service/auth-service.ts
services/user-service/user-service.ts
```

### Types

Shared store/domain types:

```text
types/store/*.types.ts
```

Feature/component-specific types stay next to the component:

```text
components/store/cartDrawer/type/cartDrawer.types.ts
```

### Routes

Routes use kebab-case. Dynamic segments use `[id]`. Route groups are `(auth)` and `(shop)`.

```text
app/(auth)/sign-in/page.tsx
app/(auth)/verify-otp/page.tsx
app/(shop)/engineers/[id]/page.tsx
```

## Creating a new component

Create the component in the correct family folder (`ui`, `layout`, `common`, or `store`).

Example — a store feature component:

```text
components/store/engineer/engineerCard/engineerCard.tsx
components/store/engineer/engineerCard/type/engineerCard.types.ts
```

```tsx
import { cn } from "@/lib/utils/cn/cn";
import { type EngineerCardProps } from "@/components/store/engineer/engineerCard/type/engineerCard.types";

export function EngineerCard({ className, children }: EngineerCardProps) {
  return <article className={cn(className)}>{children}</article>;
}
```

Import it from a thin route:

```tsx
import { EngineerCard } from "@/components/store/engineer/engineerCard/engineerCard";
```

## Creating a new hook

```text
hooks/use-cart/use-cart.ts
```

```ts
export function useCart() {
  throw new Error("Not implemented");
}
```

## Creating a new service

```text
services/user-service/user-service.ts
```

```ts
import { httpGet } from "@/lib/api/http-client/http-client";

export async function getUser(userId: string): Promise<unknown> {
  return httpGet(`/users/${userId}`);
}
```

Do not hardcode the API origin. Do not invent endpoints in this phase; this example only shows the service shape.

## Creating a new route

Keep the page thin. Put UI in `components/`.

```text
app/(shop)/engineers/[id]/page.tsx
```

```tsx
import { EngineerCard } from "@/components/store/engineer/engineerCard/engineerCard";

type EngineerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EngineerPage({ params }: EngineerPageProps) {
  const { id } = await params;

  return <EngineerCard />;
}
```

The `id` argument is shown only to illustrate the route contract. Do not invent product data in route files.

## Adding a UI primitive

```text
components/ui/button/button.tsx
```

Primitives belong in `components/ui/` only. They must not contain domain logic. Follow [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for tokens, variants, and accessibility.

## Adding a utility

```text
lib/utils/example/example.ts
```

Each lib module gets its own kebab-case folder. Do not put files directly in `lib/`.

## RTL development

- The root document is `lang="fa"` and `dir="rtl"`.
- Components should not set `dir` or force RTL unless a nested island must be LTR.
- Prefer logical CSS (`ms`, `me`, `ps`, `pe`, `start`, `end`) over `left` / `right`.
- Body text uses local Kalameh (FaNum) through `--font-kalameh`.

## Implementation Notes / Business Decision Required

Registration wizard (Tasks 08–10):

- **API CONTRACT REQUIRED.** OTP, catalogs, persistence, uploads, and final submit have no documented endpoints. Service functions throw a typed `ApiError` (`code: "unavailable"`) and the UI shows an integration error instead of fake success. Domain services still must not invent URLs or response shapes.
- **HTTP errors.** `lib/api/http-client` classifies network, timeout, abort, validation, unauthorized, forbidden, not found, and server failures as `ApiError`. `toUserErrorMessage` maps those codes to Persian copy and never surfaces env var names, status-line dumps, or English stack text.
- **Refresh recovery.** Committed wizard state is in-memory only. Missing prerequisites redirect to the first valid step. Do not persist national ID, OTP, or files in `localStorage` or the URL.
- **Step 5 location fields.** Omitted until product decides whether they duplicate Step 3, represent birth place, or stay.
- **Step 7 ترافیک / شهرسازی.** Discipline options exist in source; qualification options do not. The UI shows an info state and does not invent qualifications.
- **Step 9 min/max images.** Not defined in source. Images are optional on the client; `accept_rules` is required.
- **Completion destination.** `/expert-registration/complete` is the in-wizard success screen. Home is offered as a canonical exit. Pending-review vs login vs profile is still **BUSINESS DECISION REQUIRED**.
- **Articles / FAQ / knowledge.** No content API and no employer copy in this repository. Listing pages render empty states. Unknown category/article slugs call `notFound()`. Do not copy legacy demo UTM cards or invent FAQ/knowledge taxonomies.
- **Engineering forms (`/engineering-forms`).** Reserved in IA and still **NEEDS CONFIRMATION**. Legacy `knowledge/forms.html` is a stub with no files or metadata. The route is not implemented. Do not invent categories, downloads, or calculators.
- **Legal / about copy.** `/about`, `/terms`, and `/privacy-policy` use employer text from the legacy about-us HTML. Do not invent statistics, certifications, or extra legal clauses.
- **Privacy contact.** Source support email is incomplete (`@info-mohandeseman`) and is shown as-is. A complete address is a **legal/business requirement**. Phone and Rasht office address are from the same source.
- **Legal-implied product surfaces.** Terms/privacy mention accounts, passwords, optional platform fees / «پرداخت امن», complaint intake, account deletion, user panel edit, and cookies. Those product surfaces remain **BUSINESS DECISION REQUIRED** and are not built from this copy.
- **Service listing.** `/services/[slug]` validates known slugs and `notFound()` otherwise. Expert results are empty until a listing API exists. Do not invent specialists to hide that empty state.
- **Public metadata.** Titles, descriptions, and canonicals use existing copy. The root title template appends the site name. Search and expert-registration are `noindex`. `app/robots.ts` disallows `/expert-registration` and `/dev`. Do not invent a production origin or sitemap until the public site URL is known.
- **Fonts.** Kalameh (FaNum) is loaded locally at weights 400–700, matching the type scale. Do not load Vazirmatn or Google Fonts.

Docker usage is documented in [DOCKER.md](DOCKER.md).
