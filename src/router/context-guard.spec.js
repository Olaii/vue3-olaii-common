import { describe, expect, it, vi } from "vitest";
import { createOlaiiContextGuard } from "./context-guard";
import { useOlaiiContextStore } from "../stores/context.store";
import { install } from "../test/helpers";

// Throws for unknown ids, like the API's 404
function find(list, id) {
  const item = list.find((element) => element.id == id);
  if (!item) throw new Error(`Not found: ${id}`);
  return item;
}

// Route objects as vue-router passes them: app pages match a route with :organizationId
const APP_ROUTE = [{ path: "/:organizationId" }];
const EVENT_ROUTE = [{ path: "/:organizationId" }, { path: "/:organizationId/:eventId" }];

function setup(organizations = [{ id: 1, name: "Club" }], events = null) {
  const context = {
    fetchOrganizations: vi.fn(async () => organizations),
    fetchOrganization: vi.fn(async (id) => find(organizations, id)),
    organizationRoute: "organization",
  };
  if (events) {
    context.fetchEvents = vi.fn(async () => events);
    context.fetchEvent = vi.fn(async (organizationId, id) => find(events, id));
  }
  install({ production: true, context });
  return context;
}

describe("createOlaiiContextGuard", () => {
  it("loads the organization from the URL once", async () => {
    const context = setup();
    const guard = createOlaiiContextGuard();

    await expect(guard({ matched: APP_ROUTE, params: { organizationId: "1" } })).resolves.toBe(
      true
    );
    await expect(guard({ matched: APP_ROUTE, params: { organizationId: "1" } })).resolves.toBe(
      true
    );
    expect(useOlaiiContextStore().organizationId).toBe(1);
    expect(context.fetchOrganization).toHaveBeenCalledOnce();
  });

  it("sends users without organizations to the no-organizations page", async () => {
    setup([]);
    await expect(createOlaiiContextGuard()({ matched: APP_ROUTE, params: {} })).resolves.toEqual({
      name: "no-organizations",
    });
  });

  it("shows the 404 page for an organization in the URL that can't be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    setup();
    const to = {
      path: "/abc",
      matched: APP_ROUTE,
      params: { organizationId: "abc" },
      query: { a: "1" },
      hash: "",
    };
    await expect(createOlaiiContextGuard()(to)).resolves.toEqual({
      name: "not-found",
      params: { pathMatch: ["abc"] },
      query: { a: "1" },
      hash: "",
    });
  });

  it("shows the 404 page for an event in the URL that can't be loaded", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    setup([{ id: 1, name: "Club" }], [{ id: 5, name: "Opening" }]);
    const to = {
      path: "/1/99",
      matched: EVENT_ROUTE,
      params: { organizationId: "1", eventId: "99" },
      query: {},
      hash: "",
    };
    const result = await createOlaiiContextGuard()(to);
    expect(result.name).toBe("not-found");
    expect(result.params.pathMatch).toEqual(["1", "99"]);
  });

  it("leaves pages without an organization alone", async () => {
    const context = setup([]);
    const errorPage = { matched: [{ path: "/error" }], params: {} };
    await expect(createOlaiiContextGuard()(errorPage)).resolves.toBe(true);
    expect(context.fetchOrganizations).not.toHaveBeenCalled();
  });

  it("loads another organization when only the params change", async () => {
    setup([
      { id: 1, name: "Club" },
      { id: 2, name: "Festival" },
    ]);
    const guard = createOlaiiContextGuard();
    await guard({ matched: APP_ROUTE, params: { organizationId: "1" } });
    await guard({ matched: APP_ROUTE, params: { organizationId: "2" } });
    expect(useOlaiiContextStore().organizationId).toBe(2);
  });
});
