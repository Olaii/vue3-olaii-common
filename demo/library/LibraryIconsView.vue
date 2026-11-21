<template>
  <NiceView
    :title="`Icons (${icons.length})`"
    sub-title="The icons from vue3-nice-elements' NiceSvgs. Click one to copy its name."
    icon="icon-image"
  >
    <NiceInput v-model="search" class="search" icon="icon-search" placeholder="Search icons" />

    <div class="icons-grid">
      <NiceButton
        v-for="icon in filteredIcons"
        :key="icon"
        type="default"
        plain
        class="icon"
        :icon="icon"
        :text="icon"
        @click="copyToClipboard(icon)"
      />
    </div>
  </NiceView>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { copyToClipboard } from "@/index";

const search = ref("");
const icons = ref([]);

// The <symbol>s NiceSvgs renders in App.vue, read after mounting so they are in the page
onMounted(() => {
  icons.value = Array.from(document.getElementsByTagName("symbol")).map((symbol) => symbol.id);
});

const filteredIcons = computed(() => {
  const text = search.value.trim().toLowerCase();
  return text ? icons.value.filter((icon) => icon.includes(text)) : icons.value;
});
</script>

<style scoped lang="scss">
.search {
  max-width: 420px;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;

  .icon {
    flex-direction: column;
    gap: 5px;
    height: auto;
  }
}
</style>
