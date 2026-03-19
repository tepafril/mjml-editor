<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next'

defineProps<{
  rect: { top: number; left: number; width: number; height: number } | null
  type: 'selected' | 'hovered'
  draggable?: boolean
}>()

const emit = defineEmits<{
  dragStart: [e: PointerEvent]
}>()

function onGripPointerDown(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  emit('dragStart', e)
}
</script>

<template>
  <div
    v-if="rect"
    class="absolute pointer-events-none z-50 transition-all duration-150 ease-out"
    :class="{
      'border-2 border-indigo-600': type === 'selected',
      'border border-dashed border-indigo-400': type === 'hovered',
    }"
    :style="{
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
    }"
  >
    <div
      v-if="type === 'selected'"
      class="absolute -top-5 left-0 flex items-center gap-0"
    >
      <!-- Drag handle -->
      <button
        v-if="draggable"
        class="pointer-events-auto bg-indigo-600 text-white px-0.5 py-0.5 rounded-tl
               cursor-grab active:cursor-grabbing hover:bg-indigo-700 transition-colors"
        @pointerdown="onGripPointerDown"
      >
        <GripVertical class="w-3 h-3" />
      </button>
      <!-- Label -->
      <div class="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-tr whitespace-nowrap"
           :class="{ 'rounded-tl': !draggable }"
      >
        <slot name="label" />
      </div>
    </div>
  </div>
</template>
