<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHeadStore } from '@/stores/head.store'
import { useEditor } from '@/composables/useEditor'
import UnitInput from '@/components/ui/UnitInput.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import CssClassInput from '@/components/ui/CssClassInput.vue'
import { Plus, Trash2, Layout, FileText, TypeOutline, CodeXml, FolderInput, Download, Upload, Search, SlidersHorizontal, ChevronDown, ChevronRight, Code } from 'lucide-vue-next'
import { NODE_DEFAULT_PROPS } from '@/types/mjml.types'
import { useImportExport } from '@/composables/useImportExport'
import { GOOGLE_FONTS_TOP_100, buildGoogleFontUrl, type GoogleFontEntry } from '@/config/googleFonts'

const headStore = useHeadStore()
const editor = useEditor()
const { exportMjml, exportTemplateHtml, importMjml } = useImportExport()

type TabKey = 'body' | 'meta' | 'fonts' | 'defaults' | 'css' | 'html-attrs' | 'import-export'

const props = defineProps<{
  initialTab?: string
}>()

const activeTab = ref<TabKey>('body')

watch(() => props.initialTab, (tab) => {
  if (tab) activeTab.value = tab as TabKey
}, { immediate: true })

const tabs = [
  { key: 'body' as const, label: 'Body', icon: Layout },
  { key: 'meta' as const, label: 'Email Meta', icon: FileText },
  { key: 'fonts' as const, label: 'Fonts', icon: TypeOutline },
  { key: 'defaults' as const, label: 'Defaults', icon: SlidersHorizontal },
  { key: 'css' as const, label: 'Custom CSS', icon: CodeXml },
  { key: 'html-attrs' as const, label: 'HTML Attrs', icon: Code },
  { key: 'import-export' as const, label: 'Import / Export', icon: FolderInput },
]

const bodyNode = computed(() => editor.tree)
const bodyBgColor = computed(() => bodyNode.value.props['background-color'] ?? '')
const bodyWidth = computed(() => bodyNode.value.props['width'] ?? '')
const bodyCssClass = computed(() => bodyNode.value.props['css-class'] ?? '')

function updateBodyProp(prop: string, value: string) {
  editor.updateProps(bodyNode.value.id, { [prop]: value })
}

// --- Fonts ---
const fontSearch = ref('')
const fontCategory = ref<GoogleFontEntry['category'] | 'all'>('all')

const CATEGORIES: { key: GoogleFontEntry['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sans-serif', label: 'Sans Serif' },
  { key: 'serif', label: 'Serif' },
  { key: 'display', label: 'Display' },
  { key: 'handwriting', label: 'Handwriting' },
  { key: 'monospace', label: 'Monospace' },
]

const filteredFonts = computed(() => {
  return GOOGLE_FONTS_TOP_100.filter(f => {
    const matchesSearch = !fontSearch.value || f.name.toLowerCase().includes(fontSearch.value.toLowerCase())
    const matchesCategory = fontCategory.value === 'all' || f.category === fontCategory.value
    return matchesSearch && matchesCategory
  })
})

function isFontAdded(name: string) {
  return headStore.settings.fonts.some(f => f.name === name)
}

function toggleFont(entry: GoogleFontEntry) {
  const idx = headStore.settings.fonts.findIndex(f => f.name === entry.name)
  if (idx >= 0) {
    headStore.removeFont(idx)
  } else {
    headStore.addFont({ name: entry.name, href: buildGoogleFontUrl(entry.name) })
  }
}

function addCustomFont() {
  headStore.addFont({ name: '', href: '' })
}

