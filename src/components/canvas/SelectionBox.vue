<script setup lang="ts">
import { GripVertical, ChevronUp, ChevronDown, Copy, Trash2, Bookmark } from 'lucide-vue-next'

defineProps<{
  rect: { top: number; left: number; width: number; height: number } | null
  type: 'selected' | 'hovered' | 'drop-target'
  draggable?: boolean
  canMoveUp?: boolean
  canMoveDown?: boolean
}>()

const emit = defineEmits<{
  dragStart: [e: PointerEvent]
  moveUp: []
  moveDown: []
  duplicate: []
  delete: []
  saveSection: []
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
    class="absolute pointer-events-none z-50 "
    :class="{
      'border-2 border-indigo-600': type === 'selected',
      'border border-dashed border-indigo-400': type === 'hovered',
      'border-2 border-dashed border-emerald-500 bg-emerald-50/20': type === 'drop-target',
    }"
    :style="{
      top: rect.top + 'px',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
    }"
  >
    <!-- Label -->
    <div
      v-if="type === 'selected'"
      class="absolute top-0 left-0 flex items-center gap-0"
    >
      <!-- Drag handle -->
      <button
        v-if="draggable"
        class="pointer-events-auto  text-white
               cursor-grab active:cursor-grabbing hover:bg-indigo-700 transition-colors
              w-5 h-5 bg-indigo-600
              flex items-center justify-center
               "
        @pointerdown="onGripPointerDown"
      >
        <GripVertical class="w-3 h-3" />
      </button>
      <div class="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 whitespace-nowrap h-5 bg-indigo-600"
           :class="{ '': !draggable }"
      >
        <slot name="label" />
      </div>
    </div>
    <!-- Vertical action toolbar -->
    <div
      v-if="type === 'selected' && draggable"
      class="absolute top-0 right-0 flex flex-col items-center gap-0"
    >
      <button
        class="pointer-events-auto bg-indigo-600 text-white p-1 transition-colors"
        :class="canMoveUp ? 'hover:bg-indigo-700' : 'opacity-40 cursor-not-allowed'"
        :disabled="!canMoveUp"
        @click.stop="canMoveUp && emit('moveUp')"
        title="Move up"
      >
        <ChevronUp class="w-3.5 h-3.5" />
      </button>
      <button
        class="pointer-events-auto bg-indigo-600 text-white p-1 transition-colors"
        :class="canMoveDown ? 'hover:bg-indigo-700' : 'opacity-40 cursor-not-allowed'"
        :disabled="!canMoveDown"
        @click.stop="canMoveDown && emit('moveDown')"
        title="Move down"
      >
        <ChevronDown class="w-3.5 h-3.5" />
      </button>
      <button
        class="pointer-events-auto bg-indigo-600 text-white p-1 hover:bg-indigo-700 transition-colors"
        @click.stop="emit('duplicate')"
        title="Duplicate"
      >
        <Copy class="w-3.5 h-3.5" />
      </button>
      <button
        class="pointer-events-auto bg-indigo-600 text-white p-1 hover:bg-indigo-700 transition-colors"
        @click.stop="emit('saveSection')"
        title="Save as section"
      >
        <Bookmark class="w-3.5 h-3.5" />
      </button>
      <button
        class="pointer-events-auto bg-indigo-600 text-white p-1 hover:bg-red-600 transition-colors"
        @click.stop="emit('delete')"
        title="Delete"
      >
        <Trash2 class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
