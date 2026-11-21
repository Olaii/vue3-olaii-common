<template>
  <router-view />
  <NiceToast />
  <NiceNotifications />
  <NiceSvgs :is-development="true" />
</template>

<style lang="scss">
// The demo's brand color (appId "demo" isn't an Olaii app, so it has no colors in styles/variables.scss).
// Shades are #3173ff mixed with black (darker) or white (lighter, shadow, bg).
[data-olaii-app="demo"] {
  --primary-color: #3173ff;
  --primary-color-darker: #2c68e6;
  --primary-color-lighter: #4681ff;
  --primary-color-shadow: #ccdcff;
  --primary-color-bg: #eff4ff;
}
</style>
