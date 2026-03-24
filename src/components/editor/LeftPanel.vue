<script setup lang="ts">
import ComponentLibrary from '@/components/panels/ComponentLibrary.vue'
</script>

<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <div class="flex border-b border-gray-200 shrink-0">
      <div class="flex-1 py-2 text-xs font-medium text-center text-indigo-600 border-b-2 border-indigo-600 capitalize">
        Components
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <ComponentLibrary />
    </div>
  </div>
</template>
