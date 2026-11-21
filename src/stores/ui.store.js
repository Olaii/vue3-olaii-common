import { defineStore } from "pinia";
import { computed, ref } from "vue";
import StorageService from "../services/storage.service";
import { getSavedLanguage, setLanguage as saveLanguage } from "../language";
import { getOlaiiOptions } from "../options";
import { reload } from "../navigation";

// Shared with the other Olaii apps, so theme and sidebar size follow the user between apps
const THEME_COOKIE = "olaii_theme";
const SIDEBAR_SMALL_COOKIE = "olaii_sidebar_small";

/** Theme, sidebar and language: UI preferences that are the same in every app */
export const useOlaiiUiStore = defineStore("olaii-ui", () => {
  const production = computed(() => getOlaiiOptions().production);

  // Theme: "light" or "dark", set as a class on <body>
  const theme = ref(StorageService.get(THEME_COOKIE) || "light");

  function setTheme(newTheme) {
    theme.value = newTheme;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    StorageService.save(THEME_COOKIE, newTheme);
  }

  function toggleTheme() {
    setTheme(theme.value == "light" ? "dark" : "light");
  }

  setTheme(theme.value);

  // Sidebar: open is the mobile drawer, small is the icon-only rail on desktop
  const sidebarOpen = ref(false);
  // Cookies hold strings, but vue-cookies may also return a parsed boolean
  const sidebarSmall = ref(String(StorageService.get(SIDEBAR_SMALL_COOKIE)) == "true");

  function setSidebarOpen(isOpen) {
    sidebarOpen.value = isOpen;
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function setSidebarSmall(isSmall) {
    sidebarSmall.value = isSmall;
    StorageService.save(SIDEBAR_SMALL_COOKIE, isSmall);
  }

  function toggleSidebarSmall() {
    setSidebarSmall(!sidebarSmall.value);
  }

  // Language: { code: name } from the app's gettext
  const languages = computed(() => getOlaiiOptions().gettext?.available || {});
  const language = ref(getSavedLanguage());

  // Reloads the page, because apps keep translated strings built at import time (route titles, enums)
  function setLanguage(newLanguage) {
    if (newLanguage == language.value) return;
    language.value = newLanguage;
    saveLanguage(newLanguage);
    reload();
  }

  return {
    production,
    theme,
    setTheme,
    toggleTheme,
    sidebarOpen,
    sidebarSmall,
    setSidebarOpen,
    toggleSidebar,
    setSidebarSmall,
    toggleSidebarSmall,
    languages,
    language,
    setLanguage,
  };
});
