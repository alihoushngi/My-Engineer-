# Mohandes Man Design System

The visual system for the Persian professional-services marketplace. Architecture and API boundaries remain defined in [ARCHITECTURE.md](ARCHITECTURE.md). Tokens in `css/globals.css` are the source of truth.

## Visual direction

A Persian, image-led construction marketplace with a deep navy frame, vivid legacy-derived teal actions, steel-blue supporting surfaces, orange moments of emphasis, and warm category tints. Engineering precision comes from alignment, visible taxonomy, clear information hierarchy, and consistent spacing; the varied section composition gives the marketplace an authored editorial rhythm.

- Keep approved Persian content and render only available data.
- Design for `lang="fa"`, `dir="rtl"`, and local Kalameh FaNum.
- Prefer open sections, divided lists, editorial columns, image rails, and purpose-built result cards over generic card grids.
- Use one primary action in each task context. Supporting navigation is outline or ghost.
- Gradients are limited to legibility overlays on photography. Do not use decorative blobs or unsupported marketing statistics.
- The geometric construction mark is a code-authored SVG; interface icons use Lucide.
- Central mock fixtures are allowed only when `NEXT_PUBLIC_USE_MOCK_DATA=true`. They must remain realistic, clearly development-oriented, non-sensitive, and replaceable through service modules.

## Semantic palette

Change colors centrally in `:root`; `.dark` remains a future-theme foundation, not an exposed feature. Tailwind utilities are mapped with `@theme inline`. Do not scatter hex colors, raw palette utilities, or per-component dark overrides.

| Token                                         | Purpose                                                    |
| --------------------------------------------- | ---------------------------------------------------------- |
| `background`                                  | White page canvas                                          |
| `background-subtle`                           | Cool marketplace bands and result canvases                 |
| `surface`                                     | Form, card, header and dialog background                   |
| `surface-elevated`                            | Menus and popovers                                         |
| `surface-subtle`                              | Quiet stone bands, empty states, supporting columns        |
| `surface-muted`                               | Compatibility alias family for quiet fills                 |
| `foreground`                                  | Charcoal primary text                                      |
| `foreground-muted`, `muted-foreground`        | Legible supporting copy and metadata                       |
| `primary`                                     | Vivid teal task actions and current navigation             |
| `primary-hover`                               | Explicit darker pressed/hover action state                 |
| `primary-active`                              | Pressed teal action state                                  |
| `primary-subtle`                              | Light teal selection and identity surfaces                 |
| `primary-foreground`                          | Text on solid primary fills                                |
| `primary-deep`                                | Navy header, footer, hero, and narrative bands             |
| `primary-deep-foreground`                     | Near-white text and icons on navy surfaces                 |
| `dark-surface`, `dark-surface-foreground`     | Alias pair for navy/near-black chrome                      |
| `secondary`, `secondary-hover`                | Legacy steel-blue supporting actions and identity          |
| `secondary-subtle`                            | Pale steel-blue content bands                              |
| `accent`, `accent-hover`                      | Strong orange emphasis; white foreground on the solid fill |
| `accent-subtle`                               | Pale orange supporting surface with charcoal text          |
| `accent-foreground`                           | Near-white text on solid accent                            |
| `muted`                                       | Neutral compatibility fill                                 |
| `border`                                      | Low-emphasis separators                                    |
| `border-strong`                               | Outlined actions and stronger dividers                     |
| `input`, `input-background`                   | Clearly visible control outline and fill                   |
| `ring`                                        | Keyboard focus                                             |
| `success`                                     | Confirmed status; badges use subtle tinted fills           |
| `warning`                                     | Caution; solid warning uses white foreground               |
| `warning-strong`, `warning-strong-foreground` | Alias pair for solid amber/yellow surfaces                 |
| `danger`, `destructive`                       | Validation and destructive actions; aliases share values   |
| `info`                                        | Availability and explanatory messages                      |
| `category-*`                                  | Teal, blue, orange, violet, green, and rose taxonomy fills |
| `overlay`                                     | Modal backdrop                                             |
| `card`, `card-foreground`                     | Primitive aliases for surface and foreground               |
| `popover`, `popover-foreground`               | Elevated primitive aliases                                 |

