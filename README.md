# vue3-olaii-common

Shared services, Pinia stores and components for the Olaii Vue 3 admin apps (pass, vouchers,
guestlist). The Vue counterpart of `olaii-web-common`. See [PLAN.md](PLAN.md) for the roadmap.

## Usage

```js
import { createPinia } from "pinia";
import { createOlaiiCommon, createOlaiiAuthGuard } from "vue3-olaii-common";
import { initSentry } from "vue3-olaii-common/sentry";

app.use(createPinia());
app.use(gettext);
app.use(router);
app.use(NicePlugin, { router, gettext });
app.use(
  createOlaiiCommon({
    appId: "guestlist",
    apiURL: process.env.VUE_APP_BASE_API,
    authURL: process.env.VUE_APP_AUTH_API,
    production: process.env.VUE_APP_PRODUCTION === "true",
    title: process.env.VUE_APP_TITLE,
    baseURL: process.env.BASE_URL,
    gettext,
    errorCodes: ($pgettext) => ({
      guest_limit_reached: $pgettext("error", "Guest limit for this group reached"),
    }),
    onLogout: () => useGeneralStore().cleanStore(),
  })
);
router.beforeEach(createOlaiiAuthGuard({ checkAccess: (to, authStore) => true }));
initSentry(app, router, { dsn: process.env.VUE_APP_SENTRY });
```

| Option              | Required | Description                                                                           |
| ------------------- | -------- | ------------------------------------------------------------------------------------- |
| `appId`             | yes      | App identifier (`pass`, `vouchers`, `guestlist`, ...)                                 |
| `apiURL`            | yes      | Base URL of the app's API                                                             |
| `authURL`           | yes      | Base URL of the auth API                                                              |
| `production`        | no       | Production cookies, without the `_dev` suffix (default `false`)                       |
| `debug`             | no       | Log library internals (default `false`)                                               |
| `title`             | no       | App title; page titles become `<route title> • <title>`                               |
| `baseURL`           | no       | Public path of the app (`process.env.BASE_URL`, default `/`)                          |
| `gettext`           | no       | The app's vue3-gettext instance; the library translates through it                    |
| `defaultLanguage`   | no       | Language when none is saved (default `sl`)                                            |
| `languageCookieKey` | no       | Language cookie (default `olaii_<appId>_language`; vouchers uses `vouchers_language`) |
| `errorCodes`        | no       | `($pgettext) => ({ code: message })`, app-specific API error messages                 |
| `onLogout`          | no       | Called on logout, e.g. to clean the app's own stores                                  |

Peer dependencies the app must install: `vue`, `pinia`, `vue-router`, `vue3-gettext`,
`vue3-nice-elements`, and `@sentry/vue` when using `vue3-olaii-common/sentry`.

### What's exported

- **Services:** `TokenService`, `StorageService`, `RequestService` (+ its axios instance `http`),
  `ErrorService`, `AppError`, `UserService`
- **Pinia store:** `useOlaiiAuthStore` (profile, `permissions`, `role`/`getRole`, `isManager`,
  `availableApps`, `logout`), plus `OLAII_APPS`
- **Router:** `createOlaiiAuthGuard({ errorRoute, checkAccess })`
- **i18n:** `setLanguage`, `getSavedLanguage`
- **Utils:** `formatCurrency`, `formatDate`, `formatDateWithTime`, `yesNo`, `searchYesNo`,
  `arrayToMap`, `notifySuccess`, `notifyError`, `downloadBlob`, `downloadFile`, `isLocal`
- **Sentry** (`vue3-olaii-common/sentry`): `initSentry(app, router, { dsn })`

### Translations

The library's strings are translated through the app's gettext instance. Add the library to the
app's `gettext.config.js` sources: `"../node_modules/vue3-olaii-common/src/**/*.{js,vue}"`.

## Styles

The Bootstrap 4 grid (container, row, col, order, offset), without the rest of Bootstrap:

```scss
@import "vue3-olaii-common/styles/grid.scss";
```

## Development

```bash
yarn install
yarn dev          # demo app on :9100 (https://test.olaii.com:9100 when ../test.olaii.com*.pem exist)
yarn test         # Vitest
yarn lint         # ESLint (fix)
yarn format       # Prettier
yarn build        # dist/olaii-common.js
```
