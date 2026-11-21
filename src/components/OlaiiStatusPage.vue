<template>
  <div class="olaii-status-page">
    <NiceIcon class="logo" icon="logo" />

    <!-- The card is the global .box class (styles/common.scss) -->
    <div class="box">
      <div class="badge" :class="tone">
        <NiceIcon :icon="icon" />
      </div>

      <h1 class="title">{{ title }}</h1>
      <div class="body">
        <slot />
      </div>

      <!-- Not .actions: the global .box .actions aligns its buttons to the right -->
      <div v-if="$slots.buttons" class="buttons">
        <slot name="buttons" />
      </div>
    </div>

    <p class="help">
      {{ $gettext("Need help?") }}
      <a href="mailto:info@olaii.com">info@olaii.com</a>
    </p>
  </div>
</template>

<script setup>
/**
 * Full-page message used by the error and no-organizations views: the Olaii logo above a card with a round icon,
 * a title, the content (default slot) and buttons (buttons slot), and a help line below.
 */
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  /** Color of the round icon: "danger" or "primary" */
  tone: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped lang="scss">
.olaii-status-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 100dvh;
  padding: 2rem 1rem;
  background: var(--background-color);
  color: var(--font-color);
}

.logo {
  width: 115px;
  height: 78px;
  color: var(--primary-color);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 1.25rem;
  border-radius: 50%;
  background: var(--primary-color-bg);
  color: var(--primary-color);

  &.danger {
    background: var(--danger-color-lighter);
    color: var(--danger-color);
  }

  .nice-icon {
    width: 30px;
    height: 30px;
  }
}

.title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 340px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.help {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.7;

  a {
    color: var(--primary-color);
  }
}
</style>
