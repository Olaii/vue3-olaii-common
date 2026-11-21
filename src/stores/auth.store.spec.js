import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useOlaiiAuthStore, permissionsFromProfile } from "./auth.store";
import { http } from "../services/request.service";
import TokenService from "../services/token.service";
import { adapter, install, jwt } from "../test/helpers";
import { redirect } from "../navigation";
import { cookies } from "../test/setup";

const PROFILE = {
  id: 1,
  email: "manager@olaii.com",
  profile: { role: "MANAGER", allow_guestlist: true, allow_pass: true, allow_pos: false },
};

describe("useOlaiiAuthStore", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    TokenService.clear();
  });

  afterEach(() => {
    http.defaults.adapter = undefined;
    vi.restoreAllMocks();
  });

  it("loads the profile and derives permissions", async () => {
    install({ appId: "guestlist", production: true });
    TokenService.setTokens(jwt(), "refresh");
    http.defaults.adapter = adapter((config) => {
      expect(config.url).toBe("https://auth.test/api/v2/account/");
      return { data: PROFILE };
    });

    const store = useOlaiiAuthStore();
    await store.getUserProfile();

    expect(store.userProfile).toEqual(PROFILE);
    expect(store.isManager).toBe(true);
    expect(store.loggedIn).toBe(true);
    expect(store.permissions).toMatchObject({ hasGuestlist: true, hasPass: true, hasPos: false });
  });

  it("lists the other apps the user can open, without the current one", async () => {
    install({ appId: "guestlist", production: true });
    TokenService.setTokens(jwt(), "refresh");
    http.defaults.adapter = adapter(() => ({ data: PROFILE }));

    const store = useOlaiiAuthStore();
    await store.getUserProfile();

    expect(Object.keys(store.availableApps)).toEqual(["pass"]);
    expect(store.availableApps.pass.name).toBe("Pass");
  });

  it("logs out when the session was rejected", async () => {
    const onLogout = vi.fn();
    install({ production: true, onLogout });
    TokenService.setTokens(jwt(), null);
    http.defaults.adapter = adapter(() => ({ status: 401 }));

    await expect(useOlaiiAuthStore().getUserProfile()).rejects.toBeTruthy();
    expect(onLogout).toHaveBeenCalledOnce();
    expect(TokenService.accessToken).toBeNull();
    expect(cookies.has("olaii_access_token")).toBe(false);
    // jsdom runs on localhost, where "/" is this app, so the user is sent to the error page instead
    expect(redirect).toHaveBeenCalledWith(
      expect.stringMatching(/^\/error\?message=You%20are%20not/)
    );
  });

  it("keeps the session on server errors", async () => {
    install({ production: true });
    TokenService.setTokens(jwt(), null);
    http.defaults.adapter = adapter(() => ({ status: 500 }));

    await expect(useOlaiiAuthStore().getUserProfile()).rejects.toBeTruthy();
    expect(TokenService.accessToken).not.toBeNull();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("returns no permissions without a profile", () => {
    expect(permissionsFromProfile(null).hasPass).toBe(false);
  });
});
