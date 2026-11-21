<template>
  <div v-if="uiStore.sidebarOpen" class="olaii-sidebar-overlay" @click="uiStore.toggleSidebar" />
  <aside class="olaii-sidebar" :class="{ open: uiStore.sidebarOpen, small: uiStore.sidebarSmall }">
    <div class="handle" @click="uiStore.toggleSidebarSmall" />
    <NiceButton class="mobile-toggle" icon="icon-menu" @click="uiStore.toggleSidebar" />

    <OlaiiAppSwitcher />

    <!-- Organization / event switcher, or anything the app puts in its place -->
    <slot name="switcher">
      <OlaiiContextSwitcher v-if="options.context" />
    </slot>

    <nav class="links">
      <template v-for="(link, index) in visibleLinks" :key="index">
        <div v-if="link.type == 'TITLE'" class="link-title">{{ link.name }}</div>
        <div v-else-if="isDisabled(link)" class="link disabled">
          <NiceIcon :icon="link.icon" />
          <span>{{ link.name }}</span>
        </div>
        <router-link
          v-else
          class="link"
          :class="{ active: isActive(link) }"
          :to="linkTo(link)"
          @click="uiStore.setSidebarOpen(false)"
        >
          <NiceIcon :icon="link.icon" />
          <span>{{ link.name }}</span>
        </router-link>
      </template>
    </nav>

    <div class="footer">
      <slot name="footer">
        <OlaiiUserMenu />
      </slot>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import OlaiiAppSwitcher from "./OlaiiAppSwitcher.vue";
import OlaiiContextSwitcher from "./OlaiiContextSwitcher.vue";
import OlaiiUserMenu from "./OlaiiUserMenu.vue";
import { useOlaiiContextStore } from "../stores/context.store";
import { useOlaiiUiStore } from "../stores/ui.store";
import { useOlaiiOptions } from "../options";

const props = defineProps({
  /**
   * Navigation: [{ name, path (route name), icon, params?, query?, hidden?(), disabled?() }]
   * and section titles: { type: "TITLE", name, hidden?() }
   */
  links: {
    type: Array,
    default: () => [],
  },
});

const options = useOlaiiOptions();
const router = useRouter();
const route = useRoute();
const uiStore = useOlaiiUiStore();
// Only apps with organizations have the context store configured
const context = options.context ? useOlaiiContextStore() : null;

const visibleLinks = computed(() => props.links.filter((link) => !link.hidden?.()));

// Active when the current route or one of its parents is the link's route, so detail pages nested under a link keep
// it highlighted. Not vue-router's router-link-active: it treats a link to an empty-path child route (e.g. "Events"
// at /:organizationId) as a link to the parent, which would highlight it on every page under that parent.
function isActive(link) {
  return route.matched.some((record) => record.name == link.path);
}

// Disabled by the app, or not possible right now: e.g. an event page while no event is selected. vue-router throws
// for a link with a missing param, which would break the whole sidebar.
function isDisabled(link) {
  if (link.disabled?.()) return true;
  try {
    router.resolve(linkTo(link));
    return false;
  } catch {
    return true;
  }
}

// Links get the selected organization and event as route params, so apps don't repeat them.
// Only the params the route's path uses are passed, vue-router warns about the others.
function linkTo(link) {
  const path = router.getRoutes().find((route) => route.name == link.path)?.path || "";
  const params = {};
  if (path.includes(":organizationId")) params.organizationId = context?.organizationId;
  if (path.includes(":eventId")) params.eventId = context?.eventId;
  return { name: link.path, params: { ...params, ...link.params }, query: { ...link.query } };
}
</script>

<style scoped lang="scss">
.olaii-sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.1);
}

.olaii-sidebar {
  --sidebar-width: 300px;

  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  width: var(--sidebar-width);
  height: 100%;
  z-index: 1000;
  border-right: 1px solid var(--border-color);
  background: var(--card-bg);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);

  &.small {
    --sidebar-width: 65px;
  }
}

// Drag-like handle on the right edge: toggles the small sidebar
.handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: transparent;
  cursor: w-resize;

  &:hover {
    background: var(--primary-color);
  }

  .small & {
    cursor: e-resize;
  }
}

.mobile-toggle {
  display: none;
  position: absolute;
  bottom: 1rem;
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.links {
  flex-grow: 1;
  padding: 1rem;
  overflow: auto;
}

.link-title {
  padding: 0.5rem 15px 0.2rem;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;

  &:first-child {
    padding-top: 0;
  }
}

.link {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 8px 15px;
  border-radius: var(--border-radius);
  color: var(--font-color);
  text-decoration: none;

  .nice-icon {
    height: 23px;
    width: 23px;
    margin-right: 1rem;
  }

  &:hover {
    background: linear-gradient(90deg, var(--primary-color-bg), transparent);
  }

  &.active {
    background: var(--primary-color-bg);
    color: var(--primary-color);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// Small sidebar: icons only
.small {
  .link-title {
    display: none;
  }

  .link {
    justify-content: center;
    padding: 8px;

    .nice-icon {
      margin: 0;
    }

    span {
      display: none;
    }
  }
}

.footer {
  flex-shrink: 0;
}

// Mobile: the sidebar slides in over the page
@media (max-width: 576px) {
  .olaii-sidebar-overlay {
    display: block;
  }

  .olaii-sidebar {
    position: absolute;
    top: 0;
    left: calc(-1 * var(--sidebar-width));
    z-index: 100;
    transition: left 0.3s;

    &.open {
      left: 0;
    }
  }

  .mobile-toggle {
    display: block;
  }
}
</style>
