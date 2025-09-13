<template>
  <div>
    navbar
    {{ $t("test") }}
    <icon-check />

    <el-button @click="$emit('toggle-sidebar')">Toggle Sidebar</el-button>
  </div>
</template>

<script setup lang="ts">

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

</script>