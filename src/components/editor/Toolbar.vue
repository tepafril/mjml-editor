<script setup lang="ts">
import { useEditorStore } from '@/stores/editor.store'
import { usePreviewStore } from '@/stores/preview.store'
import { useImportExport } from '@/composables/useImportExport'
import IconButton from '@/components/ui/IconButton.vue'
import {
  Undo2, Redo2, Monitor, Smartphone, Code,
  Download, Upload, FileDown
} from 'lucide-vue-next'

const editorStore = useEditorStore()
const previewStore = usePreviewStore()
const { exportMjml, exportHtml, importJson } = useImportExport()

const previewModes = [
  { value: 'desktop' as const, icon: Monitor, title: 'Desktop' },
  { value: 'mobile' as const, icon: Smartphone, title: 'Mobile' },
  { value: 'mjml-source' as const, icon: Code, title: 'Source' },
]
</script>

<template>
  <div class="flex items-center gap-1 px-4 h-12 border-b border-gray-200 bg-white shrink-0">
    <!-- Logo -->
    <span class="font-bold text-indigo-600 mr-3 text-sm tracking-tight">SyncMusic</span>

    <!-- History -->
    <IconButton
      @click="editorStore.undo()"
      :disabled="!editorStore.canUndo"
      title="Undo (Cmd+Z)"
    >
      <Undo2 class="w-4 h-4" />
    </IconButton>
    <IconButton
      @click="editorStore.redo()"
      :disabled="!editorStore.canRedo"
      title="Redo (Cmd+Shift+Z)"
    >
      <Redo2 class="w-4 h-4" />
    </IconButton>

    <!-- Separator -->
    <div class="w-px h-5 bg-gray-200 mx-2" />

    <!-- Preview modes -->
    <div class="flex border border-gray-200 rounded-md overflow-hidden">
      <button
        v-for="mode in previewModes"
        :key="mode.value"
        class="flex items-center justify-center w-8 h-7 transition-colors"
        :class="previewStore.mode === mode.value
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-500 hover:bg-gray-50'"
        :title="mode.title"
        @click="previewStore.mode = mode.value"
      >
        <component :is="mode.icon" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Import / Export -->
    <button
      @click="importJson"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
    >
      <Upload class="w-3.5 h-3.5" />
      Import
    </button>
    <button
      @click="exportMjml"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
    >
      <Download class="w-3.5 h-3.5" />
      MJML
    </button>
    <button
      @click="exportHtml"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
    >
      <FileDown class="w-3.5 h-3.5" />
      Export HTML
    </button>
  </div>
</template>
