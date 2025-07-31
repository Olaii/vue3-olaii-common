// Vue cookies
import VueCookies from "vue-cookies";

function isLocal() {
  return (
    document.location.hostname == "localhost" ||
    document.location.hostname == "0.0.0.0" ||
    document.location.hostname == "test.olaii.com"
  );
}

const OlaiiStorageService = {
  cookieSettings: {
    expires: "3m",
    domain: ".olaii.com",
    path: "/",
    sameSite: isLocal() ? "Strict" : "None",
    secure: !isLocal(),
  },

  init (isProduction) {
    this.isProduction = isProduction;
  },

  remove(key) {
    key = OlaiiStorageService._handleKey(key);
    VueCookies.remove(
      key,
      OlaiiStorageService.cookieSettings.path,
      OlaiiStorageService.cookieSettings.domain
    );
  },

  save(key, value) {
    if (value === undefined) {
      OlaiiStorageService.remove(key);
    } else {
      key = OlaiiStorageService._handleKey(key);
      VueCookies.set(
        key,
        value,
        OlaiiStorageService.cookieSettings.expires,
        OlaiiStorageService.cookieSettings.path,
        OlaiiStorageService.cookieSettings.domain,
        OlaiiStorageService.cookieSettings.secure,
        OlaiiStorageService.cookieSettings.sameSite
      );
    }
  },

  get(key) {
    key = OlaiiStorageService._handleKey(key);
    return VueCookies.get(key);
  },

  _handleKey(key) {
    let newKey = String(key);
    if (!this.isProduction) newKey += "_dev";
    return newKey;
  },
};

export default OlaiiStorageService;
