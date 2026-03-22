<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDragDrop } from '@/composables/useDragDrop'
import type { NodeType } from '@/types/node.types'
import {
  Type, Heading, MousePointer, Image, User,
  Minus, ChevronsUpDown, Rows3, Columns3,
  LayoutTemplate, RectangleHorizontal, Share2, Navigation,
  Table, Code, GalleryHorizontal, ListCollapse, Group
} from 'lucide-vue-next'

const { onDragStart, onDragEnd } = useDragDrop()
const search = ref('')

const COMPONENTS = [
  // Content
  { type: 'mj-heading' as NodeType, label: 'Heading', icon: Heading, group: 'Content' },
  { type: 'mj-text' as NodeType, label: 'Text', icon: Type, group: 'Content' },
  { type: 'mj-button' as NodeType, label: 'Button', icon: MousePointer, group: 'Content' },
  { type: 'mj-social' as NodeType, label: 'Social', icon: Share2, group: 'Content' },
  { type: 'mj-navbar' as NodeType, label: 'Navbar', icon: Navigation, group: 'Content' },
  { type: 'mj-table' as NodeType, label: 'Table', icon: Table, group: 'Content' },
  // Media
  { type: 'mj-image' as NodeType, label: 'Image', icon: Image, group: 'Media' },
  { type: 'mj-avatar' as NodeType, label: 'Avatar', icon: User, group: 'Media' },
  { type: 'mj-carousel' as NodeType, label: 'Carousel', icon: GalleryHorizontal, group: 'Media' },
  // Layout
  { type: 'mj-section' as NodeType, label: 'Section', icon: Rows3, group: 'Layout' },
  { type: 'mj-column' as NodeType, label: 'Column', icon: Columns3, group: 'Layout' },
  { type: 'mj-wrapper' as NodeType, label: 'Wrapper', icon: LayoutTemplate, group: 'Layout' },
  { type: 'mj-hero' as NodeType, label: 'Hero', icon: RectangleHorizontal, group: 'Layout' },
  { type: 'mj-group' as NodeType, label: 'Group', icon: Group, group: 'Layout' },
  { type: 'mj-divider' as NodeType, label: 'Divider', icon: Minus, group: 'Layout' },
  { type: 'mj-spacer' as NodeType, label: 'Spacer', icon: ChevronsUpDown, group: 'Layout' },
  // Advanced
  { type: 'mj-accordion' as NodeType, label: 'Accordion', icon: ListCollapse, group: 'Advanced' },
  { type: 'mj-raw' as NodeType, label: 'HTML', icon: Code, group: 'Advanced' },
]

const filteredComponents = computed(() => {
  if (!search.value) return COMPONENTS
  const q = search.value.toLowerCase()
  return COMPONENTS.filter(c =>
    c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
  )
})

const groups = computed(() => {
  const grouped: Record<string, typeof COMPONENTS> = {}
  for (const comp of filteredComponents.value) {
    if (!grouped[comp.group]) grouped[comp.group] = []
    grouped[comp.group].push(comp)
  }
  return grouped
})

function handleDragStart(e: DragEvent, type: NodeType) {
  onDragStart(e, { nodeType: type })
}
</script>

<template>
  <div class="p-3">
    <input
      v-model="search"
      placeholder="Search components..."
      class="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white
             focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
    />

    <div v-for="(comps, group) in groups" :key="group" class="mt-3">
      <div class="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium">
        {{ group }}
      </div>
      <div class="grid grid-cols-3 gap-1.5">
        <div
          v-for="comp in comps"
          :key="comp.type"
          draggable="true"
          @dragstart="handleDragStart($event, comp.type)"
          @dragend="onDragEnd"
          class="flex flex-col items-center gap-1 p-2 rounded-md cursor-grab
                 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50
                 transition-colors text-gray-600 hover:text-indigo-600"
        >
          <component :is="comp.icon" class="w-4 h-4" />
          <span class="text-[10px]">{{ comp.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
