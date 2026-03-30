<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, Sparkles, X, Loader2, CheckCircle2, ChevronDown } from 'lucide-vue-next'
import { useTemplates } from '@/composables/useTemplates'
import { useAiTemplate } from '@/composables/useAiTemplate'
import type { EmailTemplate } from '@/types/template.types'
// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

const emit = defineEmits<{ close: [] }>()

const { search, activeCategory, filtered, loadTemplate, TEMPLATE_CATEGORIES } = useTemplates()
const { prompt, isGenerating, generatedMjml, error, generate, reset } = useAiTemplate()

const CATEGORY_COLORS: Record<string, string> = {
  Newsletter:    'bg-blue-100 text-blue-700',
  Promotional:   'bg-orange-100 text-orange-700',
  Transactional: 'bg-green-100 text-green-700',
  Welcome:       'bg-purple-100 text-purple-700',
  Announcement:  'bg-yellow-100 text-yellow-700',
  Minimal:       'bg-gray-100 text-gray-600',
}

function categoryBadgeClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-600'
}

function renderPreview(mjml: string): string {
  try {
    const { html } = mjml2html(mjml, { validationLevel: 'skip' })
    return html
  } catch {
    return '<p style="padding:16px;color:#999;font-size:12px">Preview unavailable</p>'
  }
}

const previews = computed(() =>
  Object.fromEntries(filtered.value.map(t => [t.id, renderPreview(t.mjml)]))
)

const aiPreviewHtml = computed(() =>
  generatedMjml.value ? renderPreview(generatedMjml.value) : ''
)

function handleUse(template: EmailTemplate) {
  loadTemplate(template.mjml)
  emit('close')
}

function handleUseGenerated() {
  if (generatedMjml.value) {
    loadTemplate(generatedMjml.value)
    emit('close')
  }
}

const showAiPanel = ref(false)
function toggleAiPanel() {
  showAiPanel.value = !showAiPanel.value
  if (!showAiPanel.value) reset()
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Search + filter bar -->
    <div class="px-5 py-4 border-b border-gray-100 space-y-3 shrink-0">
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            v-model="search"
            placeholder="Search templates…"
            class="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg bg-white
                   focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
          />
        </div>

        <!-- AI Generate button -->
        <button
          @click="toggleAiPanel"
          :title="showAiPanel ? 'Close AI generator' : 'Generate with AI'"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0"
          :class="showAiPanel
            ? 'bg-violet-600 text-white shadow-sm'
            : 'bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100'"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>AI</span>
          <ChevronDown
            class="w-3 h-3 transition-transform"
            :class="showAiPanel ? 'rotate-180' : ''"
          />
        </button>
      </div>

      <!-- Category pills -->
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="cat in TEMPLATE_CATEGORIES"
          :key="cat"
          @click="activeCategory = cat"
          class="px-3 py-1 rounded-full text-[11px] font-medium transition-colors"
          :class="activeCategory === cat
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- AI generation panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showAiPanel" class="border-b border-violet-100 bg-violet-50/50 px-5 py-4 space-y-3 shrink-0">
        <div class="flex items-center gap-1.5 text-xs font-medium text-violet-700">
          <Sparkles class="w-3.5 h-3.5" />
          Generate template with Qwen
        </div>

        <textarea
          v-model="prompt"
          placeholder="Describe the email you want… e.g. 'A flash sale promo for a music streaming app with 40% discount and bright gradient header'"
          rows="3"
          @keydown.meta.enter="generate"
          @keydown.ctrl.enter="generate"
          class="w-full px-3 py-2 text-xs border border-violet-200 rounded-lg bg-white resize-none
                 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-200 leading-relaxed"
        />

        <div class="flex items-center gap-2">
          <button
            @click="generate"
            :disabled="isGenerating || !prompt.trim()"
            class="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white
                   bg-violet-600 rounded-lg hover:bg-violet-700 disabled:opacity-40 transition-colors"
          >
            <Loader2 v-if="isGenerating" class="w-3.5 h-3.5 animate-spin" />
            <Sparkles v-else class="w-3.5 h-3.5" />
            {{ isGenerating ? 'Generating…' : 'Generate' }}
          </button>
          <span class="text-[10px] text-violet-400">⌘↵ to generate</span>
          <button
            v-if="generatedMjml || error"
            @click="reset"
            class="ml-auto text-[10px] text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
          >
            <X class="w-3 h-3" />
            Clear
          </button>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Generated preview -->
        <div v-if="generatedMjml" class="space-y-2">
          <div class="flex items-center gap-1.5 text-[11px] font-medium text-green-600">
            <CheckCircle2 class="w-3.5 h-3.5" />
            Template generated!
          </div>
          <div class="relative rounded-lg overflow-hidden border border-violet-200 bg-gray-50" style="height: 200px;">
            <iframe
              :srcdoc="aiPreviewHtml"
              sandbox="allow-same-origin allow-scripts"
              scrolling="no"
              class="absolute top-0 border-0 bg-white pointer-events-none"
              style="width: 600px; height: 900px; transform: scale(0.33); transform-origin: top center; left: 50%; margin-left: -300px;"
            />
            <div class="absolute inset-0 flex items-center justify-center">
              <button
                @click="handleUseGenerated"
                class="px-4 py-2 text-xs font-semibold text-white bg-violet-600 rounded-lg
                       shadow-lg hover:bg-violet-700 transition-colors"
              >
                Use this template
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Template grid -->
    <div v-show="!showAiPanel" class="flex-1 overflow-y-auto p-5">
      <div v-if="filtered.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="text-3xl mb-3">🔍</div>
        <p class="text-sm font-medium text-gray-500">No templates found</p>
        <p class="text-xs text-gray-400 mt-1">Try a different search or category</p>
      </div>

      <div v-else class="grid grid-cols-3 gap-5">
        <div
          v-for="template in filtered"
          :key="template.id"
          class="group flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white
                 hover:border-indigo-300 hover:shadow-md transition-all"
        >
          <div class="relative bg-gray-50 overflow-hidden" style="height: 220px;">
            <iframe
              :srcdoc="previews[template.id]"
              sandbox="allow-same-origin allow-scripts"
              scrolling="no"
              class="absolute top-0 border-0 bg-white pointer-events-none"
              style="width: 600px; height: 900px; transform: scale(0.33); transform-origin: top center; left: 50%; margin-left: -300px;"
            />
            <div class="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors flex items-center justify-center">
              <button
                @click="handleUse(template)"
                class="opacity-0 group-hover:opacity-100 transition-opacity
                       px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg
                       shadow-lg hover:bg-indigo-700"
              >
                Use Template
              </button>
            </div>
          </div>

          <div class="px-3 py-2.5 flex items-center justify-between gap-2">
            <div class="min-w-0">
              <p class="text-xs font-semibold text-gray-800 truncate">{{ template.name }}</p>
              <p class="text-[10px] text-gray-400 truncate mt-0.5">{{ template.description }}</p>
            </div>
            <span
              class="shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
              :class="categoryBadgeClass(template.category)"
            >
              {{ template.category }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
