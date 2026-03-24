<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { usePreviewStore } from '@/stores/preview.store'
import { useHeadStore } from '@/stores/head.store'
import type { HeadSettings } from '@/types/mjml.types'
import IconButton from '@/components/ui/IconButton.vue'
import EmailSettingsPanel from '@/components/panels/EmailSettingsPanel.vue'
import Dialog from 'primevue/dialog'
import {
  Undo2, Redo2, Monitor, Smartphone, Code, Settings
} from 'lucide-vue-next'

const editorStore = useEditorStore()
const previewStore = usePreviewStore()
const headStore = useHeadStore()

const settingsOpen = ref(false)

// Snapshots taken when dialog opens, used for cancel/revert
let headSnapshot: HeadSettings | null = null
let bodyPropsSnapshot: Record<string, string> | null = null

function openSettings() {
  // Snapshot current state before editing
  headSnapshot = JSON.parse(JSON.stringify(headStore.settings))
  bodyPropsSnapshot = JSON.parse(JSON.stringify(editorStore.tree.props))
  settingsOpen.value = true
}

function saveSettings() {
  // Just close — changes are already applied in real-time
  headSnapshot = null
  bodyPropsSnapshot = null
  settingsOpen.value = false
}

function cancelSettings() {
  // Restore snapshots
  if (headSnapshot) {
    headStore.loadSettings(headSnapshot)
  }
  if (bodyPropsSnapshot) {
    editorStore.updateNodeProps(editorStore.tree.id, bodyPropsSnapshot)
  }
  headSnapshot = null
  bodyPropsSnapshot = null
  settingsOpen.value = false
}

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

    <!-- Spacer -->
    <div class="flex-1" />

    <!-- Preview modes (centered) -->
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

    <!-- Settings -->
    <button
      title="Email Settings"
      @click="openSettings"
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
    >
      <Settings class="w-4 h-4" />
      Email Settings
    </button>

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
      <EmailSettingsPanel />
      <template #footer>
        <div class="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-200 w-full">
          <button
            @click="cancelSettings"
            class="px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-md
                   hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-xs font-medium text-white bg-indigo-600 rounded-md
                   hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
