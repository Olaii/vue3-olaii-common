<script setup>
import { useOlaiiAuthStore } from '@/store/auth.store';
const authStore = useOlaiiAuthStore();
</script>

<template>
  <NiceView title="Auth store" icon="icon-user">
    <NiceWrapper>
      <NiceButton :loading="authStore.loadingUserProfile" @click="authStore.getUserProfile()">Get user profile</NiceButton>
      <pre>{{ authStore }}</pre>
    </NiceWrapper>
  </NiceView>
</template>