# Originalite Project - Client Auth Reviewer Memory

## Project Overview
- React 18 + TypeScript SPA (CRA / react-scripts 5)
- State: Redux Toolkit + redux-persist 6
- Routing: React Router v6
- HTTP: Axios 1.3.3 (privateInstance + publicInstance)
- Auth tokens: JWT in Redux in-memory state (access token); refresh token in httpOnly cookie (server-side)
- "Keep signed in": `localStorage.keepSignedIn` flag controls auto-refresh on app load

## Auth Flow (confirmed)
1. Login form -> `actionFetchAuth` thunk -> POST `/customers/login` via `privateInstance`
2. Server returns `{ accessToken }` in response body; refresh token set as httpOnly cookie
3. Access token stored in `state.auth.data.accessToken` (in-memory Redux, NOT persisted)
4. `isLoggedOut` boolean persisted to localStorage via redux-persist
5. Auto-login: `useAutoLogin` hook runs on every app mount; if `!user && !isLoggedOut && keepSignedIn`, calls `refreshToken()` -> GET `/customers/refresh`
6. Token refresh on 403: `privateInstance` response interceptor retries once after calling `refreshToken()`
7. Logout: POST `/customers/logout` -> clears Redux state, removes `keepSignedIn` and `root` localStorage keys, navigates to `/`

## Critical Issues Found (2026-02-24 review)
1. NO ROUTE GUARDS anywhere - `/account/*` and `/editor/*` routes are completely unprotected client-side
2. Admin panel (`/editor/*`) has zero auth checks - any unauthenticated user can visit it directly
3. `isAdmin` flag sourced entirely from JWT payload decoded client-side - privilege escalation trivial via token manipulation
4. Login action (`authActions.ts`) uses `privateInstance` (auth-requiring axios instance) for the login endpoint itself
5. `sendRequest.ts` still hardcoded to `http://localhost:5000` - dead utility file, not used in production
6. `password` field in `UserData` interface and `RegisterProps` interface - type models expose password field
7. `console.log("payload", payload)` in `authSlice.ts` line 54 - leaks auth error payload to browser console
8. `useAutoLogin` typo: `refreshIfNeedeed` - minor code quality
9. Token refresh only triggered on HTTP 403, not 401 - depends on non-standard server behavior
10. No race-condition guard on concurrent `refreshToken()` calls (multiple simultaneous 403s)
11. `LandingPageLogin` is a broken stub - references undefined `validationSchema`, submit button commented out
12. Registration success modal commented out in `use-register.ts` lines 33-34
13. Discount token decoded client-side from sessionStorage with `jwtDecode` - expiry enforcement on client only

## Key Files
- Auth slice: `/client/src/@main/store/slices/auth/authSlice.ts`
- Auth actions: `/client/src/@main/store/actions/authActions.ts`
- Axios instances: `/client/src/services/api/axios.ts`
- Refresh token util: `/client/src/shared/utils.ts`
- Auto-login hook: `/client/src/shared/hooks/use-auto-login.ts`
- Logout hook: `/client/src/shared/hooks/use-logout.ts`
- Root routes (no guards): `/client/src/routes/index.tsx`
- Profile routes (no guard): `/client/src/@profile/router/index.tsx`
- Editor routes (no guard): `/client/src/@editor/router/index.js`
- Store config (persist): `/client/src/store/index.ts`
- User data hook (JWT decode): `/client/src/hooks/use-user-data.ts`
