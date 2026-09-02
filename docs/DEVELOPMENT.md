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

## Development

```bash
pnpm dev
```

The App Router application starts in development mode.

## Production build

```bash
pnpm build
pnpm start
```

`pnpm build` creates an optimized production build. `pnpm start` serves that build.

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

Primitives belong in `components/ui/` only. They must not contain domain logic.

## Adding a utility

```text
lib/utils/example/example.ts
```

Each lib module gets its own kebab-case folder. Do not put files directly in `lib/`.

## RTL development

- The root document is `lang="fa"` and `dir="rtl"`.
- Components should not set `dir` or force RTL unless a nested island must be LTR.
- Prefer logical CSS (`ms`, `me`, `ps`, `pe`, `start`, `end`) over `left` / `right`.
- Body text uses Vazirmatn through `--font-vazirmatn`.

Docker usage is documented in [DOCKER.md](DOCKER.md).
