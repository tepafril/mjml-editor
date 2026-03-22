<script setup lang="ts">
import { computed } from 'vue'
import { useHeadStore } from '@/stores/head.store'
import { useEditorStore } from '@/stores/editor.store'
import UnitInput from '@/components/ui/UnitInput.vue'
import ColorPicker from '@/components/ui/ColorPicker.vue'
import { Plus, Trash2 } from 'lucide-vue-next'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

const headStore = useHeadStore()
const editorStore = useEditorStore()

const bodyNode = computed(() => editorStore.tree)

const bodyBgColor = computed(() => bodyNode.value.props['background-color'] ?? '')
const bodyWidth = computed(() => bodyNode.value.props['width'] ?? '')

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
  <div class="p-0 space-y-5 text-sm">
    <div class="card">
      <Accordion :value="['0', '1', '2', '3']" multiple>
          <AccordionPanel value="0">
              <AccordionHeader class="p-3 bg-gray-50">Body Settings</AccordionHeader>
              <AccordionContent>
                <!-- Body Settings -->
                <div class="space-y-2 p-3">
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
                </div>
              </AccordionContent>
          </AccordionPanel>

          <!-- Email Meta -->
          <AccordionPanel value="1">
              <AccordionHeader class="p-3 bg-gray-50">Email Meta</AccordionHeader>
              <AccordionContent>
                <div class="space-y-4 p-3">
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Email Title</label>
                    <input
                      :value="headStore.settings.title"
                      @input="headStore.updateTitle(($event.target as HTMLInputElement).value)"
                      placeholder="My Newsletter"
                      class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                             focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-gray-500 mb-1 block">Preview Text</label>
                    <input
                      :value="headStore.settings.previewText"
                      @input="headStore.updatePreviewText(($event.target as HTMLInputElement).value)"
                      placeholder="Text shown in inbox preview..."
                      class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white
                             focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                    />
                    <p class="text-[10px] text-gray-400 mt-1">Shown after the subject line in email clients</p>
                  </div>
                  <div>
                    <UnitInput
                      label="Responsive Breakpoint"
                      :modelValue="headStore.settings.breakpoint"
                      @update:modelValue="headStore.updateBreakpoint($event)"
                      placeholder="480px"
                    />
                    <p class="text-[10px] text-gray-400 mt-1">MJML default is 480px</p>
                  </div>
                </div>
              </AccordionContent>
          </AccordionPanel>

          <!-- Fonts -->
          <AccordionPanel value="2">
              <AccordionHeader class="p-3 bg-gray-50">Fonts</AccordionHeader>
              <AccordionContent>
                <div class="p-3">
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-xs text-gray-500">Custom Fonts</label>
                    <button
                      @click="addCustomFont"
                      class="flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-700"
                    >
                      <Plus class="w-3 h-3" /> Add font
                    </button>
                  </div>

                  <!-- Loaded fonts -->
                  <div
                    v-for="(font, i) in headStore.settings.fonts"
                    :key="i"
                    class="flex items-start gap-1.5 mb-2 p-2 bg-gray-50 rounded"
                  >
                    <div class="flex-1 space-y-1">
                      <input
                        :value="font.name"
                        @input="headStore.updateFont(i, { ...font, name: ($event.target as HTMLInputElement).value })"
                        placeholder="Font name"
                        class="w-full px-2 py-1 text-[11px] border border-gray-200 rounded bg-white
                               focus:outline-none focus:border-indigo-400"
                      />
                      <input
                        :value="font.href"
                        @input="headStore.updateFont(i, { ...font, href: ($event.target as HTMLInputElement).value })"
                        placeholder="Google Fonts URL"
                        class="w-full px-2 py-1 text-[11px] border border-gray-200 rounded bg-white
                               focus:outline-none focus:border-indigo-400"
                      />
                    </div>
                    <button @click="headStore.removeFont(i)" class="text-gray-400 hover:text-red-500 mt-1">
                      <Trash2 class="w-3 h-3" />
                    </button>
                  </div>

                  <!-- Preset fonts -->
                  <div class="mt-2">
                    <p class="text-[10px] text-gray-400 mb-1">Quick add:</p>
                    <div class="flex flex-wrap gap-1">
                      <button
                        v-for="preset in PRESET_FONTS"
                        :key="preset.name"
                        @click="addPresetFont(preset)"
                        class="px-2 py-0.5 text-[10px] rounded border border-gray-200
                               hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        :class="headStore.settings.fonts.some(f => f.name === preset.name)
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          : 'text-gray-500'"
                      >
                        {{ preset.name }}
                      </button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
          </AccordionPanel>

          <!-- Custom CSS -->
          <AccordionPanel value="3">
              <AccordionHeader class="p-3 bg-gray-50">Custom CSS</AccordionHeader>
              <AccordionContent>
                <div class="p-3">
                  <textarea
                    :value="headStore.settings.styles"
                    @input="headStore.updateStyles(($event.target as HTMLTextAreaElement).value)"
                    placeholder=".custom-class { color: #333; }"
                    class="w-full px-2 py-1.5 text-xs font-mono border border-gray-200 rounded bg-gray-50
                           resize-y min-h-[80px]
                           focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                  />
                  <p class="text-[10px] text-gray-400 mt-1">Injected via &lt;mj-style&gt;. Supports hover states.</p>
                </div>
              </AccordionContent>
          </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>
