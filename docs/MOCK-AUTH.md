# Mock Authentication (Development Only)

Frontend-only mock **engineer** and **customer** authentication for local
testing. Customer details live in [USER-AUTH.md](USER-AUTH.md).

**DO NOT ENABLE MOCK AUTH IN PRODUCTION.**

Even if the flags below are left `true`, mock authentication is forced off when
`NODE_ENV === "production"`.

## Config file

Source of truth:

[`config/mock-auth.config/mock-auth.config.ts`](../config/mock-auth.config/mock-auth.config.ts)

```ts
export const mockAuthConfig = {
  mockRegister: {
    enabled: true,
    otp: "12345",
    delayMs: 300,
    forceError: false,
  },
  mockLogin: {
    enabled: true,
    phone: "09115447316",
    otp: "123456",
    password: "admin1234",
    delayMs: 300,
    forceError: false,
  },
  mockUserRegister: {
    enabled: true,
    otp: "654321",
    delayMs: 300,
    forceError: false,
  },
  mockUserLogin: {
    enabled: true,
    phone: "09121112233",
    otp: "654321",
    password: "user1234",
    displayName: "سارا مشتری",
    delayMs: 300,
    forceError: false,
  },
};
```

Toggle:

- `mockRegister.enabled` / `mockLogin.enabled` (engineer)
- `mockUserRegister.enabled` / `mockUserLogin.enabled` (customer)

## Optional env overrides

These override the config flags when set. They still cannot enable mocks in
production.

```bash
NEXT_PUBLIC_ENABLE_MOCK_REGISTER=true
NEXT_PUBLIC_ENABLE_MOCK_LOGIN=true
NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER=true
NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN=true
```

Set either value to `false` to force that mock flow off.

## Safety

Effective mock mode is:

`canUseMocks() && config.enabled && env !== false`

`canUseMocks()` is `process.env.NODE_ENV !== "production"`.

Mock credentials are compared only inside server-side adapters. The UI never
hardcodes the test phone, OTP, or password.

If mock flags are off, unavailable APIs still fail. There is no silent mock
fallback after a real API error.

## Test login

Engineer values (development only):

| Field     | Value         |
| --------- | ------------- |
| Phone     | `09115447316` |
| Login OTP | `123456`      |
| Password  | `admin1234`   |

Customer values are different. See [USER-AUTH.md](USER-AUTH.md).

Registration OTP is **5 digits** (current registration UI): `12345`.

Registration national ID must be a valid Iranian national-ID checksum. Example:
`0499370899`.

## Mock registration

When `mockRegister.enabled` is effectively on:

1. Complete `/expert-registration` with Yup validation on every step.
2. Invalid data does not advance.
3. Direct URLs to later steps remain guarded.
4. Wizard state is kept in `sessionStorage` for refresh during the tab session.
5. Final submit creates a mock engineer session and shows the completion screen,
   then goes to `/engineer`.

## Mock login

Route: `/engineer/login`

Methods:

- OTP login (6 digits)
- Password login

After success: `router.replace("/engineer")`, or a safe internal `?next=`
Engineer Panel path.

Logged-in visits to `/engineer/login` redirect to `/engineer`.
Logged-in visits to registration (except completion) redirect to `/engineer`.
Logged-out visits to `/engineer/*` redirect to `/engineer/login`.

## Session

Development-only httpOnly cookies:

- `mm_mock_engineer_session=active`
- `mm_mock_engineer_profile` (registration overlay; no password, OTP, or national ID)

`getEngineerSession()` reads this boundary. The Engineer Panel UI does not
depend on mock internals.

Logout clears only those mock cookies (and mock wizard `sessionStorage`) and
returns to `/`.

## How to disable mocks

1. Set the relevant `enabled` flags to `false` in the config, or
2. Set the matching `NEXT_PUBLIC_ENABLE_MOCK_*` env vars to `false`, or
3. Build/run with `NODE_ENV=production`.

## Real API mode

When mocks are off:

- Registration mutations throw the existing unavailable API error.
- Login UI still renders, but submit fails with the unavailable-auth error.
- Engineer Panel returns to visual-review display data if `NEXT_PUBLIC_USE_MOCK_DATA` is on, otherwise unavailable.

Do not treat display fixtures as a login session.
