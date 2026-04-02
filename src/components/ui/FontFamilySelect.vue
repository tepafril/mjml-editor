<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHeadStore } from '@/stores/head.store'
import { useEditor } from '@/composables/useEditor'
import AutoComplete from 'primevue/autocomplete'
import { Settings } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const headStore = useHeadStore()
const editor = useEditor()

function openFontSettings() {
  editor.requestOpenSettings('fonts')
}

const allFonts = computed(() =>
  headStore.settings.fonts
    .filter(f => f.name)
    .map(f => `${f.name}, sans-serif`)
)

const suggestions = ref<string[]>([])

function search(event: { query: string }) {
  const query = event.query.toLowerCase()
  suggestions.value = query
    ? allFonts.value.filter(f => f.toLowerCase().includes(query))
    : [...allFonts.value]
}

const selected = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <div v-if="label" class="flex items-center justify-between">
      <label class="text-xs text-gray-500">{{ label }}</label>
      <button
        @click="openFontSettings"
        class="text-gray-400 hover:text-indigo-600 transition-colors"
        title="Manage fonts"
      >
        <Settings class="w-4 h-4" />
      </button>
    </div>
    <AutoComplete
      v-model="selected"
      :suggestions="suggestions"
      @complete="search"
      dropdown
      size="small"
      placeholder="Select font…"
      :pt="{
        pcInput: { root: { class: 'w-full text-xs' } },
        root: { class: 'w-full' },
      }"
    />
  </div>
</template>
