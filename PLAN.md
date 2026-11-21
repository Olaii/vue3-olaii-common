# vue3-olaii-common rewrite plan

Shared Vue 3 library for the Olaii admin apps: **pass** (`olaii-pass-vue`), **vouchers** (`olaii-vouchers-vue`) and
**guestlist** (`olaii-guestlist-vue-2`). It plays the same role `olaii-web-common` plays for the AngularJS apps
(backoffice, access, cashless).

Today no app imports this library; each app keeps its own copy of the same services, stores and components. The
rewrite starts from scratch and takes the newest code from the apps: pass/vouchers (identical) as the base, plus the
extras guestlist added.

Out of scope: `olaii-ticketing-vue` (Nuxt + TS, separate token cookies) and `olaii-reseller` (AngularJS).

## Principles

1. **Configured, not hard-wired.** Apps call `createOlaiiCommon({ authURL, apiURL, appId, production, router, gettext, ... })`.
   The library never imports an app's router or gettext instance and never reads `process.env`.
2. **Works alongside the AngularJS apps.** Same cookie names (`olaii_access_token`, `olaii_refresh_token`, `_dev`
   suffix in development, `.olaii.com` domain) and the same organization/event cookies, so logins and selections carry
   over between all Olaii apps.
3. **Peer dependencies, not bundled.** vue, vue-router, pinia, vue3-gettext and vue3-nice-elements are supplied by the
   app. Pinia range covers 2 and 3 (vouchers is still on pinia 2).
4. **Builds for the current apps.** ES module output plus a CSS file, importable from vue-cli 5 (webpack 5) builds.
5. **State lives in Pinia.** Every store (auth, UI, organization/event context) is a Pinia setup store
   (`defineStore`), no Vuex. Stores read config through `getOlaiiOptions()`, not `inject()`, so they also work in
   router guards and services. The unused `@vue/cli-plugin-vuex` can be dropped from vouchers and guestlist.
6. **Translations in one pass.** Each app's gettext extraction also picks up the library's strings.
7. **Same code style as the apps.** Prettier `printWidth 100`, `endOfLine lf`, `trailingComma es5`; ESLint
   `vue3-essential` + `eslint:recommended` + prettier, with the apps' rule overrides and `vue/order-in-components`.

## Phase 0: project setup

- Remove the old code and `dist/`; build output is no longer committed.
- Vite library mode, JavaScript (like the apps).
- ESLint flat config + Prettier with the apps' rules.
- Vitest (jsdom) and a demo app (`yarn dev`) for trying things out.
- CHANGELOG, semantic versioning, GitHub Actions CI (lint, format check, test, build).
- Publishing job: waits on the registry decision (see below).

## Phase 1: core, no UI (done)

Changes from the apps' copies, to note when migrating:

- Config comes from `createOlaiiCommon` options instead of `process.env`; the library uses its own axios instance.
- The organization/event cookies are named per app: `olaii_<appId>_organization_id` / `_event_id` (same names
  guestlist uses today).
- App-specific error codes (`guest_limit_reached`, `code_already_exists`, `checkin_time_exceeded`) move to each app's
  `errorCodes` option.
- Auth store: `userProfile` starts as `null`; `permissions` is computed from the profile; `availableApps` leaves out
  the current app (guestlist did this by hand); `getRole` is kept as an alias of `role`; `logout` calls `onLogout`
  instead of importing the app's general store.
- Router guard: the app's route checks (guestlist's partners/users permissions) go into `checkAccess`.
- `getQuery` and `clone` are not ported, vue3-nice-elements already provides them.
- Domain lists in `common.service.js` (permissions, modules, statuses, routes) stay in the apps.

| Module                                                                                                                           | Based on                          |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Token service (cookies, cross-tab refresh with a Web Lock, reload when the session changes)                                      | pass/vouchers                     |
| Cookie storage (`isLocal`, domain, `_dev` suffix, organization/event ids)                                                        | pass/vouchers + guestlist extras  |
| Request service (401 refresh + retry, list pagination, blob download, upload, `fullResponse`, multipart headers, `buildHeaders`) | pass/vouchers + guestlist         |
| Error service (API error to translated toast, app-extendable error codes)                                                        | guestlist                         |
| Auth store (profile, login/logout, permissions, app registry, `availableApps`, `isManager`, `isSessionInvalid`)                  | guestlist/vouchers                |
| User API service                                                                                                                 | identical in all three            |
| Formatters (date, currency, `getQuery`/`clone`) and helpers (`yesNo`, `downloadBlob`/`downloadFile`, `isProduction`)             | guestlist                         |
| i18n setup (default language and cookie key per app)                                                                             | apps' `language.js`               |
| Router guard (auth, profile, permission and module checks)                                                                       | guestlist `router/before-each.js` |
| Sentry setup                                                                                                                     | identical in all three            |

## Phase 2: shared UI

- Layout shell (`AppView`) and Sidebar with slots for app links and a switcher.
- App switcher, user menu (theme, language), language switcher, confirm modal.
- Organization/event switcher, backed by a context store that each app gives its own fetch function.
- Error, not found, loading and "no organizations" views.
- The apps' `general.store.js` splits into a UI store (theme, sidebar) and the context store.

## Phase 3: styles

- Shared SCSS variables (`--olaii-*`, per-app brand colors matching `olaii-web-common`), `_view`, `_buttons`, `_spacing`.
- Bootstrap is removed. Only its grid is kept, in `src/styles/grid.scss` (container, row, col, order, offset;
  done in Phase 0), imported by apps as `vue3-olaii-common/styles/grid.scss`.
- The apps still use Bootstrap's flex (`d-flex`, `justify-content-*`, `align-items-*`), spacing (`m*-*`, `p*-*`) and
  `text-left/right/center` classes. Before each app drops its `_bootstrap.scss` (Phase 4), those uses move to the
  shared `_spacing.scss` helpers or to component styles.

## Phase 4: migrate the apps

Guestlist first (most complete copies), then vouchers, then pass (diverged most). Each migration deletes the app's
local copies.

## Not in the library

App-specific enums, sandbox views, domain API services; the unused parts of `olaii-web-common` (login screens,
dialog/popup, theme service).

## Open decisions

- **Registry:** public npm (like `olaii-web-common`), GitHub Packages, or installing from git tags. `package.json`
  stays `"private": true` until this is decided.
- **Apps to Vite:** moving the apps from vue-cli to Vite is a separate, later step; the library doesn't require it.
