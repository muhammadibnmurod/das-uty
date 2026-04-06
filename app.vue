<script setup lang="ts">
import { computed } from "vue";
import { useColorMode, useHead } from "#imports";

const colorMode = useColorMode();

useHead({
  htmlAttrs: {
    class: computed(() => colorMode.value),
  },
  bodyAttrs: {
    class: computed(() => colorMode.value),
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>