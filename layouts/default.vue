<template>
  <div class="flex">
    <div class="shrink-0 basis-auto">
      <AppSidebar :collapsed="isSidebarCollapsed" />
    </div>

    <div class="grow basis-auto overflow-hidden bg-gray-0 dark:bg-gray-90">
      <AppNavbar @toggle-sidebar="toggleSidebar" :collapsed="isSidebarCollapsed" />
      <div class="p-6 bg-gray-0 dark:bg-gray-90 relative">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isSidebarCollapsed = ref(false)

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>