// --- Defaults (mj-attributes) ---
const CONFIGURABLE_TAGS = [
  { tag: 'mj-all', label: 'All Components', props: ['font-family', 'font-size', 'color', 'padding'] },
  { tag: 'mj-text', label: 'Text', props: Object.keys(NODE_DEFAULT_PROPS['mj-text']).filter(p => p !== 'css-class') },
  { tag: 'mj-heading', label: 'Heading', props: Object.keys(NODE_DEFAULT_PROPS['mj-heading']).filter(p => p !== 'css-class') },
  { tag: 'mj-button', label: 'Button', props: Object.keys(NODE_DEFAULT_PROPS['mj-button']).filter(p => !['href', 'css-class'].includes(p)) },
  { tag: 'mj-image', label: 'Image', props: ['width', 'align', 'padding'] },
  { tag: 'mj-section', label: 'Section', props: Object.keys(NODE_DEFAULT_PROPS['mj-section']) },
  { tag: 'mj-column', label: 'Column', props: Object.keys(NODE_DEFAULT_PROPS['mj-column']) },
  { tag: 'mj-divider', label: 'Divider', props: Object.keys(NODE_DEFAULT_PROPS['mj-divider']) },
] as const

const COLOR_PROPS = new Set(['color', 'background-color', 'container-background-color', 'border-color'])
const SELECT_PROPS: Record<string, { label: string; options: string[] }> = {
  'align': { label: 'Align', options: ['left', 'center', 'right', 'justify'] },
  'text-align': { label: 'Text Align', options: ['left', 'center', 'right'] },
  'vertical-align': { label: 'Vertical Align', options: ['top', 'middle', 'bottom'] },
  'font-style': { label: 'Font Style', options: ['', 'italic', 'oblique'] },
  'text-decoration': { label: 'Text Decoration', options: ['', 'underline', 'overline', 'line-through'] },
  'text-transform': { label: 'Text Transform', options: ['', 'uppercase', 'lowercase', 'capitalize'] },
  'border-style': { label: 'Border Style', options: ['solid', 'dashed', 'dotted'] },
}

const expandedTags = ref<Set<string>>(new Set())

function toggleExpand(tag: string) {
  if (expandedTags.value.has(tag)) {
    expandedTags.value.delete(tag)
  } else {
    expandedTags.value.add(tag)
  }
}

function getGlobalAttr(tag: string, prop: string): string {
  return headStore.settings.globalAttributes[tag]?.[prop] || ''
}

function setGlobalAttr(tag: string, prop: string, value: string) {
  if (value) {
    headStore.updateGlobalAttribute(tag, prop, value)
  } else {
    headStore.removeGlobalAttribute(tag, prop)
  }
}

