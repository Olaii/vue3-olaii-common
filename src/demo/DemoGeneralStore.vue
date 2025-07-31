<script setup>
import { useOlaiiStore } from '../store/olaii.store';
const generalStore = useOlaiiStore();
</script>

<template>
  <NiceView title="General store" icon="icon-box">
    <NiceWrapper>
      <pre>{{ generalStore }}</pre>
    </NiceWrapper>
  </NiceView>
</template>