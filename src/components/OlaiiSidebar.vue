<template>
  <div class="olaii-sidebar-overlay" v-if="generalStore.sidebarOpen" @click="generalStore.toggleSidebar"></div>
  <aside
    :class="{ open: generalStore.sidebarOpen, small: generalStore.sidebarSmall }"
    class="olaii-sidebar"
  >
    <div class="handle" @click="generalStore.toggleSidebarSmall"></div>
    <NiceButton class="mobile-toggle" icon="icon-menu" @click="generalStore.toggleSidebar" />

    <!-- App switcher -->
    <OlaiiApps />

    <!-- Organizations -->
    <slot name="middle"></slot>

    <!-- Navigation -->
    <div class="olaii-sidebar-items">
      <div class="olaii-sidebar-item-wrapper" v-for="link in links" :key="link.path">
        <component
          class="olaii-sidebar-item"
          v-if="!link.hidden"
          :is="link.disabled ? 'div' : 'router-link'"
          :class="{ disabled: link.disabled }"
          :to="{ name: link.path, params: { ...link.params } }"
          @click="generalStore.closeSidebar"
        >
          <NiceIcon :icon="link.icon" />
          <span>{{ link.name }}</span>
        </component>
      </div>
    </div>

    <!-- Footer -->
    <div class="olaii-sidebar-footer">
      <OlaiiUser :small="generalStore.sidebarSmall" />
    </div>
  </aside>
</template>

<script>
export default {
  name: "OlaiiSidebar",
}
</script>

<script setup>
import { useOlaiiStore } from "@/store/olaii.store";
import OlaiiUser from "@/components/OlaiiUser.vue";
import OlaiiApps from "@/components/OlaiiApps.vue";
const generalStore = useOlaiiStore();

defineProps({
  links: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.olaii-sidebar-overlay {
  display: none;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.olaii-sidebar {
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  border-right: 1px solid var(--nice-border-color);
  z-index: 1000;

  height: 100%;
  // height: -moz-available;
  // height: -webkit-fill-available;
  // height: fill-available;
  background: var(--nice-card-bg);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);

  --sidebar-width: 300px;
  width: var(--sidebar-width);

  .mobile-toggle {
    display: none;
    position: absolute;
    bottom: 1rem;
    left: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: transparent;
    cursor: w-resize;

    &:hover {
      background: var(--nice-primary-color);
    }
  }

  &.small {
    --sidebar-width: 65px;

    .handle {
      cursor: e-resize;
    }

    .sidebar-logo {
      padding: 10px;

      img {
        height: auto;
      }

      .nice-icon {
        width: 100%;
      }
    }

    .olaii-sidebar-items {
      .olaii-sidebar-item {
        padding: 8px;
        justify-content: center;
        position: relative;

        .nice-icon {
          margin: 0;
        }

        span {
          display: none;
          position: absolute;
          top: 0;
          left: 100%;
          padding: 8px;
          background: var(--nice-primary-color-shadow);
        }
      }
    }
  }

  .sidebar-logo {
    flex-shrink: 0;
    padding: 20px;
    padding-bottom: 0px;
    padding-top: 20px;
    color: var(--nice-primary-color);
    text-align: center;

    img {
      height: 80px;
      max-width: 100%;
    }

    .nice-icon {
      height: 40px;
      width: 60px;
    }
  }

  .olaii-sidebar-items {
    padding: 1rem;
    flex-grow: 1;
    overflow: auto;

    .olaii-sidebar-item {
      padding: 8px 15px;
      border-radius: var(--nice-border-radius);
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--nice-font-color);
      // font-weight: 600;

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      svg {
        height: 23px;
        width: 23px;
        margin-right: 1rem;
      }

      &:hover {
        // background: var(--nice-primary-color-bg);
        background: linear-gradient(90deg, var(--nice-primary-color-shadow), transparent);
      }

      &.active,
      &.router-link-active {
        background: var(--nice-primary-color-shadow);
        color: var(--nice-primary-color);
      }
    }
  }

  .olaii-sidebar-footer {
    flex-shrink: 0;
  }
}

// Mobile
@media (max-width: 576px) {
  .olaii-sidebar-overlay {
    display: block !important;
  }

  aside {
    position: absolute !important;
    top: 0;
    left: -300px;
    z-index: 100;

    transition: all 0.3s;

    &.open {
      left: 0px;
    }

    .mobile-toggle {
      display: block !important;
    }

    .toggle {
      display: flex;
    }

    .mobile {
      display: flex;
    }

    .items {
      position: fixed;
      background: var(--nice-sidebar-bg);
    }
  }
}
</style>
