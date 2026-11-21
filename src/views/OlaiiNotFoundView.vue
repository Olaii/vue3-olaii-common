<template>
  <OlaiiStatusPage :title="$gettext('Page not found')" icon="icon-compass">
    <p class="message">
      {{ $gettext("We couldn't find the page you are looking for.") }}
      {{ $gettext("It may have been moved, or you may not have access to it.") }}
    </p>
    <div class="code">404</div>

    <template #buttons>
      <NiceButton plain icon="icon-arrow-left" :text="$gettext('Go back')" @click="goBack" />
      <NiceButton icon="icon-home" :text="$gettext('Back home')" @click="goHome" />
    </template>
  </OlaiiStatusPage>
</template>

<script setup>
import { useRouter } from "vue-router";
import OlaiiStatusPage from "../components/OlaiiStatusPage.vue";

const router = useRouter();

function goHome() {
  router.push({ name: "loading" });
}

// The previous page, or home when the 404 was opened directly
function goBack() {
  if (window.history.state?.back) router.back();
  else goHome();
}
</script>

<style scoped lang="scss">
.message {
  margin: 0;
  opacity: 0.8;
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
