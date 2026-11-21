# vue3-olaii-common

Shared services, Pinia stores, components and styles for the Olaii Vue 3 admin apps: pass (`olaii-pass-vue`),
vouchers (`olaii-vouchers-vue`) and guestlist (`olaii-guestlist-vue-2`). The Vue counterpart of `olaii-web-common`
(AngularJS). Roadmap and decisions: [PLAN.md](PLAN.md).

## Commands

```bash
yarn dev          # demo app (demo/) on :9100
yarn test         # Vitest
yarn lint         # ESLint with --fix (lint:check without)
yarn format       # Prettier (format:check without)
yarn build        # dist/olaii-common.js, dist/sentry.js
```

Before finishing a change, run `yarn lint:check`, `yarn format:check`, `yarn test` and `yarn build`.

## Code rules

- **Simple, readable, maintainable.** Prefer plain functions and objects over abstractions. No clever one-liners,
  no premature generalization; add an option only when an app needs it.
- **Comment the why.** Add a short comment to complex functions and to non-obvious steps (token refresh, cookie
  sharing, error parsing, ordering that matters). Don't comment what the code already says.
- **Small files, one concern each.** Services in `src/services/`, Pinia stores in `src/stores/`, router helpers in
  `src/router/`, helpers in `src/utils/`, components in `src/components/`, styles in `src/styles/`.
- **JavaScript, not TypeScript**, like the apps. Document public functions and options with JSDoc.
- **Same style as the apps:** Prettier `printWidth 100`, double quotes, semicolons, `trailingComma es5`; ESLint
  `vue3-essential` + `eslint:recommended` + prettier, with `vue/order-in-components`. Don't change these configs
  without changing the apps too.
- `console.*` only behind `getOlaiiOptions().debug` or for real warnings/errors, with a `[MODULE]` prefix.

## Architecture rules

- **No app imports.** The library never imports an app's router, gettext, stores or `main.js`, and never reads
  `process.env` / `import.meta.env`. Everything app-specific comes from `createOlaiiCommon(options)`; read it with
  `getOlaiiOptions()` (services, stores, guards) or `useOlaiiOptions()` (components).
- **State lives in Pinia setup stores** (`defineStore("olaii-...", () => { ... })`), named `useOlaii<Name>Store`.
  No Vuex, no module-level reactive state.
- **Translations go through `src/i18n.js`** (`$gettext`, `$pgettext`). Call them at runtime, never at import time,
  and keep the calls literal (`$pgettext("error", "Not found")`) so the apps' `vue-gettext-extract` finds them.
- **UI feedback goes through vue3-nice-elements** via `getNice()`; it can be `null`, so guard calls (`getNice()?.`).
- **Cookie compatibility.** Cookies on `.olaii.com` are shared with every Olaii app, including the AngularJS ones.
  Never rename `olaii_access_token`, `olaii_refresh_token`, the `_dev` suffix or the cookie settings.
- **Dependencies:** vue, pinia, vue-router, vue3-gettext, vue3-nice-elements (and optional @sentry/vue) are peer
  dependencies. Everything in `dependencies`/`peerDependencies` stays external in the build. Keep ranges wide enough
  for all three apps (e.g. pinia 2 and 3, vouchers is on pinia 2).
- **Public API** is what `src/index.js` (and `src/sentry.js`) export. Adding to it is fine; renaming or removing
  is a breaking change: note it in `CHANGELOG.md` and bump the major version.
- **Domain code stays in the apps**: app-specific enums, permission lists, API services for app resources.
- Full page navigation goes through `src/navigation.js` (`redirect`, `reload`) so tests can mock it.

## Tests

- Vitest with jsdom; specs sit next to the code as `*.spec.js`.
- `src/test/setup.js` replaces vue-cookies with an in-memory `cookies` map and mocks navigation.
- `src/test/helpers.js`: `install(options)` sets up the library with Pinia, `jwt()` makes test tokens,
  `adapter(handler)` fakes HTTP responses (`http.defaults.adapter` for the API, `axios.defaults.adapter` for the
  token refresh).
- New services, stores and helpers get tests for their main behaviour and for the edge cases they exist to handle.

## Docs

- Update `README.md` when options or exports change, `CHANGELOG.md` (Unreleased section) for every user-facing
  change, and `PLAN.md` when a phase or decision changes.
