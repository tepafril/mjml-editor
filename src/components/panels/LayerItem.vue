<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import type { EditorNode } from '@/types/node.types'
import {
  ChevronRight, ChevronDown, Eye, EyeOff, Trash2,
  Type, Heading, MousePointer, Image, User,
  Minus, ChevronsUpDown, Rows3, Columns3,
  LayoutTemplate, RectangleHorizontal, Share2, Navigation, Link,
  Table, Code, Group,
  Repeat, GitBranch
} from 'lucide-vue-next'

const props = defineProps<{
  node: EditorNode
  depth: number
}>()

const editorStore = useEditorStore()
const expanded = ref(true)

const hasChildren = computed(() => props.node.children.length > 0)
const isSelected = computed(() => editorStore.selectedId === props.node.id)
const isHovered = computed(() => editorStore.hoveredId === props.node.id)

const ICON_MAP: Record<string, any> = {
  'mj-text': Type,
  'mj-heading': Heading,
  'mj-button': MousePointer,
  'mj-image': Image,
  'mj-avatar': User,
  'mj-divider': Minus,
  'mj-spacer': ChevronsUpDown,
  'mj-section': Rows3,
  'mj-column': Columns3,
  'mj-wrapper': LayoutTemplate,
  'mj-hero': RectangleHorizontal,
  'mj-social': Share2,
  'mj-social-element': Link,
  'mj-navbar': Navigation,
  'mj-navbar-link': Link,
  'mj-group': Group,
  'mj-table': Table,
  'mj-raw': Code,
}

const nodeIcon = computed(() => ICON_MAP[props.node.type] || Type)

function toggle() {
  expanded.value = !expanded.value
}

function toggleVisibility() {
  props.node.hidden = !props.node.hidden
}


</script>

<template>
  <div>
    <div
      class="flex items-center py-0.5 cursor-pointer text-xs
             hover:bg-gray-50 group transition-colors"
      :class="{
        'bg-indigo-50 text-indigo-700': isSelected,
        'ring-1 ring-indigo-300': isHovered && !isSelected,
      }"
      @click="editorStore.selectNode(node.id)"
      @mouseenter="editorStore.hoverNode(node.id)"
      @mouseleave="editorStore.hoverNode(null)"
    >
      <button
        class="w-5 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
        @click.stop="toggleVisibility"
      >
        <component :is="node.hidden ? EyeOff : Eye" class="w-3 h-3" />
      </button>

      <div class="flex items-center gap-1 flex-1 min-w-0" :style="{ paddingLeft: `${depth * 12}px` }">
        <button
          v-if="hasChildren"
          class="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
          @click.stop="toggle"
        >
          <component :is="expanded ? ChevronDown : ChevronRight" class="w-3 h-3" />
        </button>
        <span v-else class="w-4" />

        <component :is="nodeIcon" class="w-3 h-3 text-gray-400 shrink-0" />

        <span class="flex-1 truncate" :class="{ 'opacity-40': node.hidden }">
          {{ node.label || node.type.replace('mj-', '') }}
        </span>

        <Repeat v-if="node.templateLogic?.foreach" class="w-3 h-3 text-amber-500 shrink-0" title="Loop" />
        <GitBranch v-if="node.templateLogic?.if" class="w-3 h-3 text-amber-500 shrink-0" title="Condition" />
      </div>

      <button
        v-if="node.type !== 'mj-body'"
        class="w-5 shrink-0 flex items-center justify-center text-gray-400 hover:text-red-600 cursor-pointer"
        @click.stop="editorStore.removeNode(node.id)"
        title="Delete"
      >
        <Trash2 class="w-3 h-3" />
      </button>
    </div>

    <Transition name="layer-expand">
      <div v-if="expanded && hasChildren">
        <LayerItem
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :depth="depth + 1"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.layer-expand-enter-active,
.layer-expand-leave-active {
  transition: all 0.15s ease;
  overflow: hidden;
}
.layer-expand-enter-from,
.layer-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
