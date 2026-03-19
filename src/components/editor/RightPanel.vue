<script setup lang="ts">
import { ref } from 'vue'
import PropsPanel from '@/components/panels/PropsPanel.vue'
import EmailSettingsPanel from '@/components/panels/EmailSettingsPanel.vue'

const activeTab = ref<'properties' | 'settings'>('properties')
</script>

<template>
  <div class="flex flex-col h-full bg-white border-l border-gray-200">
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 shrink-0">
      <button
        v-for="tab in (['properties', 'settings'] as const)"
        :key="tab"
        class="flex-1 py-2 text-xs font-medium text-center transition-colors capitalize"
        :class="activeTab === tab
          ? 'text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-500 hover:text-gray-700'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <PropsPanel v-if="activeTab === 'properties'" />
      <EmailSettingsPanel v-else />
    </div>
  </div>
</template>
