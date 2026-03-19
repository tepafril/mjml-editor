<script setup lang="ts">
import { ref } from 'vue'
import ComponentLibrary from '@/components/panels/ComponentLibrary.vue'
import LayerTree from '@/components/panels/LayerTree.vue'

const activeTab = ref<'components' | 'layers'>('components')
</script>

<template>
  <div class="flex flex-col h-full bg-white border-r border-gray-200">
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 shrink-0">
      <button
        v-for="tab in (['components', 'layers'] as const)"
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
      <ComponentLibrary v-if="activeTab === 'components'" />
      <LayerTree v-else />
    </div>
  </div>
</template>
