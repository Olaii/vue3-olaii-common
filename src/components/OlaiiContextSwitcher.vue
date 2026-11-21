<template>
  <NicePopup
    v-if="context.organization"
    ref="popup"
    no-padding
    class="olaii-context-switcher"
    @change="onToggle"
  >
    <template #trigger>
      <div class="item item-current" :class="{ small: uiStore.sidebarSmall }">
        <NiceAvatar class="item-avatar" :text="context.organization.name" />
        <div class="item-info">
          <template v-if="context.event">
            <div class="item-subtitle">{{ context.organization.name }}</div>
            <div class="item-title">{{ context.event.name }}</div>
          </template>
          <template v-else>
            <div class="item-subtitle">{{ $gettext("Organization") }}</div>
            <div class="item-title">{{ context.organization.name }}</div>
          </template>
        </div>
        <NiceIcon class="item-chevron" icon="icon-chevron-down" />
      </div>
    </template>

    <template #content>
      <div class="search">
        <input
          v-model="search"
          type="text"
          :placeholder="$gettext('Search...')"
          @input="onSearch"
        />
        <NiceLoading v-if="loading" />
      </div>

      <NiceNoData v-if="!items.length && !loading" />

      <div class="items">
        <div
          v-for="item in items"
          :key="`${item.type}-${item.id}`"
          class="item"
          :class="{ active: isActive(item) }"
          @click="select(item)"
        >
          <div class="item-info">
            <div v-if="item.type == 'EVENT'" class="item-subtitle">
              {{ item.organization.name }}
            </div>
            <div class="item-title">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </template>
  </NicePopup>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { useOlaiiContextStore } from "../stores/context.store";
import { useOlaiiUiStore } from "../stores/ui.store";
import { useOlaiiOptions } from "../options";
import ErrorService from "../services/error.service";

const options = useOlaiiOptions();
const router = useRouter();
const context = useOlaiiContextStore();
const uiStore = useOlaiiUiStore();

const popup = ref(null);
const loading = ref(false);
const search = ref("");
const items = ref([]);
let searchTimeout = null;

function onToggle(isOpen) {
  if (isOpen) load();
}

// Waits until the user stops typing
function onSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(load, 500);
}

// Apps with events search organizations and events together (context.search); others list organizations
async function load() {
  loading.value = true;
  try {
    // Called on options.context (not destructured), so the app's functions keep their `this`
    const context = options.context;
    items.value = context.search
      ? await context.search(search.value)
      : (await context.fetchOrganizations(search.value)).map((item) => ({
          ...item,
          type: "ORGANIZATION",
        }));
  } catch (error) {
    ErrorService.showError(error);
  } finally {
    loading.value = false;
  }
}

function isActive(item) {
  if (item.type == "EVENT") return item.id == context.eventId;
  return !context.event && item.id == context.organizationId;
}

async function select(item) {
  loading.value = true;
  try {
    const { organizationRoute, eventRoute } = options.context;
    if (item.type == "EVENT") {
      await context.selectOrganization(item.organization.id);
      await context.selectEvent(item.id);
      await router.push({
        name: eventRoute,
        params: { organizationId: item.organization.id, eventId: item.id },
      });
    } else {
      await context.selectOrganization(item.id);
      context.setEvent(null);
      await router.push({ name: organizationRoute, params: { organizationId: item.id } });
    }
    popup.value?.close();
  } catch (error) {
    ErrorService.showError(error);
  } finally {
    loading.value = false;
  }
}

onBeforeUnmount(() => clearTimeout(searchTimeout));
</script>

<style scoped lang="scss">
.olaii-context-switcher {
  display: block;
  margin: 0 1rem;

  :deep(.nice-popup-content) {
    display: flex;
    flex-direction: column;
    max-height: 80vh;
  }
}

.search {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  input {
    flex-grow: 1;
    padding: 0.8rem 1rem;
    border: 0 none;
    background: transparent;
    color: inherit;

    &:focus {
      outline: none;
    }
  }

  .nice-loading {
    flex-shrink: 0;
    height: 18px;
    padding: 0;
    margin: 0 0.5rem 0 0.7rem;
  }
}

.nice-no-data {
  padding: 2rem;
  text-align: center;
  opacity: 0.5;
}

.items {
  width: 272px;
  overflow: auto;
}

.item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 1rem;
  color: var(--font-color);
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }

  &.active {
    background: var(--primary-color-bg);
  }

  .item-avatar {
    flex-shrink: 0;
    height: 35px;
    width: 35px;
    margin-right: 0.8rem;
  }

  .item-info {
    flex-grow: 1;
    min-width: 0;
  }

  .item-title {
    font-weight: 600;
  }

  .item-subtitle {
    font-size: 0.7rem;
    font-weight: 500;
  }

  .item-chevron {
    position: absolute;
    top: 50%;
    right: 1rem;
    height: 18px;
    width: 18px;
    transform: translateY(-50%);
  }
}

.item-current {
  border-radius: var(--border-radius);
  background: var(--primary-color-bg);

  // Small sidebar: avatar only
  &.small {
    padding: 0;
    justify-content: center;
    background: transparent;

    .item-avatar {
      height: 38px;
      width: 38px;
      margin: 0;
    }

    .item-info,
    .item-chevron {
      display: none;
    }
  }
}
</style>
