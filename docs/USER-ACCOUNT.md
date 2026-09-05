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

Quick actions are real links only: find a specialist (`/`), open messages,
open saved specialists. There is no fake “create request” form.

---

## Mock data

Central file: [`lib/mock-data/user-workspace-mock-data.ts`](../lib/mock-data/user-workspace-mock-data.ts)

| Export               | Use                                      |
| -------------------- | ---------------------------------------- |
| `currentUser`        | Private identity                         |
| `userRequests`       | Customer requests                        |
| `userSavedExperts()` | Same `ExpertCardData` as `/experts/[id]` |
| `userReviews`        | Reviews written by the customer          |
| `userNotifications`  | Account notifications                    |

Saved specialists are looked up from `mockExpertCards` by public expert id.
Do not invent a second expert model.

Session `displayName` / `phoneMasked` overlay `currentUser` in
`buildUserWorkspace(session)`.

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
2. List/detail for the user’s requests
3. List/detail for conversations (composer in a later messaging task)
4. Saved-expert list using the public Expert entity
5. Reviews written by the user
6. Notifications and (later) preference writes
7. Logout / session revoke
8. Explicit 401 vs 403 when an engineer token hits `/account/*`
