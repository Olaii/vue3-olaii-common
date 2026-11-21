import { createApp } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { createOlaiiCommon } from "../index";

export const OPTIONS = {
  appId: "guestlist",
  apiURL: "https://api.test/",
  authURL: "https://auth.test/",
  title: "Guestlist",
};

/** Installs the library (and Pinia) in a fresh app */
export function install(options = {}) {
  const app = createApp({});
  const pinia = createPinia();
  app.use(pinia);
  setActivePinia(pinia);
  app.use(createOlaiiCommon({ ...OPTIONS, ...options }));
  return app;
}

function base64url(object) {
  return btoa(JSON.stringify(object)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

/** Unsigned JWT for user `u`, expiring in `expiresIn` seconds */
export function jwt(u = "user@olaii.com", expiresIn = 300) {
  const exp = Math.floor(Date.now() / 1000) + expiresIn;
  return `${base64url({ alg: "HS256" })}.${base64url({ u, exp })}.signature`;
}

/** axios adapter answering from a handler: (config) => ({ status, data }) */
export function adapter(handler) {
  return async (config) => {
    const { status = 200, data = {} } = await handler(config);
    const response = { status, data, headers: {}, config, statusText: String(status) };
    if (status >= 400) {
      const error = new Error(`Request failed with status code ${status}`);
      error.response = response;
      error.config = config;
      throw error;
    }
    return response;
  };
}
