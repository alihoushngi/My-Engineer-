# Mohandes Man Design System

Visual language, semantic tokens, and reusable UI primitives for the Mohandes Man frontend.

This document is the source of truth for appearance. Architecture, routing, and data rules remain in [ARCHITECTURE.md](ARCHITECTURE.md).

## Design Principles

The interface is modern, minimal, premium, and calm. It should feel trustworthy for a professional platform that connects customers, engineers, contractors, and specialists.

- **Persian-first and RTL-first.** Kalameh (FaNum), comfortable line heights, and logical CSS (`start` / `end`, `ps` / `pe`, `ms` / `me`) are the default.
- **Mobile-first.** Touch targets, readable type, and sheets/drawers are designed for small screens first.
- **Whitespace and hierarchy.** Prefer spacing, type, and contrast over decoration.
- **Restrained surfaces.** Cards use a light border, not heavy shadows. Pills are for tags, chips, badges, and selected filters — not generic cards.
- **Restrained glassmorphism.** Frosted surfaces are allowed only for floating search, sticky navigation, selected overlays, hero overlays, and modal/sheet treatment. Do not apply glass to every card, form, section, or button.

## Tokens

All important visual decisions live in `css/globals.css` as CSS custom properties, then mapped into Tailwind through `@theme inline`.

Components must use semantic utilities such as `bg-primary`, `text-muted-foreground`, and `border-border`. Do not style product UI with raw palette classes such as `bg-blue-500` or `text-gray-600`.

### Background and text

| Token          | Responsibility |
| -------------- | -------------- |
| `--background` | Page canvas    |
| `--foreground` | Default text   |

### Surfaces

| Token                | Responsibility              |
| -------------------- | --------------------------- |
| `--surface`          | Default raised surface      |
| `--surface-elevated` | Overlay/popover surface     |
| `--surface-muted`    | Subtle inset or empty areas |

### Brand and interaction

| Token                                    | Responsibility                       |
| ---------------------------------------- | ------------------------------------ |
| `--primary` / `--primary-foreground`     | Primary actions and emphasis         |
| `--secondary` / `--secondary-foreground` | Quiet alternative actions            |
| `--accent` / `--accent-foreground`       | Hover, selected, and highlight fills |
| `--muted` / `--muted-foreground`         | Secondary text and quiet fills       |
| `--ring`                                 | Focus ring                           |

### Borders and inputs

| Token                | Responsibility                  |
| -------------------- | ------------------------------- |
| `--border`           | Default separators and outlines |
| `--border-strong`    | Stronger division when needed   |
| `--input`            | Input border                    |
| `--input-background` | Input fill                      |

### Status

| Token                                | Responsibility                 |
| ------------------------------------ | ------------------------------ |
| `--success` / `--success-foreground` | Positive status                |
| `--warning` / `--warning-foreground` | Caution                        |
| `--danger` / `--danger-foreground`   | Errors and destructive actions |
| `--info` / `--info-foreground`       | Neutral informational status   |

### Overlay and glass

| Token                          | Responsibility       |
| ------------------------------ | -------------------- |
| `--card` / `--card-foreground` | Card surface         |
| `--overlay`                    | Modal/sheet backdrop |
| `--glass-background`           | Frosted fill         |
| `--glass-border`               | Frosted edge         |
| `--glass-shadow`               | Frosted elevation    |

`--destructive` aliases `--danger` so shared primitive internals stay on the same semantic color.

Dark values exist on `.dark` for a future theme. Dark mode is not a product feature yet. Do not scatter `dark:` color overrides inside primitives.

## Changing Brand Colors

Change brand appearance in **one place**: the `:root` (and later `.dark`) block in `css/globals.css`.

1. Edit `--primary`, `--primary-foreground`, `--accent`, and related semantic tokens.
2. Do not edit individual components to retheme the app.
3. Tailwind color utilities (`bg-primary`, `text-primary-foreground`, …) read those variables through `@theme inline`.

If a component needs a raw color class to look correct, the component is wrong — move the value into a token.

## Typography

Kalameh (FaNum) is the application font, loaded from `fonts/_Woff2` via `next/font/local`. It includes Persian digits. Named roles are enough; do not invent a large font-size utility set. Do not load Vazirmatn or other webfonts from Google.

Use `type-*` utilities for the type scale (`type-body`, `type-h1`, …). Do not use `text-body` or `text-h1` next to color classes such as `text-primary-foreground`. Both share the `text-` prefix, so `cn()` / `tailwind-merge` can drop the color.

| Role    | Utility        | Notes                       |
| ------- | -------------- | --------------------------- |
| display | `type-display` | Hero/display headings       |
| h1      | `type-h1`      | Page titles                 |
| h2      | `type-h2`      | Section titles              |
| h3      | `type-h3`      | Subsections                 |
| h4      | `type-h4`      | Card and dialog titles      |
| body-lg | `type-body-lg` | Introductions               |
| body    | `type-body`    | Default reading text (16px) |
| body-sm | `type-body-sm` | Supporting text (15px)      |
| caption | `type-caption` | Metadata (13px minimum)     |
| label   | `type-label`   | Form labels                 |

