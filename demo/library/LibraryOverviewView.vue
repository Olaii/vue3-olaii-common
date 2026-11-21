<template>
  <NiceView title="Overview" icon="icon-package">
    <p class="intro">
      Everything vue3-olaii-common offers: {{ total }} exports from <code>vue3-olaii-common</code>,
      plus the separate Sentry and style imports. See README.md for how apps use them.
    </p>

    <NiceInput
      v-model="search"
      class="search"
      icon="icon-search"
      placeholder="Search all sections by name or description"
    />

    <!-- Exports without an entry in demo/overview.js -->
    <NiceAlert
      v-if="undocumented.length"
      type="warning"
      title="Not described yet"
      icon="icon-alert-triangle"
    >
      <code v-for="name in undocumented" :key="name" class="undocumented">{{ name }}</code>
    </NiceAlert>

    <!-- Searching: the matching items, grouped by section -->
    <template v-if="search.trim()">
      <NiceWrapper v-for="group in results" :key="group.slug" :title="group.title" collapsable>
        <LibraryItem v-for="item in group.items" :key="item.name" :item="item" />
      </NiceWrapper>
      <p v-if="!results.length" class="empty">Nothing matches "{{ search }}".</p>
    </template>

    <!-- Not searching: a card per section -->
    <div v-else class="sections">
      <router-link
        v-for="group in groups"
        :key="group.slug"
        :to="{ name: `library-${group.slug}` }"
        class="box section"
      >
        <NiceIcon :icon="group.icon" />
        <div class="section-title">
          {{ group.title }} <span class="count">{{ group.items.length }}</span>
        </div>
        <div class="section-summary">{{ group.summary }}</div>
      </router-link>
      <router-link :to="{ name: 'library-icons' }" class="box section">
        <NiceIcon icon="icon-image" />
        <div class="section-title">Icons</div>
        <div class="section-summary">
          Every icon from vue3-nice-elements, click to copy its name.
        </div>
      </router-link>
    </div>
  </NiceView>
</template>

<script setup>
import { computed, ref } from "vue";
import * as library from "@/index";
import LibraryItem from "./LibraryItem.vue";
import { groups } from "../overview";

const search = ref("");

const total = Object.keys(library).length;
const described = new Set(groups.flatMap((group) => group.items.map((item) => item.name)));
const undocumented = Object.keys(library).filter((name) => !described.has(name));

const results = computed(() => {
  const text = search.value.trim().toLowerCase();
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${item.name} ${item.description}`.toLowerCase().includes(text)
      ),
    }))
    .filter((group) => group.items.length);
});
</script>

<style scoped lang="scss">
.intro {
  margin: 0 0 1rem;
  max-width: 720px;
  line-height: 1.5;
}

.search {
  max-width: 420px;
}

.undocumented {
  margin-right: 0.5rem;
}

.sections {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.5rem;
  color: var(--font-color);
  text-decoration: none;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--primary-color);
    text-decoration: none;
  }

  .nice-icon {
    width: 26px;
    height: 26px;
    margin-bottom: 0.4rem;
    color: var(--primary-color);
  }
}

.section-title {
  font-weight: 600;
  font-size: 1.1em;
}

.section-summary {
  opacity: 0.8;
  line-height: 1.4;
}

.count {
  margin-left: 0.2rem;
  font-weight: normal;
  opacity: 0.5;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}

.empty {
  opacity: 0.6;
}
</style>