Status foreground pairs remain available for solid status surfaces. Strong yellow, amber, orange, navy, and near-black surfaces must use a near-white foreground pair: `accent` / `accent-foreground`, `warning` / `warning-foreground`, `warning-strong` / `warning-strong-foreground`, `primary-deep` / `primary-deep-foreground`, and `dark-surface` / `dark-surface-foreground`. If a yellow or amber fill is too light for white text, darken the surface rather than keeping dark-gray copy on a strong color. Pale tints (`accent-subtle`, `category-*`) keep charcoal text. Success and verification must come from actual data; do not imply verification with decorative badges. `glass-surface` remains for chrome, overlays, and hero treatments. Home and About service-category tiles use the restrained `glass-card` utility: translucent white, light blur, and category color only on the icon.

## Typography

Keep the existing `next/font/local` Kalameh architecture, using weights 400, 500, 600 and 700. Use `type-*` utilities, not custom `text-*` typography names next to text colors: the latter can be merged incorrectly by `cn()`.

| Role       | Utility        | Mobile / larger viewports | Use                                     |
| ---------- | -------------- | ------------------------- | --------------------------------------- |
| Display    | `type-display` | 30 / 36 / 42px            | Short home heading, 1.5 line height     |
| H1         | `type-h1`      | 28 / 30px                 | Page identity, 1.5 line height          |
| H2         | `type-h2`      | 22 / 24px                 | Major sections and wizard task heading  |
| H3         | `type-h3`      | 20px                      | Profile identity cards and sub-sections |
| H4         | `type-h4`      | 18px                      | Service titles and small groups         |
| Large body | `type-body-lg` | 18px                      | Short introductions                     |
| Body       | `type-body`    | 16px                      | Reading and input text                  |
| Small body | `type-body-sm` | 15px                      | Supporting interface copy               |
| Caption    | `type-caption` | 13px                      | Metadata and compact validation         |
| Label      | `type-label`   | 15px, medium              | Persistent field labels                 |
| Button     | `type-button`  | 15px, semibold            | Actions at all sizes                    |

Headings should wrap naturally and use restrained weight. Body line height is 1.75–1.8; `prose-reading` gives legal and editorial content a 2.1 reading rhythm, heading spacing, list formatting and anchor offset below the header. Avoid tight or justified Persian paragraphs. Use `ltr-data`, `dir="ltr"`, and tabular numbers for codes, phone numbers and numerical facts.

## Layout and spacing

Use Tailwind with `cn()`. Shared dimensions remain centralized:

| Utility / token     | Size or rule                                                   |
| ------------------- | -------------------------------------------------------------- |
| `container-app`     | 76rem maximum, including gutters                               |
| `container-wide`    | 80rem, reserved for dense surfaces                             |
| `container-narrow`  | 46rem for reading                                              |
| `container-form`    | 36rem for isolated form surfaces                               |
| Page gutters        | 16px mobile, 24px from 640px (`--space-page-x`)                |
| `py-page`           | 32px mobile, 48px larger                                       |
| `py-section`        | 48px mobile, 72px larger                                       |
| Card padding        | `--space-card`: 20px mobile, 24px from 640px, 28px from 1024px |
| Touch target        | `--touch-target` 44px minimum; default buttons 48px            |
| Form fields         | 24–28px between groups, 8px label/control gap                  |
| Open section groups | 32–40px; dividers where meaningful                             |

The registration shell is capped at 64rem and uses a 17rem navy desktop progress rail. The form remains a focused white column. At small sizes the rail disappears, leaving the current step, progress bar and actual task.

Do not hide layout bugs with page-level horizontal overflow clipping. Use `min-w-0`, wrapping, responsive grids and logical inline spacing. Check 360, 390, 430, 768, 1024, 1280 and 1440px.

## Radius and elevation

- Small details: `rounded-sm` (6px).
- Buttons, inputs, list interactions: `rounded-md` (8px).
- Expert cards, media, forms, empty-state regions: `rounded-lg` (12px).
- Larger optional surfaces: `rounded-xl` (16px).
- Circles/pills are reserved for avatars, step markers, compact badges and tags.
- No default input or card shadows. Separation comes from spacing and borders.
- `shadow-md` / `shadow-lg` are for dialogs, menus and overlays.

