<script setup lang="ts">
defineProps<{
  disabled?: boolean
  title?: string
  active?: boolean
}>()
</script>

<template>
  <button
    class="inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors
           hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
    :class="{ 'bg-indigo-50 text-indigo-600': active, 'text-gray-600': !active }"
    :disabled="disabled"
    :title="title"
  >
    <slot />
  </button>
</template>
