<template>
  <NiceView :title="group.title" :sub-title="group.summary" :icon="group.icon">
    <NiceWrapper :title="`${group.items.length} items`">
      <LibraryItem v-for="item in group.items" :key="item.name" :item="item" />
    </NiceWrapper>
  </NiceView>
</template>

<script setup>
import { computed } from "vue";
import LibraryItem from "./LibraryItem.vue";
import { groups } from "../overview";

const props = defineProps({
  /** slug of a group in demo/overview.js */
  slug: {
    type: String,
    required: true,
  },
});

const group = computed(() => groups.find((g) => g.slug == props.slug));
</script>
