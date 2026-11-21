<template>
  <NiceView title="Overview" icon="icon-package">
    <p class="intro">
      Everything vue3-olaii-common offers: {{ total }} exports from <code>vue3-olaii-common</code>,
      plus the separate Sentry and style imports. See README.md for how apps use them.
    </p>

    <input
      v-model="search"
      class="search"
      type="search"
      placeholder="Search by name or description"
    />

    <!-- Exports without an entry in demo/overview.js -->
    <div v-if="undocumented.length" class="box warning">
      <h1>Not described yet</h1>
      <code v-for="name in undocumented" :key="name">{{ name }}</code>
    </div>

    <section v-for="group in filteredGroups" :key="group.title" class="box group">
      <h1>
        {{ group.title }} <span class="count">{{ group.items.length }}</span>
      </h1>

      <div v-for="item in group.items" :key="item.name" class="item">
        <div class="item-main">
          <code class="item-name">{{ item.name }}</code>
          <div class="item-description">{{ item.description }}</div>
          <div class="item-file">
            {{ item.file }}
            <template v-if="item.importFrom"> · import from {{ item.importFrom }}</template>
          </div>
        </div>

        <div class="item-example">
          <router-link v-if="item.link" :to="item.link">Open</router-link>
          <OlaiiLanguageSwitcher v-else-if="item.example == 'language'" />
          <NiceButton
            v-else-if="item.example == 'notifySuccess'"
            plain
            text="Show"
            @click="notifySuccess('Saved.')"
          />
          <NiceButton
            v-else-if="item.example == 'notifyError'"
            plain
            text="Show"
            @click="notifyError('Could not save.')"
          />
          <NiceButton
            v-else-if="item.example == 'notifyToast'"
            plain
            text="Show"
            @click="notifyToast('Link copied', 'success')"
          />
          <NiceButton
            v-else-if="item.example == 'copyToClipboard'"
            plain
            text="Copy"
            @click="copyToClipboard('vue3-olaii-common')"
          />
          <code v-else-if="examples[item.example]">{{ examples[item.example] }}</code>
        </div>
      </div>
    </section>

    <p v-if="!filteredGroups.length" class="empty">Nothing matches "{{ search }}".</p>

    <!-- Icons -->
    <NiceWrapper title="Icons">
      <div class="icons-grid">
        <button
          type="button"
          class="btn btn-default btn-plain icon-grid"
          v-for="icon in icons"
          :key="icon"
          @click="copyToClipboard(icon)"
        >
          <NiceIcon :icon="icon"></NiceIcon>
          <span>{{ icon }}</span>
        </button>
      </div>
    </NiceWrapper>

    <template #footer>
      <NiceButton
        icon="icon-message-square"
        text="Test toast"
        @click="notifyToast('Test', 'primary')"
      />
    </template>
  </NiceView>
</template>

<script setup>
import { computed, ref } from "vue";
import * as library from "@/index";
import {
  copyToClipboard,
  formatCurrency,
  formatDate,
  formatDateWithTime,
  notifyError,
  notifySuccess,
  notifyToast,
  OlaiiLanguageSwitcher,
} from "@/index";
import { groups } from "./overview";

const search = ref("");

const total = Object.keys(library).length;
const described = new Set(groups.flatMap((group) => group.items.map((item) => item.name)));
const undocumented = Object.keys(library).filter((name) => !described.has(name));

// Live output of the helpers, shown next to them
const now = new Date();
const examples = {
  currency: formatCurrency(12345.5),
  date: formatDate(now),
  dateTime: formatDateWithTime(now, true, true),
};

const icons = Array.from(document.getElementsByTagName("symbol")).map((s) => s.id);

const filteredGroups = computed(() => {
  const text = search.value.trim().toLowerCase();
  if (!text) return groups;
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
.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1rem));
  gap: 1rem;

  .icon-grid {
    flex-direction: column;
    gap: 5px;
    height: auto;
  }
}

.intro {
  margin: 0 0 1rem;
  max-width: 720px;
  line-height: 1.5;
}

.search {
  width: 100%;
  max-width: 420px;
  margin-bottom: 1.5rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--input-bg);
  color: var(--font-color);
  font: inherit;
}

.box {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
}

.warning {
  border-color: var(--warning-color);

  code {
    margin-right: 0.5rem;
  }
}

.count {
  margin-left: 0.3rem;
  font-weight: normal;
  opacity: 0.5;
}

.item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid var(--border-color);

  &:first-of-type {
    border-top: 0 none;
  }
}

.item-main {
  flex-grow: 1;
  min-width: 0;
}

.item-name {
  font-weight: 600;
  color: var(--primary-color);
}

.item-description {
  margin: 0.2rem 0;
}

.item-file {
  font-size: 0.8em;
  opacity: 0.6;
  overflow-wrap: anywhere;
}

.item-example {
  flex-shrink: 0;
  max-width: 45%;
  text-align: right;

  a {
    color: var(--primary-color);
  }
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}

.empty {
  opacity: 0.6;
}

// Phones: examples go below the description
@media (max-width: 576px) {
  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-example {
    max-width: 100%;
    text-align: left;
  }
}
</style>
