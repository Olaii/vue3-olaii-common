<template>
  <NiceView :title="title" icon="icon-home">
    <p>{{ context.viewHeader || "No organization selected" }}</p>
    <h3>Language</h3>
    <OlaiiLanguageSwitcher />
    <h3>Context store</h3>
    <pre>{{ { organizationId: context.organizationId, eventId: context.eventId } }}</pre>
    <pre>{{ { permissions: context.permissions, modules: context.modules } }}</pre>
  </NiceView>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { OlaiiLanguageSwitcher, useOlaiiContextStore } from "@/index";

const route = useRoute();
const context = useOlaiiContextStore();
const title = computed(() => route.meta.title?.() || "Demo");
</script>
