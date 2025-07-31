import StorageService from "@/services/storage.service";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const OlaiiTokenService = {
  debug: false,
  accessToken: null,
  accessTokenExpired: false,
  accessTokenExpireTimeout: null,
  accessTokenCookieName: "olaii_access_token",

  refreshToken: null,
  refreshTokenExpired: false,
  refreshTokenExpireTimeout: null,
  refreshTokenCookieName: "olaii_refresh_token",
  refreshingTokenPromise: null,

  init(authURL) {
    this.authURL = authURL;
  },

  getHeader() {
    if (this.accessToken) {
      return {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      };
    } else {
      return {
        "Content-Type": "application/json",
      };
    }
  },

  readFromCookies() {
    this.getAccessToken();
    this.getRefreshToken();

    if (!this.accessToken) {
      if (this.debug) console.log("[TOKEN] No token saved :(");
    }
  },

  hasToken() {
    return this.accessToken != null;
  },

  getAccessToken() {
    this.accessToken = StorageService.get(this.accessTokenCookieName);
    if (this.accessToken) {
      const access_token_decoded = jwtDecode(this.accessToken);
      const access_token_expire_date = new Date(access_token_decoded.exp * 1000);
      const access_token_expire_milliseconds = access_token_expire_date - new Date();

      if (this.debug) {
        console.log("[TOKEN] Access token", {
          decoded: access_token_decoded,
          expire_date: access_token_expire_date.toString(),
          expire_date_milliseconds: access_token_expire_milliseconds,
        });
      }

      if (access_token_expire_milliseconds <= 0) {
        if (this.debug) console.error("[TOKEN] Access token expired!");
        this.accessTokenExpired = true;
      }

      clearTimeout(this.accessTokenExpireTimeout);
      this.accessTokenExpireTimeout = setTimeout(() => {
        if (this.debug) console.error("[TOKEN] Access token expired!");
        this.accessTokenExpired = true;
      }, access_token_expire_milliseconds);
    }
    return this.accessToken;
  },

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
    StorageService.save(this.accessTokenCookieName, this.accessToken);
    this.getAccessToken();
  },

  removeAccessToken() {
    this.accessToken = null;
    StorageService.remove(this.accessTokenCookieName);
    clearTimeout(this.accessTokenExpireTimeout);
  },

  getRefreshToken() {
    this.refreshToken = StorageService.get(this.refreshTokenCookieName);
    if (this.refreshToken) {
      const refresh_token_decoded = jwtDecode(this.refreshToken);
      const refresh_token_expire_date = new Date(refresh_token_decoded.exp * 1000);
      const refresh_token_expire_milliseconds = refresh_token_expire_date - new Date();

      if (this.debug) {
        console.log("[TOKEN] Refresh token", {
          decoded: refresh_token_decoded,
          expire_date: refresh_token_expire_date.toString(),
          expire_date_milliseconds: refresh_token_expire_milliseconds,
        });
      }

      if (refresh_token_expire_milliseconds <= 0) {
        if (this.debug) console.error("[TOKEN] Refresh token expired!");
        this.refreshTokenExpired = true;
      }

      // clearTimeout(this.refreshTokenExpireTimeout);
      // this.refreshTokenExpireTimeout = setTimeout(() => {
      //   if (this.debug) console.error("[TOKEN] Refresh token expired!");
      //   this.refreshTokenExpired = true;
      // }, refresh_token_expire_milliseconds);
    }
    return this.refreshToken;
  },

  setRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
    StorageService.save(this.refreshTokenCookieName, this.refreshToken);
    this.getRefreshToken();
  },

  removeRefreshToken() {
    this.refreshToken = null;
    StorageService.remove(this.refreshTokenCookieName);
    clearTimeout(this.refreshTokenExpireTimeout);
  },

  async refreshAccessToken() {
    if (!OlaiiTokenService.refreshingTokenPromise) {
      const request = {
        method: "post",
        url: this.authURL + "api/v2/token/refresh/",
        headers: this.getHeader(),
        data: {
          refresh: OlaiiTokenService.refreshToken,
        },
      };
      OlaiiTokenService.refreshingTokenPromise = axios(request);
    }
    const response = await OlaiiTokenService.refreshingTokenPromise;
    OlaiiTokenService.refreshingTokenPromise = null;
    if (this.debug) console.log("[TOKEN] Token refreshed:", response.data);
    OlaiiTokenService.setAccessToken(response.data.access);
    OlaiiTokenService.setRefreshToken(response.data.refresh);
    return response.data.access;
  },

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};

export default OlaiiTokenService;