function getPropLabel(prop: string): string {
  return prop.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function hasAnyDefaults(tag: string): boolean {
  const attrs = headStore.settings.globalAttributes[tag]
  return !!attrs && Object.values(attrs).some(v => !!v)
}

// --- mj-class ---
const mjClasses = computed(() => {
  return Object.entries(headStore.settings.globalAttributes)
    .filter(([tag]) => tag.startsWith('mj-class.'))
    .map(([tag, props]) => ({
      name: tag.replace('mj-class.', ''),
      props,
    }))
})

function addMjClass() {
  const name = `class-${mjClasses.value.length + 1}`
  headStore.updateGlobalAttribute(`mj-class.${name}`, '_placeholder', '')
}

function removeMjClass(name: string) {
  headStore.removeGlobalAttribute(`mj-class.${name}`)
}

function renameMjClass(oldName: string, newName: string) {
  if (!newName || oldName === newName) return
  const oldTag = `mj-class.${oldName}`
  const newTag = `mj-class.${newName}`
  const existing = headStore.settings.globalAttributes[oldTag]
  if (existing) {
    // Copy props to new key
    for (const [prop, val] of Object.entries(existing)) {
      if (prop !== '_placeholder') headStore.updateGlobalAttribute(newTag, prop, val)
    }
    headStore.removeGlobalAttribute(oldTag)
  }
}

function addMjClassProp(className: string) {
  const tag = `mj-class.${className}`
  headStore.updateGlobalAttribute(tag, '', '')
}

function updateMjClassPropKey(className: string, oldKey: string, newKey: string) {
  if (!newKey || oldKey === newKey) return
  const tag = `mj-class.${className}`
  const val = headStore.settings.globalAttributes[tag]?.[oldKey] || ''
  headStore.removeGlobalAttribute(tag, oldKey)
  headStore.updateGlobalAttribute(tag, newKey, val)
}

function updateMjClassPropValue(className: string, key: string, value: string) {
  headStore.updateGlobalAttribute(`mj-class.${className}`, key, value)
}

function removeMjClassProp(className: string, key: string) {
  headStore.removeGlobalAttribute(`mj-class.${className}`, key)
}

// --- HTML Attributes ---
function addHtmlAttrToSelector(index: number) {
  headStore.setHtmlAttribute(index, '', '')
}

function updateHtmlAttrKey(selectorIndex: number, oldKey: string, newKey: string) {
  if (!newKey || oldKey === newKey) return
  const val = headStore.settings.htmlAttributes[selectorIndex].attributes[oldKey] || ''
  headStore.removeHtmlAttribute(selectorIndex, oldKey)
  headStore.setHtmlAttribute(selectorIndex, newKey, val)
}

</script>

<template>
  <div class="flex h-[640px] text-sm">
    <!-- Sidebar Navigation -->
    <nav class="w-40 shrink-0 border-r border-gray-200 bg-gray-50/50 py-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors text-left"
        :class="activeTab === tab.key
          ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600 font-medium'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
        @click="activeTab = tab.key"
      >
        <component :is="tab.icon" class="w-4 h-4 shrink-0" />
        {{ tab.label }}
      </button>
    </nav>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto p-5">

      <!-- Body Settings -->
      <div v-if="activeTab === 'body'" class="space-y-4">
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Body Settings</h3>
        <ColorPicker
          label="Background Color"
          :modelValue="bodyBgColor"
          @update:modelValue="updateBodyProp('background-color', $event)"
        />
        <UnitInput
          label="Width"
          :modelValue="bodyWidth"
          @update:modelValue="updateBodyProp('width', $event)"
          placeholder="600px"
        />
        <CssClassInput
          :modelValue="bodyCssClass"
          @update:modelValue="updateBodyProp('css-class', $event)"
          placeholder="e.g. my-email-body"
        />
      </div>

      <!-- Email Meta -->
      <div v-else-if="activeTab === 'meta'" class="space-y-4">
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Email Meta</h3>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Email Title</label>
          <input
            :value="headStore.settings.title"
            @input="headStore.updateTitle(($event.target as HTMLInputElement).value)"
            placeholder="My Newsletter"
            class="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md bg-white
                   focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Preview Text</label>
          <input
            :value="headStore.settings.previewText"
            @input="headStore.updatePreviewText(($event.target as HTMLInputElement).value)"
            placeholder="Text shown in inbox preview..."
            class="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-md bg-white
                   focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
          />
          <p class="text-[10px] text-gray-400 mt-1.5">Shown after the subject line in email clients</p>
        </div>
        <div>
          <UnitInput
            label="Responsive Breakpoint"
            :modelValue="headStore.settings.breakpoint"
            @update:modelValue="headStore.updateBreakpoint($event)"
            placeholder="480px"
          />
          <p class="text-[10px] text-gray-400 mt-1.5">MJML default is 480px</p>
        </div>
      </div>

      <!-- Fonts -->
      <div v-else-if="activeTab === 'fonts'" class="space-y-4">
        <div>
          <!-- Font Browser -->
          <div class="space-y-2">
            <p class="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Browse Google Fonts</p>

            <!-- Search -->
            <div class="relative">
              <Search class="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                v-model="fontSearch"
                type="text"
                placeholder="Search fonts…"
                class="w-full pl-8 pr-2.5 py-1.5 text-xs border border-gray-200 rounded-md bg-white
                      focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
              />
            </div>

            <!-- Category filter -->
            <div class="flex flex-wrap gap-1">
              <button
                v-for="cat in CATEGORIES"
                :key="cat.key"
                @click="fontCategory = cat.key"
                class="px-2 py-0.5 text-[10px] rounded-full border transition-colors"
                :class="fontCategory === cat.key
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200 font-medium'
                  : 'text-gray-500 border-gray-200 hover:border-indigo-300'"
              >
                {{ cat.label }}
              </button>
            </div>

            <!-- Font list -->
            <div class="max-h-40 overflow-y-auto border border-gray-100 rounded-lg h-[160px]">
              <button
                v-for="entry in filteredFonts"
                :key="entry.name"
                @click="toggleFont(entry)"
                class="w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors"
                :class="isFontAdded(entry.name)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'"
              >
                <span>{{ entry.name }}</span>
                <span class="text-[10px] text-gray-400">{{ entry.category }}</span>
              </button>
              <p v-if="filteredFonts.length === 0" class="px-3 py-3 text-xs text-gray-400 text-center">
                No fonts match your search.
              </p>
            </div>
          </div>

        </div>

        <div class="space-y-2">

          <div class="flex items-center justify-between">
            <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Fonts</h3>
            <button
              @click="addCustomFont"
              class="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Plus class="w-3.5 h-3.5" /> Add font
            </button>
          </div>
          <!-- Loaded fonts -->
          <div
            v-for="(font, i) in headStore.settings.fonts"
            :key="i"
            class="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div class="flex-1 space-y-2">
              <input
                :value="font.name"
                @input="headStore.updateFont(i, { ...font, name: ($event.target as HTMLInputElement).value })"
                placeholder="Font name"
                class="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-md bg-white
                      focus:outline-none focus:border-indigo-400"
              />
              <input
                :value="font.href"
                @input="headStore.updateFont(i, { ...font, href: ($event.target as HTMLInputElement).value })"
                placeholder="Google Fonts URL"
                class="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-md bg-white
                      focus:outline-none focus:border-indigo-400"
              />
            </div>
            <button @click="headStore.removeFont(i)" class="text-gray-400 hover:text-red-500 mt-1.5">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Empty state -->
          <p v-if="headStore.settings.fonts.length === 0" class="text-xs text-gray-400 py-2">
            No custom fonts added yet. Browse below or add your own.
          </p>
        </div>
      </div>

      <!-- Defaults (mj-attributes) -->
      <div v-else-if="activeTab === 'defaults'" class="space-y-4">
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Component Defaults</h3>
        <p class="text-[10px] text-gray-400">
          Set default attributes for component types. These are output as &lt;mj-attributes&gt; in the MJML.
        </p>

        <!-- Per-tag defaults -->
        <div class="space-y-1">
          <div
            v-for="entry in CONFIGURABLE_TAGS"
            :key="entry.tag"
            class="border border-gray-100 rounded-lg overflow-hidden"
          >
            <!-- Tag header -->
            <button
              @click="toggleExpand(entry.tag)"
              class="w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-gray-50"
              :class="hasAnyDefaults(entry.tag) ? 'bg-indigo-50/50' : 'bg-white'"
            >
              <div class="flex items-center gap-2">
                <component
                  :is="expandedTags.has(entry.tag) ? ChevronDown : ChevronRight"
                  class="w-3.5 h-3.5 text-gray-400"
                />
                <span class="font-medium text-gray-700">{{ entry.label }}</span>
                <code class="text-[10px] text-gray-400 bg-gray-100 px-1 rounded">{{ entry.tag }}</code>
              </div>
              <span
                v-if="hasAnyDefaults(entry.tag)"
                class="w-1.5 h-1.5 rounded-full bg-indigo-500"
              />
            </button>

            <!-- Tag props -->
            <div v-if="expandedTags.has(entry.tag)" class="px-3 pb-3 pt-1 space-y-2 border-t border-gray-100 bg-gray-50/30">
              <template v-for="prop in entry.props" :key="prop">
                <!-- Color props -->
                <ColorPicker
                  v-if="COLOR_PROPS.has(prop)"
                  :label="getPropLabel(prop)"
                  :modelValue="getGlobalAttr(entry.tag, prop)"
                  @update:modelValue="setGlobalAttr(entry.tag, prop, $event)"
                />
                <!-- Select props -->
                <div v-else-if="SELECT_PROPS[prop]">
                  <label class="text-xs text-gray-500 mb-1 block">{{ SELECT_PROPS[prop].label }}</label>
                  <select
                    :value="getGlobalAttr(entry.tag, prop)"
                    @change="setGlobalAttr(entry.tag, prop, ($event.target as HTMLSelectElement).value)"
                    class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                           focus:outline-none focus:border-indigo-400"
                  >
                    <option value="">Default</option>
                    <option v-for="opt in SELECT_PROPS[prop].options" :key="opt" :value="opt">
                      {{ opt || 'None' }}
                    </option>
                  </select>
                </div>
                <!-- Font family -->
                <div v-else-if="prop === 'font-family'">
                  <label class="text-xs text-gray-500 mb-1 block">Font Family</label>
                  <input
                    :value="getGlobalAttr(entry.tag, prop)"
                    @input="setGlobalAttr(entry.tag, prop, ($event.target as HTMLInputElement).value)"
                    placeholder="e.g. Arial, sans-serif"
                    class="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded bg-white
                           focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <!-- Unit / text props -->
                <UnitInput
                  v-else
                  :label="getPropLabel(prop)"
                  :modelValue="getGlobalAttr(entry.tag, prop)"
                  @update:modelValue="setGlobalAttr(entry.tag, prop, $event)"
                />
              </template>
            </div>
          </div>
        </div>

        <!-- mj-class section -->
        <div class="space-y-2 pt-2 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Named Classes</h3>
            <button
              @click="addMjClass"
              class="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <Plus class="w-3.5 h-3.5" /> Add class
            </button>
          </div>
          <p class="text-[10px] text-gray-400">
            Define reusable attribute sets. Apply via <code class="bg-gray-100 px-0.5 rounded">mj-class="name"</code> on any component.
          </p>

          <div
            v-for="mjClass in mjClasses"
            :key="mjClass.name"
            class="border border-gray-100 rounded-lg p-3 bg-gray-50/30 space-y-2"
          >
            <!-- Class name -->
            <div class="flex items-center gap-2">
              <input
                :value="mjClass.name"
                @change="renameMjClass(mjClass.name, ($event.target as HTMLInputElement).value)"
                class="flex-1 px-2 py-1 text-xs font-medium border border-gray-200 rounded bg-white
                       focus:outline-none focus:border-indigo-400"
                placeholder="Class name"
              />
              <button @click="removeMjClass(mjClass.name)" class="text-gray-400 hover:text-red-500">
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Class properties -->
            <div
              v-for="(val, key) in mjClass.props"
              :key="key"
              class="flex items-center gap-1.5"
            >
              <template v-if="key !== '_placeholder'">
                <input
                  :value="key"
                  @change="updateMjClassPropKey(mjClass.name, key as string, ($event.target as HTMLInputElement).value)"
                  placeholder="attribute"
                  class="w-1/3 px-2 py-1 text-xs border border-gray-200 rounded bg-white
                         focus:outline-none focus:border-indigo-400"
                />
                <input
                  :value="val"
                  @input="updateMjClassPropValue(mjClass.name, key as string, ($event.target as HTMLInputElement).value)"
                  placeholder="value"
                  class="flex-1 px-2 py-1 text-xs border border-gray-200 rounded bg-white
                         focus:outline-none focus:border-indigo-400"
                />
                <button @click="removeMjClassProp(mjClass.name, key as string)" class="text-gray-400 hover:text-red-500">
                  <Trash2 class="w-3 h-3" />
                </button>
              </template>
            </div>

            <button
              @click="addMjClassProp(mjClass.name)"
              class="text-[10px] text-indigo-600 hover:text-indigo-700 font-medium"
            >
              + Add attribute
            </button>
          </div>

          <p v-if="mjClasses.length === 0" class="text-xs text-gray-400 py-1">
            No named classes defined yet.
          </p>
        </div>
      </div>

      <!-- Custom CSS -->
      <div v-else-if="activeTab === 'css'" class="space-y-4">
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Custom CSS</h3>
        <textarea
          :value="headStore.settings.styles"
          @input="headStore.updateStyles(($event.target as HTMLTextAreaElement).value)"
          placeholder=".custom-class { color: #333; }"
          rows="12"
          class="w-full px-3 py-2.5 text-xs font-mono border border-gray-200 rounded-lg bg-gray-50
                 resize-y
                 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
        />
        <p class="text-[10px] text-gray-400">Injected via &lt;mj-style&gt;. Supports hover states.</p>
      </div>

      <!-- HTML Attributes -->
      <div v-else-if="activeTab === 'html-attrs'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">HTML Attributes</h3>
          <button
            @click="headStore.addHtmlSelector()"
            class="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Plus class="w-3.5 h-3.5" /> Add selector
          </button>
        </div>
        <p class="text-[10px] text-gray-400">
          Add custom HTML attributes to generated elements via CSS selectors.
          Output as <code class="bg-gray-100 px-0.5 rounded">&lt;mj-html-attributes&gt;</code>.
        </p>

        <div
          v-for="(selector, si) in headStore.settings.htmlAttributes"
          :key="si"
          class="border border-gray-100 rounded-lg p-3 bg-gray-50/30 space-y-2"
        >
          <!-- Selector path -->
          <div class="flex items-center gap-2">
            <input
              :value="selector.path"
              @input="headStore.updateHtmlSelectorPath(si, ($event.target as HTMLInputElement).value)"
              placeholder="CSS selector, e.g. .blue a"
              class="flex-1 px-2 py-1.5 text-xs font-mono border border-gray-200 rounded bg-white
                     focus:outline-none focus:border-indigo-400"
            />
            <button @click="headStore.removeHtmlSelector(si)" class="text-gray-400 hover:text-red-500">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Attributes -->
          <div
            v-for="(val, name) in selector.attributes"
            :key="name"
            class="flex items-center gap-1.5"
          >
            <input
              :value="name"
              @change="updateHtmlAttrKey(si, name as string, ($event.target as HTMLInputElement).value)"
              placeholder="attribute name"
              class="w-1/3 px-2 py-1 text-xs border border-gray-200 rounded bg-white
                     focus:outline-none focus:border-indigo-400"
            />
            <input
              :value="val"
              @input="headStore.setHtmlAttribute(si, name as string, ($event.target as HTMLInputElement).value)"
              placeholder="value"
              class="flex-1 px-2 py-1 text-xs border border-gray-200 rounded bg-white
                     focus:outline-none focus:border-indigo-400"
            />
            <button @click="headStore.removeHtmlAttribute(si, name as string)" class="text-gray-400 hover:text-red-500">
              <Trash2 class="w-3 h-3" />
            </button>
          </div>

          <button
            @click="addHtmlAttrToSelector(si)"
            class="text-[10px] text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + Add attribute
          </button>
        </div>

        <p v-if="headStore.settings.htmlAttributes.length === 0" class="text-xs text-gray-400 py-1">
          No HTML attribute selectors defined yet.
        </p>
      </div>

      <!-- Import / Export -->
      <div v-else-if="activeTab === 'import-export'" class="space-y-4">
        <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wide">Import / Export</h3>
        <div class="space-y-3">
          <button
            @click="importMjml"
            class="w-full flex items-center gap-3 px-4 py-3 text-xs text-left border border-gray-200 rounded-lg
                   hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <Upload class="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <div class="font-medium text-gray-700">Import MJML</div>
              <div class="text-[10px] text-gray-400 mt-0.5">Load a .mjml or .xml template file</div>
            </div>
          </button>
          <button
            @click="exportMjml"
            class="w-full flex items-center gap-3 px-4 py-3 text-xs text-left border border-gray-200 rounded-lg
                   hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <Download class="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <div class="font-medium text-gray-700">Export MJML</div>
              <div class="text-[10px] text-gray-400 mt-0.5">Download the template as .mjml file</div>
            </div>
          </button>
          <button
            @click="exportTemplateHtml"
            class="w-full flex items-center gap-3 px-4 py-3 text-xs text-left border border-gray-200 rounded-lg
                   hover:border-amber-300 hover:bg-amber-50 transition-colors"
          >
            <Download class="w-5 h-5 text-gray-400 shrink-0" />
            <div>
              <div class="font-medium text-gray-700">Export Template HTML</div>
              <div class="text-[10px] text-gray-400 mt-0.5">HTML with variables, loops &amp; conditionals for backend</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
