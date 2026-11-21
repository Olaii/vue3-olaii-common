<template>
  <div class="olaii-app-layout">
    <OlaiiSidebar :links="links">
      <template v-if="$slots.switcher" #switcher><slot name="switcher" /></template>
      <template v-if="$slots.footer" #footer><slot name="footer" /></template>
    </OlaiiSidebar>
    <main class="main">
      <slot>
        <router-view />
      </slot>
    </main>
  </div>
</template>

<script setup>
import OlaiiSidebar from "./OlaiiSidebar.vue";

defineProps({
  /** Sidebar navigation, see OlaiiSidebar */
  links: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.olaii-app-layout {
  display: flex;
  height: 100%;
  background: var(--background-color);

  .main {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
