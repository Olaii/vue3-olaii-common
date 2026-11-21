<template>
  <div
    class="olaii-app-switcher"
    :class="{ small: uiStore.sidebarSmall }"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <!-- Popper reads placement only on mount, so remount when the sidebar size changes -->
    <NicePopup
      ref="popup"
      :key="uiStore.sidebarSmall ? 'small' : 'full'"
      :placement="uiStore.sidebarSmall ? 'right-start' : 'bottom-start'"
      no-padding
      :offset="0"
      :disabled="!hasApps"
      @change="onPopupChange"
    >
      <template #trigger>
        <div
          class="app app-current"
          :style="appStyle(currentApp)"
          @pointerdown="rememberPointer"
          @click.stop="onClick"
        >
          <div class="app-logo"><NiceIcon icon="logo" /></div>
          <div class="app-name">{{ currentApp.name }}</div>
          <NiceIcon v-if="hasApps" icon="icon-menu" class="app-menu" />
        </div>
      </template>

      <template #content>
        <div class="app-dropdown">
          <a
            v-for="app in authStore.availableApps"
            :key="app.id"
            class="app"
            :style="appStyle(app)"
            :href="app.url"
          >
            <div class="app-logo"><NiceIcon icon="logo" /></div>
            <div class="app-name">{{ app.name }}</div>
          </a>
        </div>
      </template>
    </NicePopup>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from "vue";
import { OLAII_APPS, useOlaiiAuthStore } from "../stores/auth.store";
import { useOlaiiUiStore } from "../stores/ui.store";
import { useOlaiiOptions } from "../options";

const options = useOlaiiOptions();
const authStore = useOlaiiAuthStore();
const uiStore = useOlaiiUiStore();

const hasApps = computed(() => Object.keys(authStore.availableApps).length > 0);

// Apps outside OLAII_APPS (e.g. the demo) use the app title and the theme colors
const currentApp = computed(() => {
  const app = OLAII_APPS[options.appId];
  if (app) return { ...app, name: app.name() };
  return {
    name: options.title,
    color: "var(--primary-color)",
    colorDarker: "var(--primary-color-darker)",
  };
});

function appStyle(app) {
  return { "--app-color": app.color, "--app-color-darker": app.colorDarker };
}

// The popup opens on hover with a mouse and on click or tap. NicePopup's own openOnHover closes as soon as the
// pointer leaves the trigger, so hover is handled on the whole switcher: the dropdown is inside it (offset 0, no gap),
// so moving from the trigger into the dropdown doesn't close it.
const popup = ref(null);
const isOpen = ref(false);

function open() {
  if (!isOpen.value && hasApps.value) popup.value.toggle();
}

function close() {
  if (isOpen.value) popup.value.close();
}

// With a mouse the popup is already open from hovering, so a click keeps it open; a tap toggles it
let pointerType = "mouse";

function rememberPointer(event) {
  pointerType = event.pointerType;
}

function onClick() {
  if (pointerType != "mouse" && isOpen.value) close();
  else open();
}

// Only a real mouse hovers. A tap also fires pointerenter, which would open the popup right before the click closes it.
function onPointerEnter(event) {
  if (event.pointerType == "mouse") open();
}

function onPointerLeave(event) {
  if (event.pointerType == "mouse") close();
}

function onPopupChange(value) {
  isOpen.value = unref(value);
}

// The popup is remounted closed when the sidebar size changes
watch(
  () => uiStore.sidebarSmall,
  () => (isOpen.value = false)
);
</script>

<style scoped lang="scss">
// Same look as the webapps dropdown in olaii-backoffice: solid app color, darker logo cell, white text
$app-height: 60px;
$logo-width: 65px; // Same as the small sidebar, so only the logo cell shows when the sidebar is small

.olaii-app-switcher {
  flex-shrink: 0;
  margin: 1rem;

  .nice-popup {
    display: block;
    width: 100%;

    :deep(.nice-popup-content-wrapper .nice-popup-content) {
      border-radius: 0;
    }
  }
}

.app {
  display: flex;
  align-items: center;
  height: $app-height;
  background: var(--app-color);
  border-radius: var(--border-radius);
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover,
  &:focus {
    background: var(--app-color-darker);
    color: white;
    text-decoration: none;
  }

  .app-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: $logo-width;
    height: 100%;
    background: var(--app-color-darker);
    border-radius: var(--border-radius);

    .nice-icon {
      height: 30px;
      width: 45px;
    }
  }

  .app-name {
    flex-grow: 1;
    padding: 0 1.2rem;
    font-size: 1.2em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .app-menu {
    flex-shrink: 0;
    height: 20px;
    width: 20px;
    opacity: 0.7;
    margin-right: 1rem;
  }
}

// Small sidebar: only a square logo cell that fits the rail, the dropdown opens to the right
.olaii-app-switcher.small {
  margin: 0.5rem;

  .app-current {
    height: auto;
    aspect-ratio: 1;

    .app-logo {
      width: 100%;

      .nice-icon {
        height: 24px;
        width: 36px;
      }
    }

    .app-name,
    .app-menu {
      display: none;
    }
  }
}

.app-dropdown {
  display: flex;
  flex-direction: column;
  width: 271px;
}
</style>
