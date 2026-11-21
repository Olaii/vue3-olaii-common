import { describe, expect, it, vi } from "vitest";
import { formatCurrency, formatDate, formatDateWithTime } from "./format";
import { arrayToMap, downloadFile, notifySuccess, searchYesNo } from "./common";
import { install } from "../test/helpers";

describe("format", () => {
  it("formats currency in Slovenian euros", () => {
    expect(formatCurrency(12345.5).replace(/\s/g, " ")).toBe("12.345,50 €");
  });

  it("formats dates", () => {
    const date = new Date(2026, 10, 21, 14, 5, 9);
    expect(formatDate(date)).toBe("21.11.2026");
    expect(formatDateWithTime(date)).toBe("21.11.2026 • 14:05");
    expect(formatDateWithTime(date, true, true)).toBe("sobota, 21.11.2026 • 14:05:09");
    expect(formatDate(null)).toBe("");
  });
});

describe("common", () => {
  it("searches yes/no options", () => {
    install();
    expect(searchYesNo("ye")).toEqual([{ id: "true", name: "Yes" }]);
    expect(searchYesNo("")).toHaveLength(2);
  });

  it("maps arrays by id", () => {
    expect(arrayToMap([{ id: 1 }, { id: 2 }])).toEqual({ 1: { id: 1 }, 2: { id: 2 } });
  });

  it("notifies through nice", () => {
    const app = install();
    const notification = vi.fn();
    app.config.globalProperties.$nice = { notification };
    notifySuccess("Saved");
    expect(notification).toHaveBeenCalledWith("Saved", "success", "Success", "icon-check-circle");
  });

  it("downloads data as a file", () => {
    URL.createObjectURL = vi.fn(() => "blob:1");
    URL.revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    downloadFile("a,b", "export.csv");
    expect(click).toHaveBeenCalledOnce();
    expect(URL.createObjectURL.mock.calls[0][0]).toBeInstanceOf(Blob);
  });
});
