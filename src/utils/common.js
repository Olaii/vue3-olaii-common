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
