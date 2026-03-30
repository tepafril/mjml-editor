<script setup lang="ts">
import { ref } from 'vue'
import ComponentLibrary from '@/components/panels/ComponentLibrary.vue'
import SectionsPanel from '@/components/panels/SectionsPanel.vue'
import SavedSectionsPanel from '@/components/panels/SavedSectionsPanel.vue'

type Tab = 'elements' | 'sections' | 'saved-sections'
const activeTab = ref<Tab>('elements')

const tabs: { key: Tab; label: string }[] = [
  { key: 'elements', label: 'Elements' },
  { key: 'sections', label: 'Sections' },
  { key: 'saved-sections', label: 'Saved' },
]
</script>

<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <!-- Tab bar -->
    <div class="flex border-b border-gray-200 shrink-0">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="flex-1 py-2 text-xs font-medium text-center transition-colors"
        :class="activeTab === tab.key
          ? 'text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Panel content -->
    <div class="flex-1 overflow-y-auto">
      <ComponentLibrary v-if="activeTab === 'elements'" />
      <SectionsPanel v-else-if="activeTab === 'sections'" />
      <SavedSectionsPanel v-else />
    </div>
  </div>
</template>
