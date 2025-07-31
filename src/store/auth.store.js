import OlaiiRequestService from "@/services/request.service";
import TokenService from "@/services/token.service";
// import app from "@/main";
// import gettext from "@/language";
import { defineStore } from "pinia";
// const { $gettext } = gettext;
import { ref, computed, inject } from "vue";


export const useOlaiiAuthStore = defineStore("olaii-auth", () => {
  const options = inject("olaiiCommonOptions");
  const loadingUserProfile = ref(false);
  const userProfile = ref({});

  const authenticating = ref(false);
  const authenticationError = ref(null);

  const accessToken = ref(null);
  const refreshToken = ref(null);

  const permissions = ref({
    hasMultiple: false,
    hasCashless: false,
    hasPos: false,
    hasTicketing: false,
    hasGuestlist: false,
    hasPass: false,
    hasVouchers: false,
    isAdmin: false,
  });

  const apps = {
    backoffice: {
      id: "BACKOFFICE",
      name: "Backoffice",
      url: "/backoffice",
      color: "#4abeb4",
      colorDarker: "#3fafa6",
      colorLighter: "#E5FFFD",
      icon: "icon-backoffice",
    },
    cashless: {
      id: "CASHLESS",
      name: "Cashless",
      url: "/cashless",
      color: "#49ae50",
      colorDarker: "#419c48",
      colorLighter: "#E1FFE3",
      icon: "icon-cashless",
    },
    ticketing: {
      id: "TICKETS",
      name: "Tickets",
      url: "/ticketing",
      color: "#ff5f2e",
      colorDarker: "#ff4b15",
      colorLighter: "#FFEBE4",
      icon: "icon-ticketing",
    },
    guestlist: {
      id: "GUESTLIST",
      name: "Guestlist",
      url: "/guestlist",
      color: "#b82dd4",
      colorDarker: "#a727c0",
      colorLighter: "#FAE2FF",
      icon: "icon-guestlist",
    },
    pass: {
      id: "PASS",
      name: "Pass",
      url: "/pass",
      color: "#696cff",
      colorDarker: "#595bda",
      colorLighter: "#f1f5ff",
      icon: "icon-pass",
    },
    vouchers: {
      id: "VOUCHERS",
      name: "Vouchers",
      url: "/vouchers",
      color: "#ff3153",
      colorDarker: "#ca0021",
      colorLighter: "#fce0dc",
      icon: "icon-vouchers",
    }
  };

  /**
   * Get user profile data
   *
   * @returns:
   * {
   *   "id": 1,
   *   "first_name": "John",
   *   "last_name": "Doe",
   *   "email": "info@bugkings.com"
   * }
   * @throws AppError
   **/
  async function fetchUserProfile() {
    const request = {
      method: "get",
      url: options.authURL + "api/v2/account/",
    };
    const response = await OlaiiRequestService.customRequest(request);
    return response;
  }

  async function getUserProfile() {
    this.loadingUserProfile = true;
    console.log("[AUTH] Get user profile");
    try {
      // const response = await UserService.getUserProfile();
      const response = await fetchUserProfile();
      userProfile.value = response;
      console.log("[AUTH] User profile:", response);
      checkPermissions();
      return response;
    } catch (error) {
      console.log("[AUTH] User profile error:", error);
      logout();
      throw error;
    } finally {
      this.loadingUserProfile = false;
    }
  }

  function checkPermissions() {
    let count = 0;
    for (let key in userProfile.value.profile) {
      if (userProfile.value.profile[key]) count += 1;
    }

    permissions.value = {
      hasMultiple: count != 1,
      hasCashless: userProfile.value.profile.allow_pay,
      hasPos: userProfile.value.profile.allow_pos,
      hasTicketing: userProfile.value.profile.allow_ticketing,
      hasGuestlist: userProfile.value.profile.allow_guestlist,
      hasPass: userProfile.value.profile.allow_pass,
      hasVouchers: userProfile.value.profile.allow_vouchers,
      isAdmin: userProfile.value.profile.is_staff,
    };
  }

  function logout() {
    // UserService.logout();
    window.location.href = "/";
  }

  function logoutSuccess() {
    accessToken.value = null;
    refreshToken.value = null;
    // app.config.globalProperties.$nice.toast($gettext("Logout successful"));
  }

  function cleanStore() {
    userProfile.value = null;
    authenticating.value = false;
    accessToken.value = null;
    authenticationError.value = null;
  }

  const loggedIn = computed(() => !!TokenService.accessToken);

  const isManager = computed(() => userProfile.value.profile?.role == "MANAGER");

  const getRole = computed(() => userProfile.value.profile?.role);

  const availableApps = computed(() => {
    const hasApps = {};
    if (permissions.value.hasPos) hasApps.backoffice = apps.backoffice;
    if (permissions.value.hasCashless) hasApps.cashless = apps.cashless;
    if (permissions.value.hasTicketing) hasApps.ticketing = apps.ticketing;
    if (permissions.value.hasGuestlist) hasApps.guestlist = apps.guestlist;
    if (permissions.value.hasPass) hasApps.pass = apps.pass;
    if (permissions.value.hasVouchers) hasApps.vouchers = apps.vouchers;
    return hasApps;
  });

  return {
    accessToken,
    refreshToken,
    loadingUserProfile,
    userProfile,
    authenticating,
    authenticationError,
    permissions,
    getUserProfile,
    logout,
    logoutSuccess,
    cleanStore,
    availableApps,
    getRole,
    isManager,
    loggedIn,
  };
});
