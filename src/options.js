import { inject } from "vue";

export const OLAII_OPTIONS_KEY = Symbol("olaiiCommonOptions");

const REQUIRED = ["appId", "apiURL", "authURL"];

const DEFAULTS = {
  production: false,
  debug: false,
  title: "Olaii",
  baseURL: "/",
  defaultLanguage: "sl",
  languageCookieKey: null,
  errorCodes: null,
  onLogout: null,
};

let currentOptions = null;
let currentApp = null;

function withTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

/**
 * Validates and normalizes the options an app passes to createOlaiiCommon.
 *
 * @param {object} options
 * @param {string} options.appId App identifier: "pass", "vouchers", "guestlist", ...
 * @param {string} options.apiURL Base URL of the app's API
 * @param {string} options.authURL Base URL of the auth API
 * @param {boolean} [options.production] Production cookies (no "_dev" suffix)
 * @param {boolean} [options.debug] Log library internals to the console
 * @param {string} [options.title] App title, used for the document title
 * @param {string} [options.baseURL] Public path the app is served from (process.env.BASE_URL)
 * @param {object} [options.gettext] The app's vue3-gettext instance
 * @param {string} [options.defaultLanguage] Language when none is saved (default "sl")
 * @param {string} [options.languageCookieKey] Cookie that keeps the language (default "olaii_<appId>_language")
 * @param {Function} [options.errorCodes] ($pgettext) => ({ code: message }), app-specific error messages
 * @param {Function} [options.onLogout] Called on logout, e.g. to clean app stores
 */
export function normalizeOptions(options = {}) {
  const missing = REQUIRED.filter((key) => !options[key]);
  if (missing.length) {
    throw new Error(`[OlaiiCommon] Missing required option(s): ${missing.join(", ")}`);
  }

  return Object.freeze({
    ...DEFAULTS,
    ...options,
    apiURL: withTrailingSlash(options.apiURL),
    authURL: withTrailingSlash(options.authURL),
    baseURL: withTrailingSlash(options.baseURL || DEFAULTS.baseURL),
    languageCookieKey: options.languageCookieKey || `olaii_${options.appId}_language`,
  });
}

export function setOptions(options, app = null) {
  currentOptions = options;
  currentApp = app;
}

/** Options, or null before createOlaiiCommon is installed (for code that also runs before install) */
export function peekOlaiiOptions() {
  return currentOptions;
}

/**
 * Options for code outside components (services, stores, router guards).
 * Throws if createOlaiiCommon has not been installed yet.
 */
export function getOlaiiOptions() {
  if (!currentOptions) {
    throw new Error("[OlaiiCommon] app.use(createOlaiiCommon(...)) has not been called");
  }
  return currentOptions;
}

/** Options inside components and setup functions. */
export function useOlaiiOptions() {
  return inject(OLAII_OPTIONS_KEY, null) || getOlaiiOptions();
}

/** The vue3-nice-elements API ($nice), or null when NicePlugin is not installed. */
export function getNice() {
  return currentApp?.config.globalProperties.$nice || null;
}
