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
| `context`           | no       | Organization/event selection, see below                                               |

Peer dependencies the app must install: `vue`, `pinia`, `vue-router`, `vue3-gettext`,
`vue3-nice-elements`, and `@sentry/vue` when using `vue3-olaii-common/sentry`.

### What's exported

- **Services:** `TokenService`, `StorageService`, `RequestService` (+ its axios instance `http`),
  `ErrorService`, `AppError`, `UserService`
- **Pinia stores:** `useOlaiiAuthStore` (profile, `permissions`, `role`/`getRole`, `isManager`,
  `availableApps`, `logout`), `useOlaiiUiStore` (theme, sidebar, language),
  `useOlaiiContextStore` (organization, event, `permissions`, `modules`, `restore`), plus `OLAII_APPS`
- **Router:** `createOlaiiAuthGuard({ errorRoute, checkAccess })`, `createOlaiiContextGuard()`,
  `createOlaiiRoutes()`
- **Components:** `OlaiiAppLayout`, `OlaiiSidebar`, `OlaiiAppSwitcher`, `OlaiiContextSwitcher`,
  `OlaiiUserMenu`, `OlaiiLanguageSwitcher`
- **Views:** `OlaiiLoadingView`, `OlaiiErrorView`, `OlaiiNotFoundView`, `OlaiiNoOrganizationsView`
- **i18n:** `setLanguage`, `getSavedLanguage`
- **Utils:** `formatCurrency`, `formatDate`, `formatDateWithTime`, `yesNo`, `searchYesNo`,
  `arrayToMap`, `notifySuccess`, `notifyError`, `notifyToast`, `copyToClipboard`, `downloadBlob`, `downloadFile`, `isLocal`
- **Sentry** (`vue3-olaii-common/sentry`): `initSentry(app, router, { dsn })`

### Layout, organization and event

Apps with organizations pass `context` with their own API functions:

```js
createOlaiiCommon({
  // ...
  context: {
    fetchOrganizations: (search) => ApiService.organizations.getAll({ search }),
    fetchOrganization: (id) => ApiService.organizations.get(id),
    // Only apps with events:
    fetchEvents: (organizationId) => ApiService.events.getAll(organizationId),
    fetchEvent: (organizationId, id) => ApiService.events.get(organizationId, id),
    search: (text) => ApiService.internal.find(text), // [{ type: "ORGANIZATION" | "EVENT", ... }]
    organizationRoute: "app.organizations.events.all",
    eventRoute: "app.organizations.events.dashboard",
  },
});
```

Routes and layout:

```js
import "vue3-olaii-common/style.css";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...createOlaiiRoutes(), // /, /loading, /error, /no-organizations, 404
    {
      path: "/:organizationId",
      component: OlaiiAppLayout,
      props: { links }, // sidebar navigation, see OlaiiSidebar
      children: [],
    },
  ],
});
```

Guards, in this order (the context guard loads the organization/event from the URL, also when only the
params change, so it's a `beforeEach` and not a `beforeEnter`):

```js
router.beforeEach(createOlaiiAuthGuard());
router.beforeEach(createOlaiiContextGuard());
```

Sidebar links: `{ name, path (route name), icon, params?, query?, hidden?(), disabled?() }` and
titles `{ type: "TITLE", name }`. Links get `organizationId`/`eventId` params automatically when their
route uses them. Route `meta.title` may be a function, so it's translated when the page opens.

The app's root component still renders vue3-nice-elements' `NiceToast`, `NiceNotifications` and
`NiceSvgs` (the `logo` and `icon-*` icons the components use).

### Translations

The library's strings are translated through the app's gettext instance. Add the library to the
app's `gettext.config.js` sources: `"../node_modules/vue3-olaii-common/src/**/*.{js,vue}"`.

## Styles

The shared styles: CSS variables (with each app's brand colors and the dark theme), the Inter font,
page basics, a 12-column grid, shared components and helper classes. Import them once at the top of
the app's `main.scss`:

```scss
@import "vue3-olaii-common/styles/index.scss";
```

| File                    | Contents                                                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles/variables.scss` | CSS variables, brand colors per `appId`, dark theme                                                                                                                                            |
| `styles/base.scss`      | Inter font, page basics, scrollbars                                                                                                                                                            |
| `styles/grid.scss`      | `container`, `row`, `col-*`, `order-*`, `offset-*` (same classes as the Bootstrap 4 grid)                                                                                                      |
| `styles/common.scss`    | `.box` card, `.view-wrapper` page layout                                                                                                                                                       |
| `styles/utilities.scss` | Spacing (`mt-3`, `px-2`, `m-auto`, `gap-1`), `text-left/right/center`, `text-bold`, `text-small`, `text-muted`, `no-wrap`, `d-flex`, `d-none`, `d-xs-none`, `grow`, `w-full`, `clickable`, ... |

The library has no Bootstrap dependency: the grid and utilities keep Bootstrap 4's class names and
values, so the apps' templates keep working when they drop their `_bootstrap.scss`.

The brand colors follow `appId` (`createOlaiiCommon` sets `<html data-olaii-app="...">`), and the
dark theme follows `useOlaiiUiStore` (`dark` class on `<body>`). The library's views use these
classes, so apps need `styles/index.scss` for them to look right.

The components' own styles are in `vue3-olaii-common/style.css`.

## Development

The demo's **Library** pages (start page `/1/overview`) list every export with a short description
and live examples: an overview with a search, a page per section and the icons. The list is
`demo/overview.js`.

```bash
yarn install
yarn dev          # demo app on :9100 (https://test.olaii.com:9100 when ../test.olaii.com*.pem exist)
DEMO_LOCALHOST=1 yarn dev  # demo on http://localhost:9100 with a made-up user
yarn test         # Vitest
yarn lint         # ESLint (fix)
yarn format       # Prettier
yarn build        # dist/olaii-common.js
```
