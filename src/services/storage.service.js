import VueCookies from "vue-cookies";
import { getOlaiiOptions, peekOlaiiOptions } from "../options";

// Cookies on .olaii.com are shared by all Olaii apps (Vue and AngularJS), so names and settings must stay the same.

export function isLocal() {
  const hostname = document.location.hostname;
  return hostname == "localhost" || hostname == "0.0.0.0" || hostname == "test.olaii.com";
}

function appKey(name) {
  return `olaii_${getOlaiiOptions().appId}_${name}`;
}

const StorageService = {
  cookieSettings() {
    const local = isLocal();
    return {
      expires: "3m",
      domain: ".olaii.com",
      path: "/",
      sameSite: local ? "Strict" : "None",
      secure: !local,
    };
  },

  remove(key) {
    const { path, domain } = this.cookieSettings();
    VueCookies.remove(this._handleKey(key), path, domain);
  },

  save(key, value) {
    if (value === undefined) return this.remove(key);
    const { expires, path, domain, secure, sameSite } = this.cookieSettings();
    VueCookies.set(this._handleKey(key), value, expires, path, domain, secure, sameSite);
  },

  get(key) {
    return VueCookies.get(this._handleKey(key));
  },

  // Development cookies get a "_dev" suffix, so they don't clash with production ones on .olaii.com
  _handleKey(key) {
    const newKey = String(key);
    return peekOlaiiOptions()?.production ? newKey : `${newKey}_dev`;
  },

  // Selected organization and event, per app (e.g. "olaii_guestlist_organization_id")
  getOrganization() {
    return this.get(appKey("organization_id"));
  },
  setOrganization(organizationId) {
    return this.save(appKey("organization_id"), organizationId);
  },
  removeOrganization() {
    return this.remove(appKey("organization_id"));
  },

  getEvent() {
    return this.get(appKey("event_id"));
  },
  setEvent(eventId) {
    return this.save(appKey("event_id"), eventId);
  },
  removeEvent() {
    return this.remove(appKey("event_id"));
  },
};

export default StorageService;
