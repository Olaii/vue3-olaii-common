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

// Router
export { createOlaiiAuthGuard } from "./router/auth-guard";

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

      TokenService.readFromCookies();
      if (normalized.gettext) normalized.gettext.current = getSavedLanguage();

      // eslint-disable-next-line no-console
      if (normalized.debug) console.log("[OlaiiCommon] Options:", normalized);
    },
  };
}
