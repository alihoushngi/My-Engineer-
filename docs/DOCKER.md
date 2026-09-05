# Docker Guide

How to build and run the Mohandes Man frontend with Docker.

This repository is frontend-only. The Docker setup does not include a database, Redis, backend, or nginx.

## Prerequisites

- Docker
- Docker Compose

## Environment

`NEXT_PUBLIC_API_BASE_URL` is the API origin. Use an origin only, with no trailing slash.

Because this value is a `NEXT_PUBLIC_*` variable, Next.js inlines it at **image build** time. Changing it later requires rebuilding the image.

Create `.env.local` for local pnpm work, or pass the value when building/running Docker:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Do not put secrets in the image. `.dockerignore` excludes `.env` files.

## Build Image

```bash
docker build --build-arg NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_BASE_URL" -t mohandes-man-frontend .
```

## Run Container

```bash
docker run --rm -p 3000:3000 mohandes-man-frontend
```

The app listens on port 3000.

## Docker Compose

From the repository root:

```bash
docker compose up
```

Rebuild the image and start:

```bash
docker compose up --build
```

Compose reads `NEXT_PUBLIC_API_BASE_URL` from the environment or an `.env` file next to `compose.yaml`. Remember that the public API URL is applied at build time.

## Stop

```bash
docker compose down
```

## Logs

Follow compose logs:

```bash
docker compose logs -f frontend
```

Follow a one-off container named `mohandes-man-frontend`:

```bash
docker logs -f <container-id>
```

## Rebuild

Rebuild when any of these change:

- application source
- `package.json` / `pnpm-lock.yaml`
- `NEXT_PUBLIC_API_BASE_URL`

```bash
docker compose up --build
```

## Production Image

The `Dockerfile` is a multi-stage production build:

1. Install dependencies with pnpm and the committed lockfile.
2. Build Next.js with `output: "standalone"`.
3. Copy the standalone server, static assets, and `public/` into a small Node 22 Alpine image.

This also deploys `/sw.js`, the generated manifest route, PWA icons, and the
offline page assets. The local `pnpm build` command performs the equivalent asset
copy inside `.next/standalone/`; Docker keeps its explicit copy steps as a
deployment safeguard.

The runtime container does not include the full `node_modules` tree.

## Local pnpm vs Docker

You can work either way:

- **Local pnpm:** `pnpm install` then `pnpm dev`. Use this for day-to-day UI work. Hot reload is available.
- **Docker:** `docker compose up --build`. Use this to run the production image locally. There is no dev hot reload in this Compose file.

Do not mix the two in the same workflow. Docker does not replace `pnpm install` for local development.
