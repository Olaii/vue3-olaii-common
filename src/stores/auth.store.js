import { defineStore } from "pinia";
import { computed, ref } from "vue";
import TokenService from "../services/token.service";
import UserService from "../services/user.service";
import { isLocal } from "../services/storage.service";
import { $gettext, $pgettext } from "../i18n";
import { getNice, getOlaiiOptions } from "../options";
import { redirect } from "../navigation";

/**
 * All Olaii apps, for the app switcher. `permission` is the profile flag that grants access.
 * Names are functions so they are translated in the current language.
 */
export const OLAII_APPS = {
  backoffice: {
    id: "BACKOFFICE",
    name: () => $pgettext("Common", "Backoffice"),
    url: "/backoffice",
    permission: "hasPos",
    color: "#4abeb4",
    colorDarker: "#3fafa6",
    colorLighter: "#E5FFFD",
    icon: "icon-backoffice",
  },
  cashless: {
    id: "CASHLESS",
    name: () => $pgettext("Common", "Cashless"),
    url: "/cashless",
    permission: "hasCashless",
    color: "#49ae50",
    colorDarker: "#419c48",
    colorLighter: "#E1FFE3",
    icon: "icon-cashless",
  },
  ticketing: {
    id: "TICKETS",
    name: () => $pgettext("Common", "Tickets"),
    url: "/ticketing",
    permission: "hasTicketing",
    color: "#ff5f2e",
    colorDarker: "#ff4b15",
    colorLighter: "#FFEBE4",
    icon: "icon-ticketing",
  },
  guestlist: {
    id: "GUESTLIST",
    name: () => $pgettext("Common", "Guestlist"),
    url: "/guestlist",
    permission: "hasGuestlist",
    color: "#b82dd4",
    colorDarker: "#a727c0",
    colorLighter: "#FAE2FF",
    icon: "icon-guestlist",
  },
  pass: {
    id: "PASS",
    name: () => $pgettext("Common", "Pass"),
    url: "/pass",
    permission: "hasPass",
    color: "#696cff",
    colorDarker: "#595bda",
    colorLighter: "#f1f5ff",
    icon: "icon-pass",
  },
  vouchers: {
    id: "VOUCHERS",
    name: () => $pgettext("Common", "Vouchers"),
    url: "/vouchers",
    permission: "hasVouchers",
    color: "#ff3153",
    colorDarker: "#ca0021",
    colorLighter: "#ffeff2",
    icon: "icon-vouchers",
  },
};

const NO_PERMISSIONS = {
  hasMultiple: false,
  hasCashless: false,
  hasPos: false,
  hasTicketing: false,
  hasGuestlist: false,
  hasPass: false,
  hasVouchers: false,
  isAdmin: false,
};

// Network and server errors must not log the user out, only a missing or rejected token
export function isSessionInvalid(error) {
  return !TokenService.accessToken || error?.response?.status == 401;
}

export function permissionsFromProfile(profile) {
  if (!profile) return { ...NO_PERMISSIONS };
  const granted = Object.values(profile).filter(Boolean).length;
  return {
    hasMultiple: granted != 1,
    hasCashless: !!profile.allow_pay,
    hasPos: !!profile.allow_pos,
    hasTicketing: !!profile.allow_ticketing,
    hasGuestlist: !!profile.allow_guestlist,
    hasPass: !!profile.allow_pass,
    hasVouchers: !!profile.allow_vouchers,
    isAdmin: !!profile.is_staff,
  };
}

export const useOlaiiAuthStore = defineStore("olaii-auth", () => {
  const userProfile = ref(null);
  const loadingUserProfile = ref(false);

  const permissions = computed(() => permissionsFromProfile(userProfile.value?.profile));
  const role = computed(() => userProfile.value?.profile?.role || null);
  const isManager = computed(() => role.value == "MANAGER");
  const loggedIn = computed(() => !!userProfile.value && TokenService.hasToken());

  // Other Olaii apps the user can open (the current app is left out)
  const availableApps = computed(() => {
    const currentAppId = getOlaiiOptions().appId;
    const result = {};
    for (const [key, app] of Object.entries(OLAII_APPS)) {
      if (key != currentAppId && permissions.value[app.permission]) {
        result[key] = { ...app, name: app.name() };
      }
    }
    return result;
  });

  async function getUserProfile() {
    loadingUserProfile.value = true;
    try {
      userProfile.value = await UserService.getUserProfile();
      return userProfile.value;
    } catch (error) {
      // Only log out when the session is really gone. Logging out clears the token cookies shared by all Olaii apps.
      if (isSessionInvalid(error)) logout();
      throw error;
    } finally {
      loadingUserProfile.value = false;
    }
  }

  function cleanStore() {
    userProfile.value = null;
    loadingUserProfile.value = false;
  }

  function logout() {
    const options = getOlaiiOptions();
    TokenService.clear();
    cleanStore();
    if (options.onLogout) options.onLogout();

    if (isLocal()) {
      // On the dev server (test.olaii.com) "/" is this app, not the login app, so redirecting there would reload forever
      const message = $gettext("You are not logged in. Log in with another Olaii app and reload.");
      redirect(`${options.baseURL}error?message=${encodeURIComponent(message)}`);
    } else {
      redirect("/");
    }
  }

  function logoutSuccess() {
    getNice()?.toast($gettext("Logout successful"));
  }

  return {
    userProfile,
    loadingUserProfile,
    permissions,
    role,
    getRole: role, // name used by the apps before the library
    isManager,
    loggedIn,
    availableApps,
    getUserProfile,
    cleanStore,
    logout,
    logoutSuccess,
  };
});
