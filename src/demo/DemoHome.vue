<script setup>
import { onMounted, ref, inject } from 'vue'
import { useOlaiiStore } from '@/store/olaii.store';
import { useOlaiiAuthStore } from '@/store/auth.store';

const generalStore = useOlaiiStore()
const authStore = useOlaiiAuthStore();
</script>

<template>
  <NiceView title="Home" icon="icon-home">
    <!-- Olaii user -->
    <NiceWrapper title="Olaii user" id="olaii-user" collapsable>
      <OlaiiUser />
    </NiceWrapper>

    <!-- Olaii user -->
    <NiceWrapper title="Olaii sidebar" id="olaii-sidebar" collapsable>
      <OlaiiSidebar />
    </NiceWrapper>

    <!-- Olaii general store -->
    <NiceWrapper title="Olaii general store" id="olaii-general-store" collapsable>
      <pre>{{ generalStore }}</pre>
    </NiceWrapper>

    <!-- Olaii auth store -->
    <NiceWrapper title="Olaii auth store" id="olaii-auth-store" collapsable>
      <pre>{{ authStore }}</pre>
    </NiceWrapper>
  </NiceView>
</template>