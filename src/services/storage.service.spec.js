import { describe, expect, it } from "vitest";
import StorageService from "./storage.service";
import { cookies } from "../test/setup";
import { install } from "../test/helpers";

describe("StorageService", () => {
  it("adds the _dev suffix outside production", () => {
    install({ production: false });
    StorageService.save("olaii_theme", "dark");
    expect(cookies.get("olaii_theme_dev")).toBe("dark");
    expect(StorageService.get("olaii_theme")).toBe("dark");
  });

  it("uses the plain name in production", () => {
    install({ production: true });
    StorageService.save("olaii_theme", "dark");
    expect(cookies.get("olaii_theme")).toBe("dark");
  });

  it("removes the cookie when saving undefined", () => {
    install();
    StorageService.save("key", "value");
    StorageService.save("key", undefined);
    expect(StorageService.get("key")).toBeNull();
  });

  it("keeps the selected organization and event per app", () => {
    install({ appId: "guestlist", production: true });
    StorageService.setOrganization(12);
    StorageService.setEvent(34);
    expect(cookies.get("olaii_guestlist_organization_id")).toBe(12);
    expect(cookies.get("olaii_guestlist_event_id")).toBe(34);
    StorageService.removeOrganization();
    expect(StorageService.getOrganization()).toBeNull();
  });
});
