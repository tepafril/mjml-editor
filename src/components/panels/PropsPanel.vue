<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { createNode } from '@/utils/defaultProps'
import { ALLOWED_CHILDREN } from '@/types/node.types'
import UnitInput from '@/components/ui/UnitInput.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import AlignmentToggle from '@/components/ui/AlignmentToggle.vue'
import SpacingControl from './SpacingControl.vue'
import { Plus, Trash2 } from 'lucide-vue-next'

const editorStore = useEditorStore()
const node = computed(() => editorStore.selectedNode)

const HAS_CONTENT = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button',
  'mj-navbar-link', 'mj-social-element',
  'mj-accordion-title', 'mj-accordion-text',
])
const HAS_RAW_CONTENT = new Set<string>(['mj-table', 'mj-raw'])
const HAS_TEXT_STYLES = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button',
  'mj-navbar-link', 'mj-accordion-title', 'mj-accordion-text',
])
const HAS_ALIGN = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button', 'mj-image', 'mj-avatar',
  'mj-social', 'mj-navbar', 'mj-carousel',
])
const HAS_SRC = new Set<string>(['mj-image', 'mj-avatar', 'mj-carousel-image'])
const HAS_HREF = new Set<string>(['mj-button', 'mj-navbar-link', 'mj-social-element', 'mj-carousel-image'])
const HAS_BG_URL = new Set<string>(['mj-wrapper', 'mj-hero', 'mj-section'])
const HAS_PADDING = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button', 'mj-image', 'mj-avatar',
  'mj-divider', 'mj-section', 'mj-wrapper', 'mj-hero',
  'mj-social', 'mj-navbar-link', 'mj-table', 'mj-accordion',
  'mj-accordion-title', 'mj-accordion-text', 'mj-column',
])

// Compound types that can have children added
const CAN_ADD_CHILD = new Set<string>([
  'mj-social', 'mj-navbar', 'mj-carousel', 'mj-accordion',
])

const SOCIAL_NETWORKS = [
  'facebook', 'twitter', 'x', 'instagram', 'linkedin', 'youtube',
  'pinterest', 'github', 'dribbble', 'medium', 'web',
]

function updateProp(key: string, value: string) {
  if (!node.value) return
  editorStore.updateNodeProps(node.value.id, { [key]: value })
}

function updateContent(value: string) {
  if (!node.value) return
  editorStore.updateNodeContent(node.value.id, value)
}

function addChild() {
  if (!node.value) return
  const allowed = ALLOWED_CHILDREN[node.value.type]
  if (!allowed || allowed.length === 0) return
  const childType = allowed[0]
  const child = createNode(childType)
  editorStore.insertNode(child, node.value.id, node.value.children.length)
}

function removeChild(childId: string) {
  editorStore.removeNode(childId)
}

const childTypeName = computed(() => {
  if (!node.value) return ''
  const map: Record<string, string> = {
    'mj-social': 'social link',
    'mj-navbar': 'nav link',
    'mj-carousel': 'slide',
    'mj-accordion': 'item',
  }
  return map[node.value.type] || 'child'
})
</script>

