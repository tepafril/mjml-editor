<script setup lang="ts">
defineProps<{
  visible: boolean
  y: number
  x?: number
  width?: number
}>()
</script>

<template>
  <div
    v-show="visible"
    class="absolute pointer-events-none z-[100] drop-indicator"
    :class="{ 'drop-indicator-visible': visible }"
    :style="{
      top: y + 'px',
      left: (x || 0) + 'px',
      width: (width || 200) + 'px',
    }"
  >
    <div class="relative h-0.5 bg-indigo-500 rounded drop-indicator-line">
      <div class="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-indigo-500" />
      <div class="absolute -right-1 -top-[3px] w-2 h-2 rounded-full bg-indigo-500" />
    </div>
  </div>
</template>

<style scoped>
.drop-indicator {
  transition: top 0.15s ease-out, left 0.15s ease-out, width 0.15s ease-out, opacity 0.1s ease;
  opacity: 0;
}
.drop-indicator-visible {
  opacity: 1;
}
.drop-indicator-line {
  animation: drop-pulse 1.5s ease-in-out infinite;
}
@keyframes drop-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
