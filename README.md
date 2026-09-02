# Mohandes Man Frontend

Customer-facing storefront for **Mohandes Man** (مهندس من), rebuilt as a modern Next.js App Router frontend.

This is a **Persian, RTL**, API-driven frontend. Development is organized into phases. Product screens and business features are not implemented yet.

## Current Phase

**Phase 0 — Foundation, plus design-system primitives**

- Next.js App Router, TypeScript, Tailwind CSS, ESLint, and Prettier
- Folder architecture and naming conventions
- Persian RTL root layout and local Kalameh (FaNum)
- Native fetch HTTP client and TanStack Query provider
- Docker production image and Compose
- Semantic design tokens and reusable UI primitives

Later phases will add product routes, domain UI, and API integration. Do not treat empty folders as implemented features.

## Technology stack

| Area            | Choice                |
| --------------- | --------------------- |
| Framework       | Next.js (App Router)  |
| UI library      | React 19              |
| Language        | TypeScript (strict)   |
| Styling         | Tailwind CSS          |
| Package manager | pnpm only             |
| Server state    | TanStack Query        |
| Forms           | React Hook Form + Zod |
| Icons           | lucide-react          |
| HTTP            | native fetch          |
| Linting         | ESLint                |
| Formatting      | Prettier              |
| Runtime         | Node.js 22, Docker    |

Do not add Redux, Zustand, Material UI, Ant Design, Chakra UI, or Bootstrap. shadcn/ui may be used for accessible primitives; project architecture and Mohandes Man tokens override its defaults.

## High-level architecture

Routes live in `app/` and stay thin. Route files compose domain UI; they do not own it.

- **Server Components by default.** Add `"use client"` only when browser APIs, event handlers, or React state/effects are required.
- **Domain UI** lives under `components/store/`.
- **Design-system primitives** live under `components/ui/`.
- **Application chrome** lives under `components/layout/`.
- **API access** lives under `services/`.
- **Pure helpers** live under `lib/`.
- **React providers** live under `providers/`.
- **Shared domain types** live under `types/`.

Path alias `@/*` points at the project root. There is no `src/` directory.

```
app/            routes, layouts, loading/error boundaries
components/     UI, grouped by layout / ui / common / store
config/         static application configuration
hooks/          reusable React hooks
lib/            pure utilities and framework-independent helpers
providers/      React context providers
services/       API and external integrations
types/          shared cross-feature types
i18n/           localization (not implemented in this phase)
css/            global styles only
public/         static assets
docs/           project documentation
```

## Main architectural conventions

- Never create `src/`.
- Never create `index.ts` barrel files.
- Pages stay thin and compose components from `components/`.
- Component folders and files use camelCase; component exports use PascalCase.
- `hooks/`, `lib/`, `providers/`, `config/`, and `services/` use kebab-case folders and files.
- Routes use kebab-case. Route groups are `(auth)` and `(shop)`.
- Do not place domain screens in `components/ui/`.
- Do not hardcode API base URLs. Read `NEXT_PUBLIC_API_BASE_URL` from the environment.
- Use native fetch through `lib/api/http-client`. Do not add Axios.
- The application is Persian and RTL (`lang="fa"`, `dir="rtl"`).

## Development principles

- Prefer readable, maintainable code over clever abstractions.
- Keep functions and files small. Keep components under 150 lines.
- Reuse existing modules before adding new ones.
- Do not install dependencies unless there is a clear need.
- Validate input at API boundaries with Zod when forms and requests are implemented.
- Keep TypeScript strict. Do not use `any` unless a documented technical reason exists.

## Environment configuration

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_API_BASE_URL=
```

This value is the API origin only. Do not commit secrets. See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup commands.

## Documentation

- [Developer guide](docs/DEVELOPMENT.md)
- [Architecture rulebook](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Docker guide](docs/DOCKER.md)
- Cursor architecture rules: `.cursor/rules/project-architecture.mdc`
