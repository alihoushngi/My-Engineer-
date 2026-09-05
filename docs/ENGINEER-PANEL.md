# Engineer Panel

Private specialist workspace for Mohandes Man. This is not an admin dashboard
and not a customer account. Visual identity follows
[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Architecture follows
[ARCHITECTURE.md](ARCHITECTURE.md).

Public product language remains **متخصص / expert**. The URL family is
`/engineer` because this task defined that canonical route.

---

## Route map

| Path                      | Purpose                          |
| ------------------------- | -------------------------------- |
| `/engineer`               | Workspace dashboard              |
| `/engineer/profile`       | Edit public-profile information  |
| `/engineer/services`      | Services and specialties         |
| `/engineer/service-areas` | Primary city and nearby cities   |
| `/engineer/requests`      | Incoming work requests           |
| `/engineer/requests/[id]` | Request detail                   |
| `/engineer/messages`      | Conversation list                |
| `/engineer/messages/[id]` | Conversation view + composer     |
| `/engineer/portfolio`     | Public work samples              |
| `/engineer/credentials`   | Education, licence, documents    |
| `/engineer/reviews`       | Review list                      |
| `/engineer/reviews/[id]`  | Review detail                    |
| `/engineer/notifications` | Notification center              |
| `/engineer/settings`      | Account display, logout boundary |

Layouts live under `app/(engineer)/engineer/`. The group does not appear in
the URL. Pages are private: `noindex`, `X-Robots-Tag`, `Cache-Control: private,
no-store`. They are not in the sitemap.

---

## Access model

Frontend states, not invented server session:

| State                         | When                                  | UI                                           |
| ----------------------------- | ------------------------------------- | -------------------------------------------- |
| A. Unauthenticated            | Future API `401`                      | Unauthorized, no private lists               |
| B. Registration in progress   | Future account status                 | Panel + continue-registration banner         |
| C. Submitted / pending review | Future account status                 | Panel + pending banner                       |
| D. Active                     | Future account status                 | Full workspace                               |
| Visual review                 | `NEXT_PUBLIC_USE_MOCK_DATA` (default) | Full workspace + honest design-review banner |
| Unavailable                   | Mock off, no account API              | Unauthorized / API unavailable               |

**API CONTRACT REQUIRED:** current engineer session, registration outcome, and
whether an incomplete wizard may enter the panel.

Display mock data is **not** authentication. Mutations never succeed locally.

---

## Public / private boundary

Public (`/experts/[id]`): name, profession, specialties, cities, software,
history, portfolio images, reviews, verification badge when provided.

Private (engineer panel only): masked mobile display, incoming requests,
conversations, notifications, credential document _status_, account actions.

Do not render national ID, raw document URLs, tokens, or full phone numbers.
Credential files are represented as `hasDocument` only.

---

## Dashboard modules

1. Identity and verification badge
2. Honest access/status banner
3. Profile completion (derived)
4. Recent requests
5. Unread conversations
6. Latest review
7. Portfolio and service coverage
8. Quick actions that route to real panel pages

No revenue, conversion, or analytics cards.

### Profile completion derivation

Nine product areas from registration/public profile:

avatar, personal info, specialties, resume, education, organization, service
areas, portfolio, credentials (at least one document attached).

`percent = round(completedCount / 9 * 100)`. Not a backend field.

---

## Feature notes

### Profile

Section display + focused edit dialogs. Reuses registration field meaning.
Does not reopen the nine-step wizard.

### Services / areas

Services come from the expert’s existing `serviceSlugs`. Nearby cities reuse
registration location concepts. Radius control is omitted
(**BUSINESS DECISION REQUIRED**).

### Requests

Statuses `new` | `in_review` | `closed` are integration-ready scanning labels.
Accept / reject / quote actions are omitted and documented as unavailable.

### Messages

List and thread routes. Composer calls the service and surfaces API
unavailability. No WebSocket, polling, or attachments.

### Portfolio / credentials

Local file selection is not upload success. Remove/add mutations throw until
an API exists. Sensitive documents are not exposed as public URLs.

### Reviews

Read-only list at `/engineer/reviews`. Each item links to
`/engineer/reviews/[id]`. Unknown ids use the panel `not-found` page.
Engineer reply is not implemented; existing `replyText` may render if the
data source supplies it.

Desktop sidebar: the panel shell is a two-column grid with a
`minmax(100dvh, auto)` row. The sidebar surface fills that row (viewport
minimum, then content height). Navigation inside the sidebar may stay sticky
within `max-h-dvh`. Mobile keeps the five-item bottom navigation and must not
inherit the desktop column height.

### Notifications

Static list with unread styling and destination links. No push.

### Settings

Masked mobile, OTP-auth explanation, logout boundary. No password UI, no fake
preference toggles, no account deletion.

---

## Mock-data behavior

Fixtures: `lib/mock-data/engineer-workspace-mock-data.ts`, assembled with the
public expert `amirhossein-rostami` in
`lib/mock-data/build-engineer-workspace/build-engineer-workspace.ts`.

Allowed: visual review, lists, detail, empty/error UI.

Not allowed: fake login, save success, send success, upload completion,
logout success, request acceptance.

---

## API contracts required

Do not invent paths. Backend must define:

- current engineer account / session
- engineer profile read + update
- specialties / software update
- service-area update
- requests list + detail + real status model
- request actions if product allows them
- conversations, messages, send message
- portfolio create/update/delete and upload
- credential read/update/upload and verification states
- reviews for the authenticated engineer
- notifications + read state
- settings and sign-out
- registration-to-panel access rules

---

## Business decisions required

- Can engineers accept, reject, or quote on requests?
- Can engineers disable an individual service?
- Are notifications configurable?
- Can engineers delete or deactivate accounts?
- Are portfolio items sortable?
- What happens after verification rejection?
- Can engineers reply to reviews?
- Nearby-city radius / max count?
- Post-registration destination (home vs panel vs pending review)?

---

## Mobile and PWA

Bottom navigation: dashboard, requests, messages, profile, more.
Conversation list and thread are separate routes.
Safe-area insets on top bar, bottom nav, and composer.
Service worker never caches `/engineer` HTML or private API responses.
