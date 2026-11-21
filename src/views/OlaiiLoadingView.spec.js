import { describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import OlaiiLoadingView from "./OlaiiLoadingView.vue";
import TokenService from "../services/token.service";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { componentSetup, install, jwt } from "../test/helpers";
import { redirect } from "../navigation";

const Page = defineComponent({ render: () => h("div") });
const routes = [
  { path: "/loading", name: "loading", component: OlaiiLoadingView },
  { path: "/no-organizations", name: "no-organizations", component: Page },
  { path: "/error", name: "error", component: Page },
  { path: "/:organizationId", name: "organization", component: Page },
  { path: "/:organizationId/:eventId", name: "event", component: Page },
];

async function open(organizations, events) {
  const context = {
    fetchOrganizations: vi.fn(async () => organizations),
    fetchOrganization: vi.fn(async (id) => organizations.find((o) => o.id == id)),
    organizationRoute: "organization",
  };
  if (events) {
    context.fetchEvents = vi.fn(async () => events);
    context.fetchEvent = vi.fn(async (organizationId, id) => events.find((e) => e.id == id));
    context.eventRoute = "event";
  }
  install({ production: true, context });
  TokenService.setTokens(jwt(), "refresh");
  useOlaiiAuthStore().userProfile = { email: "user@olaii.com", profile: {} };

  const { router, global } = componentSetup(routes);
  router.push("/loading");
  await router.isReady();
  mount({ template: "<router-view />" }, { global });
  await flushPromises();
  return router.currentRoute.value;
}

describe("OlaiiLoadingView", () => {
  it("opens the first organization's first event", async () => {
    const route = await open([{ id: 1 }], [{ id: 7 }]);
    expect(route.name).toBe("event");
    expect(route.params).toEqual({ organizationId: "1", eventId: "7" });
  });

  it("opens the organization in apps without events", async () => {
    const route = await open([{ id: 3 }]);
    expect(route.fullPath).toBe("/3");
  });

  it("opens the no-organizations page", async () => {
    const route = await open([]);
    expect(route.name).toBe("no-organizations");
  });

  it("logs out without a token", async () => {
    install({ production: true });
    TokenService.clear();
    const { router, global } = componentSetup(routes);
    router.push("/loading");
    await router.isReady();
    mount({ template: "<router-view />" }, { global });
    await flushPromises();
    expect(redirect).toHaveBeenCalled();
  });
});
