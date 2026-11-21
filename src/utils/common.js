import { $gettext } from "../i18n";
import { notify } from "vue3-nice-elements";

export { isLocal } from "../services/storage.service";

/** Yes/No options for selects, translated in the current language */
export function yesNo() {
  return [
    { id: "true", name: $gettext("Yes") },
    { id: "false", name: $gettext("No") },
  ];
}

export function searchYesNo(search) {
  const options = yesNo();
  if (!search) return options;
  return options.filter((option) => option.name.toLowerCase().includes(search.toLowerCase()));
}

/** { id: item } map from an array of objects with ids */
export function arrayToMap(array, key = "id") {
  return array.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {});
}

// Notifications and toasts go through vue3-nice-elements' notify(). The app renders them with <NiceNotifications />
// (notifications) and <NiceToast /> (toasts).

export function notifySuccess(text, title = $gettext("Success"), icon = "icon-check-circle") {
  return notify({ message: text, type: "success", title, icon });
}

export function notifyError(text, title = $gettext("Error"), icon = "icon-alert-triangle") {
  return notify({ message: text, type: "danger", title, icon });
}

/**
 * Short message at the bottom of the page, e.g. "Saved" or "Link copied".
 *
 * @param {string} text
 * @param {string} [type] "success", "danger", "warning" or "info"; none for a neutral toast
 * @param {object} [options] e.g. { timeout: 8000 } (ms, 0 keeps it until dismissed)
 */
export function notifyToast(text, type, options) {
  return notify.toast(text, type, options);
}

/**
 * Copies text to the clipboard and shows a toast ("Copied to clipboard") or an error notification.
 *
 * @param {string} text
 * @param {object} [options]
 * @param {string|false} [options.message] Toast text on success; false copies without any message
 * @returns {Promise<boolean>} Whether the text was copied
 */
export async function copyToClipboard(text, { message } = {}) {
  const copied = await writeToClipboard(String(text ?? ""));
  if (message === false) return copied;

  if (copied) notifyToast(message || $gettext("Copied to clipboard"), "success");
  else notifyError($gettext("Copy to clipboard failed"));
  return copied;
}

// The Clipboard API needs a secure page (https or localhost). Elsewhere, e.g. the app opened over plain http on the
// local network, fall back to selecting the text in a hidden textarea and the older "copy" command.
async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Denied (no permission or the page isn't focused): try the fallback
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

/** Saves a Blob (e.g. from RequestService.getBlob) as a file */
export function downloadBlob(blob, fileName) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link); // Firefox needs the link in the document
  link.click();
  // Give the browser time to start the download before cleaning up
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
    link.remove();
  }, 100);
}

/** Saves raw response data as a file */
export function downloadFile(responseData, fileName) {
  downloadBlob(responseData instanceof Blob ? responseData : new Blob([responseData]), fileName);
}
