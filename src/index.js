import { normalizeOptions, setOptions, OLAII_OPTIONS_KEY } from "./options";

export { getOlaiiOptions, useOlaiiOptions, OLAII_OPTIONS_KEY } from "./options";

/**
 * Vue plugin that configures the shared library for an app.
 *
 * @example
 * app.use(
 *   createOlaiiCommon({
 *     appId: "guestlist",
 *     apiURL: process.env.VUE_APP_BASE_API,
 *     authURL: process.env.VUE_APP_AUTH_API,
 *     production: process.env.VUE_APP_PRODUCTION === "true",
 *   })
 * );
 */
export function createOlaiiCommon(options) {
  const normalized = normalizeOptions(options);

  return {
    install(app) {
      setOptions(normalized);
      app.provide(OLAII_OPTIONS_KEY, normalized);
      // eslint-disable-next-line no-console
      if (normalized.debug) console.log("[OlaiiCommon] Options:", normalized);
    },
  };
}
