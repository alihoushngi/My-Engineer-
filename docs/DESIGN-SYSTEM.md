# Mohandes Man Design System

The visual system for the Persian professional-services marketplace. Architecture and API boundaries remain defined in [ARCHITECTURE.md](ARCHITECTURE.md). Tokens in `css/globals.css` are the source of truth.

## Visual direction

A white, content-first marketplace with charcoal text, quiet stone surfaces, and restrained deep teal actions. Engineering precision comes from alignment, clear information hierarchy, and consistent spacing. Color supports tasks rather than decorating every section.

- Keep approved Persian content and render only available data.
- Design for `lang="fa"`, `dir="rtl"`, and local Kalameh FaNum.
- Prefer open sections, divided lists, and editorial columns over nested cards.
- Use one primary action in each task context. Supporting navigation is outline or ghost.
- No gradients, decorative blobs, marketing statistics, fabricated experts, or placeholder testimonials.
- The house outline beside the wordmark uses Lucide, like other interface icons.

## Semantic palette

Change colors centrally in `:root`; `.dark` remains a future-theme foundation, not an exposed feature. Tailwind utilities are mapped with `@theme inline`. Do not scatter hex colors, raw palette utilities, or per-component dark overrides.

| Token                                  | Purpose                                                  |
| -------------------------------------- | -------------------------------------------------------- |
| `background`                           | White page canvas                                        |
| `surface`                              | Form, card, header and dialog background                 |
| `surface-elevated`                     | Menus and popovers                                       |
| `surface-subtle`                       | Quiet stone bands, empty states, supporting columns      |
| `surface-muted`                        | Compatibility alias family for quiet fills               |
| `foreground`                           | Charcoal primary text                                    |
| `foreground-muted`, `muted-foreground` | Legible supporting copy and metadata                     |
| `primary`                              | Deep teal task actions and current navigation            |
| `primary-hover`                        | Explicit darker pressed/hover action state               |
| `primary-subtle`                       | Light teal selection and identity surfaces               |
| `primary-foreground`                   | Text on solid primary fills                              |
| `secondary`, `secondary-foreground`    | Quiet alternative actions                                |
| `accent`, `accent-foreground`          | Interactive hover/selection                              |
| `muted`                                | Neutral compatibility fill                               |
| `border`                               | Low-emphasis separators                                  |
| `border-strong`                        | Outlined actions and stronger dividers                   |
| `input`, `input-background`            | Clearly visible control outline and fill                 |
| `ring`                                 | Keyboard focus                                           |
| `success`                              | Confirmed status; badges use subtle tinted fills         |
| `warning`                              | Caution, including explicit development previews         |
| `danger`, `destructive`                | Validation and destructive actions; aliases share values |
| `info`                                 | Availability and explanatory messages                    |
| `overlay`                              | Modal backdrop                                           |
| `card`, `card-foreground`              | Primitive aliases for surface and foreground             |
| `popover`, `popover-foreground`        | Elevated primitive aliases                               |

Status foreground pairs remain available for solid status surfaces. Success and verification must come from actual data; do not imply verification with decorative badges. Retained `glass-*` utilities are compatibility primitives; application chrome and forms use opaque surfaces.

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

| Utility / token     | Size or rule                                  |
| ------------------- | --------------------------------------------- |
| `container-app`     | 76rem maximum, including gutters              |
| `container-wide`    | 80rem, reserved for dense surfaces            |
| `container-narrow`  | 46rem for reading                             |
| `container-form`    | 36rem for isolated form surfaces              |
| Page gutters        | 16px mobile, 24px from 640px                  |
| `py-page`           | 32px mobile, 48px larger                      |
| `py-section`        | 48px mobile, 72px larger                      |
| Form fields         | 24–28px between groups, 8px label/control gap |
| Open section groups | 32–40px; dividers where meaningful            |

The registration shell is capped at 56rem and uses a 14rem desktop progress rail. The form remains a focused column with approximately 34rem usable width. At small sizes the rail disappears, leaving the current step, progress bar and actual task.

Do not hide layout bugs with page-level horizontal overflow clipping. Use `min-w-0`, wrapping, responsive grids and logical inline spacing. Check 360, 390, 430, 768, 1024, 1280 and 1440px.

## Radius and elevation

- Small details: `rounded-sm` (6px).
- Buttons, inputs, list interactions: `rounded-md` (8px).
- Expert cards, media, forms, empty-state regions: `rounded-lg` (12px).
- Larger optional surfaces: `rounded-xl` (16px).
- Circles/pills are reserved for avatars, step markers, compact badges and tags.
- No default input or card shadows. Separation comes from spacing and borders.
- `shadow-md` / `shadow-lg` are for dialogs, menus and overlays.

## Page patterns

### Global chrome

Compact opaque sticky header, wordmark, desktop navigation, discreet search/city entries, outlined specialist join link. Active navigation has a soft fill and stronger text. Mobile uses a labelled full-height RTL sheet, scrollable link area, persistent join action and safe-area padding. Navigation closes after a link is selected. Footer groups use quiet typography and generous link targets.

### Home

Useful search-led opening with direct query submission and city entry. Six service categories use divided open rows with restrained Lucide icons. Trust information stays unboxed. The existing About process copy explains discovery, comparison and direct contact. Resources use editorial links. The specialist join band is the main solid brand-color moment.

Popular services and drawing consultation stay conditional on approved mappings. Home expert showcase remains absent while there is no approved data source. Never fill these gaps with invented content.

### Discovery

Search preserves URL-driven query and cities behavior. Search controls form one compact task region; real service matches and expert results are separate. Do not add unsupported filters or sorting. All six service routes share one layout: breadcrumb, identity, dominant expert-discovery region, supporting introduction/process column and related service navigation. Existing unavailable city/list states remain honest.

### Experts

Expert cards prioritize identity, profession, verification, location/experience, rating when available, a short specialties preview, and one profile action. At most three specialties appear in a result card; the remainder is counted, with full content on the profile.

Profiles use an open main column for biography, specialties, professional information, history, service cities, software, portfolio and reviews. Only populated sections render. A supporting column holds quick facts and contact availability. Mobile contact uses an opaque safe-area bottom action only when a valid public contact exists. Preserve gallery keyboard behavior and share support. Do not fabricate ratings, credentials, saved state or contact numbers.

### Articles, FAQ and knowledge

Article cards use open media/text layouts, category metadata and clear title hierarchy. Detail pages use a narrow reading column, in-flow contents navigation and generous prose. FAQ uses divided accessible accordions with spacious triggers and readable answers. Knowledge tips are divided editorial entries, not repeated cards. Related service actions require real supplied destinations. Missing entities still return not-found; empty catalogs use the shared empty state.

### About and legal

About uses open narrative sections, an explicit process sequence and domain/service discovery. Legal documents use one reading column, strong section headings, natural paragraphs and lists; never wrap individual paragraphs in cards.

### Registration

All nine steps share the same shell, progress, heading, form rhythm and pending/error presentation. Existing guard rules and service operations remain authoritative. Mobile navigation keeps primary continue and secondary back side by side. Native keyboard types, visible labels, required markers, accessible descriptions and error relationships are preserved.

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

## Validation record

The redesign keeps routes, Server Component boundaries, services, providers and business validation schemas. Browser review includes seven breakpoint widths across major page families, all registration steps using a temporary component review surface, the existing populated/sparse development expert fixtures, query navigation, mobile menu, OTP entry and form validation. Temporary review routes are removed before the production build. Unavailable backend operations remain unavailable; visual verification does not imply backend completion.
