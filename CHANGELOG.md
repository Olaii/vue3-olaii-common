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
