import { describe, expect, it } from "vitest";
import { createApp, defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { createOlaiiCommon, getOlaiiOptions, useOlaiiOptions } from "./index";

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
    createApp({}).use(createOlaiiCommon(options));
    expect(getOlaiiOptions()).toEqual({
      ...options,
      apiURL: "https://guestlist-api.dev.olaii.com/",
      production: false,
      debug: false,
    });
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
});
