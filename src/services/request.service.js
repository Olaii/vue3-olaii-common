import axios from "axios";
import TokenService from "./token.service";
import { AppError } from "./error.service";
import { getOlaiiOptions } from "../options";

// Own axios instance, so the library does not change the app's global axios defaults
export const http = axios.create();

const PAGE_SIZE = 50;

function multipartHeaders(headers) {
  if (headers) return headers;
  return { ...TokenService.getHeader(), "Content-Type": "multipart/form-data" };
}

const RequestService = {
  get(path, params, headers) {
    return this.request("GET", path, null, params, headers);
  },

  getBlob(path, params, headers, fullResponse) {
    return this.request("GET", path, null, params, headers, "blob", fullResponse);
  },

  post(path, data, params, headers) {
    return this.request("POST", path, data, params, headers);
  },

  patch(path, data, params, headers) {
    return this.request("PATCH", path, data, params, headers);
  },

  postFile(path, file, name, customPostData, headers) {
    const formData = customPostData || new FormData();
    if (!customPostData) {
      if (file) formData.append("file", file);
      if (name) formData.append("name", name);
    }
    return this.request("POST", path, formData, null, multipartHeaders(headers));
  },

  postFormData(path, formData, headers) {
    return this.request("POST", path, formData, null, multipartHeaders(headers));
  },

  put(path, data, params, headers) {
    return this.request("PUT", path, data, params, headers);
  },

  putFormData(path, formData, headers) {
    return this.request("PUT", path, formData, null, headers);
  },

  delete(path, params, headers) {
    return this.request("DELETE", path, null, params, headers);
  },

  customRequest(data) {
    return this.request(
      data.method,
      data.url,
      data.data,
      data.params,
      data.headers,
      data.responseType,
      data.fullResponse
    );
  },

  // Paginated API lists ({ count, next, previous, results }) become an array with _metadata
  _handleList(response) {
    const res = response.data.results;
    res._metadata = {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
    return res;
  },

  async getMore(url) {
    try {
      return await RequestService.get(url);
    } catch (error) {
      throw new AppError(error);
    }
  },

  async getPage(path, page, filters) {
    try {
      return await RequestService.get(path, {
        ...filters,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      });
    } catch (error) {
      throw new AppError(error);
    }
  },

  /**
   * Sends a request to the app API (or an absolute URL) with the user's token.
   *
   * 1. Re-read the token cookies, another tab or app may have refreshed them.
   * 2. Refresh an access token that already expired, instead of sending a request that will fail.
   * 3. Send the request. A 401 means the token was rejected anyway: refresh and retry once.
   * Requests to /token endpoints never refresh, so a failing refresh can't loop.
   *
   * Returns response.data, an array with _metadata for paginated lists, or the full axios response
   * when fullResponse is true.
   */
  async request(method, url, data, params, headers, responseType, fullResponse = false) {
    // Built per attempt, so a retry uses the refreshed token. Custom headers only get their Authorization updated.
    const buildHeaders = () => {
      if (!headers) return TokenService.getHeader();
      if (headers.Authorization) {
        return { ...headers, Authorization: `Bearer ${TokenService.accessToken}` };
      }
      return headers;
    };

    const makeRequest = async () => {
      const response = await http({
        baseURL: getOlaiiOptions().apiURL,
        method,
        url,
        data,
        params,
        headers: buildHeaders(),
        responseType,
      });
      if (fullResponse) return response;
      if (response.data?.results != undefined) return RequestService._handleList(response);
      return response.data;
    };

    // 1.
    TokenService.syncFromCookies();
    const canRefresh = !!TokenService.refreshToken && !String(url).includes("/token");

    // 2.
    if (canRefresh && TokenService.isAccessTokenExpired()) {
      await TokenService.refreshAccessToken();
    }

    // 3.
    try {
      return await makeRequest();
    } catch (error) {
      // Token rejected (e.g. revoked or clock skew): refresh and retry once
      if (canRefresh && error?.response?.status == 401) {
        await TokenService.refreshAccessToken();
        return makeRequest();
      }
      throw error;
    }
  },

  /** Date for the API: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z] */
  formatDate(date) {
    return date instanceof Date ? date.toISOString() : date;
  },

  /** [{ id: 1, name: "A" }, { id: 2, name: "B" }] -> [1, 2] */
  replaceWithIds(data, key = "id") {
    return data.map((element) => element[key]);
  },
};

export default RequestService;
