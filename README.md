# vue3-olaii-common

Shared services, Pinia stores and components for the Olaii Vue 3 admin apps (pass, vouchers,
guestlist). The Vue counterpart of `olaii-web-common`. See [PLAN.md](PLAN.md) for the roadmap.

## Usage

```js
import { createOlaiiCommon } from "vue3-olaii-common";

app.use(pinia);
app.use(
  createOlaiiCommon({
    appId: "guestlist",
    apiURL: process.env.VUE_APP_BASE_API,
    authURL: process.env.VUE_APP_AUTH_API,
    production: process.env.VUE_APP_PRODUCTION === "true",
  })
);
```

| Option       | Required | Description                                                     |
| ------------ | -------- | --------------------------------------------------------------- |
| `appId`      | yes      | App identifier (`pass`, `vouchers`, `guestlist`, ...)           |
| `apiURL`     | yes      | Base URL of the app's API                                       |
| `authURL`    | yes      | Base URL of the auth API                                        |
| `production` | no       | Production cookies, without the `_dev` suffix (default `false`) |
| `debug`      | no       | Log library internals (default `false`)                         |

Peer dependencies the app must install: `vue`, `pinia`, `vue-router`, `vue3-gettext`,
`vue3-nice-elements`.

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
