import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import OlaiiErrorView from "./OlaiiErrorView.vue";
import OlaiiNoOrganizationsView from "./OlaiiNoOrganizationsView.vue";
import OlaiiNotFoundView from "./OlaiiNotFoundView.vue";
import TokenService from "../services/token.service";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { componentSetup, install } from "../test/helpers";
import { redirect } from "../navigation";

const Page = defineComponent({ render: () => h("div") });

// Mounts a view at a URL, with nice-elements stubbed but NiceButton rendered as a button
async function open(view, url) {
  const { router, global } = componentSetup([
    { path: "/loading", name: "loading", component: Page },
    { path: "/view", component: view },
  ]);
  global.stubs.NiceButton = {
    props: ["text"],
    emits: ["click"],
    template: "<button @click=\"$emit('click')\">{{ text }}</button>",
  };
  router.push(url);
  await router.isReady();
  const wrapper = mount({ template: "<router-view />" }, { global });
  await flushPromises();
  return { router, wrapper };
}

describe("OlaiiErrorView", () => {
  it("shows the title, message and code from the URL", async () => {
    install({ production: true });
    const { wrapper } = await open(OlaiiErrorView, "/view?title=Oops&message=Bad%20input&code=400");
    expect(wrapper.find("h1").text()).toBe("Oops");
    expect(wrapper.find(".message").text()).toBe("Bad input");
    expect(wrapper.find(".code").text()).toBe("Error code: 400");
  });

  it("falls back to a generic message and goes home", async () => {
    install({ production: true });
    const { wrapper, router } = await open(OlaiiErrorView, "/view");
    expect(wrapper.find("h1").text()).toBe("Something went wrong");
    expect(wrapper.find(".code").exists()).toBe(false);

    await wrapper.findAll("button")[1].trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.name).toBe("loading");
  });
});

describe("OlaiiNoOrganizationsView", () => {
  it("shows the signed-in account, tries again and signs out", async () => {
    install({ production: true });
    TokenService.clear();
    useOlaiiAuthStore().userProfile = { email: "user@olaii.com", profile: {} };
    const { wrapper, router } = await open(OlaiiNoOrganizationsView, "/view");

    expect(wrapper.find(".account").text()).toBe("Signed in as user@olaii.com");

    // Sign out first: "Try again" leaves the page
    const [signOut, tryAgain] = wrapper.findAll("button");
    await signOut.trigger("click");
    expect(redirect).toHaveBeenCalled();

    await tryAgain.trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.name).toBe("loading");
  });
});

describe("OlaiiNotFoundView", () => {
  it("goes home, also from Go back when there is no previous page", async () => {
    install({ production: true });
    const { wrapper, router } = await open(OlaiiNotFoundView, "/view");
    expect(wrapper.find("h1").text()).toBe("Page not found");

    await wrapper.findAll("button")[0].trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.name).toBe("loading");
  });
});
