import StorageService from "./services/storage.service";
import { getOlaiiOptions } from "./options";

/** Language saved in the app's language cookie, or the default language */
export function getSavedLanguage() {
  const { languageCookieKey, defaultLanguage } = getOlaiiOptions();
  return StorageService.get(languageCookieKey) || defaultLanguage;
}

/** Switches the app's language and remembers it in the language cookie */
export function setLanguage(language) {
  const { gettext, languageCookieKey } = getOlaiiOptions();
  if (gettext) gettext.current = language;
  StorageService.save(languageCookieKey, language);
}
