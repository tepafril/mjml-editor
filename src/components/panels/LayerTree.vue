<script setup lang="ts">
import { useEditor } from '@/composables/useEditor'
import LayerItem from './LayerItem.vue'

const editor = useEditor()
</script>

<template>
  <div class="layer-tree p-2">
    <div class="text-[10px] uppercase tracking-wider text-gray-400 mb-2 px-1 font-medium">
      Layers
    </div>
    <LayerItem
      v-for="node in editor.tree.children"
      :key="node.id"
      :node="node"
      :depth="0"
    />
  </div>
</template>
