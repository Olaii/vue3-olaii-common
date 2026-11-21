import { peekOlaiiOptions } from "./options";

// The library translates through the app's own vue3-gettext instance, so its strings are part of the app's
// translations. The app's gettext extraction must include node_modules/vue3-olaii-common/src/**.
//
// These wrappers are called at runtime (not at import), so they follow language changes. Keep the calls literal,
// e.g. $pgettext("error", "Not found"), so vue-gettext-extract finds them.

// Without a gettext instance (or before install) the English message is returned as is

export function $gettext(message) {
  const gettext = peekOlaiiOptions()?.gettext;
  return gettext ? gettext.$gettext(message) : message;
}

export function $pgettext(context, message) {
  const gettext = peekOlaiiOptions()?.gettext;
  return gettext ? gettext.$pgettext(context, message) : message;
}
