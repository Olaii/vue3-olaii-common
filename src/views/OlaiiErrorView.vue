<template>
  <OlaiiStatusPage :title="title" icon="icon-alert-triangle" tone="danger">
    <p class="message">{{ message }}</p>
    <div v-if="code" class="code">{{ $gettext("Error code") }}: {{ code }}</div>

    <template #buttons>
      <NiceButton plain icon="icon-refresh-cw" :text="$gettext('Try again')" @click="reload()" />
      <NiceButton icon="icon-home" :text="$gettext('Back home')" @click="goHome" />
    </template>
  </OlaiiStatusPage>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import OlaiiStatusPage from "../components/OlaiiStatusPage.vue";
import { $gettext } from "../i18n";
import { reload } from "../navigation";

// Title, message and code come from the URL: /error?title=...&message=...&code=...
const route = useRoute();
const router = useRouter();
const title = computed(() => route.query.title || $gettext("Something went wrong"));
const message = computed(
  () => route.query.message || $gettext("An unexpected error occurred. Please try again.")
);
const code = computed(() => route.query.code || null);

function goHome() {
  router.push({ name: "loading" });
}
</script>

<style scoped lang="scss">
.message {
  margin: 0;
  opacity: 0.8;
  // Validation errors come as several lines
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.code {
  margin-top: 1rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--border-radius);
  background: var(--hover-color);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85em;
}
</style>