Persian body text should stay at 16px or above. Avoid 12px UI copy. Numbers, phone numbers, and codes can use `ltr-data` as a nested LTR island.

## Spacing

Use Tailwind spacing. Prefer the 4px rhythm. Avoid arbitrary values unless a layout truly needs them.

| Context             | Default                              |
| ------------------- | ------------------------------------ |
| Page inline padding | `--space-page-x` (`px-4`, `sm:px-6`) |
| Section stack       | `--space-section-y`                  |
| Card padding        | `--space-card` / primitive `p-5`     |
| Label to control    | `gap-2`                              |
| Fields in a form    | `gap-4`                              |

## Containers

Do not invent a new max-width per page.

| Utility            | Use                         |
| ------------------ | --------------------------- |
| `container-app`    | Standard application pages  |
| `container-narrow` | Long-form reading           |
| `container-form`   | Auth and registration forms |
| `container-wide`   | Dense listings              |

## Radius

| Token           | Use                                         |
| --------------- | ------------------------------------------- |
| `--radius-sm`   | Controls, badges inner details              |
| `--radius-md`   | Buttons, inputs, small surfaces             |
| `--radius-lg`   | Cards, dialogs, sheets                      |
| `--radius-xl`   | Large marketing surfaces                    |
| `--radius-full` | Tags, chips, selected filters, small badges |

Do not make every card a pill.

## Elevation

Prefer `border + shadow-xs/sm`. Use `shadow-md` / `shadow-lg` for dialogs, sheets, floating surfaces, and overlays.

## Glassmorphism

Use `.glass-surface` only for floating or overlay treatments listed in Design Principles. It is prohibited as the default look of cards, forms, sections, or buttons.

## Motion

Motion communicates state: hover, focus, open/close, expand/collapse. Timing tokens are `--duration-fast`, `--duration-normal`, `--duration-slow`, and `--ease-standard`. `prefers-reduced-motion` is respected globally.

## Components

Primitives live in `components/ui/<componentName>/<componentName>.tsx`.

| Primitive                               | Intended use                                                                                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button                                  | Primary actions, secondary, outline, ghost, danger, link                                                                                             |
| Input / Textarea / Label                | Form controls. `type="tel"` converts Persian/Arabic digits to Latin.                                                                                 |
| Checkbox / RadioGroup / Select / Switch | Choice controls                                                                                                                                      |
| Field                                   | Label, required mark, description, hint, error                                                                                                       |
| OtpInput                                | One-time code. Pass `length` at the call site. Fill and delete are always left-to-right. Persian/Arabic digits are converted to Latin before submit. |
| FileUpload                              | Generic file picker visual; no upload API                                                                                                            |
| Badge                                   | Status, verification, metadata                                                                                                                       |
| Avatar                                  | Image with fallback initials                                                                                                                         |
| Card                                    | Light composable surface                                                                                                                             |
| Separator                               | Visual division                                                                                                                                      |
| Skeleton / Spinner / Progress           | Loading and completion                                                                                                                               |
| Alert                                   | Info, success, warning, error                                                                                                                        |
| Empty                                   | Generic empty result with optional action                                                                                                            |
| Dialog                                  | Accessible modal                                                                                                                                     |
| Sheet                                   | Side surface                                                                                                                                         |
| Drawer                                  | Mobile bottom sheet                                                                                                                                  |
| Accordion                               | Progressive disclosure                                                                                                                               |
| Tabs                                    | In-page panels                                                                                                                                       |
| Tooltip                                 | Short labeling for icon-only controls                                                                                                                |
| Popover                                 | Lightweight anchored content                                                                                                                         |
| DropdownMenu                            | Action menus                                                                                                                                         |

## Component Rules

- Use semantic tokens. No raw brand colors in reusable components.
- `components/ui` contains primitives only. No domain cards, headers, wizards, or page sections.
- Keep accessibility: semantic HTML, keyboard support, `focus-visible`, disabled and invalid states, labels, and 44px-class touch targets on default controls.
- RTL-first: logical properties, DirectionProvider at the app root, LTR islands only for codes/numbers/OTP.
- Mobile-first: default sizes are usable with a thumb.
- Variants stay small. Prefer composition over new visual variants.
- shadcn/ui may supply accessible behavior. Project folder naming and Mohandes Man tokens override shadcn defaults. Do not add every shadcn component. Review generated source before keeping it.
- Do not install another complete UI framework.

## Development preview

In local development, `/dev/design-system` showcases tokens and primitives with neutral sample content. The route is not linked in product navigation and returns 404 in production builds.
