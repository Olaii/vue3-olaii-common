/* eslint-disable no-console */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import StorageService from "./storage.service";
import { getOlaiiOptions, peekOlaiiOptions } from "../options";
import { reload } from "../navigation";

// The token cookies are shared by all Olaii webapps and tabs, any of which can refresh them at any time.
// So the cookies are the source of truth and are re-read before every request.
const TokenService = {
  accessToken: null,
  refreshToken: null,
  accessTokenCookieName: "olaii_access_token",
  refreshTokenCookieName: "olaii_refresh_token",
  refreshLockName: "olaii_token_refresh",
  refreshPromise: null,

  get debug() {
    return !!peekOlaiiOptions()?.debug;
  },

  getHeader() {
    this.syncFromCookies();
    const header = { "Content-Type": "application/json" };
    if (this.accessToken) header.Authorization = `Bearer ${this.accessToken}`;
    return header;
  },

  hasToken() {
    return this.accessToken != null;
  },

  readFromCookies() {
    this.accessToken = StorageService.get(this.accessTokenCookieName) || null;
    this.refreshToken = StorageService.get(this.refreshTokenCookieName) || null;
  },

  // Picks up tokens written by another tab or app. When the user logged out or switched account there, the state of
  // this tab (user profile, organization, ...) belongs to the previous session, so reload and start over.
  syncFromCookies() {
    const previousAccessToken = this.accessToken;
    this.readFromCookies();
    if (!previousAccessToken || previousAccessToken === this.accessToken) return;

    const previousUser = this._decode(previousAccessToken).u;
    if (!this.accessToken || this._decode(this.accessToken).u !== previousUser) {
      console.warn("[TOKEN] Logged out or user changed in another tab, reloading");
      reload();
    }
  },

  isAccessTokenExpired() {
    return !!this.accessToken && !this._isValidFor(this.accessToken, 0);
  },

  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    StorageService.save(this.accessTokenCookieName, accessToken);
    StorageService.save(this.refreshTokenCookieName, refreshToken);
  },

  clear() {
    this.accessToken = null;
    this.refreshToken = null;
    StorageService.remove(this.accessTokenCookieName);
    StorageService.remove(this.refreshTokenCookieName);
  },

  // The backend rotates refresh tokens and blacklists the used one, so only one refresh per refresh token can succeed.
  // Refreshes are serialized across tabs with a Web Lock, requests in this tab share one refresh, and tokens already
  // refreshed by another tab or app are used instead of refreshing again.
  refreshAccessToken() {
    if (!this.refreshPromise) {
      const usedAccessToken = this.accessToken;
      const refresh = () => this._refresh(usedAccessToken);
      const locked = navigator.locks?.request
        ? navigator.locks.request(this.refreshLockName, refresh)
        : refresh();
      this.refreshPromise = locked.finally(() => (this.refreshPromise = null));
    }
    return this.refreshPromise;
  },

  async _refresh(usedAccessToken) {
    if (this._hasNewerTokensInCookies(usedAccessToken)) return this.accessToken;

    const usedRefreshToken = this.refreshToken;
    if (!usedRefreshToken) throw new Error("Refresh token does not exist");

    try {
      const response = await axios({
        method: "post",
        url: getOlaiiOptions().authURL + "api/v2/token/refresh/",
        headers: { "Content-Type": "application/json" },
        timeout: 20000, // Other tabs wait on the lock, so do not hold it forever
        data: { refresh: usedRefreshToken },
      });
      if (this.debug) console.log("[TOKEN] Token refreshed");
      this.setTokens(response.data.access, response.data.refresh);
      return this.accessToken;
    } catch (error) {
      // Another tab or app rotated the tokens meanwhile, which blacklisted ours
      if (this._hasNewerTokensInCookies(usedAccessToken, usedRefreshToken)) return this.accessToken;
      throw error;
    }
  },

  // True when the cookies hold a token pair written after ours by another tab or app: both tokens are present, they
  // differ from the ones we used, and the access token is valid for at least 10 more seconds.
  _hasNewerTokensInCookies(usedAccessToken, usedRefreshToken = null) {
    this.syncFromCookies();
    return (
      !!this.accessToken &&
      !!this.refreshToken &&
      this.accessToken !== usedAccessToken &&
      this.refreshToken !== usedRefreshToken &&
      this._isValidFor(this.accessToken, 10000)
    );
  },

  _isValidFor(token, milliseconds) {
    const { exp } = this._decode(token);
    return !!exp && exp * 1000 - Date.now() > milliseconds;
  },

  _decode(token) {
    try {
      return jwtDecode(token);
    } catch {
      return {};
    }
  },
};

export default TokenService;
