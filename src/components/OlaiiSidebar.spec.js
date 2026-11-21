import { describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import OlaiiSidebar from "./OlaiiSidebar.vue";
import { useOlaiiContextStore } from "../stores/context.store";
import { componentSetup, install } from "../test/helpers";

const Page = defineComponent({ render: () => h("div") });

describe("OlaiiSidebar", () => {
  it("renders titles and links with the selected organization and event", async () => {
    const organization = { id: 1, name: "Club" };
    install({
      production: true,
      context: {
        fetchOrganizations: vi.fn(async () => [organization]),
        fetchOrganization: vi.fn(async () => organization),
        organizationRoute: "events",
      },
    });
    const context = useOlaiiContextStore();
    await context.selectOrganization(1);
    context.setEvent({ id: 5, name: "Opening" });

    const { router, global } = componentSetup([
      { path: "/", component: Page },
      { path: "/:organizationId/events", name: "events", component: Page },
      { path: "/:organizationId/:eventId/guests", name: "guests", component: Page },
      { path: "/:organizationId/users", name: "users", component: Page },
    ]);
    router.push("/");
    await router.isReady();

    const wrapper = mount(OlaiiSidebar, {
      global,
      props: {
        links: [
          { type: "TITLE", name: "Event" },
          { name: "Guests", path: "guests", icon: "icon-users", query: { active: true } },
          { name: "Events", path: "events", icon: "icon-calendar" },
          { name: "Users", path: "users", icon: "icon-user", disabled: () => true },
          { name: "Hidden", path: "events", icon: "icon-x", hidden: () => true },
        ],
      },
    });
    await flushPromises();

    expect(wrapper.find(".link-title").text()).toBe("Event");
    const hrefs = wrapper.findAll("a.link").map((link) => link.attributes("href"));
    expect(hrefs).toEqual(["/1/5/guests?active=true", "/1/events"]);
    expect(wrapper.find(".link.disabled").text()).toBe("Users");
    expect(wrapper.text()).not.toContain("Hidden");
  });

  it("highlights only the link of the current page or its parent", async () => {
    install({ production: true });
    const Layout = defineComponent({ render: () => h("div") });
    const { router, global } = componentSetup([
      {
        path: "/:organizationId",
        component: Layout,
        children: [
          // Empty-path child: vue-router's router-link-active would mark it on every page under the parent
          { path: "", name: "events", component: Page },
          { path: ":eventId", name: "dashboard", component: Page },
          {
            path: ":eventId/guests",
            name: "guests",
            component: Page,
            children: [{ path: ":guestId", name: "guest", component: Page }],
          },
        ],
      },
    ]);
    const links = [
      { name: "Dashboard", path: "dashboard", icon: "icon-home", params: { eventId: 5 } },
      { name: "Events", path: "events", icon: "icon-calendar" },
      { name: "Guests", path: "guests", icon: "icon-users", params: { eventId: 5 } },
    ];
    const activeLinks = async (url) => {
      await router.push(url);
      await flushPromises();
      return wrapper.findAll("a.link.active").map((link) => link.text());
    };

    router.push("/1");
    await router.isReady();
    const wrapper = mount(OlaiiSidebar, { global, props: { links } });

    expect(await activeLinks("/1/5")).toEqual(["Dashboard"]);
    expect(await activeLinks("/1")).toEqual(["Events"]);
    expect(await activeLinks("/1/5/guests")).toEqual(["Guests"]);
    expect(await activeLinks("/1/5/guests/9")).toEqual(["Guests"]);
  });

  it("shows a link whose route needs a missing param as disabled instead of failing", async () => {
    install({
      production: true,
      context: {
        fetchOrganizations: vi.fn(async () => []),
        fetchOrganization: vi.fn(async () => ({ id: 1 })),
        organizationRoute: "events",
      },
    });
    await useOlaiiContextStore().selectOrganization(1); // No event selected

    const { router, global } = componentSetup([
      { path: "/", component: Page },
      { path: "/:organizationId/events", name: "events", component: Page },
      { path: "/:organizationId/:eventId/guests", name: "guests", component: Page },
    ]);
    router.push("/");
    await router.isReady();

    const wrapper = mount(OlaiiSidebar, {
      global,
      props: {
        links: [
          { name: "Guests", path: "guests", icon: "icon-users" },
          { name: "Events", path: "events", icon: "icon-calendar" },
        ],
      },
    });
    await flushPromises();

    expect(wrapper.find(".link.disabled").text()).toBe("Guests");
    expect(wrapper.findAll("a.link").map((link) => link.attributes("href"))).toEqual(["/1/events"]);
  });
});
