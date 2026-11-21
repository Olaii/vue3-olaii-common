/* eslint-disable no-console */
import { $pgettext } from "../i18n";
import { notify } from "vue3-nice-elements";
import { peekOlaiiOptions } from "../options";

// The app's own codes, from the errorCodes option: a ($pgettext) => ({ code: message }) function or a plain object
function appErrorCodes() {
  const errorCodes = peekOlaiiOptions()?.errorCodes;
  return typeof errorCodes == "function" ? errorCodes($pgettext) : errorCodes || {};
}

/**
 * Message for a 400/401/406 response. The API answers in several formats, checked in this order:
 * - validation errors: { type: "validation_error", errors: [{ code, detail }] }
 * - DRF field errors: [{ field: ["message", ...] }]
 * - an error code we have a translation for: { error_code } or { error }
 * - a plain text: { message } or { detail }
 */
function parseClientError(error, errorCodes) {
  const status = error.response.status;
  const data = error.response.data || {};

  if (data.type == "validation_error" && data.errors) {
    const messages = data.errors.map(
      (item) => errorCodes[item.code] || errorCodes[item.detail] || item.detail
    );
    return { code: $pgettext("error", "Validation error"), message: messages.join("\n") };
  }

  if (Array.isArray(data)) {
    const messages = [];
    for (const item of data) {
      if (typeof item != "object") continue;
      for (const [field, fieldMessages] of Object.entries(item)) {
        messages.push(field + ": " + [].concat(fieldMessages).join(","));
      }
    }
    return { code: status, message: messages.join("\n") };
  }

  if (errorCodes[data.error_code]) return { code: status, message: errorCodes[data.error_code] };
  if (errorCodes[data.error]) return { code: status, message: errorCodes[data.error] };
  if (data.message) return { code: status, message: data.message };
  if (data.detail) return { code: status, message: data.detail };
  if (errorCodes[error.code]) return { code: error.code, message: errorCodes[error.code] };
  return { code: status, message: data };
}

/** Error thrown by services: the parsed { code, message } plus the original error */
class AppError {
  constructor(error) {
    const err = ErrorService.getError(error);
    this.name = this.constructor.name;
    this.message = err.message;
    this.code = err.code;
    this.response = error?.response;
    this.raw = error;
  }
}

const ErrorService = {
  // Built on every call, so messages are in the current language. Apps add their own codes with the errorCodes option.
  get errorCodes() {
    return {
      "-1": $pgettext("error", "Something went wrong"),
      400: $pgettext("error", "Bad Request"),
      401: $pgettext("error", "Unauthorized"),
      402: $pgettext("error", "Payment Required"),
      403: $pgettext("error", "Forbidden"),
      404: $pgettext("error", "Not Found"),
      405: $pgettext("error", "Method Not Allowed"),
      406: $pgettext("error", "Not Acceptable"),
      407: $pgettext("error", "Proxy Authentication Required"),
      500: $pgettext("error", "Internal Server Error"),
      502: $pgettext("error", "Bad Gateway"),
      503: $pgettext("error", "Service Unavailable"),
      504: $pgettext("error", "Gateway Timeout"),
      ERR_NETWORK: $pgettext("error", "Network error!"),
      ECONNABORTED: $pgettext("error", "Request timeout!"),
      ERR_EMPTY_RESPONSE: $pgettext("error", "Empty response"),
      ERR_CONNECTION_REFUSED: $pgettext("error", "Connection refused"),
      invalid_grant: $pgettext("error", "Invalid credentials given."),
      "Authentication credentials were not provided.": $pgettext(
        "error",
        "Authentication credentials were not provided."
      ),
      "This field may not be null.": $pgettext("error", "This field may not be null."),
      ...appErrorCodes(),
    };
  },

  showError(error) {
    const parsedError = ErrorService.getError(error);
    notify({
      message: parsedError.message,
      type: "danger",
      title: $pgettext("error", "Error") + " " + parsedError.code,
      icon: "icon-alert-triangle",
    });
    return parsedError;
  },

  /**
   * Turns an axios error (or AppError) into { code, message } with a translated message.
   *
   * The checks run from the most specific to the most generic message:
   * 404 -> client errors (400/401/406, which carry a message from the API) -> known status code
   * -> API detail/message -> known axios code (network, timeout) -> unknown.
   */
  getError(error) {
    // Already parsed, e.g. thrown by a service and caught again by a view
    if (error instanceof AppError) return { code: error.code, message: error.message };
    console.error(error);

    const errorCodes = ErrorService.errorCodes;
    const response = error?.response;
    const data = response?.data || {};

    if (response?.status == 404) {
      return { code: 404, message: $pgettext("error", "Not found") };
    }
    if ([400, 401, 406].includes(response?.status)) {
      return parseClientError(error, errorCodes);
    }
    if (response && errorCodes[response.status]) {
      return { code: response.status, message: errorCodes[response.status] };
    }
    if (response && data.detail) return { code: response.status, message: data.detail };
    if (response && data.message) return { code: response.status, message: data.message };
    if (error?.code && errorCodes[error.code]) {
      return { code: error.code, message: errorCodes[error.code] };
    }
    return { code: $pgettext("error", "UNKNOWN"), message: $pgettext("error", "Unknown error") };
  },
};

export default ErrorService;
export { ErrorService, AppError };
