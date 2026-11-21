import { beforeEach, describe, expect, it, vi } from "vitest";
import ErrorService, { AppError } from "./error.service";
import { install } from "../test/helpers";

const response = (status, data) => ({ response: { status, data } });

describe("ErrorService", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    install({
      errorCodes: ($pgettext) => ({
        guest_limit_reached: $pgettext("error", "Guest limit for this group reached"),
      }),
    });
  });

  it("joins validation errors, using known codes", () => {
    const error = response(400, {
      type: "validation_error",
      errors: [{ code: "guest_limit_reached" }, { code: "other", detail: "Name is required" }],
    });
    expect(ErrorService.getError(error)).toEqual({
      code: "Validation error",
      message: "Guest limit for this group reached\nName is required",
    });
  });

  it("uses app error codes for error_code", () => {
    const error = response(400, { error_code: "guest_limit_reached" });
    expect(ErrorService.getError(error).message).toBe("Guest limit for this group reached");
  });

  it("maps status codes and network errors", () => {
    expect(ErrorService.getError(response(404, {}))).toEqual({ code: 404, message: "Not found" });
    expect(ErrorService.getError(response(503, {})).message).toBe("Service Unavailable");
    expect(ErrorService.getError({ code: "ERR_NETWORK" }).message).toBe("Network error!");
    expect(ErrorService.getError(new Error("boom")).code).toBe("UNKNOWN");
  });

  it("wraps errors in AppError", () => {
    const error = new AppError(response(400, { detail: "Bad input" }));
    expect(error).toMatchObject({ name: "AppError", code: 400, message: "Bad input" });
    expect(error.response.status).toBe(400);
  });

  it("shows a nice notification", () => {
    const app = install();
    const notification = vi.fn();
    app.config.globalProperties.$nice = { notification };
    ErrorService.showError(response(404, {}));
    expect(notification).toHaveBeenCalledWith(
      "Not found",
      "danger",
      "Error 404",
      "icon-alert-triangle"
    );
  });
});
