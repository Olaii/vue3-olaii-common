import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import RequestService, { http } from "./request.service";
import TokenService from "./token.service";
import { adapter, install, jwt } from "../test/helpers";

describe("RequestService", () => {
  beforeEach(() => {
    install({ production: true });
    TokenService.clear();
  });

  afterEach(() => {
    http.defaults.adapter = undefined;
    axios.defaults.adapter = undefined;
  });

  it("calls the app API with the auth header", async () => {
    const access = jwt();
    TokenService.setTokens(access, "refresh");
    const handler = vi.fn(() => ({ data: { id: 1 } }));
    http.defaults.adapter = adapter(handler);

    await expect(RequestService.get("events/1/", { a: 1 })).resolves.toEqual({ id: 1 });
    const config = handler.mock.calls[0][0];
    expect(config.baseURL).toBe("https://api.test/");
    expect(config.params).toEqual({ a: 1 });
    expect(config.headers.Authorization).toBe(`Bearer ${access}`);
  });

  it("turns paginated lists into arrays with _metadata", async () => {
    http.defaults.adapter = adapter(() => ({
      data: { count: 3, next: "n", previous: null, results: [{ id: 1 }] },
    }));
    const list = await RequestService.getPage("guests/", 2, { q: "x" });
    expect([...list]).toEqual([{ id: 1 }]);
    expect(list._metadata).toEqual({ count: 3, next: "n", previous: null });
  });

  it("refreshes an expired token before the request", async () => {
    TokenService.setTokens(jwt("user", -10), "refresh-1");
    const fresh = jwt("user", 300);
    axios.defaults.adapter = adapter(() => ({ data: { access: fresh, refresh: "refresh-2" } }));
    const handler = vi.fn(() => ({ data: {} }));
    http.defaults.adapter = adapter(handler);

    await RequestService.get("me/");
    expect(handler.mock.calls[0][0].headers.Authorization).toBe(`Bearer ${fresh}`);
  });

  it("refreshes and retries once when the token is rejected", async () => {
    TokenService.setTokens(jwt("user", 300), "refresh-1");
    const fresh = jwt("user", 600);
    axios.defaults.adapter = adapter(() => ({ data: { access: fresh, refresh: "refresh-2" } }));
    const handler = vi
      .fn()
      .mockReturnValueOnce({ status: 401 })
      .mockReturnValueOnce({ data: { ok: true } });
    http.defaults.adapter = adapter(handler);

    await expect(RequestService.get("me/")).resolves.toEqual({ ok: true });
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler.mock.calls[1][0].headers.Authorization).toBe(`Bearer ${fresh}`);
  });

  it("does not retry without a refresh token", async () => {
    const handler = vi.fn(() => ({ status: 401 }));
    http.defaults.adapter = adapter(handler);
    await expect(RequestService.get("me/")).rejects.toMatchObject({ response: { status: 401 } });
    expect(handler).toHaveBeenCalledOnce();
  });

  it("maps objects to ids", () => {
    expect(RequestService.replaceWithIds([{ id: 1 }, { id: 2 }])).toEqual([1, 2]);
  });
});
