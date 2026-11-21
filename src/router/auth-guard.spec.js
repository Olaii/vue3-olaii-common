import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createOlaiiAuthGuard } from "./auth-guard";
import { http } from "../services/request.service";
import TokenService from "../services/token.service";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { adapter, install, jwt } from "../test/helpers";

describe("createOlaiiAuthGuard", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    install({ production: true, title: "Guestlist" });
    TokenService.clear();
  });

  afterEach(() => {
    http.defaults.adapter = undefined;
    vi.restoreAllMocks();
  });

  it("sets the title and lets public routes through", async () => {
    const guard = createOlaiiAuthGuard();
    await expect(guard({ meta: { public: true, title: "Login" } })).resolves.toBe(true);
    expect(document.title).toBe("Login • Guestlist");
  });

  it("sends users without a token to the error route", async () => {
    const result = await createOlaiiAuthGuard()({ meta: {} });
    expect(result).toEqual({ name: "error", query: { message: "Not logged in!" } });
    expect(document.title).toBe("Guestlist");
  });

  it("loads the profile once, then asks the app about access", async () => {
    TokenService.setTokens(jwt(), "refresh");
    const handler = vi.fn(() => ({ data: { profile: { role: "MANAGER" } } }));
    http.defaults.adapter = adapter(handler);
    const checkAccess = vi.fn((to) => (to.name == "users" ? { name: "error" } : true));
    const guard = createOlaiiAuthGuard({ checkAccess });

    await expect(guard({ name: "home", meta: {} })).resolves.toBe(true);
    await expect(guard({ name: "users", meta: {} })).resolves.toEqual({ name: "error" });
    expect(handler).toHaveBeenCalledOnce();
    expect(checkAccess.mock.calls[0][1]).toBe(useOlaiiAuthStore());
  });
});
