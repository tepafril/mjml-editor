<script setup lang="ts">
import { computed } from 'vue'
import { useEditor } from '@/composables/useEditor'
import { createNode } from '@/utils/defaultProps'
import { ALLOWED_CHILDREN } from '@/types/node.types'
import UnitInput from '@/components/ui/UnitInput.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import AlignmentToggle from '@/components/ui/AlignmentToggle.vue'
import FontFamilySelect from '@/components/ui/FontFamilySelect.vue'
import CssClassInput from '@/components/ui/CssClassInput.vue'
import SpacingControl from './SpacingControl.vue'
import { Plus, Trash2, Repeat, GitBranch, Braces } from 'lucide-vue-next'
import VariablePicker from './VariablePicker.vue'

const editor = useEditor()
const node = computed(() => editor.selectedNode)

const HAS_CONTENT = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button',
  'mj-navbar-link', 'mj-social-element',
])
const HAS_RAW_CONTENT = new Set<string>(['mj-table', 'mj-raw'])
const HAS_TEXT_STYLES = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button',
  'mj-navbar-link',
])
const HAS_ALIGN = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button', 'mj-image', 'mj-avatar',
  'mj-social', 'mj-navbar',
])

const HAS_SRC = new Set<string>(['mj-image', 'mj-avatar'])
const HAS_HREF = new Set<string>(['mj-button', 'mj-navbar-link', 'mj-social-element'])
const HAS_BG_URL = new Set<string>(['mj-wrapper', 'mj-hero', 'mj-section'])
const HAS_PADDING = new Set<string>([
  'mj-text', 'mj-heading', 'mj-button', 'mj-image', 'mj-avatar',
  'mj-divider', 'mj-section', 'mj-wrapper', 'mj-hero',
  'mj-social', 'mj-navbar-link', 'mj-table', 'mj-column',
])

// Compound types that can have children added
const CAN_ADD_CHILD = new Set<string>([
  'mj-social', 'mj-navbar',
])

const SOCIAL_NETWORKS = [
  'facebook', 'twitter', 'x', 'instagram', 'linkedin', 'youtube',
  'pinterest', 'github', 'dribbble', 'medium', 'web',
]

function updateProp(key: string, value: string) {
  if (!node.value) return
  editor.updateProps(node.value.id, { [key]: value })
}

function updateContent(value: string) {
  if (!node.value) return
  editor.updateContent(node.value.id, value)
}

function addChild() {
  if (!node.value) return
  const allowed = ALLOWED_CHILDREN[node.value.type]
  if (!allowed || allowed.length === 0) return
  const childType = allowed[0]
  const child = createNode(childType)
  editor.insertNode(child, node.value.id, node.value.children.length)
}

function removeChild(childId: string) {
  editor.removeNode(childId)
}

const HAS_FOREACH = new Set<string>([
  'mj-section', 'mj-column', 'mj-wrapper', 'mj-group',
])

function insertVariable(variable: string) {
  if (!node.value) return
  const current = node.value.content || ''
  editor.updateContent(node.value.id, current + variable)
}

function updateTemplateLogic(key: string, value: string) {
  if (!node.value) return
  editor.updateTemplateLogic(node.value.id, { [key]: value })
}