## Engineer Workspace Patterns

The specialist workspace at `/engineer` uses the same tokens, primitives, and
typography as the public storefront. It is a denser task environment, not a
second visual identity.

- **Chrome:** navy top bar (same `primary-deep` as the public header), white
  desktop sidebar with teal active state, labelled icons, and a five-item
  mobile bottom navigation plus a bottom sheet for secondary destinations.
  The desktop shell is `min-h-dvh` with a self-stretching sidebar so the
  sidebar background reaches the viewport bottom when main content is short.
  Sticky sidebar navigation remains `max-h-dvh` for long pages. Do not put
  the public search/city/join header inside the panel.
- **Dense lists:** requests, conversations, reviews, and notifications are
  stacked rows with wrapping Persian metadata. Do not force desktop-only tables.
- **Reviews:** `/engineer/reviews` is a linked list; `/engineer/reviews/[id]`
  is the read-only detail. Engineer reply is not implemented.
- **Status:** use existing Badge variants (`success`, `warning`, `danger`,
  `info`, `outline`). Completion uses `Progress` plus a derived percent from
  registration fields, not invented analytics.
- **Management forms:** section display plus focused `Dialog` edit. Mutations
  stay pending/error/retry and never claim server success without an API.
- **Messages:** separate list and conversation routes on mobile. The composer
  stays at the bottom of the conversation pane; panel main already clears the
  bottom navigation. No realtime transport.
- **Safe area:** top bar uses `pt-[env(safe-area-inset-top)]`; bottom nav and
  message composer include `pb-[env(safe-area-inset-bottom)]`.

Private panel HTML is never cached by the service worker.

## Page patterns

### Global chrome

Compact navy sticky header, geometric wordmark, desktop navigation, discreet search/city entries, and outlined specialist join link. Active navigation has a translucent light fill and stronger text. Mobile uses a labelled full-height RTL sheet, scrollable link area, persistent join action and safe-area padding. The navy footer groups services, learning, company, and legal destinations with generous link targets.

### Home

The home page opens with a navy discovery hero and a Swiper image slider instead of one static photograph. Search, city, and specialist-join remain in the first section. Six service categories share a translucent white `glass-card` tile with About, using category color only on the icon well. The marketplace module stays the core: multi-service chips, city and expertise selects, count feedback, expert cards, client pagination when more than nine results, reset, and an intentional empty state. Popular services form a photographic grid of mapped destinations; drawing services use an open four-column consultation strip. A four-point trust band, navy “what is” narrative, specialist CTA, a single preserved testimonial, knowledge-tip slider, editorial learning grid, and FAQ category entry complete the page.

### Discovery

Search preserves URL-driven query and city behavior and exposes the same city inventory as the marketplace. Search controls form one compact task region; service matches and expert results are separate. All six service routes share one layout: photo-led service hero, scope and specialty modules, URL-driven expert filters (city, skill, experience, license, discipline, degree, and service tabs where the legacy pages had them), a compact desktop filter sheet, a mobile bottom-sheet with active chips and result count, pagination above nine results, process, preparation guidance, FAQ when real copy exists, and related-service navigation.

### Experts

Expert cards prioritize identity, profession, verification, location/experience, rating when available, a short specialties preview, and one profile action. At most three specialties appear in a result card; the remainder is counted, with full content on the profile.

Profiles open with a navy identity band: photo (enlargeable), views, verification, profession and degree, license competencies, organization membership, city/experience, rating, a free-contact line, then contact / chat / share / save actions. Chat, save, and review submission stay visible as honest unavailable sheets because those APIs do not exist. The main column keeps biography, specialties, professional information, history, certificates, service cities, software, a usable portfolio gallery (count, thumbs, previous/next, Drawer on mobile), and reviews with tags, expert replies, and pagination above nine items. A supporting column holds quick facts and contact availability. Mobile contact uses an opaque safe-area bottom action only when a valid public contact exists. Do not fabricate phone numbers or pretend a review was sent.

### Articles, FAQ and knowledge

