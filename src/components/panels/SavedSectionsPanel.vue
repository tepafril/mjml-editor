<script setup lang="ts">
import { Trash2, LayoutTemplate } from 'lucide-vue-next'
import { useSavedSections } from '@/composables/useSavedSections'
import { useEditorStore } from '@/stores/editor.store'
import { useDragDrop } from '@/composables/useDragDrop'

const { savedSections, deleteSection, cloneNode } = useSavedSections()
const editorStore = useEditorStore()
const { onDragStart, onDragEnd } = useDragDrop()

function loadSection(id: string) {
  const section = savedSections.value.find(s => s.id === id)
  if (!section) return
  const node = cloneNode(section)
  editorStore.insertNode(node, editorStore.tree.id, editorStore.tree.children.length)
  editorStore.selectNode(node.id)
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Empty state -->
    <div
      v-if="savedSections.length === 0"
      class="flex flex-col items-center justify-center h-full py-16 px-5 text-center"
    >
      <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
        <LayoutTemplate class="w-5 h-5 text-indigo-400" />
      </div>
      <p class="text-xs font-semibold text-gray-700">No saved sections yet</p>
      <p class="text-[11px] text-gray-400 mt-1 leading-relaxed">
        Select a node on the canvas and click<br>the bookmark icon to save it.
      </p>
    </div>

    <!-- Cards -->
    <div v-else class="p-3 space-y-3">
      <div
        v-for="section in savedSections"
        :key="section.id"
        draggable="true"
        @dragstart="onDragStart($event, { savedSectionId: section.id })"
        @dragend="onDragEnd"
        class="group border border-gray-200 rounded-xl overflow-hidden bg-white
               hover:border-indigo-300 hover:shadow-md transition-all cursor-grab"
      >
        <!-- Thumbnail -->
        <div class="relative bg-gray-50 overflow-hidden" style="height: 140px;">
          <!-- Rendered preview -->
          <template v-if="section.previewHtml">
            <iframe
              :srcdoc="section.previewHtml"
              sandbox="allow-same-origin allow-scripts"
              scrolling="no"
              class="absolute top-0 border-0 bg-white pointer-events-none"
              style="width: 600px; height: 900px; transform: scale(0.37); transform-origin: top center; left: 50%; margin-left: -300px;"
            />
          </template>
          <!-- No preview fallback -->
          <div v-else class="flex items-center justify-center h-full">
            <LayoutTemplate class="w-10 h-10 text-gray-200" />
          </div>

          <!-- Hover overlay -->
          <div
            class="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10
                   transition-colors flex items-center justify-center gap-2"
          >
            <button
              @click.stop="loadSection(section.id)"
              class="opacity-0 group-hover:opacity-100 transition-opacity
                     px-3 py-1.5 text-[11px] font-semibold text-white bg-indigo-600
                     rounded-lg shadow-lg hover:bg-indigo-700"
            >
              Insert
            </button>
            <button
              @click.stop="deleteSection(section.id)"
              class="opacity-0 group-hover:opacity-100 transition-opacity
                     p-1.5 text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
              title="Delete"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-3 py-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-xs font-semibold text-gray-800 truncate">{{ section.name }}</p>
            <p class="text-[10px] text-gray-400 mt-0.5">
              {{ section.nodeType.replace('mj-', '') }} · {{ formatDate(section.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
