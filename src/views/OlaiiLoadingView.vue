<template>
  <div class="olaii-loading-view">
    <NiceIcon class="logo" icon="logo" />
    <div class="message">{{ $gettext("Loading...") }}</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOlaiiAuthStore } from "../stores/auth.store";
import { useOlaiiContextStore } from "../stores/context.store";
import TokenService from "../services/token.service";
import ErrorService from "../services/error.service";
import { useOlaiiOptions } from "../options";

const props = defineProps({
  /** Route to open when the app has no context option (no organizations) */
  homeRoute: {
    type: String,
    default: "app",
  },
});

const options = useOlaiiOptions();
const route = useRoute();
const router = useRouter();
const authStore = useOlaiiAuthStore();

// Entry page of the app: loads the user, then picks the organization (and event) and opens it
onMounted(async () => {
  if (!TokenService.hasToken()) return authStore.logout();

  try {
    if (!authStore.userProfile) await authStore.getUserProfile();
    if (!options.context) return router.replace({ name: props.homeRoute });

    const context = useOlaiiContextStore();
    const selected = await context.restore(route.params);
    const { organizationRoute, eventRoute } = options.context;
    const params = { organizationId: context.organizationId, eventId: context.eventId };

    if (selected == "none") return router.replace({ name: "no-organizations" });
    if (selected == "event" && eventRoute) return router.replace({ name: eventRoute, params });
    return router.replace({ name: organizationRoute, params });
  } catch (error) {
    const { code, message } = ErrorService.showError(error);
    return router.replace({ name: "error", query: { code, message } });
  }
});
</script>

<style scoped lang="scss">
.olaii-loading-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.logo {
  width: 115px;
  height: 78px;
  color: var(--primary-color);
  animation: olaii-pulse-color 2s infinite ease-in-out;
}

.message {
  animation: olaii-pulse-text 2s infinite ease-in-out;
}

@keyframes olaii-pulse-color {
  50% {
    color: var(--border-color);
  }
}

@keyframes olaii-pulse-text {
  50% {
    color: var(--border-color);
  }
}
</style>
