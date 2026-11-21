import { describe, expect, it, vi } from "vitest";
import { useOlaiiContextStore } from "./context.store";
import { cookies } from "../test/setup";
import { install } from "../test/helpers";

const ORGANIZATIONS = [
  { id: 1, name: "Club", permissions: { can_view_users: true }, modules: ["PARTNERS"] },
  { id: 2, name: "Festival", permissions: {}, modules: [] },
];
const EVENTS = [
  { id: 11, name: "Opening", organization: ORGANIZATIONS[0] },
  { id: 12, name: "Closing", organization: ORGANIZATIONS[0] },
];

function find(list, id) {
  const item = list.find((element) => element.id == id);
  if (!item) throw new Error("Not found");
  return item;
}

// Installs the library with fake context functions; withEvents: false is an app without events
function setup({ withEvents = true, organizations = ORGANIZATIONS, events = EVENTS } = {}) {
  const context = {
    fetchOrganizations: vi.fn(async () => organizations),
    fetchOrganization: vi.fn(async (id) => find(organizations, id)),
    organizationRoute: "organization",
  };
  if (withEvents) {
    context.fetchEvents = vi.fn(async (organizationId) =>
      events.filter((event) => event.organization.id == organizationId)
    );
    context.fetchEvent = vi.fn(async (organizationId, id) => find(events, id));
    context.eventRoute = "event";
  }
  install({ appId: "guestlist", production: true, context });
  return { context, store: useOlaiiContextStore() };
}

describe("useOlaiiContextStore", () => {
  it("restores from the URL ids", async () => {
    const { store } = setup();
    await expect(store.restore({ organizationId: "1", eventId: "12" })).resolves.toBe("event");
    expect(store.organizationId).toBe(1);
    expect(store.eventId).toBe(12);
    expect(store.viewHeader).toBe("Closing - Club");
    expect(store.permissions).toEqual({ can_view_users: true });
    expect(store.modules).toEqual({ PARTNERS: true });
  });

  it("restores the saved organization and event from cookies", async () => {
    cookies.set("olaii_guestlist_organization_id", 1);
    cookies.set("olaii_guestlist_event_id", 12);
    const { store } = setup();
    await expect(store.restore()).resolves.toBe("event");
    expect(store.eventId).toBe(12);
  });

  it("ignores a saved event of another organization", async () => {
    cookies.set("olaii_guestlist_organization_id", 1);
    cookies.set("olaii_guestlist_event_id", 12);
    const { store, context } = setup({
      organizations: [...ORGANIZATIONS],
      events: [...EVENTS, { id: 21, name: "Summer", organization: ORGANIZATIONS[1] }],
    });
    await expect(store.restore({ organizationId: 2 })).resolves.toBe("event");
    expect(store.eventId).toBe(21);
    expect(context.fetchEvent).not.toHaveBeenCalled();
  });

  it("strict: selects nothing when the URL's organization can't be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    cookies.set("olaii_guestlist_organization_id", 2);
    const { store } = setup();
    await expect(store.restore({ organizationId: 99 }, { strict: true })).resolves.toBe(
      "not-found"
    );
    expect(store.organization).toBeNull();
    // The user's saved organization is kept
    expect(cookies.get("olaii_guestlist_organization_id")).toBe(2);
  });

  it("forgets a stale saved organization and opens the first one", async () => {
    cookies.set("olaii_guestlist_organization_id", 99);
    const { store } = setup();
    await expect(store.restore()).resolves.toBe("event");
    expect(store.organizationId).toBe(1);
    expect(store.eventId).toBe(11);
    expect(cookies.get("olaii_guestlist_organization_id")).toBe(1);
  });

  it("reports when the user has no organizations", async () => {
    const { store } = setup({ organizations: [] });
    await expect(store.restore()).resolves.toBe("none");
    expect(store.organization).toBeNull();
  });

  it("stops at the organization in apps without events, or without events to open", async () => {
    let { store } = setup({ withEvents: false });
    await expect(store.restore()).resolves.toBe("organization");

    ({ store } = setup({ events: [] }));
    await expect(store.restore()).resolves.toBe("organization");
    expect(store.event).toBeNull();
  });

  it("can leave the event empty instead of picking the first one", async () => {
    const { store } = setup();
    await expect(store.restore({ organizationId: 1 }, { pickFirstEvent: false })).resolves.toBe(
      "organization"
    );
    expect(store.event).toBeNull();
  });

  it("clears the event when another organization is selected", async () => {
    const { store } = setup();
    await store.restore({ organizationId: 1, eventId: 11 });
    await store.selectOrganization(2);
    expect(store.event).toBeNull();
    expect(cookies.has("olaii_guestlist_event_id")).toBe(false);
  });

  it("does not refetch the selected organization", async () => {
    const { store, context } = setup();
    await store.selectOrganization(1);
    await store.selectOrganization("1");
    expect(context.fetchOrganization).toHaveBeenCalledOnce();
  });
});
