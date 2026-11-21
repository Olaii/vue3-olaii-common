<template>
  <!-- Flag icons, used as <NiceIcon icon="flag-<language>" /> -->
  <svg style="display: none">
    <symbol id="flag-en" viewBox="0 0 640 480">
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
      />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
    </symbol>

    <symbol id="flag-sl" viewBox="0 0 640 480">
      <defs>
        <clipPath id="si-a">
          <path fill-opacity=".7" d="M-15 0h682.6v512H-15.1z" />
        </clipPath>
      </defs>
      <g
        fill-rule="evenodd"
        stroke-width="1pt"
        clip-path="url(#si-a)"
        transform="translate(14.1)scale(.9375)"
      >
        <path fill="#fff" d="M-62 0H962v512H-62z" />
        <path fill="#d50000" d="M-62 341.3H962V512H-62z" />
        <path fill="#0000bf" d="M-62 170.7H962v170.6H-62z" />
        <path
          fill="#d50000"
          d="M228.4 93c-4 61.6-6.4 95.4-15.7 111-10.2 16.8-20 29.1-59.7 44-39.6-14.9-49.4-27.2-59.6-44-9.4-15.6-11.7-49.4-15.7-111l5.8-2c11.8-3.6 20.6-6.5 27.1-7.8 9.3-2 17.3-4.2 42.3-4.7 25 .4 33 2.8 42.3 4.8q9.7 2.1 27.3 7.7z"
        />
        <path
          fill="#0000bf"
          d="M222.6 91c-3.8 61.5-7 89.7-12 103.2-9.6 23.2-24.8 35.9-57.6 48-32.8-12.1-48-24.8-57.7-48-5-13.6-8-41.7-11.8-103.3q17.4-5.6 27.1-7.7c9.3-2 17.3-4.3 42.3-4.7 25 .4 33 2.7 42.3 4.7a284 284 0 0 1 27.4 7.7z"
        />
        <path
          fill="#ffdf00"
          d="m153 109.8 1.5 3.7 7 1-4.5 2.7 4.3 2.9-6.3 1-2 3.4-2-3.5-6-.8 4-3-4.2-2.7 6.7-1z"
        />
        <path
          fill="#fff"
          d="m208.3 179.6-3.9-3-2.7-4.6-5.4-4.7-2.9-4.7-5.4-4.9-2.6-4.7-3-2.3-1.8-1.9-5 4.3-2.6 4.7-3.3 3-3.7-2.9-2.7-4.8-10.3-18.3-10.3 18.3-2.7 4.8-3.7 2.9-3.3-3-2.7-4.7-4.9-4.3-1.9 1.8-2.9 2.4-2.6 4.7-5.4 4.9-2.9 4.7-5.4 4.7-2.7 4.6-3.9 3a66 66 0 0 0 18.6 36.3 107 107 0 0 0 36.6 20.5 104 104 0 0 0 36.8-20.5c5.8-6 16.6-19.3 18.6-36.3"
        />
        <path
          fill="#ffdf00"
          d="m169.4 83.9 1.6 3.7 7 1-4.6 2.7 4.4 2.9-6.3 1-2 3.4-2-3.5-6-.8 4-3-4.2-2.7 6.6-1zm-33 0 1.6 3.7 7 .9-4.5 2.7 4.3 2.9-6.3 1-2 3.4-2-3.4-6-.9 4-3-4.2-2.7 6.7-1z"
        />
        <path
          fill="#0000bf"
          d="M199.7 203h-7.4l-7-.5-8.3-4h-9.4l-8.1 4-6.5.6-6.4-.6-8.1-4H129l-8.4 4-6.9.6-7.6-.1-3.6-6.2.1-.2 11.2 1.9 6.9-.5 8.3-4.1h9.4l8.2 4 6.4.6 6.5-.6 8.1-4h9.4l8.4 4 6.9.6 10.8-2 .2.4zm-86.4 9.5 7.4-.5 8.3-4h9.4l8.2 4 6.4.5 6.4-.5 8.2-4h9.4l8.3 4 7.5.5 4.8-6h-.1l-5.2 1.4-6.9-.5-8.3-4h-9.4l-8.2 4-6.4.6-6.5-.6-8.1-4H129l-8.4 4-6.9.6-5-1.3v.2l4.5 5.6z"
        />
      </g>
    </symbol>
  </svg>
  <NiceDropdown
    class="olaii-language-switcher"
    :model-value="selected"
    :values="options"
    no-search
    @update:model-value="select"
  >
    <template #selected-option="{ item }">
      <div class="language">
        <NiceIcon :icon="item.icon" />
        <div>{{ item.value }}</div>
      </div>
    </template>
    <template #option="{ item }">
      <div class="language">
        <NiceIcon :icon="item.icon" />
        <div>{{ item.value }}</div>
      </div>
    </template>
  </NiceDropdown>
</template>

<script setup>
import { computed } from "vue";
import { useOlaiiUiStore } from "../stores/ui.store";

const uiStore = useOlaiiUiStore();

// The app's languages from gettext, e.g. [{ id: "sl", value: "Slovenščina", icon: "flag-sl" }]
const options = computed(() =>
  Object.entries(uiStore.languages).map(([id, value]) => ({ id, value, icon: `flag-${id}` }))
);
const selected = computed(() => options.value.find((option) => option.id == uiStore.language));

function select(option) {
  if (option) uiStore.setLanguage(option.id);
}
</script>

<style scoped lang="scss">
.language {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .nice-icon {
    height: 20px;
    width: 20px;
  }
}
</style>
