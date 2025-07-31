<template>
  <NiceModal
    :name="props.name"
    :title="$gettext('Warning')"
    :subtitle="$gettext('Are you sure you complete this action?')"
    @close="cancel"
  >
    <div class="text-right">
      <!-- Cancel -->
      <NiceButton :text="$gettext('Cancel')" @click="cancel" type="default" plain icon="icon-x" />

      <!-- Confirm -->
      <NiceButton :text="$gettext('Confirm')" @click="confirm" icon="icon-check" />
    </div>
  </NiceModal>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "vue";
const nice = inject("nice");
const emit = defineEmits(["cancel", "confirm"]);
const props = defineProps({
  name: {
    type: String,
    default: () => "confirm-prompt",
  },
});

function cancel() {
  nice.modal(props.name, false);
  emit("cancel");
}

function confirm() {
  emit("confirm");
}
</script>
