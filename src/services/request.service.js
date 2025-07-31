import axios from "axios";
import TokenService from "@/services/token.service";

// axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// axios.defaults.timeout = 5000; // 5s Timeout

const OlaiiRequestService = {
  init(apiURL) {
    axios.defaults.baseURL = apiURL;
  },

  // ----------------------------------------- GET -----------------------------------------
  get(path, params, headers) {
    return this.request("GET", path, null, params, headers);
  },

  // ----------------------------------------- GET BLOB -----------------------------------------
  getBlob(path, params, headers) {
    return this.request("GET", path, null, params, headers, "blob");
  },

  // ----------------------------------------- POST -----------------------------------------
  post(path, data, params, headers) {
    return this.request("POST", path, data, params, headers);
  },

  // ----------------------------------------- POST FILE -----------------------------------------
  postFile(path, file, name, customPostData, headers) {
    const formData = customPostData || new FormData();
    if (!customPostData) {
      formData.append("file", file);
      formData.append("name", name);
    }
    return this.request("POST", path, formData, null, headers);
  },

  // ----------------------------------------- POST FORM DATA -----------------------------------------
  postFormData(path, formData, headers) {
    return this.request("POST", path, formData, null, headers);
  },

  // ----------------------------------------- PUT -----------------------------------------
  put(path, data, params, headers) {
    return this.request("PUT", path, data, params, headers);
  },

  // ----------------------------------------- PUT FORM DATA -----------------------------------------
  putFormData(path, formData, headers) {
    return this.request("PUT", path, formData, null, headers);
  },

  // ----------------------------------------- DELETE -----------------------------------------
  delete(path, params, headers) {
    return this.request("DELETE", path, null, params, headers);
  },

  // ----------------------------------------- CUSTOM REQUEST -----------------------------------------
  customRequest(data) {
    return this.request(
      data.method,
      data.url,
      data.data,
      data.params,
      data.headers,
      data.responseType
    );
  },

  // ----------------------------------------- HANDLE LIST -----------------------------------------
  _handleList(response) {
    const res = response.data.results;
    res._metadata = {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
    return res;
  },

  // ----------------------------------------- GET MORE -----------------------------------------
  async getMore(url) {
    return OlaiiRequestService.get(url);
  },

  // ----------------------------------------- GET PAGE -----------------------------------------
  async getPage(path, page, filters) {
    const newFilters = {
      ...filters,
      limit: 50,
      offset: (page - 1) * 50,
    };
    return OlaiiRequestService.get(path, newFilters);
  },

  // ----------------------------------------- REQUEST -----------------------------------------
  async request(method, url, data, params, headers, responseType) {
    // Make request
    const makeRequest = function () {
      const request = {
        method: method,
        url: url,
        data: data,
        params: params,
        headers: headers || TokenService.getHeader(),
        responseType: responseType,
      };
      return axios(request).then((response) => {
        if (response.data.results != undefined) {
          return OlaiiRequestService._handleList(response);
        } else {
          return response.data;
        }
      });
    };

    // Check if token expired
    TokenService.getRefreshToken();
    if (TokenService.accessTokenExpired) {
      // Refresh token
      await TokenService.refreshAccessToken();
      headers = TokenService.getHeader();
      // Make original request
      return makeRequest();
    } else {
      // Make request
      return makeRequest();
    }
  },

  formatDate(date) {
    // YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
    if (typeof date == "object") {
      return date.toISOString();
    } else {
      return date;
    }
  },
};

export default OlaiiRequestService;
