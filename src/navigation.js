// Full page navigation, in one place so tests can mock it (jsdom can't change window.location)

export function redirect(url) {
  window.location.href = url;
}

export function reload() {
  window.location.reload();
}
