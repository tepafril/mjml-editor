<script setup lang="ts">
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import Toolbar from './Toolbar.vue'
import LeftPanel from './LeftPanel.vue'
import RightPanel from './RightPanel.vue'
import Canvas from './Canvas.vue'

useKeyboardShortcuts()
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50 overflow-hidden">
    <!-- Toolbar -->
    <Toolbar />

    <!-- Main area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Panel -->
      <div class="w-60 shrink-0 overflow-hidden">
        <LeftPanel />
      </div>

      <!-- Canvas -->
      <Canvas />

      <!-- Right Panel -->
      <div class="w-72 shrink-0 overflow-hidden">
        <RightPanel />
      </div>
    </div>
  </div>
</template>