<template>
  <div v-if="node" class="p-3 space-y-4 text-sm">
    <!-- Node type badge -->
    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
        {{ node.type.replace('mj-', '') }}
      </span>
      <span class="text-[10px] text-gray-400 font-mono">{{ node.id.slice(0, 8) }}</span>
    </div>

    <!-- Content (text) -->
    <div v-if="HAS_CONTENT.has(node.type)">
      <label class="text-xs text-gray-500 mb-1 block">Content</label>
      <textarea
        :value="node.content || ''"
        @input="updateContent(($event.target as HTMLTextAreaElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white resize-y min-h-[60px]
               focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
      />
    </div>

    <!-- Raw HTML content -->
    <div v-if="HAS_RAW_CONTENT.has(node.type)">
      <label class="text-xs text-gray-500 mb-1 block">HTML Content</label>
      <textarea
        :value="node.content || ''"
        @input="updateContent(($event.target as HTMLTextAreaElement).value)"
        class="w-full px-2 py-1.5 text-xs font-mono border border-gray-200 rounded bg-gray-50 resize-y min-h-[100px]
               focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
      />
    </div>

    <!-- Social element: network name dropdown -->
    <div v-if="node.type === 'mj-social-element'">
      <label class="text-xs text-gray-500 mb-1 block">Network</label>
      <select
        :value="node.props.name || 'facebook'"
        @change="updateProp('name', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option v-for="net in SOCIAL_NETWORKS" :key="net" :value="net">
          {{ net.charAt(0).toUpperCase() + net.slice(1) }}
        </option>
      </select>
    </div>

    <!-- Source URL -->
    <div v-if="HAS_SRC.has(node.type)">
      <UnitInput
        label="Image URL"
        :modelValue="node.props.src || ''"
        @update:modelValue="updateProp('src', $event)"
      />
      <div v-if="node.props.alt !== undefined" class="mt-2">
        <UnitInput
          label="Alt Text"
          :modelValue="node.props.alt || ''"
          @update:modelValue="updateProp('alt', $event)"
        />
      </div>
    </div>

    <!-- Background URL (hero, wrapper, section) -->
    <div v-if="HAS_BG_URL.has(node.type) && node.props['background-url'] !== undefined">
      <UnitInput
        label="Background Image URL"
        :modelValue="node.props['background-url'] || ''"
        @update:modelValue="updateProp('background-url', $event)"
      />
      <div v-if="node.props['background-position'] !== undefined" class="mt-2">
        <UnitInput
          label="Background Position"
          :modelValue="node.props['background-position'] || 'center center'"
          @update:modelValue="updateProp('background-position', $event)"
        />
      </div>
    </div>

    <!-- Href -->
    <div v-if="HAS_HREF.has(node.type)">
      <UnitInput
        label="Link URL"
        :modelValue="node.props.href || ''"
        @update:modelValue="updateProp('href', $event)"
      />
    </div>

    <!-- Hero mode -->
    <div v-if="node.type === 'mj-hero'">
      <label class="text-xs text-gray-500 mb-1 block">Mode</label>
      <select
        :value="node.props.mode || 'fixed-height'"
        @change="updateProp('mode', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="fixed-height">Fixed Height</option>
        <option value="fluid-height">Fluid Height</option>
      </select>
    </div>

    <!-- Social mode -->
    <div v-if="node.type === 'mj-social'">
      <label class="text-xs text-gray-500 mb-1 block">Mode</label>
      <select
        :value="node.props.mode || 'horizontal'"
        @change="updateProp('mode', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
      <div class="mt-2">
        <UnitInput
          label="Icon Size"
          :modelValue="node.props['icon-size'] || '30px'"
          @update:modelValue="updateProp('icon-size', $event)"
        />
      </div>
    </div>

    <!-- Navbar hamburger -->
    <div v-if="node.type === 'mj-navbar'">
      <label class="text-xs text-gray-500 mb-1 block">Hamburger Menu</label>
      <select
        :value="node.props.hamburger || 'hamburger'"
        @change="updateProp('hamburger', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="hamburger">Enabled</option>
        <option value="">Disabled</option>
      </select>
    </div>

    <!-- Navbar link text-transform -->
    <div v-if="node.type === 'mj-navbar-link'">
      <label class="text-xs text-gray-500 mb-1 block">Text Transform</label>
      <select
        :value="node.props['text-transform'] || 'uppercase'"
        @change="updateProp('text-transform', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="uppercase">Uppercase</option>
        <option value="capitalize">Capitalize</option>
        <option value="lowercase">Lowercase</option>
        <option value="none">None</option>
      </select>
    </div>

    <!-- Group direction -->
    <div v-if="node.type === 'mj-group'">
      <label class="text-xs text-gray-500 mb-1 block">Direction</label>
      <select
        :value="node.props.direction || 'ltr'"
        @change="updateProp('direction', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="ltr">Left to Right</option>
        <option value="rtl">Right to Left</option>
      </select>
    </div>

    <!-- Accordion icon position -->
    <div v-if="node.type === 'mj-accordion'">
      <label class="text-xs text-gray-500 mb-1 block">Icon Position</label>
      <select
        :value="node.props['icon-position'] || 'right'"
        @change="updateProp('icon-position', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="right">Right</option>
        <option value="left">Left</option>
      </select>
    </div>

    <!-- Alignment -->
    <div v-if="HAS_ALIGN.has(node.type)">
      <label class="text-xs text-gray-500 mb-1 block">Alignment</label>
      <AlignmentToggle
        :modelValue="node.props.align || 'left'"
        @update:modelValue="updateProp('align', $event)"
      />
    </div>

    <!-- Size -->
    <div class="grid grid-cols-2 gap-2">
      <UnitInput
        v-if="node.props.width !== undefined"
        label="Width"
        :modelValue="node.props.width || ''"
        @update:modelValue="updateProp('width', $event)"
      />
      <UnitInput
        v-if="node.props.height !== undefined"
        label="Height"
        :modelValue="node.props.height || ''"
        @update:modelValue="updateProp('height', $event)"
      />
    </div>

    <!-- Spacing -->
    <div v-if="HAS_PADDING.has(node.type)">
      <label class="text-xs text-gray-500 mb-1 block">Padding</label>
      <SpacingControl :node="node" />
    </div>

    <!-- Typography -->
    <div v-if="HAS_TEXT_STYLES.has(node.type)" class="space-y-2">
      <label class="text-xs text-gray-500 block">Typography</label>
      <div class="grid grid-cols-2 gap-2">
        <UnitInput
          label="Font Size"
          :modelValue="node.props['font-size'] || '14px'"
          @update:modelValue="updateProp('font-size', $event)"
        />
        <UnitInput
          v-if="node.props['line-height'] !== undefined"
          label="Line Height"
          :modelValue="node.props['line-height'] || '1.5'"
          @update:modelValue="updateProp('line-height', $event)"
        />
      </div>
      <UnitInput
        label="Font Family"
        :modelValue="node.props['font-family'] || 'Arial, sans-serif'"
        @update:modelValue="updateProp('font-family', $event)"
      />
      <UnitInput
        v-if="node.props['font-weight'] !== undefined"
        label="Font Weight"
        :modelValue="node.props['font-weight'] || ''"
        @update:modelValue="updateProp('font-weight', $event)"
      />
    </div>

    <!-- Colors -->
    <div class="space-y-2">
      <label class="text-xs text-gray-500 block">Colors</label>
      <ColorPicker
        v-if="node.props.color !== undefined"
        label="Text Color"
        :modelValue="node.props.color || ''"
        @update:modelValue="updateProp('color', $event)"
      />
      <ColorPicker
        v-if="node.props['background-color'] !== undefined"
        label="Background"
        :modelValue="node.props['background-color'] || ''"
        @update:modelValue="updateProp('background-color', $event)"
      />
    </div>

    <!-- Border radius -->
    <div v-if="node.props['border-radius'] !== undefined">
      <UnitInput
        label="Border Radius"
        :modelValue="node.props['border-radius'] || ''"
        @update:modelValue="updateProp('border-radius', $event)"
      />
    </div>

    <!-- Divider specific -->
    <div v-if="node.type === 'mj-divider'" class="space-y-2">
      <ColorPicker
        label="Border Color"
        :modelValue="node.props['border-color'] || '#cccccc'"
        @update:modelValue="updateProp('border-color', $event)"
      />
      <UnitInput
        label="Border Width"
        :modelValue="node.props['border-width'] || '1px'"
        @update:modelValue="updateProp('border-width', $event)"
      />
    </div>

    <!-- Accordion border -->
    <div v-if="node.type === 'mj-accordion'">
      <UnitInput
        label="Border"
        :modelValue="node.props.border || ''"
        @update:modelValue="updateProp('border', $event)"
      />
    </div>

    <!-- Vertical align -->
    <div v-if="node.props['vertical-align'] !== undefined && ['mj-column', 'mj-hero', 'mj-group'].includes(node.type)">
      <label class="text-xs text-gray-500 mb-1 block">Vertical Align</label>
      <select
        :value="node.props['vertical-align'] || 'top'"
        @change="updateProp('vertical-align', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select>
    </div>

    <!-- Compound children management -->
    <div v-if="CAN_ADD_CHILD.has(node.type)" class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="text-xs text-gray-500">Children ({{ node.children.length }})</label>
        <button
          @click="addChild"
          class="flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-700"
        >
          <Plus class="w-3 h-3" /> Add {{ childTypeName }}
        </button>
      </div>
      <div
        v-for="child in node.children"
        :key="child.id"
        class="flex items-center justify-between px-2 py-1 bg-gray-50 rounded text-xs"
      >
        <span
          class="truncate cursor-pointer hover:text-indigo-600"
          @click="editorStore.selectNode(child.id)"
        >
          {{ child.content || child.props.name || child.type.replace('mj-', '') }}
        </span>
        <button
          @click="removeChild(child.id)"
          class="text-gray-400 hover:text-red-500 shrink-0"
        >
          <Trash2 class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div v-else class="flex flex-col items-center justify-center h-full text-center p-6">
    <div class="text-gray-300 mb-2">
      <svg class="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    </div>
    <p class="text-xs text-gray-400">Select an element to edit its properties</p>
  </div>
</template>
