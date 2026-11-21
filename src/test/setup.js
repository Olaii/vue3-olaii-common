import { beforeEach, vi } from "vitest";

// jsdom can't set cookies on .olaii.com, so vue-cookies is replaced with an in-memory store
export const cookies = new Map();

vi.mock("vue-cookies", () => ({
  default: {
    get: (key) => (cookies.has(key) ? cookies.get(key) : null),
    set: (key, value) => cookies.set(key, value),
    remove: (key) => cookies.delete(key),
  },
}));

// jsdom can't navigate, so redirects and reloads are recorded instead
vi.mock("../navigation", () => ({ redirect: vi.fn(), reload: vi.fn() }));

beforeEach(() => {
  cookies.clear();
  vi.clearAllMocks();
});
