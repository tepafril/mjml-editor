<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHeadStore } from '@/stores/head.store'
import { useEditorStore } from '@/stores/editor.store'
import UnitInput from '@/components/ui/UnitInput.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import CssClassInput from '@/components/ui/CssClassInput.vue'
import { Plus, Trash2, Layout, FileText, TypeOutline, CodeXml, FolderInput, Download, Upload } from 'lucide-vue-next'
import { useImportExport } from '@/composables/useImportExport'

const headStore = useHeadStore()
const editorStore = useEditorStore()
const { exportMjml, exportTemplateHtml, importMjml } = useImportExport()

const activeTab = ref<'body' | 'meta' | 'fonts' | 'css' | 'import-export'>('body')

const tabs = [
  { key: 'body' as const, label: 'Body', icon: Layout },
  { key: 'meta' as const, label: 'Email Meta', icon: FileText },
  { key: 'fonts' as const, label: 'Fonts', icon: TypeOutline },
  { key: 'css' as const, label: 'Custom CSS', icon: CodeXml },
  { key: 'import-export' as const, label: 'Import / Export', icon: FolderInput },
]

const bodyNode = computed(() => editorStore.tree)
const bodyBgColor = computed(() => bodyNode.value.props['background-color'] ?? '')
const bodyWidth = computed(() => bodyNode.value.props['width'] ?? '')
const bodyCssClass = computed(() => bodyNode.value.props['css-class'] ?? '')

function updateBodyProp(prop: string, value: string) {
  editorStore.updateNodeProps(bodyNode.value.id, { [prop]: value })
}

const PRESET_FONTS = [
  { name: 'Roboto', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' },
  { name: 'Open Sans', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
  { name: 'Lato', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700' },
  { name: 'Montserrat', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700' },
  { name: 'Poppins', href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700' },
  { name: 'Inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700' },
]

function addPresetFont(preset: typeof PRESET_FONTS[0]) {
  const exists = headStore.settings.fonts.some(f => f.name === preset.name)
  if (!exists) {
    headStore.addFont({ ...preset })
  }
}

function addCustomFont() {
  headStore.addFont({ name: '', href: '' })
}
</script>

<template>
  <div class="flex h-[420px] text-sm">
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
          No custom fonts added yet. Pick a preset or add your own.
        </p>

        <!-- Preset fonts -->
        <div>
          <p class="text-[10px] text-gray-500 mb-2 font-medium uppercase tracking-wide">Quick add</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="preset in PRESET_FONTS"
              :key="preset.name"
              @click="addPresetFont(preset)"
              class="px-2.5 py-1 text-xs rounded-md border transition-colors"
              :class="headStore.settings.fonts.some(f => f.name === preset.name)
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'text-gray-500 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600'"
            >
              {{ preset.name }}
            </button>
          </div>
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
