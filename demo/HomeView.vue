<template>
  <section>
    <h2>Options</h2>
    <pre>{{ options }}</pre>
  </section>
</template>

<script setup>
import { useOlaiiOptions } from "@/index";

const options = useOlaiiOptions();
</script>
