<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import type { EditorNode } from '@/types/node.types'

const props = defineProps<{
  node: EditorNode
}>()

const editorStore = useEditorStore()

function parsePadding(padding: string) {
  const parts = (padding || '0').split(/\s+/)
  if (parts.length === 1) return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] }
  if (parts.length === 2) return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] }
  if (parts.length === 3) return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] }
  return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] }
}

const padding = computed(() => parsePadding(props.node.props.padding || ''))

function updatePadding(side: string, value: string) {
  const p = parsePadding(props.node.props.padding || '')
  ;(p as Record<string, string>)[side] = value
  const newPadding = `${p.top} ${p.right} ${p.bottom} ${p.left}`
  editorStore.updateNodeProps(props.node.id, { padding: newPadding })
}
</script>

<template>
  <div class="spacing-box relative border border-gray-200 rounded-md p-1 bg-gray-50/50">
    <div class="text-[9px] uppercase text-gray-400 text-center mb-0.5">padding</div>
    <div class="grid grid-cols-3 gap-0.5 items-center">
      <!-- Top -->
      <div class="col-start-2 text-center">
        <input
          type="text"
          :value="padding.top"
          @change="updatePadding('top', ($event.target as HTMLInputElement).value)"
          class="w-12 text-center text-[10px] py-0.5 border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        />
      </div>
      <!-- Left -->
      <div class="text-right">
        <input
          type="text"
          :value="padding.left"
          @change="updatePadding('left', ($event.target as HTMLInputElement).value)"
          class="w-12 text-center text-[10px] py-0.5 border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        />
      </div>
      <!-- Center -->
      <div class="text-center text-[10px] text-gray-300">—</div>
      <!-- Right -->
      <div>
        <input
          type="text"
          :value="padding.right"
          @change="updatePadding('right', ($event.target as HTMLInputElement).value)"
          class="w-12 text-center text-[10px] py-0.5 border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        />
      </div>
      <!-- Bottom -->
      <div class="col-start-2 text-center">
        <input
          type="text"
          :value="padding.bottom"
          @change="updatePadding('bottom', ($event.target as HTMLInputElement).value)"
          class="w-12 text-center text-[10px] py-0.5 border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        />
      </div>
    </div>
  </div>
</template>
