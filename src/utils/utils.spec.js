import { afterEach, describe, expect, it, vi } from "vitest";
import { formatCurrency, formatDate, formatDateWithTime } from "./format";
import {
  arrayToMap,
  copyToClipboard,
  downloadFile,
  notifyError,
  notifySuccess,
  notifyToast,
  searchYesNo,
} from "./common";
import { notifications } from "../test/setup";
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

  it("shows notifications and toasts through nice-elements", () => {
    install();
    notifySuccess("Saved");
    notifyError("Not saved");
    notifyToast("Link copied", "info", { timeout: 8000 });
    expect(
      notifications.map(({ message, type, title, variant, timeout }) => ({
        message,
        type,
        title,
        variant,
        timeout,
      }))
    ).toEqual([
      // Newest first, as nice-elements keeps them
      { message: "Link copied", type: "info", title: undefined, variant: "toast", timeout: 8000 },
      {
        message: "Not saved",
        type: "danger",
        title: "Error",
        variant: "notification",
        timeout: 3000,
      },
      {
        message: "Saved",
        type: "success",
        title: "Success",
        variant: "notification",
        timeout: 3000,
      },
    ]);
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

describe("copyToClipboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete navigator.clipboard;
    delete document.execCommand;
  });

  it("copies with the Clipboard API and shows a toast", async () => {
    install();
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    await expect(copyToClipboard("ABC-123")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("ABC-123");
    expect(notifications[0]).toMatchObject({
      message: "Copied to clipboard",
      type: "success",
      variant: "toast",
    });
  });

  it("falls back to the copy command without the Clipboard API", async () => {
    install();
    document.execCommand = vi.fn(() => true);

    await expect(copyToClipboard("link", { message: "Link copied" })).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(notifications[0].message).toBe("Link copied");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("shows an error when copying fails, or nothing with message: false", async () => {
    install();
    document.execCommand = vi.fn(() => false);

    await expect(copyToClipboard("x")).resolves.toBe(false);
    expect(notifications[0]).toMatchObject({ message: "Copy to clipboard failed", type: "danger" });

    await expect(copyToClipboard("x", { message: false })).resolves.toBe(false);
    expect(notifications).toHaveLength(1);
  });
});