const childTypeName = computed(() => {
  if (!node.value) return ''
  const map: Record<string, string> = {
    'mj-social': 'social link',
    'mj-navbar': 'nav link',
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
      <div class="flex items-center justify-between mb-1">
        <label class="text-xs text-gray-500">Content</label>
        <VariablePicker @insert="insertVariable" />
      </div>
      <textarea
        :value="node.content || ''"
        @input="updateContent(($event.target as HTMLTextAreaElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white resize-y min-h-[60px]
               focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
      />
    </div>

    <!-- HTML content -->
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
    <div v-if="HAS_BG_URL.has(node.type) && node.props['background-url'] !== undefined" class="space-y-2">
      <UnitInput
        label="Background Image URL"
        :modelValue="node.props['background-url'] || ''"
        @update:modelValue="updateProp('background-url', $event)"
      />
      <UnitInput
        v-if="node.props['background-position'] !== undefined"
        label="Background Position"
        :modelValue="node.props['background-position'] || ''"
        @update:modelValue="updateProp('background-position', $event)"
        placeholder="e.g. top center"
      />
      <div v-if="node.props['background-position-x'] !== undefined" class="grid grid-cols-2 gap-2">
        <UnitInput
          label="BG Position X"
          :modelValue="node.props['background-position-x'] || ''"
          @update:modelValue="updateProp('background-position-x', $event)"
        />
        <UnitInput
          v-if="node.props['background-position-y'] !== undefined"
          label="BG Position Y"
          :modelValue="node.props['background-position-y'] || ''"
          @update:modelValue="updateProp('background-position-y', $event)"
        />
      </div>
      <div v-if="node.props['background-repeat'] !== undefined">
        <label class="text-xs text-gray-500 mb-1 block">Background Repeat</label>
        <select
          :value="node.props['background-repeat'] || ''"
          @change="updateProp('background-repeat', ($event.target as HTMLSelectElement).value)"
          class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        >
          <option value="">Default</option>
          <option value="repeat">Repeat</option>
          <option value="no-repeat">No Repeat</option>
        </select>
      </div>
      <UnitInput
        v-if="node.props['background-size'] !== undefined"
        label="Background Size"
        :modelValue="node.props['background-size'] || ''"
        @update:modelValue="updateProp('background-size', $event)"
        placeholder="e.g. cover, contain, auto"
      />
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

    <!-- Direction (group, section, column) -->
    <div v-if="node.props['direction'] !== undefined && ['mj-group', 'mj-section', 'mj-column'].includes(node.type)">
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

    <!-- Full width (section) -->
    <div v-if="node.props['full-width'] !== undefined">
      <label class="text-xs text-gray-500 mb-1 block">Full Width</label>
      <select
        :value="node.props['full-width'] || ''"
        @change="updateProp('full-width', ($event.target as HTMLSelectElement).value)"
        class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400"
      >
        <option value="">Default</option>
        <option value="full-width">Full Width</option>
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
      <FontFamilySelect
        label="Font Family"
        :modelValue="node.props['font-family'] || ''"
        @update:modelValue="updateProp('font-family', $event)"
      />
      <div class="grid grid-cols-2 gap-2">
        <UnitInput
          v-if="node.props['font-weight'] !== undefined"
          label="Font Weight"
          :modelValue="node.props['font-weight'] || ''"
          @update:modelValue="updateProp('font-weight', $event)"
        />
        <div v-if="node.props['font-style'] !== undefined">
          <label class="text-xs text-gray-500 mb-1 block">Font Style</label>
          <select
            :value="node.props['font-style'] || ''"
            @change="updateProp('font-style', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                   focus:outline-none focus:border-indigo-400"
          >
            <option value="">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <UnitInput
          v-if="node.props['letter-spacing'] !== undefined"
          label="Letter Spacing"
          :modelValue="node.props['letter-spacing'] || ''"
          @update:modelValue="updateProp('letter-spacing', $event)"
          placeholder="e.g. 1px"
        />
        <div v-if="node.props['text-decoration'] !== undefined">
          <label class="text-xs text-gray-500 mb-1 block">Text Decoration</label>
          <select
            :value="node.props['text-decoration'] || ''"
            @change="updateProp('text-decoration', ($event.target as HTMLSelectElement).value)"
            class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                   focus:outline-none focus:border-indigo-400"
          >
            <option value="">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="line-through">Line Through</option>
          </select>
        </div>
      </div>
      <div v-if="node.props['text-transform'] !== undefined">
        <label class="text-xs text-gray-500 mb-1 block">Text Transform</label>
        <select
          :value="node.props['text-transform'] || ''"
          @change="updateProp('text-transform', ($event.target as HTMLSelectElement).value)"
          class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                 focus:outline-none focus:border-indigo-400"
        >
          <option value="">None</option>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </div>
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
      <ColorPicker
        v-if="node.props['container-background-color'] !== undefined"
        label="Container Background"
        :modelValue="node.props['container-background-color'] || ''"
        @update:modelValue="updateProp('container-background-color', $event)"
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

    <!-- Border (shorthand + sides) -->
    <div v-if="node.props['border'] !== undefined" class="space-y-2">
      <UnitInput
        label="Border"
        :modelValue="node.props['border'] || ''"
        @update:modelValue="updateProp('border', $event)"
        placeholder="e.g. 1px solid #ccc"
      />
      <div class="grid grid-cols-2 gap-2">
        <UnitInput
          v-if="node.props['border-top'] !== undefined"
          label="Border Top"
          :modelValue="node.props['border-top'] || ''"
          @update:modelValue="updateProp('border-top', $event)"
        />
        <UnitInput
          v-if="node.props['border-bottom'] !== undefined"
          label="Border Bottom"
          :modelValue="node.props['border-bottom'] || ''"
          @update:modelValue="updateProp('border-bottom', $event)"
        />
        <UnitInput
          v-if="node.props['border-left'] !== undefined"
          label="Border Left"
          :modelValue="node.props['border-left'] || ''"
          @update:modelValue="updateProp('border-left', $event)"
        />
        <UnitInput
          v-if="node.props['border-right'] !== undefined"
          label="Border Right"
          :modelValue="node.props['border-right'] || ''"
          @update:modelValue="updateProp('border-right', $event)"
        />
      </div>
    </div>

    <!-- Inner styles (mj-column) -->
    <div v-if="node.props['inner-border'] !== undefined" class="space-y-2">
      <label class="text-xs text-gray-500 block">Inner Border</label>
      <ColorPicker
        v-if="node.props['inner-background-color'] !== undefined"
        label="Inner Background"
        :modelValue="node.props['inner-background-color'] || ''"
        @update:modelValue="updateProp('inner-background-color', $event)"
      />
      <UnitInput
        label="Inner Border"
        :modelValue="node.props['inner-border'] || ''"
        @update:modelValue="updateProp('inner-border', $event)"
        placeholder="e.g. 1px solid #ccc"
      />
      <div class="grid grid-cols-2 gap-2">
        <UnitInput
          v-if="node.props['inner-border-top'] !== undefined"
          label="Inner Top"
          :modelValue="node.props['inner-border-top'] || ''"
          @update:modelValue="updateProp('inner-border-top', $event)"
        />
        <UnitInput
          v-if="node.props['inner-border-bottom'] !== undefined"
          label="Inner Bottom"
          :modelValue="node.props['inner-border-bottom'] || ''"
          @update:modelValue="updateProp('inner-border-bottom', $event)"
        />
        <UnitInput
          v-if="node.props['inner-border-left'] !== undefined"
          label="Inner Left"
          :modelValue="node.props['inner-border-left'] || ''"
          @update:modelValue="updateProp('inner-border-left', $event)"
        />
        <UnitInput
          v-if="node.props['inner-border-right'] !== undefined"
          label="Inner Right"
          :modelValue="node.props['inner-border-right'] || ''"
          @update:modelValue="updateProp('inner-border-right', $event)"
        />
      </div>
      <UnitInput
        v-if="node.props['inner-border-radius'] !== undefined"
        label="Inner Border Radius"
        :modelValue="node.props['inner-border-radius'] || ''"
        @update:modelValue="updateProp('inner-border-radius', $event)"
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

    <!-- CSS Class -->
    <CssClassInput
      v-if="node.props['css-class'] !== undefined"
      :modelValue="node.props['css-class'] || ''"
      @update:modelValue="updateProp('css-class', $event)"
    />

    <!-- Template Logic -->
    <div v-if="node.type !== 'mj-body'" class="space-y-2">
      <label class="text-xs text-gray-500 font-medium flex items-center gap-1">
        <Braces class="w-3 h-3" /> Template Logic
      </label>
      <div class="bg-amber-50 border border-amber-200 rounded-md p-2 space-y-2">
        <!-- foreach -->
        <div v-if="HAS_FOREACH.has(node.type)">
          <label class="text-[10px] text-amber-700 mb-0.5 flex items-center gap-1">
            <Repeat class="w-3 h-3" /> Loop (foreach)
          </label>
          <input
            :value="node.templateLogic?.foreach || ''"
            @input="updateTemplateLogic('foreach', ($event.target as HTMLInputElement).value)"
            placeholder="e.g. contacts"
            class="w-full px-2 py-1 text-xs border border-amber-200 rounded bg-white
                   focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200
                   placeholder:text-gray-300"
          />
          <input
            v-if="node.templateLogic?.foreach"
            :value="node.templateLogic?.foreachAs || ''"
            @input="updateTemplateLogic('foreachAs', ($event.target as HTMLInputElement).value)"
            placeholder="Loop variable (e.g. contact)"
            class="w-full px-2 py-1 text-xs border border-amber-200 rounded bg-white mt-1
                   focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200
                   placeholder:text-gray-300"
          />
        </div>
        <!-- if -->
        <div>
          <label class="text-[10px] text-amber-700 mb-0.5 flex items-center gap-1">
            <GitBranch class="w-3 h-3" /> Condition (if)
          </label>
          <input
            :value="node.templateLogic?.if || ''"
            @input="updateTemplateLogic('if', ($event.target as HTMLInputElement).value)"
            placeholder="e.g. contact.first_name == 'tep'"
            class="w-full px-2 py-1 text-xs border border-amber-200 rounded bg-white
                   focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200
                   placeholder:text-gray-300"
          />
        </div>
      </div>
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
          @click="editor.select(child.id)"
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
