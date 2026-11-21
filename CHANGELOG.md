# Changelog

All notable changes to this project are documented here. Versions follow
[semantic versioning](https://semver.org/).

## Unreleased

- Rewrite from scratch (see `PLAN.md`).
- Vite 8 library build (ES module), peer dependencies on vue, pinia, vue-router, vue3-gettext and
  vue3-nice-elements.
- ESLint and Prettier configured with the same rules as the pass, vouchers and guestlist apps.
- Vitest test setup and a demo app (`yarn dev`).
- Bootstrap grid only (`vue3-olaii-common/styles/grid.scss`); the rest of Bootstrap is dropped.
- `createOlaiiCommon(options)` plugin with `getOlaiiOptions()` / `useOlaiiOptions()`.
- Core services ported from the apps: `TokenService`, `StorageService`, `RequestService`,
  `ErrorService`/`AppError`, `UserService`.
- `useOlaiiAuthStore` Pinia store, `createOlaiiAuthGuard` router guard, language helpers,
  formatters and common helpers, `vue3-olaii-common/sentry` entry.
- Shared UI: `useOlaiiUiStore` and `useOlaiiContextStore` Pinia stores, `OlaiiAppLayout`,
  `OlaiiSidebar`, `OlaiiAppSwitcher`, `OlaiiContextSwitcher`, `OlaiiUserMenu`,
  `OlaiiLanguageSwitcher`, the loading/error/404/no-organizations views, `createOlaiiRoutes` and
  `createOlaiiContextGuard`. Component styles ship as `vue3-olaii-common/style.css`.
- Shared styles `styles/index.scss`: CSS variables with per-app brand colors and dark theme, the Inter
  font and page basics (`styles/variables.scss`, `styles/base.scss`), plus the grid.
- `context.restore()` only restores a saved event for the organization it was saved with, and the
  context guard no longer selects an event on organization pages.
- `OlaiiAppSwitcher` opens and closes without delays: hover with a mouse, click or tap to toggle on
  touch screens.
- `styles/common.scss` with the apps' shared `.box` card class.
- Redesigned `OlaiiErrorView`: the logo above a `.box` card with the error, its code, "Try again" and
  "Back home", in the light and dark theme.
- Redesigned `OlaiiNoOrganizationsView` in the same style: shows the signed-in account, with "Sign out"
  and "Try again" (re-checks the organizations).
- Redesigned `OlaiiNotFoundView` in the same style, with "Go back" and "Back home". The error,
  no-organizations and 404 views share `OlaiiStatusPage`.
- `OlaiiSidebar` highlights only the link of the current page (or its parent page). A link to an
  empty-path child route no longer stays highlighted on every page under its parent.
- `OlaiiSidebar` shows a link whose route needs a missing param (e.g. an event page while no event is
  selected) as disabled, instead of failing to render.
- Demo: Overview page listing every component, service, store, helper and style with live examples.
- Demo: the overview is split into Library pages: an overview with a search and section cards, a page
  per section, and an icons page.
- `OlaiiAppSwitcher`: apps outside the Olaii list get the darker brand shade in the logo cell, like
  the Olaii apps. The demo's brand color is blue (`#3173ff`).
- `OlaiiContextSwitcher` searches with `NiceInput` and its built-in debounce. The demo's searches,
  icon tiles and "not described" warning use `NiceInput`, `NiceButton` and `NiceAlert`.
- `styles/utilities.scss`: the helper classes the apps use (spacing, text alignment, display, flex,
  text helpers, `clickable`), and `.view-wrapper` in `styles/common.scss`.
- The grid is generated with Sass instead of the copied Bootstrap CSS (same classes and values). The
  library has no Bootstrap code left.
- `copyToClipboard(text, { message })`: copies with the Clipboard API, falls back to the copy command
  on pages without it, and shows a toast (or an error).
- `notifyToast(text, type, options)` for toasts. Notifications and toasts (including `notifySuccess`,
  `notifyError`, `ErrorService.showError` and the logout toast) now use vue3-nice-elements' `notify()`
  instead of the deprecated `$nice.notification()` / `$nice.toast()`.
- `createOlaiiContextGuard` is registered with `router.beforeEach` (not `beforeEnter`), so it also
  loads the organization when only the URL params change. An organization or event in the URL that
  can't be loaded shows the 404 page instead of opening another organization; `restore()` got a
  `strict` option for this and no longer forgets a valid saved organization because of a bad URL.
- Success color is olaii-backoffice's green (`#49ae50` and its shades), also for vue3-nice-elements
  (`--nice-success-*`). The auth guard and loading view pass the error code to it.
