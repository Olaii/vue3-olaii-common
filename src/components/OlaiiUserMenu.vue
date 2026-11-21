<template>
  <div v-if="profile" class="olaii-user-menu" :class="{ small: uiStore.sidebarSmall }">
    <NicePopup ref="popup" no-padding class="olaii-user-menu-popup">
      <template #trigger>
        <div class="user user-trigger">
          <NiceAvatar class="user-avatar" :hash="profile.email" :text="fullName" gradient />
          <div class="user-info">
            <div class="user-name">{{ fullName }}</div>
            <div class="user-detail">{{ profile.email }}</div>
            <div v-if="!uiStore.production" class="user-detail development">DEVELOPMENT</div>
          </div>
          <NiceIcon class="user-more" icon="icon-more-vertical" />
        </div>
      </template>

      <template #content>
        <div class="menu">
          <div class="user">
            <NiceAvatar class="user-avatar" :hash="profile.email" :text="fullName" gradient />
            <div class="user-info">
              <div class="user-name">{{ fullName }}</div>
              <div class="user-detail">{{ profile.email }}</div>
              <div v-if="!uiStore.production" class="user-detail development">DEVELOPMENT</div>
            </div>
          </div>

          <!-- App-specific menu items -->
          <slot />

          <div v-if="languageCodes.length > 1" class="menu-item" @click="nextLanguage">
            <NiceIcon icon="icon-globe" />
            <span>{{ uiStore.languages[uiStore.language] }}</span>
          </div>
          <div class="menu-item" @click="uiStore.toggleTheme">
            <NiceIcon icon="icon-droplet" />
            <span>{{ $gettext("Theme") }}</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="confirmLogout = true">
            <NiceIcon icon="icon-log-out" />
            <span>{{ $gettext("Sign out") }}</span>
          </div>
        </div>
      </template>
    </NicePopup>

    <NiceConfirmModal
      name="olaii-logout"
      :open="confirmLogout"
      :title="$gettext('Logout')"
      :message="$gettext('Are you sure you want to logout?')"
      @confirm="authStore.logout()"
      @close="confirmLogout = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { useOlaiiUiStore } from "../stores/ui.store";

const authStore = useOlaiiAuthStore();
const uiStore = useOlaiiUiStore();
const confirmLogout = ref(false);

const profile = computed(() => authStore.userProfile);
const fullName = computed(() => `${profile.value.first_name} ${profile.value.last_name}`);
const languageCodes = computed(() => Object.keys(uiStore.languages));

// Switches to the next available language (en -> sl -> en)
function nextLanguage() {
  const codes = languageCodes.value;
  const next = codes[(codes.indexOf(uiStore.language) + 1) % codes.length];
  uiStore.setLanguage(next);
}
</script>

<style scoped lang="scss">
.olaii-user-menu {
  display: flex;
  align-items: center;

  .olaii-user-menu-popup {
    flex-grow: 1;
  }
}

.user {
  display: flex;
  align-items: center;
  padding: 1rem;

  .user-avatar {
    flex-shrink: 0;
    margin-right: 0.8rem;
  }

  .user-info {
    flex-grow: 1;
    min-width: 0;
  }

  .user-name {
    font-weight: 600;
  }

  .user-detail {
    font-size: 0.7em;
    overflow: hidden;
    text-overflow: ellipsis;

    &.development {
      color: var(--danger-color);
      font-weight: bold;
    }
  }

  .user-more {
    flex-shrink: 0;
    height: 20px;
    width: 20px;
  }
}

.user-trigger {
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
  }
}

// Small sidebar: avatar only
.olaii-user-menu.small .user-trigger {
  justify-content: center;

  .user-avatar {
    margin-right: 0;
  }

  .user-info,
  .user-more {
    display: none;
  }
}

.menu {
  min-width: 250px;

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 1rem;
    cursor: pointer;

    &:hover {
      background: var(--hover-color);
    }

    .nice-icon {
      height: 18px;
      width: 18px;
    }
  }

  .menu-divider {
    border-top: 1px solid var(--border-color);
  }
}
</style>
