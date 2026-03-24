<script setup lang="ts">
import { ref } from 'vue'
import { TEMPLATE_VARIABLES } from '@/config/templateVariables'
import { Braces } from 'lucide-vue-next'

const emit = defineEmits<{
  insert: [value: string]
}>()

const open = ref(false)

function formatVar(value: string) {
  return `\u007B\u007B${value}\u007D\u007D`
}

function select(value: string) {
  emit('insert', `{{${value}}}`)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <button
      @click="open = !open"
      class="flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-700 font-medium"
      title="Insert variable"
    >
      <Braces class="w-3 h-3" /> Insert Variable
    </button>

    <div
      v-if="open"
      class="absolute z-50 top-6 left-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto"
    >
      <div v-for="group in TEMPLATE_VARIABLES" :key="group.group">
        <div class="px-3 py-1 text-[10px] uppercase tracking-wider text-gray-400 font-medium">
          {{ group.group }}
        </div>
        <button
          v-for="v in group.variables"
          :key="v.value"
          @click="select(v.value)"
          class="w-full text-left px-3 py-1.5 text-xs hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-between"
        >
          <span>{{ v.label }}</span>
          <span class="text-[10px] text-gray-400 font-mono">{{ formatVar(v.value) }}</span>
        </button>
      </div>
    </div>

    <!-- Backdrop to close -->
    <div v-if="open" class="fixed inset-0 z-40" @click="open = false" />
  </div>
</template>
