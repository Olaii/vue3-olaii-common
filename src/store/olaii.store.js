import OlaiiStorageService from "@/services/storage.service";
import gettext from "@/language";
import Router from "@/router";
import { defineStore } from "pinia";
import { ref, inject } from "vue";

export const useOlaiiStore = defineStore("olaii-general", () => {
  const options = inject("olaiiCommonOptions");
  const production = options.production;
  const appName = options.appName;
  const theme = ref(OlaiiStorageService.get("olaii_theme") || "light");
  const sidebarOpen = ref(false);
  const sidebarSmall = ref(OlaiiStorageService.get("olaii_sidebar_small") == "true");
  const sideViewWidth = ref(null);
  const sidebarSmallCookieKey = "olaii_sidebar_small";
  const languages = gettext.available;
  const language = ref(OlaiiStorageService.get(`olaii_${appName}_language`) || gettext.current);

  function changeSideViewWidth(data) {
    sideViewWidth.value = data;
  }

  function setSidebarOpen(isOpen) {
    sidebarOpen.value = isOpen;
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function setSidebarSmall(isSmall) {
    sidebarSmall.value = isSmall;
    OlaiiStorageService.save(sidebarSmallCookieKey, isSmall);
  }

  function toggleSidebarSmall() {
    sidebarSmall.value = !sidebarSmall.value;
    OlaiiStorageService.save(sidebarSmallCookieKey, sidebarSmall.value);
  }

  function toggleTheme() {
    const newTheme = theme.value == "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function setTheme(newTheme) {
    theme.value = newTheme;
    document.body.classList.remove("dark");
    document.body.classList.remove("light");
    document.body.classList.add(newTheme);
    OlaiiStorageService.save("olaii_theme", newTheme);
  }
  setTheme(theme.value);

  function setLanguage(newLanguage) {
    language.value = newLanguage;
    gettext.current == newLanguage;
    OlaiiStorageService.save(`olaii_${appName}_language`, newLanguage);
    Router.go(Router.currentRoute);
  }

  return {
    production,
    theme,
    sidebarOpen,
    sidebarSmall,
    languages,
    language,
    changeSideViewWidth,
    setSidebarOpen,
    toggleSidebar,
    setSidebarSmall,
    toggleSidebarSmall,
    toggleTheme,
    setTheme,
    setLanguage,
  };
});
