import { normalizeOptions, setOptions, OLAII_OPTIONS_KEY } from "./options";
import TokenService from "./services/token.service";
import { getSavedLanguage } from "./language";

// Config
export { getOlaiiOptions, useOlaiiOptions, getNice, OLAII_OPTIONS_KEY } from "./options";

// Services
export { default as StorageService, isLocal } from "./services/storage.service";
export { default as TokenService } from "./services/token.service";
export { default as RequestService, http } from "./services/request.service";
export { default as ErrorService, AppError } from "./services/error.service";
export { default as UserService } from "./services/user.service";

// Stores (Pinia)
export {
  useOlaiiAuthStore,
  OLAII_APPS,
  isSessionInvalid,
  permissionsFromProfile,
} from "./stores/auth.store";
export { useOlaiiUiStore } from "./stores/ui.store";
export { useOlaiiContextStore } from "./stores/context.store";

// Router
export { createOlaiiAuthGuard } from "./router/auth-guard";
export { createOlaiiContextGuard } from "./router/context-guard";
export { createOlaiiRoutes } from "./router/routes";

// Components
export { default as OlaiiAppLayout } from "./components/OlaiiAppLayout.vue";
export { default as OlaiiSidebar } from "./components/OlaiiSidebar.vue";
export { default as OlaiiAppSwitcher } from "./components/OlaiiAppSwitcher.vue";
export { default as OlaiiContextSwitcher } from "./components/OlaiiContextSwitcher.vue";
export { default as OlaiiUserMenu } from "./components/OlaiiUserMenu.vue";
export { default as OlaiiLanguageSwitcher } from "./components/OlaiiLanguageSwitcher.vue";

// Views
export { default as OlaiiLoadingView } from "./views/OlaiiLoadingView.vue";
export { default as OlaiiErrorView } from "./views/OlaiiErrorView.vue";
export { default as OlaiiNotFoundView } from "./views/OlaiiNotFoundView.vue";
export { default as OlaiiNoOrganizationsView } from "./views/OlaiiNoOrganizationsView.vue";

// i18n
export { getSavedLanguage, setLanguage } from "./language";

// Utils
export { formatCurrency, formatDate, formatDateWithTime } from "./utils/format";
export {
  yesNo,
  searchYesNo,
  arrayToMap,
  notifySuccess,
  notifyError,
  notifyToast,
  copyToClipboard,
  downloadBlob,
  downloadFile,
} from "./utils/common";

/**
 * Vue plugin that configures the shared library for an app. Install it after Pinia and vue3-gettext.
 *
 * @example
 * app.use(
 *   createOlaiiCommon({
 *     appId: "guestlist",
 *     apiURL: process.env.VUE_APP_BASE_API,
 *     authURL: process.env.VUE_APP_AUTH_API,
 *     production: process.env.VUE_APP_PRODUCTION === "true",
 *     title: process.env.VUE_APP_TITLE,
 *     baseURL: process.env.BASE_URL,
 *     gettext,
 *   })
 * );
 */
export function createOlaiiCommon(options) {
  const normalized = normalizeOptions(options);

  return {
    install(app) {
      setOptions(normalized, app);
      app.provide(OLAII_OPTIONS_KEY, normalized);
      // Selects the app's brand colors in styles/variables.scss
      document.documentElement.dataset.olaiiApp = normalized.appId;

      TokenService.readFromCookies();
      if (normalized.gettext) normalized.gettext.current = getSavedLanguage();

      // eslint-disable-next-line no-console
      if (normalized.debug) console.log("[OlaiiCommon] Options:", normalized);
    },
  };
}
