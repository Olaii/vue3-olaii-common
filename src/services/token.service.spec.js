import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import TokenService from "./token.service";
import { reload } from "../navigation";
import { cookies } from "../test/setup";
import { adapter, install, jwt } from "../test/helpers";

const ACCESS = "olaii_access_token";
const REFRESH = "olaii_refresh_token";

describe("TokenService", () => {
  beforeEach(() => {
    install({ production: true });
    TokenService.accessToken = null;
    TokenService.refreshToken = null;
  });

  afterEach(() => {
    axios.defaults.adapter = undefined;
    vi.restoreAllMocks();
  });

  it("saves, reads and clears the shared token cookies", () => {
    const access = jwt();
    TokenService.setTokens(access, "refresh-1");
    expect(cookies.get(ACCESS)).toBe(access);
    expect(TokenService.getHeader().Authorization).toBe(`Bearer ${access}`);

    TokenService.clear();
    expect(cookies.has(ACCESS)).toBe(false);
    expect(TokenService.getHeader().Authorization).toBeUndefined();
  });

  it("detects an expired access token", () => {
    TokenService.setTokens(jwt("a", -10), "refresh");
    expect(TokenService.isAccessTokenExpired()).toBe(true);
    TokenService.setTokens(jwt("a", 60), "refresh");
    expect(TokenService.isAccessTokenExpired()).toBe(false);
  });

  it("reloads when another tab logs in as a different user", () => {
    TokenService.setTokens(jwt("first@olaii.com"), "refresh");
    cookies.set(ACCESS, jwt("second@olaii.com"));
    TokenService.syncFromCookies();
    expect(reload).toHaveBeenCalledOnce();
  });

  it("does not reload when another tab refreshed the same user's token", () => {
    TokenService.setTokens(jwt("same@olaii.com", 60), "refresh");
    cookies.set(ACCESS, jwt("same@olaii.com", 300));
    TokenService.syncFromCookies();
    expect(reload).not.toHaveBeenCalled();
  });

  it("refreshes once for concurrent callers and saves the rotated tokens", async () => {
    const newAccess = jwt("user", 300);
    const handler = vi.fn(() => ({ data: { access: newAccess, refresh: "refresh-2" } }));
    axios.defaults.adapter = adapter(handler);
    TokenService.setTokens(jwt("user", -10), "refresh-1");

    const [a, b] = await Promise.all([
      TokenService.refreshAccessToken(),
      TokenService.refreshAccessToken(),
    ]);

    expect(handler).toHaveBeenCalledOnce();
    const request = handler.mock.calls[0][0];
    expect(request.url).toBe("https://auth.test/api/v2/token/refresh/");
    expect(JSON.parse(request.data)).toEqual({ refresh: "refresh-1" });
    expect(a).toBe(newAccess);
    expect(b).toBe(newAccess);
    expect(cookies.get(REFRESH)).toBe("refresh-2");
  });

  it("uses tokens another tab already refreshed instead of refreshing again", async () => {
    const handler = vi.fn();
    axios.defaults.adapter = adapter(handler);
    TokenService.setTokens(jwt("user", -10), "refresh-1");

    const newer = jwt("user", 300);
    cookies.set(ACCESS, newer);
    cookies.set(REFRESH, "refresh-2");

    await expect(TokenService.refreshAccessToken()).resolves.toBe(newer);
    expect(handler).not.toHaveBeenCalled();
  });
});
