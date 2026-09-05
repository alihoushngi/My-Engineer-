# User Authentication

Customer (normal user) authentication for Mohandes Man. This is **not**
Engineer authentication. The two account types do not share panels, routes,
permissions, or session cookies.

Visual identity follows [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Folder rules
follow [ARCHITECTURE.md](ARCHITECTURE.md). Engineer auth remains documented in
[MOCK-AUTH.md](MOCK-AUTH.md) and [ENGINEER-PANEL.md](ENGINEER-PANEL.md).
The private customer workspace is documented in [USER-ACCOUNT.md](USER-ACCOUNT.md).

---

## User vs engineer

|                         | Customer / User           | Engineer / Specialist            |
| ----------------------- | ------------------------- | -------------------------------- |
| Role                    | `"user"`                  | `"engineer"`                     |
| Login                   | `/login`                  | `/engineer/login`                |
| Register                | `/register` (lightweight) | `/expert-registration` (9 steps) |
| Private area            | `/account/*`              | `/engineer/*`                    |
| Header CTA (logged out) | «ورود / ثبت‌نام»          | «ورود مهندس» + «ثبت‌نام متخصص»   |
| Header CTA (logged in)  | «حساب من»                 | «پنل مهندس»                      |

A user session **must not** grant `/engineer/*`.
An engineer session **must not** expose customer account data on `/account/*`.

Sessions are exclusive. Writing a user session clears the engineer mock
cookies, and writing an engineer session clears the user mock cookies.

---

## Route map

| Path         | Layout                | Access                                                        |
| ------------ | --------------------- | ------------------------------------------------------------- |
| `/login`     | Auth (`(auth)`)       | Public. Redirects to a safe `next` when a user session exists |
| `/register`  | Auth (`(auth)`)       | Public. Same `next` rule                                      |
| `/account`   | Account (`(account)`) | User session only. See [USER-ACCOUNT.md](USER-ACCOUNT.md)     |
| `/account/*` | Account (`(account)`) | Same guard. Shop chrome is not used                           |

Canonical URLs are `/login` and `/register`. Do not send customers to
`/engineer/login`.

---

## Session roles

```ts
role: "user" | "engineer";
```

Server readers:

- `getUserSession()` — customer mock session, or `null`
- `getEngineerSession()` — engineer mock session, or `null`
- `getUserAccess()` — integration-ready account guard states
- `getEngineerAccess()` — engineer workspace guard; a user session is `forbidden`

Do not hide the other role only in navigation. Guards decide access.

---

## User access states (`/account/*`)

| Kind               | Meaning                                | UI                                                   |
| ------------------ | -------------------------------------- | ---------------------------------------------------- |
| `checking`         | Client session not known yet           | Spinner. No private data                             |
| `authenticated`    | Customer session                       | Account entry                                        |
| `engineer_session` | Engineer cookies only                  | Honest “not a customer account”                      |
| `unauthenticated`  | No session                             | Redirect to `/login?next=` when mock user auth is on |
| `expired`          | Cookie present but invalid / mocks off | Re-login                                             |
| `unavailable`      | No user-auth API and mocks off         | Unavailable                                          |
| `error`            | Future API failure                     | Error + retry copy                                   |

Private customer fields render only when `kind === "authenticated"`.

---

## Mock user auth

Central config: [`config/mock-auth.config/mock-auth.config.ts`](../config/mock-auth.config/mock-auth.config.ts)

```ts
mockUserRegister.enabled;
mockUserLogin.enabled;
```

Optional env overrides (cannot enable mocks in production):

```bash
NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER=true
NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN=true
```

`canUseMocks()` is `process.env.NODE_ENV !== "production"`.

### Test user (development only)

| Field        | Value         |
| ------------ | ------------- |
| Phone        | `09121112233` |
| OTP          | `654321`      |
| Password     | `user1234`    |
| Display name | `سارا مشتری`  |

These values are **different** from engineer mock credentials.
The UI never hardcodes them.

Login only accepts this test user. Registration OTP is the same 6-digit mock
code; any other valid Iranian mobile (except the engineer test phone) can
complete mock registration and receive a session immediately.

---

## Mock session

Development-only httpOnly cookies:

- `mm_mock_user_session=active`
- `mm_mock_user_profile` (display name, masked phone, source — never password or OTP)

Compatible with the future real-auth boundary: UI and guards read
`getUserSession()` / `getUserAccess()`, not cookie names.

Allows `/account/*`. Does not allow `/engineer/*`.

---

## Auth-required actions

Reusable control: `AuthRequiredAction`.

If the visitor is not a customer:

1. Do not fail silently.
2. Send them to `/login?next=<safe internal path>`.

Wired today on the public expert profile for:

- پیام دادن به مهندس (chat)
- ذخیره مهندس (save)
- ثبت نظر (review)

ثبت درخواست has no public control yet. Use the same helper when that CTA exists.

After login, authenticated users may still see an honest “not connected yet”
dialog until those APIs exist.

---

## Safe `next` redirects

`/login?next=/experts/123` returns the user to `/experts/123`.

Rejected destinations fall back to `/account`:

- External URLs (`https://…`, `//…`, backslash, encoded `//`)
- `/engineer` and `/engineer/*`
- `/login` and `/register`

---

## Shared architecture

```text
Auth UI primitives (card, OTP, password, method tabs)
        ↓
User Auth Service          Engineer Auth Service
        ↓
shared mock-session cookies, mutation results, Yup login schemas
```

Roles and domain services stay distinct. Do not mix customer and engineer
account payloads.

---

## Backend contracts required

Do not invent endpoints in the frontend. Real auth needs:

1. Customer OTP request / verify and password login
2. Lightweight customer registration (mobile, OTP, display name, password)
3. Session cookie or token boundary with `role: "user"`
4. Current-user profile read for `/account`
5. Logout / session revoke
6. Explicit 401 vs 403 vs 409 when an engineer token hits customer routes (and the reverse)
7. Auth-required mutations: start conversation, save expert, create request, submit review

Password reset is **not** implemented until a contract exists.

Social login is **not** in this product surface.