The article hub leads with a photographic editorial feature followed by open media/text entries. Detail pages use a narrow reading column, in-flow contents navigation and generous prose. FAQ and knowledge hubs use distinct color-coded category identities; details retain divided accessible accordions and editorial entries. Related service actions require supplied destinations. Missing entities still return not-found; empty catalogs use the shared empty state.

### About and legal

About opens with a navy/photo story, then moves through an open purpose split, steel-blue origin/process band, domain discovery, and principles. Legal documents use one reading column, strong section headings, natural paragraphs and lists; never wrap individual paragraphs in cards.

### Registration

All nine steps share the same white workspace, navy desktop progress rail, progress bar, heading, form rhythm, and pending/error presentation. Existing guard rules and service operations remain authoritative. Mobile navigation keeps primary continue and secondary back side by side. Native keyboard types, visible labels, required markers, accessible descriptions and error relationships are preserved.

OTP uses five LTR cells, numeric entry, Persian-digit normalization, paste transformation, a visible active ring, edit-phone action and the existing resend cooldown. No successful API response is simulated. Completion has no automatic redirect and retains the existing explicit home link; internal product-decision notes are not displayed as user-facing success content.

## Primitives and interaction states

- `Button`: primary, secondary, outline, ghost, danger, link. Small and icon controls have at least 44px targets; normal controls are 48px, large actions 52px. Pending state preserves the button label and prevents duplicate submission.
- `Input`, `Textarea`, `Select`: visible input border, white fill, 16px input type, focus ring, disabled treatment and textual errors. Labels stay visible; placeholders are supplementary.
- `FieldError`: reserves a short line before validation and announces actual errors using `role="alert"`. Longer messages may wrap. Connect errors via `aria-describedby`.
- `Checkbox`, `RadioGroup`: label-sized targets, outlined controls, explicit selected state. Form selection rows may use a soft primary fill; color is not the only signal.
- `FileUpload`: native file picker plus drag/drop, clear label, selected-file description, disabled and error treatments. Drops notify the same form change handler and respect single/multiple selection. Accept/validation rules belong to the step. Local selection is never described as successful server upload.
- `Empty`: quiet surface, optional restrained icon, meaningful title/description and one next task. No dashed placeholder box.
- `Alert`: semantic status with title and recovery action when applicable.
- `Skeleton`: follows the page family; loading boundaries include a readable loading announcement.
- `Dialog`, `Sheet`, `Drawer`: retain accessible primitive focus trapping, title/description, dismiss behavior and focus restoration. Content scrolls inside viewport bounds; bottom actions include safe-area padding.

## Accessibility and RTL

Keep one page H1, section hierarchy, semantic lists/landmarks and a skip link. Focus-visible rings must remain visible on all controls and links. Use Lucide with consistent 16–24px sizing; decorative icons are `aria-hidden`. Use logical `start`, `end`, `ps`, `pe`, `ms`, `me`; LTR islands are intentional for codes and phone numbers. Forward navigation arrows point left in RTL.

Respect reduced motion globally. No workflow depends on hover, color alone, animation or a pointer. Sticky actions need sufficient scroll space so the final fields remain reachable. Long badges and Persian names wrap; do not truncate critical identity or action labels.

## Data and asset strategy

- `lib/mock-data/mock-data.ts` is the single source of local experts, service scopes, articles, FAQs, knowledge, cities, software, portfolio, homepage modules, and engineer-workspace display fixtures (via `lib/mock-data/engineer-workspace-mock-data.ts`).
- Service modules are the only consumers exposed to route components. Turning `NEXT_PUBLIC_USE_MOCK_DATA` to `false` returns honest empty/unavailable states until backend contracts are supplied.
- Reused legacy assets live under `public/images/`; generated concept boards live under `docs/design-concepts/` and are not shipped in page UI.
- `IMAGE-ASSET-PLAN.md` records every reused and still-missing visual with exact dimensions, crop, subject, mood, and Persian alt intent.

## Validation record

The redesign keeps routes, Server Component boundaries, services, providers, and business validation schemas. Quality gates are `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm build`. Browser review covers the homepage, service discovery, expert detail, editorial hubs, and registration at desktop and mobile widths. Unavailable backend mutations remain unavailable; visual verification does not imply backend completion.
