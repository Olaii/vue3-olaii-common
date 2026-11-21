import { beforeEach, describe, expect, it } from "vitest";
import { createGettext } from "vue3-gettext";
import { useOlaiiUiStore } from "./ui.store";
import { cookies } from "../test/setup";
import { install } from "../test/helpers";
import { reload } from "../navigation";

describe("useOlaiiUiStore", () => {
  beforeEach(() => {
    document.body.className = "";
  });

  it("restores the theme from the shared cookie and toggles it", () => {
    cookies.set("olaii_theme", "dark");
    install({ production: true });
    const store = useOlaiiUiStore();
    expect(document.body.classList.contains("dark")).toBe(true);

    store.toggleTheme();
    expect(store.theme).toBe("light");
    expect(document.body.className).toBe("light");
    expect(cookies.get("olaii_theme")).toBe("light");
  });

  it("remembers the small sidebar", () => {
    cookies.set("olaii_sidebar_small", "true");
    install({ production: true });
    const store = useOlaiiUiStore();
    expect(store.sidebarSmall).toBe(true);

    store.toggleSidebarSmall();
    expect(cookies.get("olaii_sidebar_small")).toBe(false);
  });

  it("switches the language and reloads", () => {
    const gettext = createGettext({ availableLanguages: { en: "English", sl: "Slovenščina" } });
    install({ production: true, gettext, defaultLanguage: "sl" });
    const store = useOlaiiUiStore();
    expect(store.languages).toEqual({ en: "English", sl: "Slovenščina" });

    store.setLanguage("en");
    expect(gettext.current).toBe("en");
    expect(cookies.get("olaii_guestlist_language")).toBe("en");
    expect(reload).toHaveBeenCalledOnce();

    store.setLanguage("en");
    expect(reload).toHaveBeenCalledOnce();
  });
});
