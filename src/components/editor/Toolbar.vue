<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditor } from '@/composables/useEditor'
import type { HeadSettings } from '@/types/mjml.types'
import type { PreviewMode } from '@/stores/preview.store'
import IconButton from '@/components/ui/IconButton.vue'
import EmailSettingsPanel from '@/components/panels/EmailSettingsPanel.vue'
import TemplatesPanel from '@/components/panels/TemplatesPanel.vue'
import Dialog from 'primevue/dialog'
import {
  Undo2, Redo2, Monitor, Smartphone, Code, FileCode, Settings, Grid3x3, LayoutTemplate
} from 'lucide-vue-next'

const editor = useEditor()

const settingsOpen = ref(false)
const templatesOpen = ref(false)

let headSnapshot: HeadSettings | null = null
let bodyPropsSnapshot: Record<string, string> | null = null
const settingsInitialTab = ref<string | undefined>()

function openSettings(tab?: string) {
  headSnapshot = JSON.parse(JSON.stringify(editor.head.settings))
  bodyPropsSnapshot = JSON.parse(JSON.stringify(editor.tree.props))
  settingsInitialTab.value = tab
  settingsOpen.value = true
}

watch(() => editor.openSettingsTab, (tab) => {
  if (tab) {
    openSettings(tab)
    editor.clearOpenSettingsTab()
  }
})

function saveSettings() {
  headSnapshot = null
  bodyPropsSnapshot = null
  settingsOpen.value = false
}

function cancelSettings() {
  if (headSnapshot) editor.head.loadSettings(headSnapshot)
  if (bodyPropsSnapshot) editor.revertBodyProps(bodyPropsSnapshot)
  headSnapshot = null
  bodyPropsSnapshot = null
  settingsOpen.value = false
}

const previewModes: { value: PreviewMode; icon: unknown; title: string }[] = [
  { value: 'desktop' as PreviewMode, icon: Monitor, title: 'Desktop' },
  { value: 'mobile' as PreviewMode, icon: Smartphone, title: 'Mobile' },
  { value: 'mjml-source' as PreviewMode, icon: Code, title: 'MJML' },
  { value: 'html-source' as PreviewMode, icon: FileCode, title: 'HTML' },
]
</script>

<template>
  <div class="flex items-center gap-1 px-4 h-12 border-b border-gray-200 bg-white shrink-0">
    <!-- Logo -->
    <span class="font-bold text-indigo-600 mr-3 text-sm tracking-tight">SyncMusic</span>

    <!-- History -->
    <IconButton @click="editor.undo()" :disabled="!editor.canUndo" title="Undo (Cmd+Z)">
      <Undo2 class="w-4 h-4" />
    </IconButton>
    <IconButton @click="editor.redo()" :disabled="!editor.canRedo" title="Redo (Cmd+Shift+Z)">
      <Redo2 class="w-4 h-4" />
    </IconButton>

    <div class="flex-1" />

    <!-- Preview modes -->
    <div class="flex border border-gray-200 rounded-md overflow-hidden">
      <button
        v-for="mode in previewModes"
        :key="mode.value"
        class="flex items-center justify-center w-8 h-7 transition-colors"
        :class="editor.preview.mode === mode.value
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-500 hover:bg-gray-50'"
        :title="mode.title"
        @click="editor.preview.mode = mode.value"
      >
        <component :is="mode.icon" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Grid toggle -->
    <IconButton
      @click="editor.preview.showGridLines = !editor.preview.showGridLines"
      :title="editor.preview.showGridLines ? 'Hide grid lines' : 'Show grid lines'"
    >
      <Grid3x3 class="w-4 h-4" :class="editor.preview.showGridLines ? 'text-indigo-600' : ''" />
    </IconButton>

    <div class="flex-1" />

    <!-- Templates button -->
    <button
      title="Browse Templates"
      @click="templatesOpen = true"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
    >
      <LayoutTemplate class="w-4 h-4" />
      Templates
    </button>

    <!-- Settings -->
    <button
      title="Email Settings"
      @click="() => openSettings()"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
    >
      <Settings class="w-4 h-4" />
      Email Settings
    </button>

    <!-- Templates Dialog -->
    <Dialog
      v-model:visible="templatesOpen"
      modal
      :closable="true"
      :style="{ width: '960px', maxWidth: '95vw' }"
      :pt="{
        content: { style: 'padding: 0; height: 600px; display: flex; flex-direction: column;' },
        header: { style: 'padding: 1rem 1.25rem; border-bottom: 1px solid #e5e7eb' },
      }"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <LayoutTemplate class="w-4 h-4 text-indigo-600" />
          <span class="text-sm font-semibold text-gray-900">Templates</span>
        </div>
      </template>
      <TemplatesPanel @close="templatesOpen = false" />
    </Dialog>

    <!-- Settings Dialog -->
    <Dialog
      v-model:visible="settingsOpen"
      modal
      :closable="false"
      :style="{ width: '640px' }"
      :pt="{
        content: { style: 'padding: 0' },
        header: { style: 'padding: 1rem 1.25rem; border-bottom: 1px solid #e5e7eb' },
      }"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <Settings class="w-4 h-4 text-indigo-600" />
          <span class="text-sm font-semibold text-gray-900">Email Settings</span>
        </div>
      </template>
      <EmailSettingsPanel :initialTab="settingsInitialTab" />
      <template #footer>
        <div class="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200 w-full">
          <button
            @click="cancelSettings"
            class="px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
