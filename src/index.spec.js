import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { createGettext } from "vue3-gettext";
import { createOlaiiCommon, getOlaiiOptions, setLanguage, useOlaiiOptions } from "./index";
import { cookies } from "./test/setup";
import { install } from "./test/helpers";

const options = {
  appId: "guestlist",
  apiURL: "https://guestlist-api.dev.olaii.com",
  authURL: "https://auth.dev.olaii.com/",
};

describe("createOlaiiCommon", () => {
  it("throws when required options are missing", () => {
    expect(() => createOlaiiCommon({ appId: "pass" })).toThrow(/apiURL, authURL/);
  });

  it("normalizes URLs and applies defaults", () => {
    install(options);
    expect(getOlaiiOptions()).toMatchObject({
      apiURL: "https://guestlist-api.dev.olaii.com/",
      authURL: "https://auth.dev.olaii.com/",
      production: false,
      baseURL: "/",
      defaultLanguage: "sl",
      languageCookieKey: "olaii_guestlist_language",
    });
    // Selects the app's brand colors in styles/variables.scss
    expect(document.documentElement.dataset.olaiiApp).toBe("guestlist");
  });

  it("provides the options to components", () => {
    let injected;
    const Child = defineComponent({
      setup() {
        injected = useOlaiiOptions();
        return () => h("div");
      },
    });
    mount(Child, { global: { plugins: [createOlaiiCommon({ ...options, appId: "pass" })] } });
    expect(injected.appId).toBe("pass");
    expect(Object.isFrozen(injected)).toBe(true);
  });

  it("restores and saves the language in the app's cookie", () => {
    const gettext = createGettext({ availableLanguages: { en: "English", sl: "Slovenščina" } });
    cookies.set("vouchers_language", "en");
    install({ gettext, production: true, languageCookieKey: "vouchers_language" });
    expect(gettext.current).toBe("en");

    setLanguage("sl");
    expect(gettext.current).toBe("sl");
    expect(cookies.get("vouchers_language")).toBe("sl");
  });
});
