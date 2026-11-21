// Separate entry (vue3-olaii-common/sentry), so apps without @sentry/vue can use the rest of the library.
/* eslint-disable no-console */
import * as Sentry from "@sentry/vue";

/**
 * Starts Sentry with the settings all Olaii apps use. Does nothing without a DSN.
 *
 * @example
 * initSentry(app, router, { dsn: process.env.VUE_APP_SENTRY });
 */
export function initSentry(app, router, { dsn, ...overrides } = {}) {
  if (!dsn) {
    console.log("[SENTRY] Sentry is disabled");
    return null;
  }

  return Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/olaii\.com\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    ...overrides,
  });
}
