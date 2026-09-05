# User Account

Private customer workspace for Mohandes Man. This is **not** the engineer
panel and not a generic SaaS dashboard. Visual identity follows
[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Folder rules follow
[ARCHITECTURE.md](ARCHITECTURE.md). Authentication remains in
[USER-AUTH.md](USER-AUTH.md).

Normal-user account data is private. There is no public `/users/[id]` profile.

---

## Route map

Canonical family: `/account`. Layouts live under `app/(account)/account/`.
The `(account)` group does not appear in the URL. Shop header and footer are
not used.

| Path                     | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `/account`               | Customer dashboard                           |
| `/account/profile`       | Private identity (name, masked mobile, city) |
| `/account/requests`      | Requests the user sent to specialists        |
| `/account/requests/[id]` | Request detail                               |
| `/account/messages`      | Conversation list (read-only in this task)   |
| `/account/messages/[id]` | Conversation thread (no composer yet)        |
| `/account/saved`         | Saved specialists (`ExpertCard` / same ids)  |
| `/account/reviews`       | Reviews the user wrote                       |
| `/account/notifications` | Notification list                            |
| `/account/settings`      | Session display and logout                   |

Pages are private: `noindex`, `X-Robots-Tag`, `Cache-Control: private,
no-store`. They are not in the sitemap. Messaging composition is reserved for
a later messaging task.

---

## Shell

Desktop (lg+): RTL right-side sidebar, full-height grid
(`min-h-dvh`, `lg:grid-rows-[minmax(100dvh,auto)]`), sticky navy topbar.

Mobile: bottom navigation for پیشخوان، درخواست‌ها، پیام‌ها، ذخیره‌ها, plus a
More drawer for نظرات، اعلان‌ها، اطلاعات حساب، تنظیمات. The desktop sidebar
is not forced onto small screens.

---

## Access

Workspace data is returned only when `getUserAccess().kind === "authenticated"`.
This is **session-gated**. Visual-review mock catalog flags do not open the
customer workspace.

| Kind               | UI                                                   |
| ------------------ | ---------------------------------------------------- |
| `unauthenticated`  | Redirect to `/login?next=` when mock user auth is on |
| `engineer_session` | Honest “not a customer account”                      |
| `expired`          | Re-login                                             |
| `unavailable`      | Service unavailable                                  |
| `error`            | Error copy                                           |
| `authenticated`    | Account shell + private lists                        |

Loading, empty, and `error.tsx` / `not-found.tsx` cover in-workspace states.

---

## Public / private boundary

Public storefront may show:

- specialist cards and `/experts/[id]`
- reviews the specialist chose to display on that public profile

Private to `/account/*` only:

- full customer identity beyond what the user typed into a public review
- masked or full mobile numbers
- request titles, bodies, and statuses
- conversation participants and message bodies
- notification payloads
- saved-list membership as an account fact (the specialist card itself is public)

Do not render a full mobile number. Display values are already masked.
Do not create `/users/[id]`.

---

## Dashboard

The dashboard prioritizes work, not vanity statistics:

- active requests
- recent messages
- saved specialists
- notification summary

Quick actions: ثبت درخواست (requires a selected specialist, typically from
saved experts), find a specialist (`/`), open messages, open saved specialists.
There is no bidding, budget, escrow, or quotation form.

---

## Saved specialists

Route: `/account/saved`. Cards reuse public `ExpertCard`. Each card also has:

- remove from saved
- open public profile (the card itself)
- پیام به مهندس (existing conversation, or an honest messaging-soon dialog)

Saving from `/experts/[id]` uses «ذخیره مهندس» with a selected state. Guests
are sent to `/login?next=` (customer login, never `/engineer/login`).

When the list is longer than 9, shared pagination is used.

---

## Shared request entity

Customer `/account/requests` and engineer `/engineer/requests` are opposite
views of the same `ServiceRequest` (`types/store/service-request.types.ts`).

Supported create fields: service, city, description, selected engineer.
Attachments, budget, bidding deadline, escrow, payment, and price quotation
are **not** in this product.

Statuses are scanning labels only: `sent`, `in_review`, `closed`. Engineer
list UI maps `sent` → `new`. **API CONTRACT REQUIRED / BUSINESS DECISION
REQUIRED** for accept, reject, quote, or any richer lifecycle.

Create entry points: expert profile, service page, customer dashboard. A
request always has a selected engineer (no broadcast-to-all).

If a conversation exists, request detail shows «مشاهده گفتگو». Messaging
compose is a later task.

---

## Mock data

Central files:

- [`lib/mock-data/service-request-mock-data.ts`](../lib/mock-data/service-request-mock-data.ts)
  — canonical request catalog
- [`lib/mock-data/user-workspace-mock-data.ts`](../lib/mock-data/user-workspace-mock-data.ts)
  — customer identity, conversations, reviews, notifications

| Export               | Use                                      |
| -------------------- | ---------------------------------------- |
| `currentUser`        | Private identity                         |
| `userRequests`       | Derived customer view of shared requests |
| `userSavedExperts()` | Same `ExpertCardData` as `/experts/[id]` |
| `userReviews`        | Reviews written by the customer          |
| `userNotifications`  | Account notifications                    |

Saved specialists are looked up from `mockExpertCards` by public expert id.
Do not invent a second expert model.

Session `displayName` / `phoneMasked` overlay `currentUser` in
`buildUserWorkspace(session, overlay)`.

Visual-testing overlays (not production persistence):

- `mm_mock_user_saved` — saved expert ids (defaults when the cookie is absent)
- `mm_mock_service_requests` — customer-created requests; kept across a
  customer→engineer role switch in the same browser so the engineer can see
  the same ids. Cleared saved cookie on user logout / engineer session write.

---

## PWA

`/account` and descendants are sensitive paths in `public/sw.js`. The worker
must not cache private account HTML or future user API responses. HTTP headers
send `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow`.
Installed (standalone) sessions still use the network for these routes.

---

## Backend contracts required

Do not invent endpoints in the frontend. A real customer workspace needs:

1. Current-user profile read (name, masked mobile, avatar, city)
2. List/detail for the user’s requests (shared entity with engineer requests)
3. Create request (service, city, description, selected engineer)
4. Saved-expert list and save/unsave using the public Expert entity
5. List/detail for conversations (composer in a later messaging task)
6. Reviews written by the user
7. Notifications and (later) preference writes
8. Logout / session revoke
9. Explicit 401 vs 403 when an engineer token hits `/account/*`
