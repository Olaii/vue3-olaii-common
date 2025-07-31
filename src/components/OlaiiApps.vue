<template>
  <div class="olaii-apps" :class="{ 'olaii-apps-small': olaiiStore.sidebarSmall }">
    <NicePopup>
      <template #trigger>
        <div class="app app-top clickable" :class="{ small: olaiiStore.sidebarSmall }">
          <div class="app-logo">
            <NiceIcon icon="logo" />
          </div>
          <!-- <div class="app-name">Vouchers</div> -->
          <div class="app-name"></div>
          <NiceIcon icon="icon-grid" class="app-burger" />
        </div>
      </template>

      <template #content>
        <div class="app-dropdown">
          <a
            class="app clickable"
            v-for="app in availableApps"
            :key="app.id"
            :style="{ '--color': app.color, '--color2': app.colorLighter }"
            :href="app.url"
          >
            <div class="app-logo">
              <NiceIcon icon="logo" />
            </div>
            <div class="app-name">{{ app.name }}</div>
          </a>
        </div>
      </template>
    </NicePopup>
  </div>
</template>

<script>
export default {
  name: "OlaiiApps",
}
</script>

<script setup>
import { computed } from "vue";
import { useOlaiiStore } from "@/store/olaii.store";
import { useOlaiiAuthStore } from "@/store/auth.store";
const olaiiStore = useOlaiiStore();
const authStore = useOlaiiAuthStore();
const availableApps = computed(() => authStore.availableApps);
</script>

<style scoped lang="scss">
.olaii-apps {
  margin-bottom: 0;

  &.olaii-apps-small {
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
  }

  .nice-popup {
    width: 100%;
  }
}

.app {
  display: flex;
  align-items: center;
  --color: var(--nice-primary-color);
  --color2: transparent;
  background: var(--color2);
  color: var(--color);
  padding: 1rem;
  text-decoration: none;

  .app-logo {
    height: 40px;
    width: 60px;
    color: var(--color);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--nice-border-radius);

    .nice-icon {
      height: 100%;
      width: 100%;
    }
  }

  .app-name {
    flex-grow: 1;
    margin-left: 1rem;
    font-size: 1.2em;
    font-weight: 600;
  }

  .app-burger {
    flex-shrink: 0;
    height: 20px;
    width: 20px;
    margin-right: 15px;
  }

  &.small {
    padding: 0;
    background: transparent;

    .app-name,
    .app-burger {
      display: none;
    }

    .app-logo {
      width: -webkit-fill-available;
      color: var(--nice-primary-color);

      .nice-icon {
        height: 35px;
        width: 50px;
      }
    }
  }
}

.app-dropdown {
  display: grid;
  gap: 0.6rem;
  grid-template-columns: repeat(1, 1fr);

  .app {
    border-radius: var(--nice-border-radius);
    width: 250px;
    padding: 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
      text-decoration: none;
    }

    .app-logo {
      height: 45px;
      width: 45px;
      border-radius: var(--nice-border-radius);
      color: white;
      background: var(--color);

      .nice-icon {
        height: 23px;
      }
    }
  }
}
</style>
