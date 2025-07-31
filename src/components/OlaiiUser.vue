<template>
  <div class="olaii-user" :class="{ small: generalStore.sidebarSmall }" v-if="userProfile">
    <NicePopup no-padding class="grow" ref="user">
      <template #trigger>
        <div class="olaii-user clickable" v-if="!userProfile.location">
          <NiceAvatar class="olaii-user-avatar" :hash="userProfile.email"
            :text="userProfile.first_name + ' ' + userProfile.last_name" gradient />
          <div class="olaii-user-info">
            <div class="title">{{ userProfile.first_name }} {{ userProfile.last_name }}</div>
            <div class="subtitle">{{ userProfile.email }}</div>
            <div class="subtitle danger text-bold" v-if="!generalStore.production">DEVELOPMENT</div>
          </div>
          <NiceIcon class="icon" icon="icon-more-vertical" />
        </div>
        <div class="olaii-user clickable" v-if="userProfile.location">
          <NiceAvatar class="olaii-user-avatar" :text="userProfile.location.name" gradient />
          <div class="olaii-user-info">
            <div class="title">{{ userProfile.location.name }}</div>
            <div class="subtitle">
              {{ userProfile.location.address }}, {{ userProfile.location.zip }}
              {{ userProfile.location.city }}
            </div>
            <div class="subtitle danger text-bold" v-if="!generalStore.production">DEVELOPMENT</div>
          </div>
          <NiceIcon class="icon" icon="icon-more-vertical" />
        </div>
      </template>

      <template #content>
        <div class="list-style">
          <div class="olaii-user">
            <NiceAvatar v-if="!userProfile.location" class="olaii-user-avatar" :hash="userProfile.email"
              :text="userProfile.first_name + ' ' + userProfile.last_name" gradient />
            <NiceAvatar v-if="userProfile.location" class="olaii-user-avatar" :text="userProfile.location.name"
              gradient />
            <div class="olaii-user-info">
              <div class="title">{{ userProfile.first_name }} {{ userProfile.last_name }}</div>
              <div class="subtitle">{{ userProfile.email }}</div>
              <div class="subtitle">{{ authStore.role }}</div>
              <div class="subtitle danger text-bold" v-if="!generalStore.production">
                DEVELOPMENT
              </div>
            </div>
          </div>
          <!-- <div class="element">
            <NiceIcon icon="icon-settings" /><span>Settings</span>
          </div> -->
          <div class="element clickable" @click="changeLanguage">
            <NiceIcon icon="icon-globe" /><span>
              {{ generalStore.languages[generalStore.language] }}
            </span>
          </div>
          <div class="element clickable" @click="generalStore.toggleTheme">
            <NiceIcon icon="icon-droplet" /><span v-translate>Theme</span>
          </div>
          <div class="divider"></div>
          <div class="element clickable" @click="tryToLogout">
            <OlaiiConfirmModal name="logout" @confirm="confirmLogout" :title="$gettext('Logout')" :subtitle="$gettext('Are you sure you want to logout?')" />
            <NiceIcon icon="icon-log-out" /><span v-translate>Sign out</span>
          </div>
        </div>
      </template>
    </NicePopup>
  </div>
</template>

<script>
export default {
  name: "OlaiiUser",
}
</script>

<script setup>
import { computed, inject } from "vue";
import OlaiiConfirmModal from "@/modals/OlaiiConfirmModal.vue";
// import avatar from "gradient-avatar";
const nice = inject("nice");

import { useOlaiiAuthStore } from "@/store/auth.store";
import { useOlaiiStore } from "@/store/olaii.store";
const generalStore = useOlaiiStore();
const authStore = useOlaiiAuthStore();

const userProfile = computed(() => authStore.userProfile);

// const color = computed(() => {
//   return avatar("uid");
// });

function changeLanguage() {
  generalStore.setLanguage(generalStore.language.value == "en" ? "sl" : "en");
}

function tryToLogout() {
  nice.modal("logout", true);
}

function confirmLogout() {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
.olaii-user {
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  // padding: 1rem;

  .list-style {
    .element {
      span {
        flex-grow: 1;
      }

      .icon {
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin-right: 0.5rem;
        background: currentColor;
      }
    }
  }

  &.small {
    .olaii-user.clickable {
      justify-content: center;

      .olaii-user-info {
        display: none;
      }

      .olaii-user-avatar {
        margin-right: 0;
      }

      .icon {
        display: none;
      }
    }
  }

  .olaii-user {
    display: flex;
    align-items: center;

    &.clickable {
      padding: 1rem;

      &:hover {
        background: var(--nice-hover-color);
      }
    }

    .olaii-user-avatar {
      flex-shrink: 0;
      margin-right: 0.8rem;
    }

    .olaii-user-info {
      flex-grow: 1;

      .title {
        font-weight: 600;
      }

      .subtitle {
        font-size: 0.7em;
      }
    }

    .icon {
      flex-shrink: 0;
      height: 20px;
      width: 20px;
    }
  }

  .olaii-user-notifications,
  .olaii-user-more {
    flex-shrink: 0;
    height: 20px;
    width: 20px;
    margin-left: 0.5rem;
  }

  .list-style {
    width: 250px;

    .olaii-user {
      padding: 1rem;
      border-bottom: 1px solid var(--nice-border-color);
    }

    .divider {
      border-bottom: 1px solid var(--nice-border-color);
    }

    .element {
      display: flex;
      align-items: center;
      padding: 0.8rem 1rem;
      color: var(--nice-font-color);

      .nice-icon {
        height: 18px;
        width: 18px;
        margin-right: 0.5rem;
      }

      &:hover {
        background: var(--nice-hover-color);
      }

      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
}
</style>
