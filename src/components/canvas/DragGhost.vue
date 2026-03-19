<script setup lang="ts">
import { computed } from 'vue'
import { useDragStore } from '@/stores/drag.store'
import { useEditorStore } from '@/stores/editor.store'
import { treeUtils } from '@/utils/treeUtils'
import {
  Type, Heading, MousePointer, Image, User,
  Minus, ChevronsUpDown, Rows3, Columns3,
  LayoutTemplate, RectangleHorizontal, Share2, Navigation,
  Table, Code, GalleryHorizontal, ListCollapse, Group
} from 'lucide-vue-next'

const dragStore = useDragStore()
const editorStore = useEditorStore()

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
  'mj-navbar': Navigation,
  'mj-group': Group,
  'mj-table': Table,
  'mj-raw': Code,
  'mj-carousel': GalleryHorizontal,
  'mj-accordion': ListCollapse,
}

const LABEL_MAP: Record<string, string> = {
  'mj-text': 'Text',
  'mj-heading': 'Heading',
  'mj-button': 'Button',
  'mj-image': 'Image',
  'mj-avatar': 'Avatar',
  'mj-divider': 'Divider',
  'mj-spacer': 'Spacer',
  'mj-section': 'Section',
  'mj-column': 'Column',
  'mj-wrapper': 'Wrapper',
  'mj-hero': 'Hero',
  'mj-social': 'Social',
  'mj-social-element': 'Social Link',
  'mj-navbar': 'Navbar',
  'mj-navbar-link': 'Nav Link',
  'mj-group': 'Group',
  'mj-table': 'Table',
  'mj-raw': 'Raw HTML',
  'mj-carousel': 'Carousel',
  'mj-carousel-image': 'Slide',
  'mj-accordion': 'Accordion',
  'mj-accordion-element': 'Accordion Item',
  'mj-accordion-title': 'Title',
  'mj-accordion-text': 'Text',
}

const resolvedType = computed(() => {
  const source = dragStore.dragSource
  if (!source) return null
  if (source.nodeType) return source.nodeType
  if (source.nodeId) {
    const node = treeUtils.findById(editorStore.tree, source.nodeId)
    return node?.type || null
  }
  return null
})

const ghostIcon = computed(() => {
  const type = resolvedType.value
  return type ? ICON_MAP[type] : null
})

const label = computed(() => {
  const type = resolvedType.value
  return type ? LABEL_MAP[type] || type : 'Move'
})

const pos = computed(() => dragStore.ghostPosition)
</script>

<template>
  <Teleport to="body">
    <Transition name="ghost-fade">
      <div
        v-if="dragStore.isDragging"
        class="fixed top-0 left-0 bg-indigo-600 text-white px-2.5 py-1 rounded-md text-xs
               pointer-events-none z-[9999] flex items-center gap-1.5
               shadow-lg shadow-indigo-600/40"
        :style="{ transform: `translate(${pos.x + 12}px, ${pos.y + 12}px)` }"
      >
        <component v-if="ghostIcon" :is="ghostIcon" class="w-3.5 h-3.5" />
        <span>{{ label }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ghost-fade-enter-active { transition: opacity 0.1s ease; }
.ghost-fade-enter-from { opacity: 0; }
.ghost-fade-leave-active { transition: opacity 0.15s ease; }
.ghost-fade-leave-to { opacity: 0; }
</style>
