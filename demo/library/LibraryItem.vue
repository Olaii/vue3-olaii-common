<template>
  <div class="library-item">
    <div class="main">
      <code class="name">{{ item.name }}</code>
      <div class="description">{{ item.description }}</div>
      <div class="file">
        {{ item.file }}
        <template v-if="item.importFrom"> · import from {{ item.importFrom }}</template>
      </div>
    </div>

    <!-- Live example: a link to the view, a button that runs the helper, or the helper's output -->
    <div class="example">
      <router-link v-if="item.link" :to="item.link">Open</router-link>
      <OlaiiLanguageSwitcher v-else-if="item.example == 'language'" />
      <NiceButton v-else-if="actions[item.example]" plain v-bind="actions[item.example]" />
      <code v-else-if="outputs[item.example]">{{ outputs[item.example] }}</code>
    </div>
  </div>
</template>

<script setup>
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

defineProps({
  /** An entry of demo/overview.js */
  item: {
    type: Object,
    required: true,
  },
});

// Helpers shown as a button that runs them
const actions = {
  notifySuccess: { text: "Show", onClick: () => notifySuccess("Saved.") },
  notifyError: { text: "Show", onClick: () => notifyError("Could not save.") },
  notifyToast: { text: "Show", onClick: () => notifyToast("Link copied", "success") },
  copyToClipboard: { text: "Copy", onClick: () => copyToClipboard("vue3-olaii-common") },
};

// Helpers shown with their output
const now = new Date();
const outputs = {
  currency: formatCurrency(12345.5),
  date: formatDate(now),
  dateTime: formatDateWithTime(now, true, true),
};
</script>

<style scoped lang="scss">
.library-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid var(--border-color);

  &:first-child {
    border-top: 0 none;
  }
}

.main {
  flex-grow: 1;
  min-width: 0;
}

.name {
  font-weight: 600;
  color: var(--primary-color);
}

.description {
  margin: 0.2rem 0;
}

.file {
  font-size: 0.8em;
  opacity: 0.6;
  overflow-wrap: anywhere;
}

.example {
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

// Phones: the example goes below the description
@media (max-width: 576px) {
  .library-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .example {
    max-width: 100%;
    text-align: left;
  }
}
</style>
