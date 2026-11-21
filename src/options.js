import { inject } from "vue";

export const OLAII_OPTIONS_KEY = Symbol("olaiiCommonOptions");

const REQUIRED = ["appId", "apiURL", "authURL"];

const DEFAULTS = {
  production: false,
  debug: false,
};

let currentOptions = null;

function withTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

/**
 * Validates and normalizes the options an app passes to createOlaiiCommon.
 *
 * @param {object} options
 * @param {string} options.appId App identifier, e.g. "pass", "vouchers", "guestlist"
 * @param {string} options.apiURL Base URL of the app's API
 * @param {string} options.authURL Base URL of the auth API
 * @param {boolean} [options.production] Production cookies (no "_dev" suffix)
 * @param {boolean} [options.debug] Log library internals to the console
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
  });
}

export function setOptions(options) {
  currentOptions = options;
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
