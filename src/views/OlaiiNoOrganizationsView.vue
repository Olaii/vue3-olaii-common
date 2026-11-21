<template>
  <OlaiiStatusPage :title="$gettext('No organizations')" icon="icon-business-unit">
    <p class="message">
      {{ $gettext("Your account is not linked to any organization yet.") }}
      {{ $gettext("Ask the administrator of your organization to add you.") }}
    </p>

    <!-- So the user knows which account needs access -->
    <div v-if="email" class="account">
      <NiceIcon icon="icon-user" />
      <span>{{ $gettext("Signed in as") }} {{ email }}</span>
    </div>

    <template #buttons>
      <NiceButton
        plain
        icon="icon-log-out"
        :text="$gettext('Sign out')"
        @click="authStore.logout()"
      />
      <NiceButton icon="icon-refresh-cw" :text="$gettext('Try again')" @click="tryAgain" />
    </template>
  </OlaiiStatusPage>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import OlaiiStatusPage from "../components/OlaiiStatusPage.vue";
import { useOlaiiAuthStore } from "../stores/auth.store";

const router = useRouter();
const authStore = useOlaiiAuthStore();
const email = computed(() => authStore.userProfile?.email);

onBeforeMount(async () => {
  if (!authStore.userProfile) await authStore.getUserProfile();
});

// The loading page checks the organizations again, e.g. after the user was added to one
function tryAgain() {
  router.push({ name: "loading" });
}
</script>

<style scoped lang="scss">
.message {
  margin: 0;
  opacity: 0.8;
}

.account {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: var(--hover-color);
  font-size: 0.9em;
  overflow-wrap: anywhere;

  .nice-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
}
</style>
