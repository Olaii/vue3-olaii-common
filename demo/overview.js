// What the library offers, for the demo's overview page. Every export of src/index.js needs an entry here:
// demo/overview.spec.js fails when an export is missing or an entry names something that isn't exported.
// Styles and the Sentry entry are separate imports, so they are listed with `importFrom` and not checked.
// Each group is a page of the demo (/:organizationId/library/<slug>), with its icon in the sidebar.

export const groups = [
  {
    title: "Setup",
    slug: "setup",
    icon: "icon-settings",
    summary: "The plugin and access to the app's options.",
    items: [
      {
        name: "createOlaiiCommon",
        file: "src/index.js",
        description:
          "Vue plugin that configures the library for an app: app id, API URLs, gettext, context.",
      },
      {
        name: "getOlaiiOptions",
        file: "src/options.js",
        description: "The app's options, for services, stores and router guards.",
      },
      {
        name: "useOlaiiOptions",
        file: "src/options.js",
        description: "The app's options inside components.",
      },
      {
        name: "getNice",
        file: "src/options.js",
        description: "The vue3-nice-elements API ($nice) for notifications and toasts, or null.",
      },
      {
        name: "OLAII_OPTIONS_KEY",
        file: "src/options.js",
        description: "Injection key the options are provided under.",
      },
    ],
  },
  {
    title: "Services",
    slug: "services",
    icon: "icon-server",
    summary: "Tokens, API requests, cookies and errors.",
    items: [
      {
        name: "TokenService",
        file: "src/services/token.service.js",
        description:
          "Access and refresh tokens in the shared .olaii.com cookies, refreshed once across tabs with a Web Lock.",
      },
      {
        name: "RequestService",
        file: "src/services/request.service.js",
        description:
          "API requests with the user's token: refresh before expiry, retry once on 401, paginated lists, files.",
      },
      {
        name: "http",
        file: "src/services/request.service.js",
        description:
          "The library's own axios instance, so the app's axios defaults stay untouched.",
      },
      {
        name: "StorageService",
        file: "src/services/storage.service.js",
        description:
          "Cookies shared by all Olaii apps (_dev suffix outside production), plus the selected organization and event.",
      },
      {
        name: "isLocal",
        file: "src/services/storage.service.js",
        description: "True on localhost and test.olaii.com.",
      },
      {
        name: "ErrorService",
        file: "src/services/error.service.js",
        description: "Turns API errors into translated messages and shows them as notifications.",
      },
      {
        name: "AppError",
        file: "src/services/error.service.js",
        description: "Error thrown by services: parsed code and message plus the original error.",
      },
      {
        name: "UserService",
        file: "src/services/user.service.js",
        description: "Profile of the logged in user from the auth API.",
      },
    ],
  },
  {
    title: "Pinia stores",
    slug: "stores",
    icon: "icon-database",
    summary: "User, UI preferences and the selected organization and event.",
    items: [
      {
        name: "useOlaiiAuthStore",
        file: "src/stores/auth.store.js",
        description: "User profile, permissions, role, the other apps the user can open, logout.",
      },
      {
        name: "useOlaiiUiStore",
        file: "src/stores/ui.store.js",
        description: "Theme, sidebar (mobile drawer and small rail) and language.",
      },
      {
        name: "useOlaiiContextStore",
        file: "src/stores/context.store.js",
        description:
          "Selected organization and event, their permissions and modules; restores the selection on load.",
      },
      {
        name: "OLAII_APPS",
        file: "src/stores/auth.store.js",
        description:
          "All Olaii apps with their URLs, colors and the permission that grants access.",
      },
      {
        name: "permissionsFromProfile",
        file: "src/stores/auth.store.js",
        description: "hasPass, hasVouchers, isAdmin, ... flags from a user profile.",
      },
      {
        name: "isSessionInvalid",
        file: "src/stores/auth.store.js",
        description:
          "True only for a missing or rejected token, so network errors don't log the user out.",
      },
    ],
  },
  {
    title: "Router",
    slug: "router",
    icon: "icon-git-branch",
    summary: "Guards and the routes every app has.",
    items: [
      {
        name: "createOlaiiAuthGuard",
        file: "src/router/auth-guard.js",
        description:
          "Sets the page title, loads the profile on the first page and lets the app check access.",
      },
      {
        name: "createOlaiiContextGuard",
        file: "src/router/context-guard.js",
        description:
          "Loads the organization and event from the URL (also on links to another one); 404 for unknown ones.",
      },
      {
        name: "createOlaiiRoutes",
        file: "src/router/routes.js",
        description: "The loading, error, no-organizations and 404 routes every app has.",
      },
    ],
  },
  {
    title: "Components",
    slug: "components",
    icon: "icon-layout",
    summary: "Layout, sidebar, switchers and the user menu.",
    items: [
      {
        name: "OlaiiAppLayout",
        file: "src/components/OlaiiAppLayout.vue",
        description: "Page layout: sidebar on the left, the page on the right.",
      },
      {
        name: "OlaiiSidebar",
        file: "src/components/OlaiiSidebar.vue",
        description:
          "App switcher, organization/event switcher, navigation links and the user menu.",
      },
      {
        name: "OlaiiAppSwitcher",
        file: "src/components/OlaiiAppSwitcher.vue",
        description: "The current app; opens the other Olaii apps the user can use.",
      },
      {
        name: "OlaiiContextSwitcher",
        file: "src/components/OlaiiContextSwitcher.vue",
        description: "Search and select an organization or event.",
      },
      {
        name: "OlaiiUserMenu",
        file: "src/components/OlaiiUserMenu.vue",
        description: "The user's name and email; theme, language and sign out.",
      },
      {
        name: "OlaiiLanguageSwitcher",
        file: "src/components/OlaiiLanguageSwitcher.vue",
        description: "Language dropdown with flags.",
        example: "language",
      },
    ],
  },
  {
    title: "Views",
    slug: "views",
    icon: "icon-monitor",
    summary: "Loading, error, no-organizations and 404 pages.",
    items: [
      {
        name: "OlaiiLoadingView",
        file: "src/views/OlaiiLoadingView.vue",
        description: "Entry page: loads the user and opens the right organization and event.",
      },
      {
        name: "OlaiiErrorView",
        file: "src/views/OlaiiErrorView.vue",
        description: "Error page with the message and code from the URL.",
        link: { name: "error", query: { message: "This is how errors look.", code: "DEMO" } },
      },
      {
        name: "OlaiiNoOrganizationsView",
        file: "src/views/OlaiiNoOrganizationsView.vue",
        description: "Shown when the account has no organizations.",
        link: { name: "no-organizations" },
      },
      {
        name: "OlaiiNotFoundView",
        file: "src/views/OlaiiNotFoundView.vue",
        description: "404 page.",
        link: { path: "/this-page-does-not-exist" },
      },
    ],
  },
  {
    title: "Language",
    slug: "language",
    icon: "icon-globe",
    summary: "Switching and remembering the language.",
    items: [
      {
        name: "setLanguage",
        file: "src/language.js",
        description: "Switches gettext's language and saves it in the app's language cookie.",
      },
      {
        name: "getSavedLanguage",
        file: "src/language.js",
        description: "The saved language, or the app's default.",
      },
    ],
  },
  {
    title: "Helpers",
    slug: "helpers",
    icon: "icon-tool",
    summary: "Formatting, notifications, clipboard and downloads.",
    items: [
      {
        name: "formatCurrency",
        file: "src/utils/format.js",
        description: "Amount in euros, Slovenian format.",
        example: "currency",
      },
      {
        name: "formatDate",
        file: "src/utils/format.js",
        description: "Date as d.M.yyyy.",
        example: "date",
      },
      {
        name: "formatDateWithTime",
        file: "src/utils/format.js",
        description: "Date and time, optionally with seconds and the day name.",
        example: "dateTime",
      },
      {
        name: "yesNo",
        file: "src/utils/common.js",
        description: "Translated Yes/No options for selects.",
      },
      {
        name: "searchYesNo",
        file: "src/utils/common.js",
        description: "Yes/No options filtered by a search text.",
      },
      {
        name: "arrayToMap",
        file: "src/utils/common.js",
        description: "{ id: item } map from an array.",
      },
      {
        name: "notifySuccess",
        file: "src/utils/common.js",
        description: "Green notification.",
        example: "notifySuccess",
      },
      {
        name: "notifyError",
        file: "src/utils/common.js",
        description: "Red notification.",
        example: "notifyError",
      },
      {
        name: "notifyToast",
        file: "src/utils/common.js",
        description: "Short message at the bottom of the page, optionally colored by type.",
        example: "notifyToast",
      },
      {
        name: "copyToClipboard",
        file: "src/utils/common.js",
        description:
          "Copies text and shows a toast; also works where the Clipboard API isn't available.",
        example: "copyToClipboard",
      },
      {
        name: "downloadBlob",
        file: "src/utils/common.js",
        description: "Saves a Blob as a file.",
      },
      {
        name: "downloadFile",
        file: "src/utils/common.js",
        description: "Saves raw response data as a file.",
      },
    ],
  },
  {
    title: "Sentry and styles",
    slug: "styles",
    icon: "icon-droplet",
    summary: "Sentry and the shared styles.",
    items: [
      {
        name: "initSentry",
        file: "src/sentry.js",
        importFrom: "vue3-olaii-common/sentry",
        description: "Starts Sentry with the settings all apps use. Needs @sentry/vue.",
      },
      {
        name: "styles/index.scss",
        file: "src/styles/index.scss",
        importFrom: "vue3-olaii-common/styles/index.scss",
        description:
          "All shared styles: variables, Inter font, page basics, grid and helper classes.",
      },
      {
        name: "styles/variables.scss",
        file: "src/styles/variables.scss",
        importFrom: "vue3-olaii-common/styles/variables.scss",
        description: "CSS variables with each app's brand colors and the dark theme.",
      },
      {
        name: "styles/grid.scss",
        file: "src/styles/grid.scss",
        importFrom: "vue3-olaii-common/styles/grid.scss",
        description:
          "12-column grid: container, row, col-md-6, order, offset (same classes as Bootstrap 4).",
      },
      {
        name: "styles/utilities.scss",
        file: "src/styles/utilities.scss",
        importFrom: "vue3-olaii-common/styles/utilities.scss",
        description:
          "Helper classes the apps use: spacing (mt-3, px-2, gap-1), text-right, d-flex, grow, clickable, ...",
      },
      {
        name: "styles/common.scss",
        file: "src/styles/common.scss",
        importFrom: "vue3-olaii-common/styles/common.scss",
        description: "Shared components: the .box card and the .view-wrapper page layout.",
      },
      {
        name: "style.css",
        file: "dist/olaii-common.css",
        importFrom: "vue3-olaii-common/style.css",
        description: "The components' own styles.",
      },
    ],
  },
];
